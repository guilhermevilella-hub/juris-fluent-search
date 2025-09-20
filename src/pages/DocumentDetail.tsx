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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import PaywallModal from "@/components/PaywallModal";

// Mock document data
const MOCK_DOCUMENT = {
  id: "1",
  tipo: "acordao",
  arquivo: "documento.pdf",
  titulo: "Responsabilidade civil por danos morais em relações de consumo",
  ementa: `O fornecedor de produtos ou serviços responde objetivamente pelos danos causados aos consumidores, independentemente de culpa, conforme art. 14 do CDC. A configuração do dano moral prescinde da demonstração de prejuízo econômico, bastando a comprovação da violação do direito da personalidade do consumidor.

  No caso dos autos, restou comprovada a falha na prestação do serviço bancário, que resultou em constrangimento e abalo à honra do autor, configurando dano moral indenizável.

  A indenização por danos morais deve ser fixada com moderação, considerando-se as circunstâncias do caso concreto, a condição econômica das partes e os princípios da proporcionalidade e razoabilidade.`,
  
  inteiro_teor: `ACÓRDÃO

  EMENTA: RESPONSABILIDADE CIVIL. DANOS MORAIS. RELAÇÃO DE CONSUMO. FALHA NA PRESTAÇÃO DE SERVIÇO BANCÁRIO. CONFIGURAÇÃO. INDENIZAÇÃO DEVIDA.

  1. O fornecedor de produtos ou serviços responde objetivamente pelos danos causados aos consumidores, independentemente de culpa, conforme dispõe o art. 14 do Código de Defesa do Consumidor.

  2. A configuração do dano moral em relações consumeristas prescinde da demonstração de prejuízo econômico, sendo suficiente a comprovação da violação do direito da personalidade do consumidor.

  3. No presente caso, restou evidenciada a falha na prestação do serviço bancário, que ocasionou constrangimento injustificado ao autor, caracterizando dano moral passível de indenização.

  4. A fixação da indenização por danos morais deve observar os critérios da proporcionalidade e razoabilidade, considerando as circunstâncias específicas do caso, a gravidade da ofensa e a condição econômica das partes envolvidas.

  5. Recurso conhecido e provido em parte para reduzir o valor da indenização por danos morais.

  RELATÓRIO

  Trata-se de recurso especial interposto por BANCO XYZ S/A contra acórdão proferido pelo Tribunal de Justiça de São Paulo...

  [Conteúdo completo do acórdão continuaria aqui com toda a fundamentação, votos dos ministros, etc.]

  VOTO

  O EXMO. SR. MINISTRO MARCO AURÉLIO BELLIZZE (Relator):

  Cuida-se de recurso especial em que se discute a responsabilidade civil por danos morais em relação de consumo...

  [Voto completo do relator]

  DECISÃO

  Por unanimidade, conhecer do recurso especial e dar-lhe provimento em parte...`,
  
  tribunal: "STJ - Superior Tribunal de Justiça",
  orgao_julgador: "3ª Turma",
  relator: "Min. Marco Aurélio Bellizze",
  data_julgamento: "2024-01-15",
  numero_processo: "REsp 1.234.567/SP",
  classe_assunto: "Recurso Especial - Responsabilidade Civil",
  palavras_chave: ["responsabilidade civil", "danos morais", "direito do consumidor", "CDC", "falha na prestação de serviço"],
  fonte_url: "https://stj.jusbrasil.com.br/exemplo",
  tags: ["Direito do Consumidor", "Responsabilidade Civil", "Danos Morais", "Bancário"]
};

const RELATED_CASES = [
  { id: "2", titulo: "Danos morais por negativação indevida", relevancia: 95 },
  { id: "3", titulo: "Responsabilidade bancária por fraude", relevancia: 88 },
  { id: "4", titulo: "Código de Defesa do Consumidor - Aplicação", relevancia: 82 }
];

const DocumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [document, setDocument] = useState(MOCK_DOCUMENT);
  const [isLoading, setIsLoading] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    const fetchDocument = async () => {
      setIsLoading(true);
      try {
        const { getDocument } = await import('@/services/searchService');
        const data = await getDocument('acordao', id); // Assumindo 'acordao' como tipo
        setDocument(data);
      } catch (error) {
        console.error('Erro ao carregar o documento:', error);
        // Fallback para dados mock em caso de erro
        setDocument(MOCK_DOCUMENT);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDocument();
    }
  }, [id]);

  const handleCopy = (content: string, type: string) => {
    setSelectedText(content);
    // For non-subscribers, show paywall
    setPaywallOpen(true);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: document.titulo,
        text: document.ementa.slice(0, 150) + "...",
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to copy link
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado!",
        description: "Link do documento copiado para a área de transferência.",
      });
    }
  };

  const handleSubscribe = (planId: string) => {
    // Simulate subscription flow
    toast({
      title: "Redirecionando para o checkout...",
      description: `Processando assinatura do plano ${planId}`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="flex items-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Compartilhar</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(document.ementa, "ementa")}
                  className="flex items-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">Copiar ementa</span>
                </Button>
                <Button
                  size="sm" 
                  onClick={() => handleCopy(document.inteiro_teor, "inteiro_teor")}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">Copiar inteiro teor</span>
                </Button>
                <Button
                  size="sm"
                  onClick={() => window.open(`api/v1/jurisprudencias/pdf/${document.tipo || 'acordao'}/${document.id}/${document.arquivo || 'documento.pdf'}`, '_blank')}
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
              {document.titulo}
            </h1>
            
            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Building className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{document.tribunal}</p>
                      <p className="text-muted-foreground">{document.orgao_julgador}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Relator</p>
                      <p className="text-muted-foreground">{document.relator}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Data do Julgamento</p>
                      <p className="text-muted-foreground">{formatDate(document.data_julgamento)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <FileText className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Número do Processo</p>
                      <p className="text-muted-foreground">{document.numero_processo}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Scale className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Classe/Assunto</p>
                      <p className="text-muted-foreground">{document.classe_assunto}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {document.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                  <Tag className="w-3 h-3" />
                  <span>{tag}</span>
                </Badge>
              ))}
            </div>
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(document.ementa, "ementa")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground leading-relaxed whitespace-pre-line">
                      {document.ementa}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inteiro_teor" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Inteiro Teor</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(document.inteiro_teor, "inteiro_teor")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <div className="text-foreground leading-relaxed whitespace-pre-line">
                      {document.inteiro_teor}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="relacionados" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Citações Relacionadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {RELATED_CASES.map((case_item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex-1">
                          <p className="font-medium text-foreground mb-1">{case_item.titulo}</p>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="h-5">
                              {case_item.relevancia}% relevância
                            </Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="precedentes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Precedentes Semelhantes</CardTitle>
                </CardHeader>
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

          {/* Legal Disclaimer */}
          <div className="mt-12 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
              Este conteúdo é fornecido apenas para fins acadêmicos e profissionais. 
              O iJus não se responsabiliza pela accuracy ou completude das informações. 
              Sempre consulte as fontes oficiais para decisões jurídicas.
            </p>
          </div>
        </div>
      </div>

      {/* Paywall Modal */}
      <PaywallModal
        open={paywallOpen}
        onOpenChange={setPaywallOpen}
        documentTitle={document.titulo}
        onSubscribe={handleSubscribe}
      />
    </>
  );
};

export default DocumentDetail;