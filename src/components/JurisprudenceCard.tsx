import { useState } from "react";
import { Copy, ExternalLink, BookOpen, Share2, Calendar, Building, User, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface JurisprudenceCardProps {
  id: string;
  titulo: string;
  ementa: string;
  tribunal: string;
  orgao_julgador: string;
  relator: string;
  data_julgamento: string;
  numero_processo: string;
  tags: string[];
  score?: number;
}

const JurisprudenceCard = ({
  id,
  titulo,
  ementa,
  tribunal,
  orgao_julgador,
  relator,
  data_julgamento,
  numero_processo,
  tags,
  score
}: JurisprudenceCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // Simulate paywall trigger for non-subscribers
    showPaywall();
  };

  const showPaywall = () => {
    toast({
      title: "Assinatura necessária",
      description: "Assine o iJus para copiar jurisprudências e acessar recursos premium.",
      variant: "default",
    });
    // TODO: Open paywall modal
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.share({
        title: titulo,
        text: ementa.slice(0, 150) + "...",
        url: `/documento/${id}`,
      });
    } catch (error) {
      // Fallback to copy link
      await navigator.clipboard.writeText(window.location.origin + `/documento/${id}`);
      toast({
        title: "Link copiado!",
        description: "Link da jurisprudência copiado para a área de transferência.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div 
      className="card-jurisprudence cursor-pointer animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/documento/${id}`)}
    >
      {/* Header with metadata */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Building className="w-3 h-3" />
          <span className="font-medium text-primary">{tribunal}</span>
          <span>•</span>
          <span>{orgao_julgador}</span>
        </div>
        {score && (
          <Badge variant="secondary" className="text-xs">
            Relevância: {(score * 100).toFixed(0)}%
          </Badge>
        )}
      </div>

      {/* Title and Ementa */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 leading-tight">
          {titulo}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {ementa}
        </p>
      </div>

      {/* Metadata row */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
        <div className="flex items-center space-x-1">
          <User className="w-3 h-3" />
          <span>Rel. {relator}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(data_julgamento)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <FileText className="w-3 h-3" />
          <span>{numero_processo}</span>
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-primary hover:text-primary-hover"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/documento/${id}`);
            }}
          >
            <Eye className="w-4 h-4 mr-1" />
            Abrir
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-accent-blue hover:text-accent-blue-hover"
            onClick={handleCopy}
            title="Assine para copiar este conteúdo"
          >
            <Copy className="w-4 h-4 mr-1" />
            Copiar
          </Button>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Legal disclaimer */}
      <p className="legal-text mt-2 text-center">
        Uso acadêmico e profissional. Ver termos.
      </p>
    </div>
  );
};

export default JurisprudenceCard;