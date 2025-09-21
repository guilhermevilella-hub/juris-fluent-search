import { useState } from "react";
import { Copy, ExternalLink, BookOpen, Share2, Calendar, Building, User, FileText, Eye, Check, Star, Target, Search } from "lucide-react";
import { ButtonIjus } from "@/components/ui/button-ijus";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useGamification } from "@/contexts/GamificationContext";

interface JurisprudenceCardProps {
  id: string;
  titulo: string;
  ementa: string;
  tribunal: any;
  orgao_julgador: string;
  relator: any;
  data_julgamento: string;
  numero_processo: string;
  tags: string[];
  score?: number;
  searchQuery?: string;
  tipo_documento?: string;
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
  score,
  searchQuery,
  tipo_documento
}: JurisprudenceCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addXP, updateMissionProgress } = useGamification();
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    
    // Add XP for copying
    addXP('copy');
    updateMissionProgress('copiar-semanal');
    
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
    const documentType = tipo_documento?.toLowerCase() || 'acordao';
    try {
      await navigator.share({
        title: titulo,
        text: ementa.slice(0, 150) + "...",
        url: `/documento/${documentType}/${id}`,
      });
    } catch (error) {
      // Fallback to copy link
      await navigator.clipboard.writeText(window.location.origin + `/documento/${documentType}/${id}`);
      toast({
        title: "Link copiado!",
        description: "Link da jurisprudência copiado para a área de transferência.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const highlightSearchTerms = (text: string) => {
    if (!searchQuery) return text;
    
    const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 2);
    let highlightedText = text;
    
    searchTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-blue-elec/20 text-blue-elec font-medium px-1 rounded">$1</mark>');
    });
    
    // Highlight legal terms in bold
    const legalTerms = ['ementa', 'relator', 'indenização', 'decisão', 'sentença', 'tribunal', 'responsabilidade', 'civil', 'consumidor'];
    legalTerms.forEach(term => {
      const regex = new RegExp(`\\b(${term})\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, '<strong>$1</strong>');
    });
    
    return highlightedText;
  };

  const getRelevanceBadge = () => {
    if (!score) return null;
    
    const percentage = Math.round(score * 100);
    let badgeClass = "bg-muted text-muted-foreground";
    let icon = Target;
    
    if (percentage >= 90) {
      badgeClass = "bg-success text-success-foreground";
      icon = Star;
    } else if (percentage >= 70) {
      badgeClass = "bg-warning text-warning-foreground";
      icon = Target;
    }
    
    const IconComponent = icon;
    
    return (
      <div 
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}
        title="Calculado com base na semelhança entre sua busca e esta jurisprudência"
      >
        <IconComponent className="w-3 h-3" />
        {percentage}%
      </div>
    );
  };

  const getTribunalColor = () => {
    const tribunalSigla = typeof tribunal === 'object' ? tribunal?.sigla : tribunal;
    switch (tribunalSigla) {
      case 'STF': return 'border-l-success';
      case 'STJ': return 'border-l-primary';
      default: return 'border-l-muted-foreground';
    }
  };

  const getTagColor = (tag: string) => {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes('consumidor')) return 'bg-accent-blue/10 text-accent-blue border-accent-blue/20';
    if (tagLower.includes('família') || tagLower.includes('family')) return 'bg-purple-500/10 text-purple-700 border-purple-500/20';
    if (tagLower.includes('trabalho') || tagLower.includes('trabalhista')) return 'bg-green-500/10 text-green-700 border-green-500/20';
    if (tagLower.includes('penal') || tagLower.includes('criminal')) return 'bg-red-500/10 text-red-700 border-red-500/20';
    return 'bg-muted text-muted-foreground border-muted-foreground/20';
  };

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate to search with this tag as filter
    navigate(`/resultados?q=${encodeURIComponent(tag)}`);
  };

  const handleSimilarDecisions = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Decisões semelhantes",
      description: "Carregando jurisprudências relacionadas...",
    });
  };

  return (
    <div 
      className={`card-jurisprudence cursor-pointer animate-fade-in border-l-4 ${getTribunalColor()} hover:shadow-lg hover:border-primary/20 transition-all duration-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/documento/${tipo_documento?.toLowerCase() || 'acordao'}/${id}`)}
    >
      {/* Header with metadata and relevance badge */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Building className="w-3 h-3" />
          <span className="font-medium text-primary">
            {typeof tribunal === 'object' ? tribunal?.nome || tribunal?.sigla : tribunal}
          </span>
          <span>•</span>
          <span>{orgao_julgador}</span>
        </div>
        {getRelevanceBadge()}
      </div>

      {/* Title and Ementa */}
      <div className="mb-4">
        <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 leading-tight">
          {titulo}
        </h3>
        <div 
          className="text-sm text-muted-foreground line-clamp-3 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightSearchTerms(ementa) }}
        />
      </div>

      {/* Metadata row */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
        <div className="flex items-center space-x-1">
          <User className="w-3 h-3" />
          <span>Rel. {typeof relator === 'object' ? relator?.nome : relator}</span>
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

      {/* Interactive Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index} 
              className={`text-xs cursor-pointer border transition-all duration-200 hover:shadow-sm ${getTagColor(tag)}`}
              onClick={(e) => handleTagClick(tag, e)}
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge className="text-xs text-muted-foreground bg-muted border-muted-foreground/20">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      )}

      {/* Enhanced Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-2">
          <ButtonIjus
            variant="default"
            size="sm"
            className="group"
            onClick={(e) => {
              e.stopPropagation();
              addXP('open');
              updateMissionProgress('abrir-decisoes');
              navigate(`/documento/${tipo_documento?.toLowerCase() || 'acordao'}/${id}`);
            }}
          >
            <Eye className="w-4 h-4" />
            Abrir
          </ButtonIjus>
          <ButtonIjus
            variant={isCopied ? "default" : "outline"}
            size="sm"
            className="group"
            onClick={handleCopy}
            title="Assine para copiar este conteúdo"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar
              </>
            )}
          </ButtonIjus>
          <ButtonIjus
            variant="ghost"
            size="sm"
            className="group"
            onClick={handleSimilarDecisions}
          >
            <Search className="w-4 h-4" />
            Similares
          </ButtonIjus>
        </div>
        
        <div className="flex items-center space-x-1">
          <ButtonIjus
            variant="ghost"
            size="sm"
            className="!size-8 !p-0"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </ButtonIjus>
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