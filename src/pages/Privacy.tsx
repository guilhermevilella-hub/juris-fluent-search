import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
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
              Política de Privacidade
            </CardTitle>
            <p className="text-muted-foreground">
              Última atualização: 15 de janeiro de 2024
            </p>
          </CardHeader>

          <CardContent className="prose prose-sm max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">1. Introdução</h2>
              <p className="text-muted-foreground leading-relaxed">
                Esta Política de Privacidade descreve como o iJus ("nós", "nosso" ou "Empresa") coleta, usa, armazena e protege suas informações pessoais quando você utiliza nossa plataforma de pesquisa de jurisprudências. Estamos comprometidos com a proteção de sua privacidade e cumprimos rigorosamente a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">2. Dados Coletados</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">2.1 Dados de Cadastro</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Nome completo</li>
                    <li>Endereço de email</li>
                    <li>Senha (criptografada)</li>
                    <li>Dados de pagamento (processados por terceiros certificados)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">2.2 Dados de Uso</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Histórico de pesquisas e termos buscados</li>
                    <li>Documentos acessados e copiados</li>
                    <li>Tempo de acesso e frequência de uso</li>
                    <li>Endereço IP e informações do dispositivo</li>
                    <li>Cookies e tecnologias similares</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">2.3 Dados Técnicos</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Logs de sistema e erros</li>
                    <li>Informações de performance e analytics</li>
                    <li>Dados de segurança e prevenção de fraude</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">3. Finalidades do Tratamento</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-foreground mb-2">3.1 Prestação do Serviço</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Fornecer acesso à plataforma e funcionalidades</li>
                    <li>Processar buscas e entregar resultados personalizados</li>
                    <li>Gerenciar assinaturas e limites de uso</li>
                    <li>Manter histórico de atividades do usuário</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">3.2 Comunicação</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Enviar atualizações sobre o serviço</li>
                    <li>Fornecer suporte técnico e atendimento</li>
                    <li>Notificar sobre mudanças nos termos ou privacidade</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">3.3 Melhoria do Serviço</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Analisar padrões de uso para otimizar funcionalidades</li>
                    <li>Desenvolver novos recursos e melhorias</li>
                    <li>Prevenir fraudes e garantir segurança</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">4. Base Legal</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                O tratamento de dados pessoais no iJus tem como bases legais:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li><strong>Execução de contrato:</strong> Para prestação do serviço de pesquisa jurídica</li>
                <li><strong>Legítimo interesse:</strong> Para melhorias do serviço, segurança e prevenção de fraudes</li>
                <li><strong>Consentimento:</strong> Para comunicações promocionais e cookies não essenciais</li>
                <li><strong>Cumprimento de obrigação legal:</strong> Para questões fiscais e regulatórias</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">5. Compartilhamento de Dados</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-foreground mb-2">5.1 Política de Não Compartilhamento</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Não vendemos, alugamos ou compartilhamos dados pessoais com terceiros para fins comerciais ou publicitários.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">5.2 Compartilhamento Necessário</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    Compartilhamos dados apenas quando estritamente necessário:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Processadores de pagamento certificados (Stripe, PagSeguro)</li>
                    <li>Provedores de infraestrutura e hospedagem</li>
                    <li>Ferramentas de analytics e monitoramento (dados pseudonimizados)</li>
                    <li>Autoridades competentes, quando exigido por lei</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">5.3 Contratos de Processamento</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Todos os terceiros que processam dados em nosso nome estão vinculados a contratos rigorosos que garantem o mesmo nível de proteção desta política.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">6. Armazenamento e Segurança</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-foreground mb-2">6.1 Localização</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Dados são armazenados em servidores localizados no Brasil, em conformidade com a LGPD. Backups internacionais utilizam criptografia e pseudonimização.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">6.2 Medidas de Segurança</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Criptografia em trânsito (TLS 1.3) e em repouso (AES-256)</li>
                    <li>Acesso restrito baseado em princípio da necessidade</li>
                    <li>Logs de auditoria e monitoramento 24/7</li>
                    <li>Testes de penetração e avaliações de segurança regulares</li>
                    <li>Políticas de backup e recuperação de desastres</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">6.3 Retenção de Dados</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Dados de conta: mantidos enquanto a conta estiver ativa</li>
                    <li>Histórico de pesquisas: conforme limites do plano (30-180 dias)</li>
                    <li>Dados financeiros: 5 anos para cumprimento fiscal</li>
                    <li>Logs técnicos: 12 meses para segurança e performance</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">7. Seus Direitos</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-foreground mb-2">7.1 Direitos Garantidos pela LGPD</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li><strong>Acesso:</strong> Conhecer quais dados temos sobre você</li>
                    <li><strong>Retificação:</strong> Corrigir dados incompletos ou incorretos</li>
                    <li><strong>Exclusão:</strong> Solicitar remoção de dados quando permitido por lei</li>
                    <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                    <li><strong>Oposição:</strong> Opor-se ao tratamento baseado em legítimo interesse</li>
                    <li><strong>Revogação de consentimento:</strong> Retirar consentimento a qualquer momento</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">7.2 Como Exercer seus Direitos</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Para exercer qualquer direito, entre em contato através do email privacidade@ijus.com.br ou pela área de configurações da sua conta. Responderemos em até 15 dias úteis.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">8. Cookies e Tecnologias Similares</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-foreground mb-2">8.1 Tipos de Cookies</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li><strong>Essenciais:</strong> Necessários para funcionamento básico (login, sessão)</li>
                    <li><strong>Performance:</strong> Analytics para melhorar o serviço (anonimizados)</li>
                    <li><strong>Funcionais:</strong> Lembrar preferências e configurações</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">8.2 Gerenciamento</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Você pode gerenciar cookies através das configurações do seu navegador ou na área de privacidade da sua conta. Cookies essenciais não podem ser desabilitados.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">9. Alterações nesta Política</h2>
              <p className="text-muted-foreground leading-relaxed">
                Esta política pode ser atualizada para refletir mudanças em nossas práticas ou na legislação. Alterações significativas serão comunicadas por email e destacadas na plataforma. A versão atual sempre estará disponível nesta página com data de atualização.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">10. Encarregado de Dados (DPO)</h2>
              <div className="space-y-2">
                <p className="text-muted-foreground leading-relaxed">
                  Nosso Encarregado de Proteção de Dados está disponível para esclarecer dúvidas sobre esta política e auxiliar no exercício dos seus direitos:
                </p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm text-foreground font-medium">Email: dpo@ijus.com.br</p>
                  <p className="text-sm text-foreground font-medium">Privacidade: privacidade@ijus.com.br</p>
                  <p className="text-sm text-muted-foreground">Tempo de resposta: até 15 dias úteis</p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold text-primary mb-3">11. Autoridade de Controle</h2>
              <p className="text-muted-foreground leading-relaxed">
                Se não conseguirmos resolver suas preocupações sobre privacidade, você tem o direito de apresentar uma reclamação à Autoridade Nacional de Proteção de Dados (ANPD) através do site gov.br/anpd.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-border text-center">
              <p className="text-xs text-muted-foreground">
                iJus - Comprometidos com sua privacidade desde 2024
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;