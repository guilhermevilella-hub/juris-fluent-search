import { useGamification, getXPProgress } from '@/contexts/GamificationContext';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TrendingUp } from 'lucide-react';

interface XPBarProps {
  className?: string;
  showDetails?: boolean;
}

export function XPBar({ className = '', showDetails = false }: XPBarProps) {
  const { xp, level } = useGamification();
  const progress = getXPProgress(xp, level);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center gap-3 ${className}`}>
            <Badge 
              className="bg-gradient-to-r from-ijus-blue-deep to-ijus-blue-elec text-ijus-white border-ijus-white/20 px-3 py-1"
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              Nível {level}
            </Badge>
            
            <div className="flex-1 min-w-[120px]">
              <Progress 
                value={progress.percentage} 
                className="h-2 bg-muted"
                style={{
                  background: 'hsl(var(--muted))'
                }}
              />
              
              {showDetails && (
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                  <span>{progress.current} XP</span>
                  <span>{progress.target} XP</span>
                </div>
              )}
            </div>

            <div className="text-right">
              <div className="text-sm font-semibold text-primary">{xp} XP</div>
              {showDetails && (
                <div className="text-xs text-muted-foreground">
                  +{progress.target - progress.current} para N{level + 1}
                </div>
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Nível {level} — faltam {progress.target - progress.current} XP para o próximo nível</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}