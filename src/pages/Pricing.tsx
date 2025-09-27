import { useState } from "react";
import { Check, X, Star, Zap, Users, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  features: string[];
  limitations?: string[];
  cta: string;
  badge?: string;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basico',
    name: 'Plano Básico',
    description: 'Para uso iniciante',
    monthlyPrice: 49.90,
    yearlyPrice: 499, // 2 months free
    features: [
      'Até 10 consultas de jurisprudência ou pesquisas mensais',
      'Pesquisas básicas nos tribunais',
      'Histórico de 30 dias',
      'Suporte por email',
      'Acesso aos principais tribunais'
    ],
    limitations: [],
    cta: 'Assinar Básico'
  },
  {
    id: 'intermediario',
    name: 'Plano Intermediário',
    description: 'Para uso regular',
    monthlyPrice: 79.90,
    yearlyPrice: 799, // 2 months free
    popular: true,
    badge: 'Mais Popular',
    features: [
      'Até 20 consultas de jurisprudência ou pesquisas mensais',
      'Pesquisas avançadas nos tribunais',
      'Histórico de 90 dias',
      'Suporte prioritário',
      'Acesso a todos os tribunais',
      'Exportação em PDF básica'
    ],
    limitations: [],
    cta: 'Assinar Intermediário'
  }
];

const FEATURES_COMPARISON = [
  { feature: 'Consultas por mês', start: '10', pro: '20' },
  { feature: 'Histórico', start: '30 dias', pro: '90 dias' },
  { feature: 'Exportação PDF', start: '❌', pro: '✅' },
  { feature: 'Tribunais', start: 'Principais', pro: 'Todos' },
  { feature: 'Pesquisas', start: 'Básicas', pro: 'Avançadas' },
  { feature: 'Pagamento', start: 'Mensal', pro: 'Mensal' },
  { feature: 'Suporte', start: 'Email', pro: 'Prioritário' }
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateYearlyDiscount = (monthly: number, yearly: number) => {
    const annualMonthly = monthly * 12;
    const discount = ((annualMonthly - yearly) / annualMonthly) * 100;
    return Math.round(discount);
  };

  const handleSubscribe = (planId: string) => {
    toast({
      title: "Redirecionando para checkout",
      description: `Processando assinatura do plano ${planId}...`,
    });
    // TODO: Integrate with Stripe checkout
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent-blue text-white">
            Planos e Preços
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Escolha seu plano ideal
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Acesse milhares de jurisprudências com a velocidade e praticidade que você precisa.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Label htmlFor="billing-toggle" className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Mensal
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="billing-toggle" className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Anual
            </Label>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              2 meses grátis
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {PRICING_PLANS.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const monthlyEquivalent = isYearly ? plan.yearlyPrice / 12 : plan.monthlyPrice;
            
            return (
              <Card 
                key={plan.id}
                className={`relative transition-all duration-200 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-2 border-accent-blue shadow-lg scale-105' 
                    : 'border border-border hover:border-accent-blue/50'
                }`}
              >
                {plan.badge && (
                  <Badge 
                    className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${
                      plan.popular 
                        ? 'bg-accent-blue text-white' 
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    {plan.badge}
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-primary mb-2">
                    {plan.name}
                  </CardTitle>
                  <p className="text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  
                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-primary">
                      {formatPrice(monthlyEquivalent)}
                      <span className="text-lg text-muted-foreground font-normal">/mês</span>
                    </div>
                    
                    {isYearly && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(price)} cobrado anualmente
                        </p>
                        <Badge variant="outline" className="text-success border-success/20">
                          {calculateYearlyDiscount(plan.monthlyPrice, plan.yearlyPrice)}% de desconto
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {plan.limitations && plan.limitations.length > 0 && (
                    <div className="space-y-2 mb-6">
                      {plan.limitations.map((limitation, index) => (
                        <p key={index} className="text-xs text-muted-foreground">
                          {limitation}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleSubscribe(plan.id)}
                    className={`w-full ${
                      plan.popular 
                        ? 'btn-hero' 
                        : 'btn-outline'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {/* Trial info */}
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Cancele a qualquer momento
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Comparison Table */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary text-center mb-8">
            Compare os recursos
          </h2>
          
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left p-4 font-medium text-foreground">Recursos</th>
                    <th className="text-center p-4 font-medium text-foreground">Básico</th>
                    <th className="text-center p-4 font-medium text-foreground">Intermediário</th>
                  </tr>
                </thead>
                <tbody>
                  {FEATURES_COMPARISON.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}>
                      <td className="p-4 text-sm text-foreground">{row.feature}</td>
                      <td className="p-4 text-sm text-center text-muted-foreground">{row.start}</td>
                      <td className="p-4 text-sm text-center text-muted-foreground">{row.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-accent-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-accent-blue" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Ativação instantânea</h3>
            <p className="text-sm text-muted-foreground">
              Comece a usar imediatamente após a assinatura, sem burocracias.
            </p>
          </Card>
          
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Dados seguros</h3>
            <p className="text-sm text-muted-foreground">
              Suas informações protegidas com criptografia de ponta.
            </p>
          </Card>
          
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Suporte dedicado</h3>
            <p className="text-sm text-muted-foreground">
              Nossa equipe especializada está sempre pronta para ajudar.
            </p>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Dúvidas frequentes
          </h2>
          <p className="text-muted-foreground mb-8">
            Não encontrou a resposta? Entre em contato conosco.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <Card className="p-6">
              <h4 className="font-medium text-foreground mb-2">
                Posso cancelar a qualquer momento?
              </h4>
              <p className="text-sm text-muted-foreground">
                Sim, você pode cancelar sua assinatura a qualquer momento sem taxas ou penalidades.
              </p>
            </Card>
            
            <Card className="p-6">
              <h4 className="font-medium text-foreground mb-2">
                Como funcionam as cópias limitadas?
              </h4>
              <p className="text-sm text-muted-foreground">
                Cada cópia de ementa ou inteiro teor conta como 1 cópia. O limite se renova mensalmente.
              </p>
            </Card>
            
            <Card className="p-6">
              <h4 className="font-medium text-foreground mb-2">
                Os dados são de fontes oficiais?
              </h4>
              <p className="text-sm text-muted-foreground">
                Sim, obtemos 100% dos dados diretamente dos tribunais e fontes oficiais.
              </p>
            </Card>
            
            <Card className="p-6">
              <h4 className="font-medium text-foreground mb-2">
                Há desconto para pagamento anual?
              </h4>
              <p className="text-sm text-muted-foreground">
                Sim, o pagamento anual oferece 2 meses gratuitos em todos os planos.
              </p>
            </Card>
          </div>

          <div className="mt-12">
            <Button 
              variant="outline"
              onClick={() => navigate('/como-funciona')}
              className="mr-4"
            >
              Saiba mais
            </Button>
            <Button 
              onClick={() => navigate('/')}
              className="btn-hero"
            >
              Começar gratuitamente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;