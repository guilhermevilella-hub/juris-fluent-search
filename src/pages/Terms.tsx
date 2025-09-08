import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">
              Termos de Uso
            </CardTitle>
            <p className="text-muted-foreground">
              Última atualização: 15 de janeiro de 2024
            </p>
          </CardHeader>

          <CardContent className="prose prose-sm max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">1. Aceitação dos Termos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao acessar e utilizar a plataforma iJus ("Serviço"), você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concorda com qualquer parte destes termos, você não deve usar nosso serviço.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">2. Descrição do Serviço</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                O iJus é uma plataforma de pesquisa e consulta de jurisprudências que oferece:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Acesso a banco de dados de jurisprudências de tribunais brasileiros</li>
                <li>Ferramentas de busca e filtros avançados</li>
                <li>Funcionalidades de cópia e exportação mediante assinatura</li>
                <li>Histórico de pesquisas e acessos</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">3. Uso Permitido</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-foreground mb-2">3.1 Finalidades Autorizadas</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    O serviço destina-se exclusivamente para uso acadêmico e profissional, incluindo pesquisa jurídica, elaboração de petições, pareceres, estudos acadêmicos e atividades correlatas do exercício da advocacia e do ensino jurídico.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">3.2 Uso Razoável</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Nos planos com "uso ilimitado", aplicamos políticas de uso razoável para prevenir abuso. Atividades automatizadas, scraping em massa ou uso comercial para revenda são proibidas.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">4. Limitação de Responsabilidade</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-foreground mb-2">4.1 Isenção de Garantias</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    O iJus fornece as informações "como estão" sem garantias de qualquer tipo. Não garantimos a accuracy, completude ou atualidade das jurisprudências apresentadas.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">4.2 Responsabilidade do Usuário</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    É responsabilidade do usuário verificar a autenticidade e atualidade das informações nas fontes oficiais antes de utilizá-las em decisões jurídicas importantes. O iJus não se responsabiliza por decisões tomadas com base exclusivamente em nosso conteúdo.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">4.3 Limitação de Danos</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Em nenhuma hipótese o iJus será responsável por danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso ou incapacidade de usar o serviço.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">5. Propriedade Intelectual</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-foreground mb-2">5.1 Conteúdo Público</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    As jurisprudências apresentadas são de domínio público. O iJus não reivindica propriedade sobre o conteúdo das decisões judiciais.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">5.2 Tecnologia e Interface</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A tecnologia, interface, algoritmos de busca e organização de dados do iJus são propriedade intelectual protegida por direitos autorais e outras leis aplicáveis.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">6. Assinaturas e Pagamentos</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-foreground mb-2">6.1 Planos de Assinatura</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Os planos de assinatura concedem acesso às funcionalidades premium conforme descrito na página de preços. Os preços podem ser alterados com aviso prévio de 30 dias.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">6.2 Cancelamento</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Você pode cancelar sua assinatura a qualquer momento. O cancelamento será efetivo ao final do período de faturamento atual, sem direito a reembolso proporcional.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">6.3 Reembolsos</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Oferecemos reembolso integral dentro de 7 dias da primeira assinatura, desde que o uso não tenha ultrapassado 10% dos limites do plano contratado.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">7. Privacidade e Dados</h2>
              <p className="text-muted-foreground leading-relaxed">
                O tratamento de dados pessoais é regido por nossa Política de Privacidade, que faz parte integrante destes termos. Coletamos apenas dados essenciais para fornecer o serviço e não compartilhamos informações pessoais com terceiros para fins comerciais.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">8. Modificações dos Termos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Reservamos o direito de modificar estes termos a qualquer tempo. Alterações significativas serão comunicadas por email e/ou através da plataforma com 30 dias de antecedência. O uso continuado após as modificações constitui aceitação dos novos termos.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">9. Lei Aplicável e Foro</h2>
              <p className="text-muted-foreground leading-relaxed">
                Estes termos são regidos pela legislação brasileira. Qualquer controvérsia será resolvida no foro da comarca de São Paulo/SP, com exclusão de qualquer outro, por mais privilegiado que seja.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">10. Contato</h2>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Para dúvidas sobre estes termos, entre em contato:
                </p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm text-foreground font-medium">Email: contato@ijus.com.br</p>
                  <p className="text-sm text-foreground font-medium">Suporte: suporte@ijus.com.br</p>
                </div>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-border text-center">
              <p className="text-xs text-muted-foreground">
                iJus - Jurisprudência em segundos | Todos os direitos reservados © 2024
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;