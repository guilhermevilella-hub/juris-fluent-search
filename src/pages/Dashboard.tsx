import { useState, useEffect } from "react";
import { 
  User, 
  Settings, 
  CreditCard, 
  FileText, 
  Clock,
  Copy,
  Eye,
  Download,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  ExternalLink,
  Award,
  Target,
  BarChart3,
  Trophy,
  Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useGamification } from "@/contexts/GamificationContext";
import { XPBar } from "@/components/gamification/XPBar";
import { BadgeCard } from "@/components/gamification/BadgeCard";
import { MissionsWidget } from "@/components/gamification/MissionsWidget";
import { StatsCard } from "@/components/gamification/StatsCard";
import { GamificationTab } from "./Dashboard-gamification-tab";

// Mock user data
const MOCK_USER = {
  name: "João Silva",
  email: "joao.silva@email.com",
  plan: "Pro",
  status: "active",
  renewsAt: "2024-02-15",
  copiesUsed: 47,
  copiesLimit: 200,
  memberSince: "2023-08-15"
};

const MOCK_SEARCH_HISTORY = [
  {
    id: 1,
    query: "responsabilidade civil danos morais",
    date: "2024-01-15T14:30:00Z",
    resultsCount: 234,
    tribunal: "STJ"
  },
  {
    id: 2,
    query: "união estável direitos patrimoniais",
    date: "2024-01-15T10:15:00Z",
    resultsCount: 156,
    tribunal: "STF"
  },
  {
    id: 3,
    query: "Lei Maria da Penha violência psicológica",
    date: "2024-01-14T16:45:00Z",
    resultsCount: 89,
    tribunal: "TJ-SP"
  }
];

const MOCK_DOCUMENT_HISTORY = [
  {
    id: "1",
    title: "Responsabilidade civil por danos morais em relações de consumo",
    tribunal: "STJ",
    openedAt: "2024-01-15T14:35:00Z",
    copied: true
  },
  {
    id: "2", 
    title: "Configuração de união estável e direitos patrimoniais",
    tribunal: "STF",
    openedAt: "2024-01-15T10:20:00Z",
    copied: false
  },
  {
    id: "3",
    title: "Aplicação da Lei Maria da Penha em casos de violência psicológica",
    tribunal: "TJ-SP", 
    openedAt: "2024-01-14T16:50:00Z",
    copied: true
  }
];

const MOCK_INVOICES = [
  {
    id: "inv_001",
    date: "2024-01-15",
    amount: 59.00,
    status: "paid",
    plan: "Pro"
  },
  {
    id: "inv_002",
    date: "2023-12-15", 
    amount: 59.00,
    status: "paid",
    plan: "Pro"
  },
  {
    id: "inv_003",
    date: "2023-11-15",
    amount: 29.00,
    status: "paid", 
    plan: "Start"
  }
];

const Dashboard = () => {
  const [user, setUser] = useState(MOCK_USER);
  const [activeTab, setActiveTab] = useState("gamification");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { badges, stats, addXP } = useGamification();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getCopiesPercentage = () => {
    return (user.copiesUsed / user.copiesLimit) * 100;
  };

  const handleManageSubscription = () => {
    toast({
      title: "Redirecionando...",
      description: "Abrindo portal de gerenciamento da assinatura.",
    });
    // TODO: Integrate with Stripe Customer Portal
  };

  const handleUpgradePlan = () => {
    navigate('/planos');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header with XP Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Minha conta</h1>
            <p className="text-muted-foreground">
              Progresso, conquistas e configurações
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="lg:min-w-[300px]">
              <XPBar showDetails={true} />
            </div>
            
            <div className="text-right">
              <Badge 
                className={`${
                  user.status === 'active' 
                    ? 'bg-success/10 text-success border-success/20' 
                    : 'bg-warning/10 text-warning border-warning/20'
                }`}
              >
                {user.status === 'active' ? 'Assinatura Ativa' : 'Pendente'}
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">
                Plano {user.plan}
              </p>
            </div>
          </div>
        </div>

        {/* Gamification Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={Search}
            title="Buscas realizadas"
            value={stats.totalSearches}
            subtitle="este mês"
            trend={{ value: "+12%", isPositive: true }}
          />
          
          <StatsCard
            icon={FileText}
            title="Documentos abertos"
            value={stats.totalDocumentsOpened}
            subtitle="total"
            trend={{ value: "+8", isPositive: true }}
          />
          
          <StatsCard
            icon={Copy}
            title="Tempo economizado"
            value={`${Math.floor(stats.timeSavedMinutes / 60)}h${stats.timeSavedMinutes % 60}m`}
            subtitle="este mês"
          />
          
          <StatsCard
            icon={TrendingUp}
            title="Relevância média"
            value={`${stats.averageRelevance}%`}
            subtitle="nas buscas"
            trend={{ value: "Excelente!", isPositive: true }}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="gamification">
              <Trophy className="w-4 h-4 mr-2" />
              Progresso
            </TabsTrigger>
            <TabsTrigger value="subscription">Assinatura</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="preferences">Preferências</TabsTrigger>
            <TabsTrigger value="billing">Faturamento</TabsTrigger>
          </TabsList>

          {/* Gamification Tab */}
          <TabsContent value="gamification">
            <GamificationTab />
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Status da Assinatura</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm text-muted-foreground">Plano atual</Label>
                    <p className="text-lg font-semibold text-primary">{user.plan}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Próximo vencimento</Label>
                    <p className="text-lg font-semibold text-primary">
                      {formatDate(user.renewsAt)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Status</Label>
                    <Badge className="bg-success/10 text-success border-success/20 mt-1">
                      Ativa
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Cópias restantes</Label>
                    <p className="text-lg font-semibold text-primary">
                      {user.copiesLimit - user.copiesUsed}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleManageSubscription}
                    className="btn-primary"
                  >
                    Gerenciar assinatura
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleUpgradePlan}
                  >
                    Alterar plano
                  </Button>
                  <Button 
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                  >
                    Cancelar assinatura
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Search History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span>Buscas recentes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {MOCK_SEARCH_HISTORY.map((search) => (
                      <div key={search.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm mb-1">
                            "{search.query}"
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>{formatDateTime(search.date)}</span>
                            <span>•</span>
                            <span>{search.resultsCount} resultados</span>
                            <Badge variant="outline" className="h-4 text-xs">
                              {search.tribunal}
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/busca?q=${encodeURIComponent(search.query)}`)}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Document History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Documentos acessados</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {MOCK_DOCUMENT_HISTORY.map((doc) => (
                      <div key={doc.id} className="flex items-start justify-between p-3 border border-border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm mb-1 line-clamp-2">
                            {doc.title}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>{formatDateTime(doc.openedAt)}</span>
                            <span>•</span>
                            <Badge variant="outline" className="h-4 text-xs">
                              {doc.tribunal}
                            </Badge>
                            {doc.copied && (
                              <Badge className="h-4 text-xs bg-accent-blue/10 text-accent-blue border-accent-blue/20">
                                Copiado
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/documento/${doc.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Informações pessoais</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input id="name" value={user.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" value={user.email} />
                  </div>
                </div>
                <Button className="btn-primary">
                  Salvar alterações
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Preferências</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Notificações por email</p>
                      <p className="text-sm text-muted-foreground">
                        Receba atualizações sobre sua conta
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Alterar senha</p>
                      <p className="text-sm text-muted-foreground">
                        Atualize sua senha de acesso
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Alterar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Histórico de faturas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_INVOICES.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-success" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            Plano {invoice.plan}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(invoice.date)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            {formatPrice(invoice.amount)}
                          </p>
                          <Badge className="bg-success/10 text-success border-success/20">
                            Pago
                          </Badge>
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;