import { useState } from "react";
import { Filter, X, Calendar, Building, User, Scale, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DynamicFilter } from "@/services/searchService";

export interface SearchFilters {
  tribunal?: string;
  ano?: string;
  orgao_julgador?: string;
  relator?: string;
  tema?: string;
  palavra_exata?: string;
  data_inicio?: string;
  data_fim?: string;
  tipo_decisao?: string;
}

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  isOpen: boolean;
  onToggle: () => void;
  dynamicFilters?: DynamicFilter[];
}

const TRIBUNALS = [
  "STF - Supremo Tribunal Federal",
  "STJ - Superior Tribunal de Justiça", 
  "TST - Tribunal Superior do Trabalho",
  "TJ-SP - Tribunal de Justiça de São Paulo",
  "TJ-RJ - Tribunal de Justiça do Rio de Janeiro",
  "TJ-MG - Tribunal de Justiça de Minas Gerais",
  "TRF-1 - Tribunal Regional Federal da 1ª Região",
  "TRF-2 - Tribunal Regional Federal da 2ª Região",
  "TRF-3 - Tribunal Regional Federal da 3ª Região"
];

const DECISION_TYPES = [
  "Acórdão",
  "Decisão Monocrática", 
  "Ementa",
  "Despacho",
  "Sentença"
];

const THEMES = [
  "Direito Civil",
  "Direito Penal", 
  "Direito Administrativo",
  "Direito Tributário",
  "Direito Trabalhista",
  "Direito Constitucional",
  "Direito Comercial",
  "Direito do Consumidor"
];

const SearchFiltersComponent = ({ filters, onFiltersChange, isOpen, onToggle, dynamicFilters = [] }: SearchFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  const updateFilter = (key: keyof SearchFilters, value: string | undefined) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilter = (key: keyof SearchFilters) => {
    updateFilter(key, undefined);
  };

  const clearAllFilters = () => {
    const emptyFilters: SearchFilters = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(localFilters).filter(Boolean).length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-card border border-border rounded-xl">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors rounded-t-xl">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-primary" />
            <span className="font-medium text-foreground">Filtros</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2 h-5">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  clearAllFilters();
                }}
                className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                Limpar todos
              </Button>
            )}
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="px-4 pb-4">
          <Separator className="mb-4" />
          
          <div className="space-y-6">
            {/* Dynamic Filters from API */}
            {dynamicFilters.map((dynamicFilter) => (
              <div key={dynamicFilter.filtro} className="space-y-2">
                <Label className="text-sm font-medium flex items-center space-x-2">
                  <Building className="w-4 h-4 text-primary" />
                  <span>{dynamicFilter.titulo}</span>
                </Label>
                <Select 
                  value={localFilters[dynamicFilter.filtro as keyof SearchFilters] || ""} 
                  onValueChange={(value) => updateFilter(dynamicFilter.filtro as keyof SearchFilters, value || undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Selecione ${dynamicFilter.titulo.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {dynamicFilter.opcoes.map((option) => (
                      <SelectItem key={option.valor} value={option.valor}>
                        <div className="flex justify-between items-center w-full">
                          <span>{option.titulo}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {option.quantidade_correspondencias}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}

            {/* Static Filters */}
            {dynamicFilters.length === 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center space-x-2">
                  <Building className="w-4 h-4 text-primary" />
                  <span>Tribunal</span>
                </Label>
                <Select 
                  value={localFilters.tribunal || ""} 
                  onValueChange={(value) => updateFilter('tribunal', value || undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tribunal" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRIBUNALS.map((tribunal) => (
                      <SelectItem key={tribunal} value={tribunal}>
                        {tribunal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Date Range */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Período do Julgamento</span>
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="data-inicio" className="text-xs text-muted-foreground">
                    Data início
                  </Label>
                  <Input
                    id="data-inicio"
                    type="date"
                    value={localFilters.data_inicio || ""}
                    onChange={(e) => updateFilter('data_inicio', e.target.value || undefined)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="data-fim" className="text-xs text-muted-foreground">
                    Data fim
                  </Label>
                  <Input
                    id="data-fim"
                    type="date"
                    value={localFilters.data_fim || ""}
                    onChange={(e) => updateFilter('data_fim', e.target.value || undefined)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Theme/Subject */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center space-x-2">
                <Scale className="w-4 h-4 text-primary" />
                <span>Área do Direito</span>
              </Label>
              <Select 
                value={localFilters.tema || ""} 
                onValueChange={(value) => updateFilter('tema', value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma área" />
                </SelectTrigger>
                <SelectContent>
                  {THEMES.map((theme) => (
                    <SelectItem key={theme} value={theme}>
                      {theme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Decision Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center space-x-2">
                <FileText className="w-4 h-4 text-primary" />
                <span>Tipo de Decisão</span>
              </Label>
              <Select 
                value={localFilters.tipo_decisao || ""} 
                onValueChange={(value) => updateFilter('tipo_decisao', value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {DECISION_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rapporteur */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center space-x-2">
                <User className="w-4 h-4 text-primary" />
                <span>Relator</span>
              </Label>
              <Input
                placeholder="Nome do relator"
                value={localFilters.relator || ""}
                onChange={(e) => updateFilter('relator', e.target.value || undefined)}
              />
            </div>

            {/* Exact Words */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Palavra/frase exata
              </Label>
              <Input
                placeholder="Digite entre aspas: 'contrato de trabalho'"
                value={localFilters.palavra_exata || ""}
                onChange={(e) => updateFilter('palavra_exata', e.target.value || undefined)}
              />
              <p className="text-xs text-muted-foreground">
                Use aspas para buscar a frase exata
              </p>
            </div>

            {/* Year */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Ano</span>
              </Label>
              <Select 
                value={localFilters.ano || ""} 
                onValueChange={(value) => updateFilter('ano', value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o ano" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {Object.entries(localFilters).map(([key, value]) => 
                  value ? (
                    <Badge key={key} variant="secondary" className="flex items-center space-x-1">
                      <span className="text-xs">{value}</span>
                      <button
                        onClick={() => clearFilter(key as keyof SearchFilters)}
                        className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ) : null
                )}
              </div>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SearchFiltersComponent;