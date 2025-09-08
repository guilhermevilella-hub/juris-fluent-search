import { useState } from "react";
import { X, Check, CreditCard, Users, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentTitle?: string;
  onSubscribe: (planId: string) => void;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  popular?: boolean;
  features: string[];
  limitations?: string;
  copies: string;
  cta: string;
}

const PLANS: Plan[] = [
  {
    id: 'start_monthly',
    name: 'Start',
    price: 29,
    period: 'monthly',
    features: [
      'Pesquisas ilimitadas',
      '50 cópias por mês',
      'Histórico de 30 dias',
      'Suporte por email'
    ],
    copies: '50 cópias/mês',
    cta: 'Começar agora'
  },
  {
    id: 'pro_monthly',
    name: 'Pro',
    price: 59,
    period: 'monthly',
    popular: true,
    features: [
      'Pesquisas ilimitadas',
      '200 cópias por mês',
      'Exportação em PDF',
      'Histórico de 180 dias',
      'Suporte prioritário'
    ],
    copies: '200 cópias/mês',
    cta: 'Assinar Pro'
  },
  {
    id: 'juris_monthly',
    name: 'Juris+',
    price: 99,
    period: 'monthly',
    features: [
      'Pesquisas ilimitadas',
      'Cópias ilimitadas*',
      'Busca por contexto (IA)',
      'Exportações avançadas',
      '3 assentos de usuário'
    ],
    copies: 'Ilimitadas*',
    limitations: '*Uso razoável',
    cta: 'Assinar Juris+'
  }
];

const PaywallModal = ({ open, onOpenChange, documentTitle, onSubscribe }: PaywallModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro_monthly');

  const handleSubscribe = (planId: string) => {
    onSubscribe(planId);
    onOpenChange(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-6">
          <DialogTitle className="text-2xl font-bold text-primary mb-2">
            Copiar este conteúdo?
          </DialogTitle>
          <p className="text-muted-foreground">
            Assine o iJus e libere cópias, histórico e exportações.
          </p>
          {documentTitle && (
            <div className="mt-4 p-3 bg-accent rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-1">Documento selecionado:</p>
              <p className="text-sm font-medium text-foreground line-clamp-2">
                {documentTitle}
              </p>
            </div>
          )}
        </DialogHeader>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 ${
                selectedPlan === plan.id
                  ? 'border-accent-blue bg-accent-blue/5'
                  : 'border-border hover:border-accent-blue/50 bg-card'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent-blue text-white">
                  Mais Popular
                </Badge>
              )}
              
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg text-foreground mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <p className="text-sm text-accent-blue font-medium">{plan.copies}</p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
                {plan.limitations && (
                  <p className="text-xs text-muted-foreground mt-2">{plan.limitations}</p>
                )}
              </div>

              <Button
                className={`w-full ${
                  selectedPlan === plan.id
                    ? 'btn-hero'
                    : plan.popular
                    ? 'btn-hero'
                    : 'btn-outline'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubscribe(plan.id);
                }}
              >
                {selectedPlan === plan.id ? (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    {plan.cta}
                  </>
                ) : (
                  plan.cta
                )}
              </Button>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4" />
              <span>Ativação instantânea</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Suporte dedicado</span>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            Já tenho conta - Entrar
          </Button>
        </div>

        {/* Legal Text */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Ao assinar, você concorda com os{' '}
            <a href="/legal/termos" className="text-primary hover:underline">
              Termos de Uso
            </a>{' '}
            e{' '}
            <a href="/legal/privacidade" className="text-primary hover:underline">
              Política de Privacidade
            </a>
            . Cancele a qualquer momento.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaywallModal;