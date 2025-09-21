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