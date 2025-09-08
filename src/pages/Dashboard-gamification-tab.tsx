import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGamification } from "@/contexts/GamificationContext";
import { BadgeCard } from "@/components/gamification/BadgeCard";
import { MissionsWidget } from "@/components/gamification/MissionsWidget";
import { StatsCard } from "@/components/gamification/StatsCard";
import { 
  Award, 
  Target, 
  BarChart3, 
  Trophy, 
  Zap,
  Share2,
  Calendar,
  Flame,
  Map,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function GamificationTab() {
  const { badges, stats, level, xp } = useGamification();
  const { toast } = useToast();

  const handleShareBadge = (badge: any) => {
    toast({
      title: "Badge compartilhado!",
      description: `Você compartilhou a conquista "${badge.name}"`,
      duration: 3000,
    });
  };

  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);

  return (
    <div className="space-y-8">
      {/* Level and Progress Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Resumo do Progresso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-primary">{xp}</p>
                <p className="text-sm text-muted-foreground">XP Total</p>
              </div>
              
              <div className="text-center p-4 bg-success/5 rounded-lg">
                <Award className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="text-2xl font-bold text-success">{earnedBadges.length}</p>
                <p className="text-sm text-muted-foreground">Conquistas</p>
              </div>
              
              <div className="text-center p-4 bg-warning/5 rounded-lg">
                <Flame className="w-8 h-8 text-warning mx-auto mb-2" />
                <p className="text-2xl font-bold text-warning">{stats.streak}</p>
                <p className="text-sm text-muted-foreground">Sequência</p>
              </div>
              
              <div className="text-center p-4 bg-accent-blue/5 rounded-lg">
                <Map className="w-8 h-8 text-accent-blue mx-auto mb-2" />
                <p className="text-2xl font-bold text-accent-blue">{stats.areasExplored.length}</p>
                <p className="text-sm text-muted-foreground">Áreas</p>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Tempo economizado</p>
                <p className="text-lg font-semibold text-primary">
                  {Math.floor(stats.timeSavedMinutes / 60)}h{stats.timeSavedMinutes % 60}min
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Relevância média</p>
                <p className="text-lg font-semibold text-primary">{stats.averageRelevance}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Áreas exploradas</p>
                <div className="flex flex-wrap gap-1 justify-center mt-1">
                  {stats.areasExplored.map((area, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Missions Widget */}
        <MissionsWidget />
      </div>

      {/* Badges Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Award className="w-5 h-5" />
            Conquistas
          </h2>
          <Badge variant="outline" className="text-sm">
            {earnedBadges.length} de {badges.length} desbloqueadas
          </Badge>
        </div>

        {earnedBadges.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-success" />
              Desbloqueadas ({earnedBadges.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnedBadges.map((badge) => (
                <BadgeCard 
                  key={badge.id} 
                  badge={badge} 
                  onShare={handleShareBadge}
                />
              ))}
            </div>
          </div>
        )}

        {lockedBadges.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-muted-foreground mb-4 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Bloqueadas ({lockedBadges.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lockedBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Statistics Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Estatísticas Detalhadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Buscas realizadas</p>
              <p className="text-xl font-bold text-primary">{stats.totalSearches}</p>
              <p className="text-xs text-success">+5 esta semana</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Documentos copiados</p>
              <p className="text-xl font-bold text-primary">{stats.totalCopies}</p>
              <p className="text-xs text-success">+3 esta semana</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Compartilhamentos</p>
              <p className="text-xl font-bold text-primary">{stats.totalShares}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Documentos abertos</p>
              <p className="text-xl font-bold text-primary">{stats.totalDocumentsOpened}</p>
              <p className="text-xs text-success">+7 esta semana</p>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="text-center">
            <Button variant="outline" className="mr-3">
              <Calendar className="w-4 h-4 mr-2" />
              Gerar resumo semanal
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar progresso
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}