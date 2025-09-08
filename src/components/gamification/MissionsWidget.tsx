import { useState } from 'react';
import { useGamification } from '@/contexts/GamificationContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MissionCard } from './MissionCard';
import { Target, ChevronUp, ChevronDown, Trophy } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export function MissionsWidget() {
  const { missions, completeMission } = useGamification();
  const [isOpen, setIsOpen] = useState(true);

  const dailyMissions = missions.filter(m => m.type === 'daily');
  const weeklyMissions = missions.filter(m => m.type === 'weekly');
  
  const completedDaily = dailyMissions.filter(m => m.completed).length;
  const completedWeekly = weeklyMissions.filter(m => m.completed).length;
  
  const readyMissions = missions.filter(m => m.progress >= m.target && !m.completed);

  const handleClaimMission = (missionId: string) => {
    completeMission(missionId);
  };

  return (
    <Card className="w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Missões</CardTitle>
                {readyMissions.length > 0 && (
                  <Badge className="bg-success text-success-foreground animate-pulse">
                    {readyMissions.length} pronta{readyMissions.length > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {completedDaily}/{dailyMissions.length} diárias
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {completedWeekly}/{weeklyMissions.length} semanais
                </Badge>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {readyMissions.length > 0 && (
              <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">
                    Missão{readyMissions.length > 1 ? 'ões' : ''} cumprida{readyMissions.length > 1 ? 's' : ''}!
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Clique em "Resgatar" para receber sua recompensa em XP.
                </p>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <span>Missões Diárias</span>
                  <Badge variant="outline" className="h-5 text-xs">
                    Reseta às 00:00
                  </Badge>
                </h4>
                <div className="space-y-2">
                  {dailyMissions.map((mission) => (
                    <MissionCard 
                      key={mission.id} 
                      mission={mission}
                      onClaim={handleClaimMission}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <span>Missões Semanais</span>
                  <Badge variant="outline" className="h-5 text-xs">
                    Seg → Dom
                  </Badge>
                </h4>
                <div className="space-y-2">
                  {weeklyMissions.map((mission) => (
                    <MissionCard 
                      key={mission.id} 
                      mission={mission}
                      onClaim={handleClaimMission}
                    />
                  ))}
                </div>
              </div>

              {completedDaily === dailyMissions.length && dailyMissions.length > 0 && (
                <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-transparent rounded-lg border border-primary/20">
                  <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-primary">
                    Todas as missões diárias completas!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Volte amanhã para mais desafios.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}