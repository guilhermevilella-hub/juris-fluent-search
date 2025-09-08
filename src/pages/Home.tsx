import { useState, useEffect } from "react";
import { Search, TrendingUp, Building, Clock, ArrowRight, Sparkles, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import JurisprudenceCard from "@/components/JurisprudenceCard";

// Mock data for recent results and trending tribunals
const RECENT_RESULTS = [
  {
    id: "1",
    titulo: "Responsabilidade civil por danos morais em relações de consumo",
    ementa: "O fornecedor de produtos ou serviços responde objetivamente pelos danos causados aos consumidores, independentemente de culpa, conforme art. 14 do CDC...",
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
    ementa: "Para configuração da união estável é necessário a convivência pública, contínua e duradoura estabelecida com o objetivo de constituição de família...",
    tribunal: "STF",
    orgao_julgador: "2ª Turma",
    relator: "Min. Gilmar Mendes",
    data_julgamento: "2024-01-10",
    numero_processo: "RE 987.654/RJ",
    tags: ["Direito de Família", "União Estável", "Direitos Patrimoniais"],
    score: 0.87
  }
];

const TRENDING_TRIBUNALS = [
  { name: "STJ", count: 1234, trend: "+12%" },
  { name: "STF", count: 987, trend: "+8%" },
  { name: "TJ-SP", count: 2345, trend: "+15%" },
  { name: "TST", count: 876, trend: "+5%" }
];

const STATS = [
  { icon: Clock, label: "Busca em", value: "<1s", color: "text-accent-blue" },
  { icon: Building, label: "Tribunais", value: "50+", color: "text-primary" },
  { icon: Users, label: "Usuários ativos", value: "10k+", color: "text-success" },
  { icon: Shield, label: "Fontes oficiais", value: "100%", color: "text-warning" }
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative px-4 py-20 lg:py-32">
        <div className="container mx-auto max-w-6xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-accent-blue/10 text-accent-blue rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Jurisprudência inteligente</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight animate-slide-up">
            Jurisprudência em{' '}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              segundos
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up">
            Pesquise de graça. Copie com 1 assinatura.
          </p>

          {/* Hero Search */}
          <div className="max-w-2xl mx-auto mb-8 animate-scale-in">
            <form onSubmit={handleSearch} className="relative">
              <div className={`relative transition-all duration-300 ${
                isSearchFocused ? 'transform scale-105' : ''
              }`}>
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Busque por tema, tribunal, número do processo, palavras-chave..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="pl-12 pr-32 h-14 text-lg bg-background/80 backdrop-blur-sm border-2 border-input-border focus:border-accent-blue rounded-2xl shadow-lg"
                />
                <Button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-hero h-10"
                >
                  Buscar
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </form>
          </div>

          {/* CTA Secondary */}
          <Button
            variant="ghost"
            onClick={() => navigate('/como-funciona')}
            className="text-muted-foreground hover:text-primary mb-16"
          >
            Como funciona
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Results Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                Resultados recentes
              </h2>
              <p className="text-muted-foreground">
                Jurisprudências mais buscadas hoje
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/busca')}
              className="hidden md:flex"
            >
              Ver todas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {RECENT_RESULTS.map((result) => (
              <JurisprudenceCard key={result.id} {...result} />
            ))}
          </div>

          <div className="text-center md:hidden">
            <Button 
              variant="outline" 
              onClick={() => navigate('/busca')}
              className="w-full max-w-xs"
            >
              Ver todas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trending Tribunals Section */}
      <section className="px-4 py-16 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                Tribunais mais buscados
              </h2>
              <p className="text-muted-foreground">
                Onde os profissionais estão pesquisando
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRENDING_TRIBUNALS.map((tribunal, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <Badge variant="outline" className="text-success border-success/20">
                      {tribunal.trend}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {tribunal.count}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {tribunal.name}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/busca?tribunal=${tribunal.name}`)}
                    className="text-xs"
                  >
                    Explorar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;