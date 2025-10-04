import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
    ementa: "O fornecedor de produtos ou serviços responde objetivamente pelos danos causados aos consumidores...",
    tribunal: "STJ",
    orgao_julgador: "3ª Turma",
    relator: "Min. Marco Aurélio Bellizze",
    data_julgamento: "2024-01-15",
    numero_processo: "REsp 1.234.567/SP",
    tags: ["Direito do Consumidor", "Responsabilidade Civil", "Danos Morais"],
    score: 0.95
  },
  // ... outros mocks
];

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const [searchTime, setSearchTime] = useState(0);
  const [dynamicFilters, setDynamicFilters] = useState<DynamicFilter[]>([]);
  
  const totalResults = results.length;

  // Efeito que dispara a busca quando os parâmetros da URL mudam
  useEffect(() => {
    const query = searchParams.get('q');
    const tribunal = searchParams.get('tribunal');
    const mode = searchParams.get('mode');
    
    if (query) {
      // Apenas atualiza o estado do campo de busca
      setSearchQuery(query);
      // E executa a busca
      performSearch(query, { tribunal: tribunal || undefined }, mode === 'contexto');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]); // Depende da string completa de parâmetros para re-buscar com filtros

  // Função que executa a busca
  const performSearch = async (query: string, searchFilters: SearchFilters = {}, useAdvancedQuery: boolean = false) => {
    setIsLoading(true);
    const startTime = Date.now();
    try {
      // Se useAdvancedQuery for true, a query já vem otimizada pelo AI
      const data = await searchEscavador(query, searchFilters, useAdvancedQuery);
      
      sessionStorage.setItem('searchResults', JSON.stringify(data.results));
      
      setResults(data.results);
      setDynamicFilters(data.filters);

    } catch (error) {
      console.error('Erro na busca:', error);
      const { toast } = await import('@/components/ui/use-toast');
      toast({
        title: "Erro na busca",
        description: error instanceof Error ? error.message : "Erro desconhecido na busca",
        variant: "destructive",
      });
      
      setResults([]); // Limpa resultados em caso de erro
    } finally {
      const endTime = Date.now();
      setSearchTime((endTime - startTime) / 1000);
      setIsLoading(false);
    }
  };

  // Handler para o formulário de busca
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('q', searchQuery.trim());
      // A busca será acionada pela mudança na URL via useEffect
      setSearchParams(newParams);
    }
  };

  // Handler para a mudança de filtros
  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    const newParams = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
    });
    // A busca será acionada pela mudança na URL via useEffect
    setSearchParams(newParams);
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
              {Object.keys(filters).filter(k => filters[k as keyof SearchFilters]).length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {Object.keys(filters).filter(k => filters[k as keyof SearchFilters]).length}
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
                    {totalResults} resultados em {searchTime.toFixed(2)}s
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
                  <div key={i} className="card-jurisprudence p-6 border rounded-xl">
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
                        onClick={() => setSearchParams({ q: "direito civil" })}
                      >
                        direito civil
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => setSearchParams({ q: "responsabilidade" })}
                      >
                        responsabilidade
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => setSearchParams({ q: "contrato" })}
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