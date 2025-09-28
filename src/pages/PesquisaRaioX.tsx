import { useState, useRef } from "react";
import { Upload, Shield, ArrowRight, Sparkles, AlertCircle, Target, TrendingDown, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const PesquisaRaioX = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Mock data para demonstração
  const mockAnalysis = {
    teses: [
      {
        id: 1,
        tese: "Ausência de nexo de causalidade entre o acidente e as lesões alegadas",
        status: "rejeitada",
        aceitacao: "15%", 
        contraArgumentos: [
          "STJ consolidou entendimento de que o nexo causal pode ser presumido em acidentes de trabalho (Súmula 629)",
          "Presunção relativa de nexo causal em acidentes in itinere"
        ]
      },
      {
        id: 2,
        tese: "Excludente de responsabilidade por culpa exclusiva da vítima",
        status: "minoritaria",
        aceitacao: "35%",
        contraArgumentos: [
          "Mesmo com culpa concorrente da vítima, persiste responsabilidade do empregador",
          "Ônus probatório da culpa exclusiva é do empregador (art. 818 CLT)"
        ]
      },
      {
        id: 3,
        tese: "Não caracterização de doença ocupacional por falta de nexo técnico",
        status: "aceita",
        aceitacao: "78%",
        contraArgumentos: [
          "Necessário laudo pericial conclusivo sobre nexo técnico",
          "NTEP cria presunção legal do nexo (Lei 11.430/2006)"
        ]
      }
    ]
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Apenas arquivos PDF, DOC e DOCX são aceitos.');
      return;
    }
    
    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB
      alert('Arquivo muito grande. Máximo de 10MB.');
      return;
    }
    
    setFile(selectedFile);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('mode', 'raiox');
      
      const { data, error } = await supabase.functions.invoke('analyze-document', {
        body: formData
      });
      
      if (error) throw error;
      
      // Para o Raio-X, mostrar análise mockada com os termos extraídos
      const analysisWithTerms = {
        ...mockAnalysis,
        extractedTerms: data.extractedTerms,
        fileName: file.name
      };
      
      setAnalysisResult(analysisWithTerms);
      
    } catch (error) {
      console.error('Erro na análise:', error);
      alert('Erro ao analisar o documento. Tente novamente.');
      setIsAnalyzing(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aceita': return 'bg-success/10 text-success border-success/20';
      case 'rejeitada': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'minoritaria': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aceita': return <CheckCircle className="w-4 h-4" />;
      case 'rejeitada': return <TrendingDown className="w-4 h-4" />;
      case 'minoritaria': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-destructive/10 text-destructive rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Análise estratégica defensiva</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Raio-X do Inimigo
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Envie a petição da parte contrária. Nossa IA identifica as teses apresentadas, mostra se são aceitas pela jurisprudência e sugere contra-argumentos com precedentes favoráveis.
          </p>
        </div>

        {/* Upload Area */}
        {!analysisResult && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Upload da petição adversária</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!file ? (
                <div
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
                    dragActive 
                      ? 'border-destructive bg-destructive/5' 
                      : 'border-border hover:border-destructive/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Arraste a petição adversária aqui
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    ou clique para selecionar arquivo
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    className="mb-4"
                  >
                    Selecionar arquivo
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Suporta PDF, DOC e DOCX até 10MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="border rounded-2xl p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-success" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{file.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {file.size < 1024 * 1024
                          ? `${(file.size / 1024).toFixed(2)} KB`
                          : `${(file.size / 1024 / 1024).toFixed(2)} MB`}
                      </p>
                    </div>
                    <Button variant="ghost" onClick={removeFile}>
                      Remover
                    </Button>
                  </div>
                </div>
              )}

              {file && (
                <div className="flex justify-center">
                  <Button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="btn-hero px-8 py-6 text-lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Rodando Raio-X...
                      </>
                    ) : (
                      <>
                        Rodar Raio-X
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">
                  Análise das Teses Adversárias
                </h2>
                <p className="text-muted-foreground">
                  {analysisResult.teses.length} teses identificadas na petição
                </p>
              </div>
              <Button variant="outline" onClick={removeFile}>
                Nova análise
              </Button>
            </div>

            <div className="space-y-4">
              {analysisResult.teses.map((item: any) => (
                <Card key={item.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{item.tese}</h3>
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className={getStatusColor(item.status)}>
                            {getStatusIcon(item.status)}
                            <span className="ml-1 capitalize">{item.status}</span>
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Aceitação: {item.aceitacao}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-medium mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Contra-argumentos sugeridos:
                      </h4>
                      <ul className="space-y-2">
                        {item.contraArgumentos.map((arg: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-primary font-medium">•</span>
                            <span className="text-sm">{arg}</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => navigate(`/busca?q=${encodeURIComponent(arg)}`)}
                              className="ml-auto text-xs"
                            >
                              Copiar jurisprudência
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Info Alert */}
        {!analysisResult && (
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Total confidencialidade:</strong> Os documentos enviados são analisados de forma segura e excluídos após o processamento. Nenhum dado é compartilhado.
            </AlertDescription>
          </Alert>
        )}

        {/* Info Cards */}
        {!analysisResult && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-2">Identifica teses</h3>
                <p className="text-sm text-muted-foreground">
                  Extrai argumentos e fundamentos principais
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Analisa viabilidade</h3>
                <p className="text-sm text-muted-foreground">
                  Classifica teses por aceitação jurisprudencial
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-success" />
                </div>
                <h3 className="font-semibold mb-2">Sugere defesa</h3>
                <p className="text-sm text-muted-foreground">
                  Precedentes para contra-argumentar
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PesquisaRaioX;