import { Badge } from '@/types/gamification';
import { Card, CardContent } from '@/components/ui/card';
import { Badge as UIBadge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Lock, Share2 } from 'lucide-react';
import { ButtonIjus } from '@/components/ui/button-ijus';

interface BadgeCardProps {
  badge: Badge;
  onShare?: (badge: Badge) => void;
}

const categoryColors = {
  usage: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
  exploration: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
  streak: 'bg-green-500/10 text-green-700 border-green-500/20',
  special: 'bg-warning/10 text-warning border-warning/20'
};

const categoryLabels = {
  usage: 'Uso',
  exploration: 'Exploração',
  streak: 'Sequência',
  special: 'Especial'
};

export function BadgeCard({ badge, onShare }: BadgeCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <TooltipProvider>
      <Card className={`transition-all duration-200 ${
        badge.earned 
          ? 'border-primary/20 hover:shadow-md hover:border-primary/30' 
          : 'border-muted bg-muted/30 opacity-60'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`text-2xl transition-all duration-200 ${
                badge.earned ? '' : 'filter blur-sm'
              }`}>
                {badge.earned ? badge.icon : <Lock className="w-6 h-6 text-muted-foreground" />}
              </div>
              
              <div>
                <h3 className={`font-semibold ${
                  badge.earned ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {badge.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            </div>

            {badge.earned && onShare && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <ButtonIjus
                    variant="ghost"
                    size="sm"
                    className="!size-8 !p-0"
                    onClick={() => onShare(badge)}
                  >
                    <Share2 className="w-4 h-4" />
                  </ButtonIjus>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Compartilhar conquista</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          <div className="flex items-center justify-between">
            <UIBadge 
              variant="secondary"
              className={categoryColors[badge.category]}
            >
              {categoryLabels[badge.category]}
            </UIBadge>

            {badge.earned && badge.earnedAt && (
              <span className="text-xs text-muted-foreground">
                {formatDate(badge.earnedAt)}
              </span>
            )}

            {!badge.earned && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-xs text-muted-foreground cursor-help">
                    Como desbloquear?
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{badge.description}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}