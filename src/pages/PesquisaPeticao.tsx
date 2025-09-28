import { useState, useRef } from "react";
import { Upload, FileText, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const PesquisaPeticao = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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
      formData.append('mode', 'peticao');
      
      const { data, error } = await supabase.functions.invoke('analyze-document', {
        body: formData
      });
      
      if (error) throw error;
      
      // Redirecionar para resultados com os termos extraídos pela IA
      const searchTerms = data.extractedTerms || file.name;
      navigate(`/busca?q=${encodeURIComponent(searchTerms)}&mode=peticao`);
      
    } catch (error) {
      console.error('Erro na análise:', error);
      alert('Erro ao analisar o documento. Tente novamente.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent-blue/10 text-accent-blue rounded-full px-4 py-2 mb-6">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Análise inteligente de petição</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Pesquisa por Petição
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Faça upload da sua petição inicial ou contestação. Nossa IA identificará os principais argumentos e encontrará jurisprudências compatíveis.
          </p>
        </div>

        {/* Upload Area */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload da petição</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!file ? (
              <div
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
                  dragActive 
                    ? 'border-accent-blue bg-accent-blue/5' 
                    : 'border-border hover:border-accent-blue/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-accent-blue" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Arraste sua petição aqui
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
                    <FileText className="w-6 h-6 text-success" />
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
                      Analisando petição...
                    </>
                  ) : (
                    <>
                      Analisar petição
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Alert */}
        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Privacidade garantida:</strong> Seus documentos são processados de forma segura e não são armazenados em nossos servidores após a análise.
          </AlertDescription>
        </Alert>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-accent-blue" />
              </div>
              <h3 className="font-semibold mb-2">Extração inteligente</h3>
              <p className="text-sm text-muted-foreground">
                Identifica argumentos e teses principais
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Busca contextual</h3>
              <p className="text-sm text-muted-foreground">
                Encontra precedentes para cada argumento
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold mb-2">Resultados organizados</h3>
              <p className="text-sm text-muted-foreground">
                Jurisprudências agrupadas por tema
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PesquisaPeticao;