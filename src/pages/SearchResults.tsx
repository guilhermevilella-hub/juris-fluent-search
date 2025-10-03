import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, Filter, SlidersHorizontal, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonIjus } from "@/components/ui/button-ijus";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import JurisprudenceCard from "@/components/JurisprudenceCard";
import SearchFiltersComponent, { SearchFilters } from "@/components/SearchFilters";
import { searchEscavador, DynamicFilter } from "@/services/searchService";
import { useToast } from '@/components/ui/use-toast';

// Mock search results (mantido como fallback)
const MOCK_RESULTS = [
  {
    id: "1",
    titulo: "Responsabilidade civil por danos morais em relações de consumo",
    ementa: "O fornecedor de produtos ou serviços responde objetivamente pelos danos causados aos consumidores, independentemente de culpa, conforme art. 14 do CDC. A configuração do dano moral prescinde da demonstração de prejuízo econômico...",
    tribunal: "STJ",
    orgao_julgador: "3ª Turma",
    relator: "Min. Marco Aurélio Bellizze",
    data_julgamento: "2024-01-15",
    numero_processo: "REsp 1.234.567/SP",
    tags: ["Direito do Consumidor", "Responsabilidade Civil", "Danos Morais"],
    score: 0.95
  },
  {
    id: "2",
    titulo: "Configuração de união estável e direitos patrimoniais",
    ementa: "Para configuração da união estável é necessário a convivência pública, contínua e duradoura estabelecida com o objetivo de constituição de família. Os direitos patrimoniais decorrentes da união estável se equiparam aos do casamento...",
    tribunal: "STF",
    orgao_julgador: "2ª Turma",
    relator: "Min. Gilmar Mendes",
    data_julgamento: "2024-01-10",
    numero_processo: "RE 987.654/RJ",
    tags: ["Direito de Família", "União Estável", "Direitos Patrimoniais"],
    score: 0.87
  },
  {
    id: "3",
    titulo: "Aplicação da Lei Maria da Penha em casos de violência psicológica",
    ementa: "A Lei Maria da Penha se aplica a todas as formas de violência doméstica e familiar contra a mulher, incluindo a violência psicológica. Não é necessária a coabitação para configurar a violência doméstica...",
    tribunal: "TJ-SP",
    orgao_julgador: "4ª Câmara Criminal",
    relator: "Des. José Silva Santos",
    data_julgamento: "2024-01-08",
    numero_processo: "Apelação 5.432.109/SP",
    tags: ["Direito Penal", "Lei Maria da Penha", "Violência Doméstica"],
    score: 0.82
  },
  // Add more mock results...
];

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(MOCK_RESULTS);
  const [searchTime, setSearchTime] = useState(0.34);
  const [dynamicFilters, setDynamicFilters] = useState<DynamicFilter[]>([]);
  
  const totalResults = results.length;

  useEffect(() => {
    const query = searchParams.get('q');
    const tribunal = searchParams.get('tribunal');
    const mode = searchParams.get('mode');
    
    if (query) {
      setSearchQuery(query);
      performSearch(query, { tribunal: tribunal || undefined }, mode === 'contexto');
    }
  }, [searchParams]);

  const performSearch = async (query: string, searchFilters: SearchFilters = {}, useOnlySynonyms: boolean = false) => {
    setIsLoading(true);
    const startTime = Date.now();

    try {
      // Chame a nova função que já inclui a geração de sinônimos e a chamada à API do Escavador
      const data = await searchEscavador(query, searchFilters, useOnlySynonyms);
      
      // Se estamos em modo contexto e sinônimos foram usados, atualizar a URL
      if (useOnlySynonyms && data.synonymsUsed && data.synonymsUsed.length > 0) {
        const synonymsQuery = data.synonymsUsed.join(' OR ');
        const newParams = new URLSearchParams(searchParams);
        newParams.set('q', synonymsQuery);
        setSearchParams(newParams, { replace: true });
        setSearchQuery(synonymsQuery);
      }
      
      // Salvar resultados no sessionStorage para uso posterior
      sessionStorage.setItem('searchResults', JSON.stringify(data.results));
      
      setResults(data.results);
      setDynamicFilters(data.filters);
    } catch (error) {
      console.error('Erro na busca:', error);
      
      // Show error toast
      const { toast } = await import('@/components/ui/use-toast');
      toast({
        title: "Erro na busca",
        description: error instanceof Error ? error.message : "Erro desconhecido na busca",
        variant: "destructive",
      });
      
      // Fallback para dados mock em caso de erro
      let filteredResults = [...MOCK_RESULTS];
      
      if (searchFilters.tribunal) {
        filteredResults = filteredResults.filter(result => 
          result.tribunal.toLowerCase().includes(searchFilters.tribunal!.toLowerCase())
        );
      }
      
      setResults(filteredResults);
    } finally {
      const endTime = Date.now();
      setSearchTime((endTime - startTime) / 1000);
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('q', searchQuery.trim());
      setSearchParams(newParams);
      performSearch(searchQuery.trim(), filters);
    }
  };

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    const mode = searchParams.get('mode');
    performSearch(searchQuery, newFilters, mode === 'contexto');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <form onSubmit={handleSearch} className="flex items-center space-x-4">
            <div className="flex-1 relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Busque por tema, tribunal, número..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 search-input"
              />
            </div>
            <Button type="submit" className="btn-hero">
              Buscar
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center space-x-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filtros</span>
              {Object.values(filters).filter(Boolean).length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {Object.values(filters).filter(Boolean).length}
                </Badge>
              )}
            </Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <SearchFiltersComponent
                filters={filters}
                onFiltersChange={handleFiltersChange}
                isOpen={filtersOpen}
                onToggle={() => setFiltersOpen(!filtersOpen)}
                dynamicFilters={dynamicFilters}
              />
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {totalResults} resultados em {searchTime}s
                  </span>
                </div>
                {searchQuery && (
                  <div>
                    para: <span className="text-foreground font-medium">"{searchQuery}"</span>
                  </div>
                )}
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="card-jurisprudence">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="flex space-x-2 mb-4">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-8 w-full" />
                  </div>
                ))}
              </div>
            )}

            {/* Results List */}
            {!isLoading && results.length > 0 && (
              <div className="space-y-6">
                {results.map((result, index) => (
                  <div 
                    key={result.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <JurisprudenceCard {...result} searchQuery={searchQuery} />
                    {/* Progress feedback every 5 results */}
                    {(index + 1) % 5 === 0 && index < results.length - 1 && (
                      <div className="text-center py-4 my-6 border-y border-border/50 bg-muted/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Você já viu <span className="font-semibold text-foreground">{index + 1}</span> jurisprudências relevantes.
                          {results.length - index - 1 > 0 && (
                            <span> Continue, mais <span className="font-semibold text-primary">{Math.min(3, results.length - index - 1)}</span> podem surpreender você.</span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Load More / Pagination */}
                <div className="text-center pt-8">
                  <ButtonIjus className="min-w-48 group">
                    Carregar mais resultados
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </ButtonIjus>
                </div>
              </div>
            )}

            {/* No Results */}
            {!isLoading && results.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Nenhum resultado encontrado
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Não encontramos nada com os termos "{searchQuery}". 
                    Tente sinônimos ou refine seus filtros.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Sugestões:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => setSearchQuery("direito civil")}
                      >
                        direito civil
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => setSearchQuery("responsabilidade")}
                      >
                        responsabilidade
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => setSearchQuery("contrato")}
                      >
                        contrato
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;