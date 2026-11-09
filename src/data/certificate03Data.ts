export interface MethodologicalAxis {
  id: string;
  axisTitle: string;
  subtitle: string;
  description: string;
  hours: string;
}

export interface Certificate03Spec {
  certNumber: string;
  bookNumber: string;
  sheetNumber: string;
  verificationCode: string;
  controlKey: string;
  sha256Hash: string;
  holderName: string;
  holderRole: string;
  holderCpf: string;
  holderInstitution: string;
  title: string;
  modality: string;
  editalFraming: string;
  period: string;
  periodShort: string;
  issueDate: string;
  cityState: string;
  workloadText: string;
  workloadShort: string;
  frontBodyParagraph2: string;
  issuer1: {
    name: string;
    cnpj: string;
    department: string;
    signerName: string;
    signerRole: string;
  };
  issuer2: {
    name: string;
    shortName: string;
    cnpj: string;
    signerName: string;
    signerRole: string;
  };
  axes: MethodologicalAxis[];
}

export const CERTIFICATE_03_DATA: Certificate03Spec = {
  certNumber: '03',
  bookNumber: '01/2024',
  sheetNumber: '19',
  verificationCode: 'EMS-EXT-2024-0215',
  controlKey: '0215-7841-9630-4B8E',
  sha256Hash: '8f3d9a14e2c76b05d4918e3a7c62f5091b4e8d2c7a5f3019e6b4d280c3a70215',
  holderName: 'LUCAS GONÇALVES SILVEIRA',
  holderRole: 'Médico',
  holderCpf: '702.794.941-57',
  holderInstitution: 'Centro Universitário Alfredo Nasser (UNIFAN)',
  title:
    'Ação Comunitária e Campanha Educativa: Entrega de Folhetos Ilustrados e Mini E-books sobre Controle Glicêmico e Prevenção da Retinopatia Diabética',
  modality: 'Atividade Comunitária e Campanha Educativa',
  editalFraming:
    'Item 08 - Atividades de Extensão: Campanhas educativas, de vacinação, coleta de dados populacionais e atividades comunitárias',
  period: '14 a 15 de março de 2024',
  periodShort: '14 a 15 de março de 2024',
  issueDate: '22 de março de 2024',
  cityState: 'Goiânia - GO',
  workloadText: '12 (doze) horas',
  workloadShort: '12h',
  frontBodyParagraph2:
    'No âmbito desta ação extensionista, o profissional atuou na produção editorial de linguagem acessível e entrega comunitária de folhetos impressos e cartilhas digitais compartilháveis (formato mobile/WhatsApp) voltadas a portadores de Diabetes Mellitus e seus familiares, conscientização sobre sinais de alerta na acuidade visual e importância do mapeamento de retina periódico no SUS, combate à desinformação (fake news) sobre promessas de curas milagrosas na internet e aplicação de instrumentos digitais educativos para coleta de dados populacionais.',
  issuer1: {
    name: 'EDITORA MENTE E SAÚDE',
    cnpj: '51.372.335/0001-71',
    department: 'Conselho Editorial e Extensão Científica',
    signerName: 'BÁRBARA LIMA DOS SANTOS',
    signerRole: 'Editora-Chefe e Coordenadora de Extensão Editorial',
  },
  issuer2: {
    name: 'CENTRO PROFISSIONALIZANTE MARIA DALVA DE ARAÚJO',
    shortName: 'Centro Maria Dalva de Araújo',
    cnpj: '51.269.112/0001-83',
    signerName: 'JAMES ARAÚJO DE SANTANA',
    signerRole: 'Coordenador de Extensão e Projetos Educativos',
  },
  axes: [
    {
      id: 'I',
      axisTitle: 'Eixo I — Curadoria Científica e Produção Editorial Preventiva',
      subtitle: 'Produção Editorial em Saúde Ocular e Metabólica',
      description:
        'Revisão de literatura oftalmológica e elaboração didática de folhetos ilustrados e do Mini E-book "Diabetes sob Controle, Visão Protegida: Prevenção da Retinopatia Diabética".',
      hours: '03h 00min',
    },
    {
      id: 'II',
      axisTitle: 'Eixo II — Cartilhas Digitais e Coleta de Dados Populacionais',
      subtitle: 'Educação Comunitária Mobile e Levantamento de Letramento em Saúde',
      description:
        'Estruturação e distribuição comunitária de cartilhas compartilháveis via WhatsApp para portadores de Diabetes Mellitus e familiares, associada a enquete digital de percepção de risco glicêmico.',
      hours: '03h 00min',
    },
    {
      id: 'III',
      axisTitle: 'Eixo III — Comunicação Científica e Combate a Fake News em Saúde',
      subtitle: 'Infodemiologia e Desmistificação em Oftalmologia',
      description:
        'Combate ativo a promessas de curas milagrosas na internet, chás e colírios caseiros para diabetes ocular, com base em diretrizes do CBO, SBD, OMS e Ministério da Saúde.',
      hours: '03h 00min',
    },
    {
      id: 'IV',
      axisTitle: 'Eixo IV — Ação Comunitária e Divulgação dos Canais Oficiais do SUS',
      subtitle: 'Cidadania em Saúde e Linha de Cuidado do Paciente Diabético',
      description:
        'Conscientização sobre sinais de alerta na acuidade visual e orientação prática sobre o acesso ao mapeamento de retina periódico (exame de fundo de olho) na Atenção Primária e Centros de Referência do SUS.',
      hours: '03h 00min',
    },
  ],
};

export interface RetinopathyStage {
  id: 'normal' | 'rdnp_leve' | 'rdnp_grave' | 'rdp_emd';
  name: string;
  clinicalTag: string;
  hba1cRange: string;
  visualAcuity: string;
  patientSymptom: string;
  fundusFindings: string[];
  susConduct: string;
  blurPx: number;
  floatersCount: number;
  scotomaOpacity: number;
  macularDistortion: boolean;
  microaneurysms: number;
  hemorrhages: number;
  exudates: number;
  neovessels: boolean;
}

export const RETINOPATHY_STAGES: RetinopathyStage[] = [
  {
    id: 'normal',
    name: '1. Retina Saudável (Diabetes Controlado)',
    clinicalTag: 'Sem Retinopatia Aparente',
    hba1cRange: 'HbA1c < 7,0% · Glicemia estável',
    visualAcuity: '20/20 (Visão nítida central e periférica)',
    patientSymptom:
      'Ausência de sintomas visuais. É justamente nesta fase silenciosa que o exame anual de fundo de olho é indispensável.',
    fundusFindings: [
      'Disco óptico com bordas nítidas e coloração fisiológica',
      'Mácula livre de exsudatos ou espessamento (fóvea preservada)',
      'Calibre arteriovenoso retiniano regular e parede capilar íntegra',
    ],
    susConduct:
      'Manter controle glicêmico e pressórico na UBS e realizar Mapeamento de Retina anual pelo SUS.',
    blurPx: 0,
    floatersCount: 0,
    scotomaOpacity: 0,
    macularDistortion: false,
    microaneurysms: 0,
    hemorrhages: 0,
    exudates: 0,
    neovessels: false,
  },
  {
    id: 'rdnp_leve',
    name: '2. RD Não Proliferativa Leve a Moderada',
    clinicalTag: 'Fase Inicial Assintomática',
    hba1cRange: 'HbA1c 7,5% – 8,5% · Oscilação glicêmica crônica',
    visualAcuity: '20/20 a 20/25 (Quase imperceptível ao paciente)',
    patientSymptom:
      'A visão geralmente permanece normal ou apresenta discreta flutuação visual em dias de hiperglicemia acentuada.',
    fundusFindings: [
      'Microaneurismas capilares (pequenos pontos vermelhos na retina)',
      'Raras micro-hemorragias intrarretinianas puntiformes',
      'Início de aumento da permeabilidade vascular sem atingir o centro foveal',
    ],
    susConduct:
      'Otimizar tratamento do Diabetes na Atenção Primária e acompanhamento oftalmológico semestral/anual.',
    blurPx: 0.8,
    floatersCount: 2,
    scotomaOpacity: 0.08,
    macularDistortion: false,
    microaneurysms: 6,
    hemorrhages: 2,
    exudates: 2,
    neovessels: false,
  },
  {
    id: 'rdnp_grave',
    name: '3. RD Não Proliferativa Grave (Pré-Proliferativa)',
    clinicalTag: 'Alto Risco de Progressão',
    hba1cRange: 'HbA1c 8,6% – 9,8% · Descontrole prolongado',
    visualAcuity: '20/40 a 20/60 (Turvação e perda de contraste)',
    patientSymptom:
      'Dificuldade para leitura de letras pequenas, perda de contraste noturno e pequenas manchas escuras ocasionais.',
    fundusFindings: [
      'Hemorragias intrarretinianas nos 4 quadrantes (Regra 4-2-1)',
      'Exsudatos duros (depósitos lipídicos amarelados) e manchas algodonosas (isquemia)',
      'Ensalsichamento venoso (venous beading) e anomalias microvasculares intrarretinianas (IRMA)',
    ],
    susConduct:
      'Encaminhamento prioritário ao Centro de Referência em Oftalmologia do SUS para avaliação de fotocoagulação a laser.',
    blurPx: 2.2,
    floatersCount: 5,
    scotomaOpacity: 0.25,
    macularDistortion: true,
    microaneurysms: 12,
    hemorrhages: 7,
    exudates: 6,
    neovessels: false,
  },
  {
    id: 'rdp_emd',
    name: '4. RD Proliferativa & Edema Macular Diabético',
    clinicalTag: 'Emergência de Preservação Visual',
    hba1cRange: 'HbA1c > 10,0% · Hipertensão associada',
    visualAcuity: '20/100 a < 20/200 (Comprometimento central severo)',
    patientSymptom:
      'Manchas escuras móveis ("teias de aranha" por hemorragia vítrea), borramento central intenso e distorção das linhas retas.',
    fundusFindings: [
      'Neovascularização no disco óptico (NVD) e na retina (NVE) com vasos frágeis',
      'Edema Macular Diabético clinicamente significativo com exsudatos circinados',
      'Risco iminente de hemorragia vítrea e descolamento tracional da retina',
    ],
    susConduct:
      'Tratamento especializado imediato no SUS (Fotocoagulação Panretiniana a Laser, Anti-VEGF intravítreo ou Vitrectomia).',
    blurPx: 4.5,
    floatersCount: 11,
    scotomaOpacity: 0.58,
    macularDistortion: true,
    microaneurysms: 16,
    hemorrhages: 12,
    exudates: 10,
    neovessels: true,
  },
];

export interface PamphletPage {
  pageNumber: number;
  badge: string;
  title: string;
  subtitle: string;
  keyPoints: string[];
  alertBox: string;
  whatsappSnippet: string;
}

export const PAMPHLET_PAGES: PamphletPage[] = [
  {
    pageNumber: 1,
    badge: 'Lâmina 01 · Capa da Cartilha e Folheto Comunitário',
    title: 'Diabetes sob Controle, Visão Protegida',
    subtitle: 'Por que todo paciente com Diabetes precisa examinar o fundo do olho mesmo enxergando bem?',
    keyPoints: [
      'A Retinopatia Diabética atinge os pequenos vasos sanguíneos da retina de forma silenciosa e indolor.',
      'Mais de 90% dos casos graves de perda visual pelo diabetes podem ser evitados com diagnóstico precoce e controle glicêmico.',
      'Não espere a visão embaçar: os óculos não corrigem lesões na retina provocadas pelo excesso de glicose no sangue.',
    ],
    alertBox:
      'REGRA DE OURO: Tem diagnóstico de Diabetes Tipo 1 ou Tipo 2? Peça na sua Unidade Básica de Saúde (UBS) o encaminhamento para o Exame de Fundo de Olho (Mapeamento de Retina) pelo menos 1 vez por ano.',
    whatsappSnippet:
      '👁️ *DIABETES E VISÃO: CUIDE DOS SEUS OLHOS HOJE!* Mesmo enxergando bem, o excesso de açúcar no sangue pode afetar a retina sem dar sintomas no início. Faça o exame de fundo de olho anualmente pelo SUS!',
  },
  {
    pageNumber: 2,
    badge: 'Lâmina 02 · O Que Acontece na Retina?',
    title: 'Como a Glicose Alta Afeta os Vasos dos Olhos',
    subtitle: 'Entenda de forma simples e ilustrada o caminho entre a glicemia descontrolada e a visão',
    keyPoints: [
      'A retina funciona como o "filme fotográfico" no fundo do olho, cheio de vasos capilares finíssimos.',
      'Quando a glicemia e a pressão arterial ficam altas por meses ou anos, as paredes desses vasinhos enfraquecem, formando microaneurismas e pequenos vazamentos.',
      'Se o líquido vaza no centro da retina (Mácula), surge o Edema Macular Diabético, embaçando a leitura e o reconhecimento de rostos.',
    ],
    alertBox:
      'A hemoglobina glicada (HbA1c) abaixo de 7% (ou conforme meta individual definida pelo seu médico) reduz drasticamente o surgimento e a piora da retinopatia.',
    whatsappSnippet:
      '🩸 *META DE PROTEÇÃO OCULAR:* Controlar a Hemoglobina Glicada (HbA1c), a pressão arterial e o colesterol protege os microvasos da sua retina todos os dias.',
  },
  {
    pageNumber: 3,
    badge: 'Lâmina 03 · Sinais de Alerta Ocular',
    title: '5 Sinais Visuais que Exigem Avaliação Médica',
    subtitle: 'Identifique precocemente alterações na acuidade visual em você ou em familiares',
    keyPoints: [
      '1. Manchas escuras móveis, pontos pretos ou "teias de aranha" flutuando na frente do olho.',
      '2. Visão embaçada que oscila ao longo do dia ou piora para ler letras pequenas.',
      '3. Linhas retas (como batentes de porta ou azulejos) que parecem tortas ou onduladas.',
      '4. Dificuldade crescente para enxergar à noite ou distinguir cores com nitidez.',
      '5. Perda súbita de visão parcial ou como uma "sombra/cortina" em um dos olhos.',
    ],
    alertBox:
      'ATENÇÃO: Pontos pretos súbitos, flashes de luz ou perda rápida da visão são sinais de urgência oftalmológica! Procure atendimento médico imediatamente.',
    whatsappSnippet:
      '⚠️ *FIQUE ATENTO AOS SINAIS:* Manchas flutuantes ("moscas volantes" súbitas), visão borrada ou linhas tortas em quem tem diabetes exigem avaliação oftalmológica rápida.',
  },
  {
    pageNumber: 4,
    badge: 'Lâmina 04 · Combate a Fake News em Saúde Ocular',
    title: 'Verdade Científica vs. Boatos Perigosos na Internet',
    subtitle: 'Proteja sua família contra promessas falsas que atrasam o tratamento real',
    keyPoints: [
      'MITO: "Colírios naturais de ervas, mel ou leite materno limpam o diabetes da vista." -> FALSO E PERIGOSO! Podem causar úlceras de córnea graves e cegueira por infecção.',
      'MITO: "Trocar o grau dos óculos resolve a retinopatia diabética." -> FALSO! A retinopatia é uma alteração vascular no fundo do olho, não apenas um erro de grau.',
      'MITO: "O laser nos olhos cega." -> FALSO! A fotocoagulação a laser e as medicações intraoculares são tratamentos médicos seguros que salvam a visão.',
    ],
    alertBox:
      'NUNCA pingue substâncias caseiras nos olhos nem abandone a insulina ou os comprimidos do diabetes por receitas da internet.',
    whatsappSnippet:
      '🚫 *DIGA NÃO ÀS FAKE NEWS!* Nenhum colírio caseiro ou chá nos olhos cura diabetes ocular. O tratamento seguro é feito com controle da glicemia e acompanhamento com médico oftalmologista.',
  },
  {
    pageNumber: 5,
    badge: 'Lâmina 05 · Passo a Passo de Acesso no SUS',
    title: 'Como Realizar o Mapeamento de Retina na Rede Pública',
    subtitle: 'Roteiro cidadão para pacientes diabéticos e familiares utilizarem os canais oficiais',
    keyPoints: [
      'Passo 1: Compareça à sua Unidade Básica de Saúde (UBS / Posto de Saúde) com Cartão SUS, documento com foto e últimos exames de sangue (glicemia/HbA1c).',
      'Passo 2: Na consulta da Linha de Cuidado do Diabetes, solicite a avaliação anual e o encaminhamento via Regulação (SISREG) para Oftalmologia / Fundo de Olho.',
      'Passo 3: Acompanhe seus agendamentos, medicamentos do programa Farmácia Popular e histórico clínico pelo aplicativo oficial Meu SUS Digital.',
    ],
    alertBox:
      'CANAIS OFICIAIS: Disque Saúde 136 · Portal Meu SUS Digital (meususdigital.saude.gov.br) · Sociedade Brasileira de Diabetes (diabetes.org.br) · Conselho Brasileiro de Oftalmologia (cbo.com.br).',
    whatsappSnippet:
      '🏥 *DIREITO À SAÚDE NO SUS:* Todo paciente com diabetes tem direito ao acompanhamento na UBS, medicamentos gratuitos na Farmácia Popular e encaminhamento para exame de fundo de olho. Compartilhe!',
  },
];
