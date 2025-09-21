// Mock data for testing purposes
export const mockJurisprudencias = [
  {
    id: '11632147',
    titulo: 'RECURSO ORDINÁRIO EM MANDADO DE SEGURANÇA - Servidor público - Adicional de insalubridade',
    ementa: 'DIREITO ADMINISTRATIVO. SERVIDOR PÚBLICO. ADICIONAL DE INSALUBRIDADE. DIREITO ADQUIRIDO. O servidor público que já percebia o adicional de insalubridade tem direito adquirido à sua manutenção, independentemente de nova perícia.',
    tribunal: 'TRF-1',
    relator: 'Des. João Silva Santos',
    data_julgamento: '2024-01-15',
    numero_processo: '0001234-56.2023.4.01.0000',
    tags: ['servidor público', 'insalubridade', 'direito adquirido'],
    score: 0.95,
    tipo_documento: 'decisoes'
  },
  {
    id: '11632148',
    titulo: 'APELAÇÃO CÍVEL - Direito do Trabalho - Horas extras',
    ementa: 'DIREITO DO TRABALHO. HORAS EXTRAS. ACORDO DE COMPENSAÇÃO. Para a validade do acordo de compensação de jornada é necessária a participação do sindicato da categoria profissional.',
    tribunal: 'TRT-2',
    relator: 'Des. Maria Oliveira Lima',
    data_julgamento: '2024-02-20',
    numero_processo: '0002345-67.2023.5.02.0001',
    tags: ['direito do trabalho', 'horas extras', 'compensação'],
    score: 0.88,
    tipo_documento: 'acordao'
  },
  {
    id: '11632149',
    titulo: 'MANDADO DE SEGURANÇA - Direito Tributário - ICMS',
    ementa: 'DIREITO TRIBUTÁRIO. ICMS. SUBSTITUIÇÃO TRIBUTÁRIA. A substituição tributária deve observar os limites constitucionais e legais, não podendo gerar cobrança excessiva.',
    tribunal: 'STJ',
    relator: 'Min. Carlos Roberto Souza',
    data_julgamento: '2024-03-10',
    numero_processo: '0003456-78.2023.1.00.0000',
    tags: ['direito tributário', 'icms', 'substituição tributária'],
    score: 0.92,
    tipo_documento: 'decisao'
  },
  {
    id: '11632150',
    titulo: 'RECURSO ESPECIAL - Direito Civil - Responsabilidade Civil',
    ementa: 'DIREITO CIVIL. RESPONSABILIDADE CIVIL. DANO MORAL. A caracterização do dano moral prescinde da prova de prejuízo, bastando a demonstração da violação aos direitos da personalidade.',
    tribunal: 'STJ',
    relator: 'Min. Ana Paula Costa',
    data_julgamento: '2024-01-25',
    numero_processo: '0004567-89.2023.1.00.0000',
    tags: ['direito civil', 'responsabilidade civil', 'dano moral'],
    score: 0.90,
    tipo_documento: 'acordao'
  },
  {
    id: '11632151',
    titulo: 'AGRAVO DE INSTRUMENTO - Direito Processual Civil - Tutela de Urgência',
    ementa: 'DIREITO PROCESSUAL CIVIL. TUTELA DE URGÊNCIA. REQUISITOS. A concessão de tutela de urgência exige a demonstração do periculum in mora e do fumus boni iuris.',
    tribunal: 'TJSP',
    relator: 'Des. Pedro Henrique Alves',
    data_julgamento: '2024-02-05',
    numero_processo: '0005678-90.2023.8.26.0001',
    tags: ['processo civil', 'tutela de urgência', 'liminar'],
    score: 0.85,
    tipo_documento: 'decisao'
  }
];

export const mockDocumentDetails = {
  '11632147': {
    id: '11632147',
    titulo: 'RECURSO ORDINÁRIO EM MANDADO DE SEGURANÇA - Servidor público - Adicional de insalubridade',
    ementa: 'DIREITO ADMINISTRATIVO. SERVIDOR PÚBLICO. ADICIONAL DE INSALUBRIDADE. DIREITO ADQUIRIDO. O servidor público que já percebia o adicional de insalubridade tem direito adquirido à sua manutenção, independentemente de nova perícia.',
    tribunal: 'TRF-1',
    relator: 'Des. João Silva Santos',
    data_julgamento: '2024-01-15',
    numero_processo: '0001234-56.2023.4.01.0000',
    tags: ['servidor público', 'insalubridade', 'direito adquirido'],
    tipo_documento: 'decisoes',
    conteudo_completo: `
TRIBUNAL REGIONAL FEDERAL DA 1ª REGIÃO
RECURSO ORDINÁRIO EM MANDADO DE SEGURANÇA Nº 0001234-56.2023.4.01.0000
Relator: Des. João Silva Santos
Recorrente: FULANO DE TAL
Recorrido: UNIÃO FEDERAL

EMENTA:
DIREITO ADMINISTRATIVO. SERVIDOR PÚBLICO. ADICIONAL DE INSALUBRIDADE. DIREITO ADQUIRIDO. O servidor público que já percebia o adicional de insalubridade tem direito adquirido à sua manutenção, independentemente de nova perícia.

ACÓRDÃO:
Vistos, relatados e discutidos os autos, acordam os Desembargadores da 5ª Turma do Tribunal Regional Federal da 1ª Região, por unanimidade, dar provimento ao recurso, nos termos do voto do Relator.

RELATÓRIO:
Trata-se de recurso ordinário em mandado de segurança impetrado contra ato do Ministro de Estado da Educação, objetivando o reconhecimento do direito adquirido ao adicional de insalubridade.

O recorrente alega que já percebia o adicional de insalubridade há mais de 10 anos, sendo que a Administração Pública determinou a suspensão do pagamento sob o argumento de necessidade de nova perícia.

VOTO:
O direito adquirido constitui cláusula pétrea da Constituição Federal, não podendo ser suprimido nem mesmo por emenda constitucional.

No caso em análise, restou comprovado que o servidor já percebia o adicional de insalubridade por período superior a 10 anos, incorporando-se ao seu patrimônio jurídico.

Dessa forma, dou provimento ao recurso para reconhecer o direito adquirido ao adicional de insalubridade.

É o voto.
    `,
    data_disponibilizacao: '2024-01-16',
    orgao_julgador: '5ª Turma',
    origem: 'TRF1 - Tribunal Regional Federal da 1ª Região'
  },
  '11632148': {
    id: '11632148',
    titulo: 'APELAÇÃO CÍVEL - Direito do Trabalho - Horas extras',
    ementa: 'DIREITO DO TRABALHO. HORAS EXTRAS. ACORDO DE COMPENSAÇÃO. Para a validade do acordo de compensação de jornada é necessária a participação do sindicato da categoria profissional.',
    tribunal: 'TRT-2',
    relator: 'Des. Maria Oliveira Lima',
    data_julgamento: '2024-02-20',
    numero_processo: '0002345-67.2023.5.02.0001',
    tags: ['direito do trabalho', 'horas extras', 'compensação'],
    tipo_documento: 'acordao',
    conteudo_completo: `
TRIBUNAL REGIONAL DO TRABALHO DA 2ª REGIÃO
APELAÇÃO CÍVEL Nº 0002345-67.2023.5.02.0001
Relatora: Des. Maria Oliveira Lima
Apelante: EMPRESA XYZ LTDA
Apelado: JOÃO DOS SANTOS

EMENTA:
DIREITO DO TRABALHO. HORAS EXTRAS. ACORDO DE COMPENSAÇÃO. Para a validade do acordo de compensação de jornada é necessária a participação do sindicato da categoria profissional.

ACÓRDÃO:
A Turma, por unanimidade, negou provimento ao recurso, nos termos da fundamentação da Relatora.

RELATÓRIO:
Cuida-se de recurso ordinário interposto pela empresa contra sentença que condenou ao pagamento de horas extras.

A reclamada sustenta a validade do acordo de compensação de horário celebrado diretamente com o empregado.

VOTO:
O artigo 7º, XIII, da Constituição Federal exige a participação sindical para a validade do acordo de compensação de jornada.

No caso, o acordo foi celebrado diretamente entre empresa e empregado, sem a participação do sindicato da categoria.

Por essas razões, nego provimento ao recurso.
    `,
    data_disponibilizacao: '2024-02-21',
    orgao_julgador: '1ª Turma',
    origem: 'TRT2 - Tribunal Regional do Trabalho da 2ª Região'
  },
  '11632149': {
    id: '11632149',
    titulo: 'MANDADO DE SEGURANÇA - Direito Tributário - ICMS',
    ementa: 'DIREITO TRIBUTÁRIO. ICMS. SUBSTITUIÇÃO TRIBUTÁRIA. A substituição tributária deve observar os limites constitucionais e legais, não podendo gerar cobrança excessiva.',
    tribunal: 'STJ',
    relator: 'Min. Carlos Roberto Souza',
    data_julgamento: '2024-03-10',
    numero_processo: '0003456-78.2023.1.00.0000',
    tags: ['direito tributário', 'icms', 'substituição tributária'],
    tipo_documento: 'decisao',
    conteudo_completo: `
SUPERIOR TRIBUNAL DE JUSTIÇA
MANDADO DE SEGURANÇA Nº 0003456-78.2023.1.00.0000
Relator: Min. Carlos Roberto Souza
Impetrante: EMPRESA ABC COMÉRCIO LTDA
Impetrado: SECRETÁRIO DA FAZENDA DO ESTADO DE SÃO PAULO

EMENTA:
DIREITO TRIBUTÁRIO. ICMS. SUBSTITUIÇÃO TRIBUTÁRIA. A substituição tributária deve observar os limites constitucionais e legais, não podendo gerar cobrança excessiva.

DECISÃO:
Trata-se de mandado de segurança impetrado contra ato do Secretário da Fazenda do Estado de São Paulo que determinou cobrança de ICMS por substituição tributária.

A impetrante sustenta que a cobrança é excessiva e não observa os limites legais da substituição tributária.

FUNDAMENTAÇÃO:
A substituição tributária é mecanismo constitucionalmente válido, previsto no art. 150, § 7º, da CF/88.

Contudo, deve observar os limites legais e constitucionais, não podendo gerar cobrança superior ao tributo efetivamente devido.

No caso, verifico que a base de cálculo utilizada é manifestamente superior ao valor real da operação, gerando cobrança excessiva.

DISPOSITIVO:
Concedo a segurança para determinar que o impetrado recalcule o ICMS devido, observando os limites legais da substituição tributária.
    `,
    data_disponibilizacao: '2024-03-11',
    orgao_julgador: '1ª Turma',
    origem: 'STJ - Superior Tribunal de Justiça'
  },
  '11632150': {
    id: '11632150',
    titulo: 'RECURSO ESPECIAL - Direito Civil - Responsabilidade Civil',
    ementa: 'DIREITO CIVIL. RESPONSABILIDADE CIVIL. DANO MORAL. A caracterização do dano moral prescinde da prova de prejuízo, bastando a demonstração da violação aos direitos da personalidade.',
    tribunal: 'STJ',
    relator: 'Min. Ana Paula Costa',
    data_julgamento: '2024-01-25',
    numero_processo: '0004567-89.2023.1.00.0000',
    tags: ['direito civil', 'responsabilidade civil', 'dano moral'],
    tipo_documento: 'acordao',
    conteudo_completo: `
SUPERIOR TRIBUNAL DE JUSTIÇA
RECURSO ESPECIAL Nº 0004567-89.2023.1.00.0000
Relatora: Min. Ana Paula Costa
Recorrente: MARIA SILVA DOS SANTOS
Recorrido: BANCO NACIONAL S/A

EMENTA:
DIREITO CIVIL. RESPONSABILIDADE CIVIL. DANO MORAL. A caracterização do dano moral prescinde da prova de prejuízo, bastando a demonstração da violação aos direitos da personalidade.

ACÓRDÃO:
A Terceira Turma do Superior Tribunal de Justiça, por unanimidade, deu provimento ao recurso especial, nos termos do voto da Relatora.

RELATÓRIO:
Trata-se de recurso especial interposto contra acórdão do Tribunal de Justiça que negou indenização por danos morais decorrentes de inscrição indevida em órgão de proteção ao crédito.

A recorrente sustenta que a simples inscrição indevida gera dano moral in re ipsa, independentemente de prova de efetivo prejuízo.

O tribunal a quo entendeu que seria necessária a demonstração de prejuízo concreto para configuração do dano moral.

VOTO DA RELATORA:
O dano moral in re ipsa dispensa a prova do prejuízo, pois decorre da própria violação aos direitos da personalidade.

A jurisprudência desta Corte é firme no sentido de que a inscrição indevida em órgão de proteção ao crédito gera, por si só, dano moral indenizável.

Súmula 385 do STJ: "Da anotação irregular em cadastro de proteção ao crédito, não cabe indenização por dano moral, quando preexistente legítima inscrição, ressalvado o direito ao cancelamento."

No caso dos autos, não há inscrição preexistente, sendo devida a indenização por danos morais.

Fixo a indenização em R$ 8.000,00 (oito mil reais), valor que atende aos critérios de proporcionalidade e razoabilidade.

DISPOSITIVO:
Dou provimento ao recurso especial para condenar o recorrido ao pagamento de indenização por danos morais no valor de R$ 8.000,00, corrigido monetariamente a partir desta decisão e acrescido de juros de mora de 1% ao mês a partir do evento danoso.

É o voto.
    `,
    data_disponibilizacao: '2024-01-26',
    orgao_julgador: '3ª Turma',
    origem: 'STJ - Superior Tribunal de Justiça'
  },
  '11632151': {
    id: '11632151',
    titulo: 'AGRAVO DE INSTRUMENTO - Direito Processual Civil - Tutela de Urgência',
    ementa: 'DIREITO PROCESSUAL CIVIL. TUTELA DE URGÊNCIA. REQUISITOS. A concessão de tutela de urgência exige a demonstração do periculum in mora e do fumus boni iuris.',
    tribunal: 'TJSP',
    relator: 'Des. Pedro Henrique Alves',
    data_julgamento: '2024-02-05',
    numero_processo: '0005678-90.2023.8.26.0001',
    tags: ['processo civil', 'tutela de urgência', 'liminar'],
    tipo_documento: 'decisao',
    conteudo_completo: `
TRIBUNAL DE JUSTIÇA DO ESTADO DE SÃO PAULO
AGRAVO DE INSTRUMENTO Nº 0005678-90.2023.8.26.0001
Relator: Des. Pedro Henrique Alves
Agravante: CONSTRUTORA EXEMPLO LTDA
Agravado: JOÃO CARLOS PEREIRA

EMENTA:
DIREITO PROCESSUAL CIVIL. TUTELA DE URGÊNCIA. REQUISITOS. A concessão de tutela de urgência exige a demonstração do periculum in mora e do fumus boni iuris.

DECISÃO:
Cuida-se de agravo de instrumento interposto contra decisão que indeferiu pedido de tutela de urgência em ação de cobrança.

A agravante sustenta a presença dos requisitos para concessão da tutela antecipada, alegando risco de perecimento do direito.

FUNDAMENTAÇÃO:
O art. 300 do CPC estabelece os requisitos para concessão da tutela de urgência: probabilidade do direito e perigo de dano ou risco ao resultado útil do processo.

Analisando os autos, verifico que a agravante não demonstrou de forma convincente a probabilidade do direito alegado.

Os documentos apresentados são insuficientes para caracterizar o fumus boni iuris necessário à concessão da medida.

Ademais, o periculum in mora não restou evidenciado, pois não há demonstração de risco concreto de dano irreparável.

DISPOSITIVO:
Nego provimento ao agravo de instrumento, mantendo a decisão agravada.

Custas e honorários pela agravante.
    `,
    data_disponibilizacao: '2024-02-06',
    orgao_julgador: '12ª Câmara de Direito Privado',
    origem: 'TJSP - Tribunal de Justiça do Estado de São Paulo'
  },
  '11632152': {
    id: '11632152',
    titulo: 'HABEAS CORPUS - Direito Penal - Prisão Preventiva',
    ementa: 'DIREITO PENAL E PROCESSUAL PENAL. HABEAS CORPUS. PRISÃO PREVENTIVA. A prisão preventiva deve ser fundamentada na presença dos requisitos legais, não sendo admissível a decretação com base em presunções.',
    tribunal: 'STF',
    relator: 'Min. Ricardo Lewandowski',
    data_julgamento: '2024-03-01',
    numero_processo: '0006789-01.2024.1.00.0000',
    tags: ['direito penal', 'habeas corpus', 'prisão preventiva'],
    tipo_documento: 'acordao',
    conteudo_completo: `
SUPREMO TRIBUNAL FEDERAL
HABEAS CORPUS Nº 0006789-01.2024.1.00.0000
Relator: Min. Ricardo Lewandowski
Impetrante: DEFENSORIA PÚBLICA DO ESTADO DE SP
Paciente: JOSÉ DA SILVA
Coator: JUIZ DE DIREITO DA 1ª VARA CRIMINAL DE CAMPINAS

EMENTA:
DIREITO PENAL E PROCESSUAL PENAL. HABEAS CORPUS. PRISÃO PREVENTIVA. A prisão preventiva deve ser fundamentada na presença dos requisitos legais, não sendo admissível a decretação com base em presunções.

ACÓRDÃO:
O Tribunal, por maioria, concedeu a ordem de habeas corpus, nos termos do voto do Relator, vencido o Min. [nome], que denegava a ordem.

RELATÓRIO:
Trata-se de habeas corpus impetrado pela Defensoria Pública contra decisão que decretou prisão preventiva do paciente, acusado da prática de tráfico de drogas.

A impetrante alega que a prisão foi decretada com base em fundamentos genéricos, sem demonstração concreta dos requisitos legais.

VOTO DO RELATOR:
A prisão preventiva constitui medida excepcional no ordenamento jurídico brasileiro, somente admissível quando presentes os requisitos do art. 312 do CPP.

A fundamentação deve ser concreta e específica, não sendo admissível a decretação com base em fórmulas genéricas ou presunções.

No caso, a decisão que decretou a prisão utilizou fundamentação padronizada, sem análise específica das circunstâncias do caso concreto.

Não restaram demonstrados o periculum libertatis nem os fundados receios de que o paciente, em liberdade, voltaria a delinquir.

DISPOSITIVO:
Concedo a ordem de habeas corpus para determinar a imediata soltura do paciente, salvo se por outro motivo deva permanecer preso.

É o voto.
    `,
    data_disponibilizacao: '2024-03-02',
    orgao_julgador: '2ª Turma',
    origem: 'STF - Supremo Tribunal Federal'
  },
  '11632153': {
    id: '11632153',
    titulo: 'SENTENÇA - Direito do Consumidor - Vício do Produto',
    ementa: 'DIREITO DO CONSUMIDOR. VÍCIO DO PRODUTO. PRAZO DECADENCIAL. O prazo decadencial para reclamar de vício em produto durável é de 90 dias, contado da entrega do produto.',
    tribunal: 'TJRJ',
    relator: 'Juiz Carlos Alberto Silva',
    data_julgamento: '2024-02-15',
    numero_processo: '0007890-12.2023.8.19.0001',
    tags: ['direito do consumidor', 'vício do produto', 'decadência'],
    tipo_documento: 'sentenca',
    conteudo_completo: `
TRIBUNAL DE JUSTIÇA DO ESTADO DO RIO DE JANEIRO
1ª VARA CÍVEL DA COMARCA DA CAPITAL
PROCESSO Nº 0007890-12.2023.8.19.0001
Juiz: Carlos Alberto Silva
Autor: PEDRO HENRIQUE OLIVEIRA
Réu: LOJA DE ELETRÔNICOS LTDA

SENTENÇA

Vistos.

PEDRO HENRIQUE OLIVEIRA ajuizou ação de indenização por danos materiais e morais contra LOJA DE ELETRÔNICOS LTDA, alegando ter adquirido televisor que apresentou vício no prazo de garantia.

O autor sustenta que o produto apresentou defeito após 30 dias de uso, sendo que a ré se recusou a efetuar o reparo ou substituição.

A ré, em sua defesa, alegou decadência do direito, sustentando que o vício foi comunicado após o prazo de 90 dias.

FUNDAMENTAÇÃO:

O Código de Defesa do Consumidor estabelece em seu art. 26, II, que o prazo decadencial para reclamar de vícios em produtos duráveis é de 90 dias.

O prazo inicia-se da entrega efetiva do produto, conforme entendimento pacífico dos tribunais.

No caso dos autos, o produto foi entregue em 10 de janeiro de 2023, e o vício foi comunicado em 15 de fevereiro de 2023, ou seja, dentro do prazo legal.

Assim, não há que se falar em decadência.

Quanto ao mérito, restou comprovado o vício do produto através dos documentos apresentados e da prova testemunhal.

A ré não conseguiu demonstrar que o defeito decorreu de mau uso pelo consumidor.

DISPOSITIVO:

Julgo PROCEDENTE o pedido para condenar a ré a:
1) Substituir o produto por outro da mesma espécie, em perfeitas condições de uso;
2) Pagar indenização por danos morais no valor de R$ 3.000,00.

Condeno a ré ao pagamento das custas processuais e honorários advocatícios fixados em 15% sobre o valor da condenação.

Publique-se. Registre-se. Intimem-se.

Rio de Janeiro, 15 de fevereiro de 2024.

Carlos Alberto Silva
Juiz de Direito
    `,
    data_disponibilizacao: '2024-02-16',
    orgao_julgador: '1ª Vara Cível',
    origem: 'TJRJ - Tribunal de Justiça do Estado do Rio de Janeiro'
  }
};

export const mockSynonyms: Record<string, string[]> = {
  'rh': ['recursos humanos', 'gestão de pessoas', 'administração de pessoal', 'departamento pessoal', 'capital humano'],
  'trabalhista': ['direito do trabalho', 'relações de trabalho', 'direito laboral', 'legislação trabalhista'],
  'tributário': ['direito tributário', 'legislação fiscal', 'direito fiscal', 'impostos', 'tributos'],
  'civil': ['direito civil', 'código civil', 'relações civis', 'direito privado'],
  'penal': ['direito penal', 'código penal', 'direito criminal', 'legislação penal'],
  'administrativo': ['direito administrativo', 'direito público', 'administração pública', 'atos administrativos']
};