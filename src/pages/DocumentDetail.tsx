import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Copy, 
  Share2, 
  Download, 
  Building, 
  User, 
  Calendar, 
  FileText, 
  Scale,
  ExternalLink,
  Tag,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import PaywallModal from "@/components/PaywallModal";
// Importa a função de credenciais
import { getApiCredentials } from "@/services/searchService";


const RELATED_CASES = [
  { id: "2", titulo: "Danos morais por negativação indevida", relevancia: 95 },
  { id: "3", titulo: "Responsabilidade bancária por fraude", relevancia: 88 },
  { id: "4", titulo: "Código de Defesa do Consumidor - Aplicação", relevancia: 82 }
];

const DocumentDetail = () => {
  const { tipo, id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [document, setDocument] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    const fetchDocument = async () => {
      if (!id || !tipo) return;
      
      setIsLoading(true);
      try {
        const { getDocument } = await import('@/services/searchService');
        const data = await getDocument(tipo, id);
        setDocument(data);
      } catch (error: any) {
        console.error('Erro ao carregar o documento:', error);
        toast({
          title: "Erro ao carregar documento",
          description: `Não foi possível carregar o documento ${id}. ${error.message || 'Erro desconhecido.'}`,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocument();
  }, [tipo, id, toast]);

  const handleCopy = (content: string, type: string) => {
    if (!content) {
        toast({ title: "Conteúdo vazio", description: "Não há nada para copiar.", variant: "destructive" });
        return;
    }
    setSelectedText(content);
    setPaywallOpen(true);
  };

  const handleShare = async () => {
    if (!document) return;
    try {
      await navigator.share({
        title: document.titulo,
        text: document.ementa.slice(0, 150) + "...",
        url: window.location.href,
      });
    } catch (error) {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado!",
        description: "Link do documento copiado para a área de transferência.",
      });
    }
  };

  const handleSubscribe = (planId: string) => {
    toast({
      title: "Redirecionando para o checkout...",
      description: `Processando assinatura do plano ${planId}`,
    });
  };
  
  // FUNÇÃO DE DOWNLOAD CORRIGIDA
  const handleDownloadPdf = async () => {
    if (!document) return;

    toast({
      title: "Iniciando download...",
      description: "Por favor, aguarde enquanto preparamos seu PDF.",
    });

    try {
      // 1. Obter a chave da API
      const { escavadorKey } = await getApiCredentials();

      // 2. Construir a URL completa para o endpoint de PDF do Escavador
      const pdfUrl = `https://api.escavador.com/api/v1/jurisprudencias/documento/pdf/${document.document_type || tipo}/${id}`;
      console.log("Fetching PDF from:", pdfUrl);

      // 3. Fazer a requisição com o cabeçalho de autorização
      const response = await fetch(pdfUrl, {
        headers: {
          'Authorization': `Bearer ${escavadorKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Falha ao buscar o PDF: ${response.status} ${response.statusText}`);
      }

      // 4. Converter a resposta para um Blob (um tipo de arquivo)
      const blob = await response.blob();
      
      // 5. Criar um link temporário para iniciar o download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${document.numero_processo || 'documento'}.pdf`; // Nome do arquivo
      document.body.appendChild(a); // Adiciona o link ao corpo do documento
      a.click(); // Simula o clique no link
      a.remove(); // Remove o link
      window.URL.revokeObjectURL(url); // Libera a memória

    } catch (error: any) {
      console.error("Erro ao baixar PDF:", error);
      toast({
        title: "Erro no Download",
        description: error.message || "Não foi possível baixar o arquivo PDF. Verifique o console para mais detalhes.",
        variant: "destructive"
      });
    }
  };


  const formatDate = (dateString: string) => {
    // Adiciona T00:00:00 para evitar problemas de fuso horário
    return new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const removeHtmlTags = (text: string) => {
    if(!text) return '';
    return text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
  };

  if (isLoading || !document) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando documento...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-16 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </Button>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Compartilhar</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleCopy(document.ementa, "ementa")}>
                  <Copy className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Copiar ementa</span>
                </Button>
                <Button size="sm" onClick={() => handleCopy(document.inteiro_teor, "inteiro_teor")} variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Copiar inteiro teor</span>
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownloadPdf} // ATUALIZADO PARA USAR A NOVA FUNÇÃO
                  className="btn-hero flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 max-w-6xl">
          {/* Document Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4 leading-tight">
              {document.titulo || 'Documento sem título'}
            </h1>
            
            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Card><CardContent className="p-4"><div className="flex items-center space-x-2 text-sm"><Building className="w-4 h-4 text-primary" /><div><p className="font-medium text-foreground">{document.tribunal?.nome || document.tribunal}</p><p className="text-muted-foreground">{document.orgao_julgador}</p></div></div></CardContent></Card>
              <Card><CardContent className="p-4"><div className="flex items-center space-x-2 text-sm"><User className="w-4 h-4 text-primary" /><div><p className="font-medium text-foreground">Relator</p><p className="text-muted-foreground">{document.relator?.nome || document.relator}</p></div></div></CardContent></Card>
              <Card><CardContent className="p-4"><div className="flex items-center space-x-2 text-sm"><Calendar className="w-4 h-4 text-primary" /><div><p className="font-medium text-foreground">Data do Julgamento</p><p className="text-muted-foreground">{document.data_julgamento ? formatDate(document.data_julgamento) : document.data_publicacao ? formatDate(document.data_publicacao) : 'Data não informada'}</p></div></div></CardContent></Card>
              <Card><CardContent className="p-4"><div className="flex items-center space-x-2 text-sm"><FileText className="w-4 h-4 text-primary" /><div><p className="font-medium text-foreground">Número do Processo</p><p className="text-muted-foreground">{document.numero_processo || document.numero || 'Não informado'}</p></div></div></CardContent></Card>
              <Card><CardContent className="p-4"><div className="flex items-center space-x-2 text-sm"><Scale className="w-4 h-4 text-primary" /><div><p className="font-medium text-foreground">Classe/Assunto</p><p className="text-muted-foreground">{document.classe_assunto || document.recurso_nome || document.tipo || 'Não informado'}</p></div></div></CardContent></Card>
            </div>
            
            {document.tags && document.tags.length > 0 && (<div className="flex flex-wrap gap-2 mb-6">{document.tags.map((tag: string, index: number) => (<Badge key={index} variant="secondary"><Tag className="w-3 h-3 mr-1" />{tag}</Badge>))}</div>)}
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="ementa" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ementa">Ementa</TabsTrigger>
              <TabsTrigger value="inteiro_teor">Inteiro Teor</TabsTrigger>
              <TabsTrigger value="relacionados">Relacionados</TabsTrigger>
              <TabsTrigger value="precedentes">Precedentes</TabsTrigger>
            </TabsList>

            <TabsContent value="ementa" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Ementa</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(document.ementa, "ementa")}><Copy className="w-4 h-4 mr-2" />Copiar</Button>
                </CardHeader>
                <CardContent><div className="prose prose-sm max-w-none"><div className="text-foreground leading-relaxed space-y-4">{removeHtmlTags(document.ementa).split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}</div></div></CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inteiro_teor" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Inteiro Teor</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => handleCopy(document.inteiro_teor, "inteiro_teor")}><Copy className="w-4 h-4 mr-2" />Copiar</Button>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-line">
                      {removeHtmlTags(document.inteiro_teor || document.conteudo_completo || document.decisao)}
                    </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="relacionados" className="space-y-4">
              <Card>
                <CardHeader><CardTitle className="text-lg">Citações Relacionadas</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {RELATED_CASES.map((case_item) => (
                      <div key={case_item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50">
                        <div><p className="font-medium">{case_item.titulo}</p><Badge variant="outline">{case_item.relevancia}% relevância</Badge></div>
                        <Button variant="ghost" size="sm"><ExternalLink className="w-4 h-4" /></Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="precedentes" className="space-y-4">
               <Card>
                <CardHeader><CardTitle className="text-lg">Precedentes Semelhantes</CardTitle></CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium text-foreground mb-2">Em breve</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Estamos desenvolvendo nossa IA para identificar precedentes semelhantes automaticamente.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-12 pt-6 border-t text-center"><p className="text-xs text-muted-foreground">Conteúdo para fins acadêmicos. Consulte fontes oficiais.</p></div>
        </div>
      </div>

      <PaywallModal open={paywallOpen} onOpenChange={setPaywallOpen} documentTitle={document?.titulo || 'Documento'} onSubscribe={handleSubscribe}/>
    </>
  );
};

export default DocumentDetail;