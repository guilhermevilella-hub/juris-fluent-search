import { Mission } from '@/types/gamification';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ButtonIjus } from '@/components/ui/button-ijus';
import { Check, Gift } from 'lucide-react';

interface MissionCardProps {
  mission: Mission;
  onClaim?: (missionId: string) => void;
}

export function MissionCard({ mission, onClaim }: MissionCardProps) {
  const progressPercentage = (mission.progress / mission.target) * 100;
  const isReady = mission.progress >= mission.target && !mission.completed;

  return (
    <Card className={`transition-all duration-200 ${
      mission.completed 
        ? 'border-success/20 bg-success/5' 
        : isReady
        ? 'border-primary/30 bg-primary/5 shadow-md animate-pulse'
        : 'border-border hover:shadow-sm'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="text-xl">
              {mission.completed ? (
                <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
              ) : (
                mission.icon
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-semibold text-sm ${
                  mission.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                }`}>
                  {mission.name}
                </h3>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    mission.type === 'daily' 
                      ? 'bg-accent-blue/10 text-accent-blue border-accent-blue/20'
                      : 'bg-purple-500/10 text-purple-700 border-purple-500/20'
                  }`}
                >
                  {mission.type === 'daily' ? 'Diária' : 'Semanal'}
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2">
                {mission.description}
              </p>

              <div className="flex items-center gap-2 mb-2">
                <Progress 
                  value={progressPercentage} 
                  className="h-2 flex-1" 
                />
                <span className="text-xs text-muted-foreground min-w-[40px] text-right">
                  {mission.progress}/{mission.target}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Gift className="w-3 h-3" />
            <span>+{mission.xp} XP</span>
          </div>

          {isReady && onClaim && (
            <ButtonIjus
              variant="default"
              size="sm"
              onClick={() => onClaim(mission.id)}
              className="animate-bounce"
            >
              <Gift className="w-4 h-4 mr-1" />
              Resgatar
            </ButtonIjus>
          )}

          {mission.completed && (
            <Badge className="bg-success/10 text-success border-success/20">
              Completa
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}