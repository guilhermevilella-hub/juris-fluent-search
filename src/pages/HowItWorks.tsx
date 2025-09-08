import { ArrowRight, Search, BookOpen, Copy, CheckCircle, Users, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const STEPS = [
  {
    icon: Search,
    title: "1. Busque sem login",
    description: "Pesquise gratuitamente por tema, tribunal, número do processo ou palavras-chave. Acesse milhares de jurisprudências de todos os tribunais brasileiros.",
    features: [
      "Busca ilimitada e gratuita",
      "Filtros avançados por tribunal, data, relator",
      "Resultados instantâneos em menos de 1 segundo",
      "Acesso a todos os tribunais superiores e estaduais"
    ]
  },
  {
    icon: BookOpen,
    title: "2. Abra o documento",
    description: "Navegue pelos resultados e abra qualquer jurisprudência para ver os detalhes completos, metadados e conteúdo integral.",
    features: [
      "Visualização completa da ementa",
      "Metadados detalhados (tribunal, relator, data)",
      "Tags e classificações temáticas",
      "Interface limpa e profissional"
    ]
  },
  {
    icon: Copy,
    title: "3. Copie com assinatura",
    description: "Ao tentar copiar uma jurisprudência, escolha seu plano e assine em apenas 30 segundos. Ativação instantânea após o pagamento.",
    features: [
      "Checkout rápido e seguro em 30s",
      "Ativação imediata da assinatura",
      "Cópias ilimitadas conforme o plano",
      "Histórico completo de acessos"
    ]
  }
];

const FAQ_ITEMS = [
  {
    question: "Qual a fonte dos dados de jurisprudência?",
    answer: "Obtemos 100% dos nossos dados diretamente dos tribunais e fontes oficiais, garantindo autenticidade e atualização constante. Nossa base inclui STF, STJ, TST, TRFs e tribunais estaduais."
  },
  {
    question: "Que tribunais estão cobertos?",
    answer: "Cobrimos todos os principais tribunais brasileiros: STF, STJ, TST, Superior Tribunal Militar, TRFs (1ª a 5ª região), TRTs e Tribunais de Justiça estaduais. São mais de 50 tribunais integrados."
  },
  {
    question: "Como funciona a limitação de responsabilidade?",
    answer: "O iJus é uma ferramenta de pesquisa e consulta. Recomendamos sempre confirmar informações nas fontes oficiais para decisões jurídicas importantes. Não nos responsabilizamos por decisões baseadas exclusivamente em nosso conteúdo."
  },
  {
    question: "Posso usar o iJus para fins comerciais?",
    answer: "Sim, o iJus é destinado tanto para uso acadêmico quanto profissional. Advogados, escritórios, estudantes e pesquisadores podem usar nossa plataforma comercialmente conforme os termos de uso."
  },
  {
    question: "Com que frequência os dados são atualizados?",
    answer: "Nossa base é atualizada diariamente com novas decisões dos tribunais. Utilizamos sistemas automatizados para capturar e indexar novas jurisprudências assim que são publicadas."
  },
  {
    question: "Há alguma garantia de disponibilidade?",
    answer: "Mantemos um SLA de 99.9% de disponibilidade. Nossa infraestrutura é redundante e monitorada 24/7 para garantir que você tenha acesso quando precisar."
  }
];

const BENEFITS = [
  {
    icon: Zap,
    title: "Velocidade incomparável",
    description: "Encontre jurisprudências em menos de 1 segundo com nossa tecnologia de indexação avançada."
  },
  {
    icon: Shield,
    title: "Dados oficiais verificados",
    description: "100% dos dados vêm diretamente dos tribunais, garantindo autenticidade e confiabilidade."
  },
  {
    icon: Users,
    title: "Usado por profissionais",
    description: "Mais de 10.000 advogados e estudantes já confiam no iJus para suas pesquisas."
  }
];

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="px-4 py-20 lg:py-32">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-accent-blue/10 text-accent-blue border-accent-blue/20">
            Como funciona
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
            Jurisprudência em{' '}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              3 passos simples
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Descubra como nossa plataforma revoluciona a pesquisa jurídica com simplicidade e eficiência.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={() => navigate('/')}
              className="btn-hero"
            >
              Começar agora
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/planos')}
            >
              Ver planos
            </Button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-16">
            {STEPS.map((step, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">
                      {step.title}
                    </h2>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-accent/20">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-gradient-brand rounded-lg flex items-center justify-center">
                        <step.icon className="w-16 h-16 text-white opacity-50" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-16 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Por que escolher o iJus?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tecnologia de ponta para otimizar sua pesquisa jurídica
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-brand rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Perguntas frequentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Esclarecemos as principais dúvidas sobre cobertura e responsabilidades
            </p>
          </div>

          <div className="space-y-6">
            {FAQ_ITEMS.map((item, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {item.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="p-12 bg-gradient-brand text-white">
            <CardContent className="p-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pronto para começar?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de profissionais que já otimizaram sua pesquisa jurídica com o iJus.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-white text-primary hover:bg-white/90 font-medium px-8 py-3"
                >
                  Pesquisar gratuitamente
                  <Search className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/planos')}
                  className="border-white text-white hover:bg-white/10 px-8 py-3"
                >
                  Ver planos e preços
                </Button>
              </div>

              <Separator className="my-8 bg-white/20" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">50+</p>
                  <p className="text-white/80 text-sm">Tribunais cobertos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">10k+</p>
                  <p className="text-white/80 text-sm">Usuários ativos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">99.9%</p>
                  <p className="text-white/80 text-sm">Disponibilidade</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;