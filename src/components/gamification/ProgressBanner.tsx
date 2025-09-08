import { useGamification } from '@/contexts/GamificationContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProgressBannerProps {
  context: 'search' | 'results';
}

export function ProgressBanner({ context }: ProgressBannerProps) {
  const { stats, badges, missions } = useGamification();
  const [message, setMessage] = useState<string>('');
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Generate contextual messages based on user progress
    const messages = [];

    if (context === 'results') {
      messages.push(`Você já viu ${stats.totalDocumentsOpened} jurisprudências relevantes`);
      
      // Check badge progress
      const maratonistaProgress = 50 - stats.totalDocumentsOpened;
      if (maratonistaProgress > 0 && maratonistaProgress <= 5) {
        messages.push(`Faltam ${maratonistaProgress} para desbloquear o badge Maratonista`);
      }

      // Check for high relevance
      if (stats.averageRelevance >= 90) {
        messages.push(`Média de relevância: ${stats.averageRelevance}% • Excelente!`);
      }
    }

    if (context === 'search') {
      messages.push(`Tempo economizado este mês: ${Math.floor(stats.timeSavedMinutes / 60)}h${stats.timeSavedMinutes % 60}min`);
      
      // Check incomplete missions
      const incompleteMissions = missions.filter(m => !m.completed && m.progress < m.target);
      if (incompleteMissions.length > 0) {
        const mission = incompleteMissions[0];
        const remaining = mission.target - mission.progress;
        messages.push(`Continue explorando — faltam ${remaining} para completar "${mission.name}"`);
      }
    }

    if (messages.length > 0) {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      setShowBanner(true);
    }
  }, [stats, badges, missions, context]);

  if (!showBanner || !message) return null;

  return (
    <Card className="border-primary/10 bg-gradient-to-r from-primary/5 to-transparent mb-6 animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            {context === 'results' ? (
              <Target className="w-5 h-5 text-primary" />
            ) : (
              <TrendingUp className="w-5 h-5 text-primary" />
            )}
          </div>
          
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              {message}
            </p>
          </div>

          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Zap className="w-3 h-3 mr-1" />
            Progresso
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}