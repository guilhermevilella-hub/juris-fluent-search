import * as React from "react";
import { 
  FileText, 
  Bell, 
  Activity, 
  Calendar, 
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { StatCard, ActivityCard, CardClean, CardCleanHeader, CardCleanTitle, CardCleanContent } from "@/components/ui/card-clean";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data
const MOCK_STATS = [
  {
    icon: FileText,
    title: "Processos Ativos",
    value: 127,
    subtitle: "+3 este mês"
  },
  {
    icon: Bell,
    title: "Intimações Novas",
    value: 8,
    subtitle: "últimas 24h"
  },
  {
    icon: Activity,
    title: "Movimentações",
    value: 23,
    subtitle: "esta semana"
  },
  {
    icon: Clock,
    title: "Prazos Hoje",
    value: 4,
    subtitle: "vencendo"
  }
];

const MOCK_ACTIVITIES = [
  {
    id: 1,
    icon: Bell,
    title: "Nova intimação recebida - Audiência de conciliação",
    process: "5001234-56.2024.8.26.0001",
    tribunal: "TJ-SP",
    datetime: "Há 2 horas",
    status: "new" as const
  },
  {
    id: 2,
    icon: Activity,
    title: "Movimentação processual - Despacho do juiz",
    process: "0001234-56.2024.5.02.0001",
    tribunal: "TRT-2",
    datetime: "Há 4 horas",
    status: "read" as const
  },
  {
    id: 3,
    icon: FileText,
    title: "Juntada de documento - Contestação",
    process: "5007890-12.2024.8.26.0100",
    tribunal: "TJ-SP",
    datetime: "Há 6 horas",
    status: "read" as const
  },
  {
    id: 4,
    icon: Calendar,
    title: "Prazo para manifestação sobre perícia",
    process: "1001234-56.2024.4.03.6100",
    tribunal: "TRF-3",
    datetime: "Ontem",
    status: "read" as const
  },
  {
    id: 5,
    icon: AlertCircle,
    title: "Prazo vencendo em 2 dias - Recurso",
    process: "5001234-56.2024.8.26.0224",
    tribunal: "TJ-SP",
    datetime: "Há 1 dia",
    status: "new" as const
  }
];

const MOCK_DEADLINES = [
  {
    id: 1,
    title: "Contestação - Ação de cobrança",
    process: "5001234-56.2024.8.26.0001",
    deadline: "Hoje",
    priority: "high" as const
  },
  {
    id: 2,
    title: "Recurso de apelação",
    process: "1001234-56.2024.4.03.6100",
    deadline: "Amanhã",
    priority: "high" as const
  },
  {
    id: 3,
    title: "Manifestação sobre perícia",
    process: "5007890-12.2024.8.26.0100",
    deadline: "Em 3 dias",
    priority: "medium" as const
  },
  {
    id: 4,
    title: "Alegações finais",
    process: "0001234-56.2024.5.02.0001",
    deadline: "Em 5 dias",
    priority: "low" as const
  }
];

export const DashboardClean = () => {
  const handleActivityClick = (activityId: number) => {
    console.log("Opening activity:", activityId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "low":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Boa tarde, João!</h1>
        <p className="text-muted-foreground">
          Aqui está um resumo das suas atividades jurídicas de hoje.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_STATS.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <CardClean>
            <CardCleanHeader>
              <CardCleanTitle icon={Activity}>
                Atividades Recentes
              </CardCleanTitle>
            </CardCleanHeader>
            <CardCleanContent className="space-y-3">
              {MOCK_ACTIVITIES.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  icon={activity.icon}
                  title={activity.title}
                  process={activity.process}
                  tribunal={activity.tribunal}
                  datetime={activity.datetime}
                  status={activity.status}
                  onAction={() => handleActivityClick(activity.id)}
                />
              ))}
              
              <div className="pt-4 border-t border-border">
                <Button variant="outline" className="w-full">
                  Ver todas as atividades
                </Button>
              </div>
            </CardCleanContent>
          </CardClean>
        </div>

        {/* Prazos */}
        <div>
          <CardClean>
            <CardCleanHeader>
              <CardCleanTitle icon={Clock}>
                Prazos Próximos
              </CardCleanTitle>
            </CardCleanHeader>
            <CardCleanContent className="space-y-4">
              {MOCK_DEADLINES.map((deadline) => (
                <div
                  key={deadline.id}
                  className="p-3 rounded-lg border border-border hover:border-primary/20 transition-colors cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-foreground line-clamp-2">
                        {deadline.title}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className={getPriorityColor(deadline.priority)}
                      >
                        {deadline.deadline}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {deadline.process}
                    </p>
                  </div>
                </div>
              ))}
              
              <div className="pt-2 border-t border-border">
                <Button variant="outline" size="sm" className="w-full">
                  Ver agenda completa
                </Button>
              </div>
            </CardCleanContent>
          </CardClean>
        </div>
      </div>

      {/* Quick Actions */}
      <CardClean>
        <CardCleanHeader>
          <CardCleanTitle>
            Ações Rápidas
          </CardCleanTitle>
        </CardCleanHeader>
        <CardCleanContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center gap-2">
              <FileText className="w-6 h-6" />
              <span className="text-sm">Novo Processo</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Bell className="w-6 h-6" />
              <span className="text-sm">Ver Intimações</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Calendar className="w-6 h-6" />
              <span className="text-sm">Abrir Agenda</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">Relatórios</span>
            </Button>
          </div>
        </CardCleanContent>
      </CardClean>
    </div>
  );
};