import { useState } from "react";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { generateSynonyms } from "@/services/searchService"; // Importe a função

const PesquisaContexto = () => {
  const [contexto, setContexto] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!contexto.trim()) return;
    
    setIsAnalyzing(true);
    try {
      // 1. Gera os sinônimos a partir do texto de contexto
      const synonyms = await generateSynonyms(contexto.trim());
      
      let searchTerms = contexto.trim();
      if (synonyms.length > 0) {
        // 2. Cria a string de busca final com os sinônimos
        searchTerms = synonyms.join(' OR ');
      }
      
      // 3. Navega para a página de busca com os termos prontos, sem o "mode=contexto"
      navigate(`/busca?q=${encodeURIComponent(searchTerms)}`);

    } catch (error) {
      console.error("Erro ao gerar sinônimos na pesquisa por contexto:", error);
      // Em caso de erro, busca pelo texto original
      navigate(`/busca?q=${encodeURIComponent(contexto.trim())}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent-blue/10 text-accent-blue rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Busca inteligente por contexto</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Pesquisa por Contexto
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descreva seu caso em linguagem natural. Nossa IA encontrará jurisprudências relevantes baseadas no contexto e nos fatos apresentados.
          </p>
        </div>

        {/* Main Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Descreva seu caso</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Textarea
                placeholder="Exemplo: Meu cliente foi demitido por justa causa alegando abandono de emprego, mas ele estava em licença médica devidamente comunicada ao RH. A empresa não aceitou o atestado médico emitido pelo SUS e considerou as faltas como abandono. Preciso de jurisprudências que reconheçam a invalidade da demissão por justa causa nestes casos..."
                value={contexto}
                onChange={(e) => setContexto(e.target.value)}
                className="min-h-[200px] text-base resize-none"
                maxLength={2000}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-muted-foreground">
                  Descreva os fatos, as questões jurídicas e o que você está buscando
                </p>
                <span className="text-sm text-muted-foreground">
                  {contexto.length}/2000
                </span>
              </div>
            </div>

            <div className="flex justify-center">
               <Button 
                onClick={handleAnalyze}
                disabled={!contexto.trim() || isAnalyzing}
                className="btn-ijus px-8 py-6 text-lg group"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analisando contexto...
                  </>
                ) : (
                  <>
                    Buscar com IA
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-accent-blue" />
              </div>
              <h3 className="font-semibold mb-2">Análise semântica</h3>
              <p className="text-sm text-muted-foreground">
                Compreende o significado e contexto do seu caso
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">IA especializada</h3>
              <p className="text-sm text-muted-foreground">
                Treinada em milhões de decisões judiciais
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold mb-2">Resultados precisos</h3>
              <p className="text-sm text-muted-foreground">
                Jurisprudências ordenadas por relevância
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PesquisaContexto;