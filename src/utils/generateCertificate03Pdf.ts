import { jsPDF } from 'jspdf';
import { CERTIFICATE_03_DATA } from '../data/certificate03Data';
import {
  CERT_LOGO_EMS_PNG,
  CERT_LOGO_CMDA_PNG,
  CERT_SIG_BARBARA_PNG,
  CERT_SIG_JAMES_PNG,
} from '../assets/certOriginalAssets';

export interface GeneratePdfOptions {
  baseUrl?: string;
  qrCodeDataUrl: string;
}

/**
 * Generates a 100% Native Vector, Text-Selectable, Copy-Pasteable, Accessible PDF
 * for Certificate Nº 03 (EMS-EXT-2024-0215), matching the exact coordinate, font,
 * color, and link-annotation specification of Certificate Nº 02.
 */
export function buildCertificate03VectorPdf({
  baseUrl = 'https://extensao-saude-retinopatia-ocular.vercel.app',
  qrCodeDataUrl,
}: GeneratePdfOptions): jsPDF {
  const cert = CERTIFICATE_03_DATA;
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const displayShortUrl = `${cleanBase}/`;
  const fullValidatorUrl = `${cleanBase}/?codigo=${cert.verificationCode}#validador`;

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  // ============================================================================
  // PAGE 1 — FRENTE DO CERTIFICADO Nº 03 (297mm x 210mm)
  // ============================================================================

  // 1. Background & Triple Institutional Frame
  pdf.setFillColor(255, 253, 250);
  pdf.rect(0, 0, 297, 210, 'F');

  // Outer Forest Green Border (#064E3B)
  pdf.setDrawColor(6, 78, 59);
  pdf.setLineWidth(0.8);
  pdf.rect(5, 5, 287, 200, 'S');

  // Middle Gold Filet Border (#D97706)
  pdf.setDrawColor(217, 119, 6);
  pdf.setLineWidth(0.35);
  pdf.rect(6.8, 6.8, 283.4, 196.4, 'S');

  // Inner Navy Blue Border (#0A1D56)
  pdf.setDrawColor(10, 29, 86);
  pdf.setLineWidth(0.5);
  pdf.rect(8.2, 8.2, 280.6, 193.6, 'S');

  // 2. Header Logos & Institutional Identification
  pdf.addImage(CERT_LOGO_EMS_PNG, 'PNG', 14, 12, 20, 20);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.5);
  pdf.setTextColor(6, 78, 59);
  pdf.text(cert.issuer1.name, 37, 18);

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(7.5);
  pdf.setTextColor(15, 23, 42);
  pdf.text(`CNPJ: ${cert.issuer1.cnpj}`, 37, 22.5);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7);
  pdf.setTextColor(13, 148, 136);
  pdf.text(cert.issuer1.department, 37, 26.5);

  // Center Header
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.5);
  pdf.setTextColor(6, 78, 59);
  pdf.text(
    'PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA',
    148.5,
    17,
    { align: 'center' }
  );
  pdf.text('E EDUCAÇÃO EM SAÚDE', 148.5, 21.2, { align: 'center' });

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(7.5);
  pdf.setTextColor(10, 29, 86);
  pdf.text(
    `Certificado Nº ${cert.certNumber} · Livro de Extensão nº ${cert.bookNumber} · Cód. ${cert.verificationCode}`,
    148.5,
    26.2,
    { align: 'center' }
  );

  // Right Header & Logo 2
  pdf.addImage(CERT_LOGO_CMDA_PNG, 'PNG', 263, 12, 20, 20);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.5);
  pdf.setTextColor(10, 29, 86);
  pdf.text('CENTRO PROFISSIONALIZANTE', 259, 17.5, { align: 'right' });
  pdf.text('MARIA DALVA DE ARAÚJO', 259, 21.8, { align: 'right' });

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(7.5);
  pdf.setTextColor(15, 23, 42);
  pdf.text(`CNPJ: ${cert.issuer2.cnpj}`, 259, 26.2, { align: 'right' });

  // Header Divider Line
  pdf.setDrawColor(6, 78, 59);
  pdf.setLineWidth(0.25);
  pdf.line(14, 35, 283, 35);

  // 3. Main Certificate Title
  pdf.setFont('times', 'bold');
  pdf.setFontSize(24);
  pdf.setTextColor(6, 78, 59);
  pdf.text('CERTIFICADO DE ATIVIDADE DE EXTENSÃO', 148.5, 47, { align: 'center' });

  // Gold Underline below Title
  pdf.setDrawColor(217, 119, 6);
  pdf.setLineWidth(0.5);
  pdf.line(95, 50, 202, 50);

  // Introductory Text
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10.5);
  pdf.setTextColor(15, 23, 42);
  pdf.text(
    `A Editora Mente e Saúde (CNPJ: ${cert.issuer1.cnpj}), em parceria institucional com o Centro Profissionalizante Maria Dalva de Araújo (CNPJ:`,
    148.5,
    58.5,
    { align: 'center' }
  );
  pdf.text(
    `${cert.issuer2.cnpj}), certifica para os devidos fins de comprovação curricular e acadêmica que`,
    148.5,
    62.8,
    { align: 'center' }
  );

  // 4. Recipient Highlight Box
  pdf.setFillColor(237, 252, 245);
  pdf.setDrawColor(217, 119, 6);
  pdf.setLineWidth(0.3);
  pdf.rect(24, 67, 249, 21, 'FD');

  pdf.setFont('times', 'bold');
  pdf.setFontSize(23);
  pdf.setTextColor(10, 29, 86);
  pdf.text(cert.holderName, 148.5, 77, { align: 'center' });

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(15, 23, 42);
  pdf.text(
    `${cert.holderRole}  |  CPF: ${cert.holderCpf}  |  ${cert.holderInstitution}`,
    148.5,
    84.2,
    { align: 'center' }
  );

  // 5. Body Paragraphs (100% Selectable Native Text)
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10.1);
  pdf.setTextColor(15, 23, 42);

  const p1Lines = [
    `participou de forma efetiva da Atividade de Extensão intitulada "${cert.title}",`,
    `desenvolvida na modalidade de ${cert.modality}, realizada no período de ${cert.period}, contabilizando`,
    `carga horária total de ${cert.workloadText}.`,
  ];
  pdf.text(p1Lines, 24.5, 96.5, { lineHeightFactor: 1.15 });

  const p2Lines = [
    'No âmbito desta ação extensionista, o profissional atuou na elaboração e distribuição comunitária de materiais educativos (folhetos ilustrados e',
    'cartilhas digitais no formato mobile/WhatsApp) voltados a portadores de Diabetes Mellitus e familiares, conscientização sobre sinais de alerta e',
    'exame periódico de fundo de olho, comunicação científica para combate à desinformação (fake news) sobre colírios e curas caseiras, divulgação',
    'dos canais oficiais de referência em Oftalmologia do SUS e aplicação de instrumentos digitais interativos para coleta de dados populacionais.',
  ];
  pdf.text(p2Lines, 24.5, 113.5, { lineHeightFactor: 1.15 });

  // 6. Location & Issue Date
  pdf.setFont('times', 'italic');
  pdf.setFontSize(13);
  pdf.setTextColor(15, 23, 42);
  pdf.text(`${cert.cityState}, ${cert.issueDate}.`, 148.5, 136.5, { align: 'center' });

  // 7. Footer: Signatures, Gold Public Faith Seal, QR Code & Manual Auth Box
  // Left Signature: Bárbara Lima dos Santos
  pdf.addImage(CERT_SIG_BARBARA_PNG, 'PNG', 22, 149, 64, 18);
  pdf.setDrawColor(15, 23, 42);
  pdf.setLineWidth(0.35);
  pdf.line(15, 168.5, 93, 168.5);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.8);
  pdf.setTextColor(6, 78, 59);
  pdf.text(cert.issuer1.signerName, 54, 173, { align: 'center' });

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(6.8);
  pdf.setTextColor(15, 23, 42);
  pdf.text(cert.issuer1.signerRole, 54, 176.8, { align: 'center' });

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(6.4);
  pdf.setTextColor(6, 78, 59);
  pdf.text(`Editora Mente e Saúde (CNPJ: ${cert.issuer1.cnpj})`, 54, 180.5, {
    align: 'center',
  });

  // Gold Public Faith Seal
  pdf.setFillColor(255, 242, 199);
  pdf.setDrawColor(217, 119, 6);
  pdf.setLineWidth(0.6);
  pdf.circle(109, 165, 11.5, 'FD');

  pdf.setFont('times', 'bold');
  pdf.setFontSize(6.5);
  pdf.setTextColor(120, 53, 15);
  pdf.text('SELO OFICIAL', 109, 161.2, { align: 'center' });

  pdf.setFont('times', 'bold');
  pdf.setFontSize(8);
  pdf.text('FÉ PÚBLICA', 109, 165.2, { align: 'center' });

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(5.5);
  pdf.text(cert.verificationCode, 109, 169.5, { align: 'center' });

  // QR Code Box
  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(6, 78, 59);
  pdf.setLineWidth(0.25);
  pdf.rect(123.5, 151.5, 25, 25, 'FD');
  if (qrCodeDataUrl) {
    pdf.addImage(qrCodeDataUrl, 'PNG', 124.5, 152.5, 23, 23);
  }
  // Clickable Link Annotation on QR Code
  pdf.link(123.5, 151.5, 25, 25, { url: fullValidatorUrl });

  // Manual Public Authentication Box
  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(6, 78, 59);
  pdf.setLineWidth(0.25);
  pdf.rect(150.5, 151.5, 49, 25, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(6);
  pdf.setTextColor(6, 78, 59);
  pdf.text('AUTENTICAÇÃO PÚBLICA MANUAL', 152.5, 155.5);

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(6.2);
  pdf.setTextColor(15, 23, 42);
  pdf.text(`Cód.: ${cert.verificationCode}`, 152.5, 159.8);

  pdf.setTextColor(146, 64, 14);
  pdf.text(`Chave: ${cert.controlKey}`, 152.5, 163.8);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(5.5);
  pdf.setTextColor(10, 29, 86);
  pdf.text('Endereço p/ Verificação Online:', 152.5, 167.8);

  pdf.setFont('courier', 'normal');
  pdf.setFontSize(4.9);
  pdf.setTextColor(15, 23, 42);
  pdf.text(displayShortUrl, 152.5, 171.2);

  // Clickable Link Annotation on Manual Auth Box
  pdf.link(150.5, 151.5, 49, 25, { url: fullValidatorUrl });

  // Right Signature: James Araújo de Santana
  pdf.addImage(CERT_SIG_JAMES_PNG, 'PNG', 210, 149, 64, 18);
  pdf.setDrawColor(15, 23, 42);
  pdf.setLineWidth(0.35);
  pdf.line(203, 168.5, 282, 168.5);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.8);
  pdf.setTextColor(10, 29, 86);
  pdf.text(cert.issuer2.signerName, 242.5, 173, { align: 'center' });

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(6.8);
  pdf.setTextColor(15, 23, 42);
  pdf.text(cert.issuer2.signerRole, 242.5, 176.8, { align: 'center' });

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(6.1);
  pdf.setTextColor(10, 29, 86);
  pdf.text(
    `Centro Profissionalizante Maria Dalva de Araújo (CNPJ: ${cert.issuer2.cnpj})`,
    242.5,
    180.5,
    { align: 'center' }
  );

  // Bottom Verification Line + Clickable Link Annotation
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(6.4);
  pdf.setTextColor(6, 78, 59);
  pdf.text(
    `Verifique via QR Code ou acesse ${displayShortUrl} informando o Código ${cert.verificationCode} ou Chave ${cert.controlKey}`,
    148.5,
    191.5,
    { align: 'center' }
  );
  pdf.link(35, 188, 227, 5.5, { url: fullValidatorUrl });

  // ============================================================================
  // PAGE 2 — VERSO DO CERTIFICADO Nº 03 (MEMORIAL DESCRITIVO E REGISTRO)
  // ============================================================================
  pdf.addPage('a4', 'landscape');

  // 1. Background & Triple Institutional Frame
  pdf.setFillColor(255, 253, 250);
  pdf.rect(0, 0, 297, 210, 'F');

  pdf.setDrawColor(6, 78, 59);
  pdf.setLineWidth(0.8);
  pdf.rect(5, 5, 287, 200, 'S');

  pdf.setDrawColor(217, 119, 6);
  pdf.setLineWidth(0.35);
  pdf.rect(6.8, 6.8, 283.4, 196.4, 'S');

  pdf.setDrawColor(10, 29, 86);
  pdf.setLineWidth(0.5);
  pdf.rect(8.2, 8.2, 280.6, 193.6, 'S');

  // 2. Page 2 Header
  pdf.addImage(CERT_LOGO_EMS_PNG, 'PNG', 14, 12, 13, 13);
  pdf.addImage(CERT_LOGO_CMDA_PNG, 'PNG', 29, 12, 13, 13);

  pdf.setFont('times', 'bold');
  pdf.setFontSize(13.5);
  pdf.setTextColor(6, 78, 59);
  pdf.text(
    'MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE DE EXTENSÃO',
    46,
    17.5
  );

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.setTextColor(15, 23, 42);
  pdf.text(
    `Verso Oficial do Certificado Nº ${cert.certNumber} · Fé Pública Interinstitucional e Validação Curricular`,
    46,
    22.5
  );

  pdf.setDrawColor(6, 78, 59);
  pdf.setLineWidth(0.5);
  pdf.line(14, 28, 283, 28);

  // 3. Box 1 & Box 2 Side-by-Side
  // Box 1: Dados de Identificação
  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(6, 78, 59);
  pdf.setLineWidth(0.25);
  pdf.rect(14, 31, 155, 31, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.2);
  pdf.setTextColor(6, 78, 59);
  pdf.text('1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL EXTENSIONISTA', 18, 36.2);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.3);
  pdf.setTextColor(15, 23, 42);
  pdf.text(`Titular Certificado: ${cert.holderName}`, 18, 42.2);
  pdf.text(`CPF Registrado: ${cert.holderCpf}`, 18, 47.4);
  pdf.text(`Qualificação Profissional: ${cert.holderRole}`, 18, 52.6);
  pdf.text(`Instituição de Origem: ${cert.holderInstitution}`, 18, 57.8);

  // Box 2: Enquadramento Curricular e Pontuação
  pdf.setFillColor(240, 245, 255);
  pdf.setDrawColor(10, 29, 86);
  pdf.setLineWidth(0.25);
  pdf.rect(173, 31, 110, 31, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.2);
  pdf.setTextColor(10, 29, 86);
  pdf.text('2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO', 177, 36.2);

  pdf.setTextColor(15, 23, 42);
  pdf.text(
    [
      'Item 08 - Atividades de Extensão: Campanhas educativas, de vacinação,',
      'coleta de dados populacionais e atividades comunitárias',
    ],
    177,
    42.5,
    { lineHeightFactor: 1.15 }
  );

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(8.2);
  pdf.setTextColor(6, 78, 59);
  pdf.text(`Período: ${cert.periodShort} | Total: ${cert.workloadShort}`, 177, 58);

  // 4. Section 3: Matriz de Atividades Práticas e Metodologia Extensionista (12 Horas)
  pdf.setFillColor(237, 252, 245);
  pdf.setDrawColor(6, 78, 59);
  pdf.setLineWidth(0.25);
  pdf.rect(14, 65, 269, 7.5, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.2);
  pdf.setTextColor(6, 78, 59);
  pdf.text(
    '3. MATRIZ DE ATIVIDADES PRÁTICAS E METODOLOGIA EXTENSIONISTA (12 HORAS)',
    18,
    70.2
  );

  const rowTops = [72.5, 86.5, 100.5, 114.5];
  const axisRows = [
    {
      titleLines: ['Eixo I — Curadoria Científica e Produção Editorial', 'Preventiva'],
      subtitle: 'Produção Editorial em Saúde Ocular e Metabólica',
      descLines: [
        'Revisão de literatura oftalmológica e elaboração didática de folhetos ilustrados e do Mini E-book "Diabetes sob',
        'Controle, Visão Protegida: Prevenção da Retinopatia Diabética".',
      ],
      hours: '03h 00min',
    },
    {
      titleLines: ['Eixo II — Cartilhas Digitais e Coleta de Dados', 'Populacionais'],
      subtitle: 'Educação Comunitária Mobile e Levantamento em Saúde',
      descLines: [
        'Estruturação e distribuição comunitária de cartilhas compartilháveis via WhatsApp para portadores de Diabetes',
        'Mellitus e familiares, associada a enquete digital de percepção de risco glicêmico.',
      ],
      hours: '03h 00min',
    },
    {
      titleLines: ['Eixo III — Comunicação Científica e Combate a Fake', 'News em Saúde'],
      subtitle: 'Infodemiologia e Desmistificação em Oftalmologia',
      descLines: [
        'Desmistificação ativa de promessas de curas milagrosas na internet, chás e colírios caseiros para diabetes ocular,',
        'com base em diretrizes do CBO, SBD, OMS e Ministério da Saúde.',
      ],
      hours: '03h 00min',
    },
    {
      titleLines: ['Eixo IV — Ação Comunitária e Divulgação dos Canais', 'Oficiais do SUS'],
      subtitle: 'Cidadania Digital e Acesso à Rede Pública',
      descLines: [
        'Entrega comunitária de folhetos impressos, conscientização sobre sinais de alerta na acuidade visual e orientação',
        'prática sobre o acesso ao mapeamento de retina periódico (exame de fundo de olho) no SUS e Meu SUS Digital.',
      ],
      hours: '03h 00min',
    },
  ];

  axisRows.forEach((row, idx) => {
    const yTop = rowTops[idx];

    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(204, 214, 224);
    pdf.setLineWidth(0.25);
    pdf.rect(14, yTop, 269, 14, 'FD');

    // Vertical column dividers
    pdf.setDrawColor(227, 232, 240);
    pdf.line(93, yTop, 93, yTop + 14);
    pdf.line(258, yTop, 258, yTop + 14);

    // Axis Title (2 lines)
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(10, 29, 86);
    pdf.text(row.titleLines, 17, yTop + 4.5, { lineHeightFactor: 1.15 });

    // Axis Subtitle
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.8);
    pdf.setTextColor(71, 85, 105);
    pdf.text(row.subtitle, 17, yTop + 11.8);

    // Axis Description (2 lines)
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.6);
    pdf.setTextColor(15, 23, 42);
    pdf.text(row.descLines, 96, yTop + 5, { lineHeightFactor: 1.15 });

    // Axis Hours
    pdf.setFont('courier', 'bold');
    pdf.setFontSize(8.2);
    pdf.setTextColor(6, 78, 59);
    pdf.text(row.hours, 263.88, yTop + 8.2);
  });

  // 5. Section 4: Registro Oficial de Fé Pública, Endereço Web e Chaves de Verificação
  pdf.setFillColor(255, 250, 235);
  pdf.setDrawColor(217, 119, 6);
  pdf.setLineWidth(0.35);
  pdf.rect(14, 131.5, 269, 31, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.2);
  pdf.setTextColor(146, 64, 14);
  pdf.text(
    '4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO DE AUTENTICIDADE',
    18,
    136.8
  );

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.8);
  pdf.setTextColor(15, 23, 42);
  pdf.text(
    [
      `Certificado registrado sob o nº ${cert.certNumber} no Livro de Extensão nº ${cert.bookNumber}, Folha ${cert.sheetNumber}, expedido pela Editora Mente e Saúde (CNPJ: ${cert.issuer1.cnpj}) e Centro Profissionalizante Maria Dalva de`,
      `Araújo (CNPJ: ${cert.issuer2.cnpj}).`,
    ],
    18,
    142,
    { lineHeightFactor: 1.15 }
  );

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(7.6);
  pdf.setTextColor(6, 78, 59);
  pdf.text(
    `CÓDIGO DE AUTENTICIDADE: ${cert.verificationCode}   |   CHAVE DE CONTROLE / DÍGITO: ${cert.controlKey}`,
    18,
    149.8
  );

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(7.2);
  pdf.setTextColor(10, 29, 86);
  pdf.text(
    `ENDEREÇO PARA VERIFICAÇÃO MANUAL (SEM QR CODE): ${fullValidatorUrl}`,
    18,
    154.8
  );
  // Clickable Link Annotation on Page 2 Verification URL
  pdf.link(18, 151.5, 230, 5, { url: fullValidatorUrl });

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(7);
  pdf.setTextColor(15, 23, 42);
  pdf.text(`HASH SHA-256: ${cert.sha256Hash}`, 18, 159.8);

  // Page 2 QR Code Box + Clickable Link Annotation
  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(6, 78, 59);
  pdf.setLineWidth(0.25);
  pdf.rect(253.5, 134, 26, 26, 'FD');
  if (qrCodeDataUrl) {
    pdf.addImage(qrCodeDataUrl, 'PNG', 254.5, 135, 24, 24);
  }
  pdf.link(253.5, 134, 26, 26, { url: fullValidatorUrl });

  // 6. Page 2 Footer Signatures
  // Left Signature
  pdf.addImage(CERT_SIG_BARBARA_PNG, 'PNG', 26, 164, 54, 15);
  pdf.setDrawColor(15, 23, 42);
  pdf.setLineWidth(0.35);
  pdf.line(18, 180, 92, 180);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.6);
  pdf.setTextColor(6, 78, 59);
  pdf.text(cert.issuer1.signerName, 55, 184.2, { align: 'center' });

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(6.2);
  pdf.setTextColor(6, 78, 59);
  pdf.text(`Editora Mente e Saúde (CNPJ: ${cert.issuer1.cnpj})`, 55, 188, {
    align: 'center',
  });

  // Center Footer Text
  pdf.setFont('times', 'italic');
  pdf.setFontSize(10.5);
  pdf.setTextColor(15, 23, 42);
  pdf.text(`${cert.cityState}, ${cert.issueDate}.`, 148.5, 179.5, { align: 'center' });

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(6.8);
  pdf.setTextColor(71, 85, 105);
  pdf.text(
    'Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o Território Nacional',
    148.5,
    184.2,
    { align: 'center' }
  );

  pdf.setFont('courier', 'normal');
  pdf.setFontSize(6.2);
  pdf.setTextColor(6, 78, 59);
  pdf.text(
    `Registro: ${cert.verificationCode} · Chave: ${cert.controlKey}`,
    148.5,
    188,
    { align: 'center' }
  );

  // Right Signature
  pdf.addImage(CERT_SIG_JAMES_PNG, 'PNG', 215, 164, 54, 15);
  pdf.setDrawColor(15, 23, 42);
  pdf.setLineWidth(0.35);
  pdf.line(204, 180, 279, 180);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.6);
  pdf.setTextColor(10, 29, 86);
  pdf.text(cert.issuer2.signerName, 241.5, 184.2, { align: 'center' });

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(6.2);
  pdf.setTextColor(10, 29, 86);
  pdf.text(
    `Centro Maria Dalva de Araújo (CNPJ: ${cert.issuer2.cnpj})`,
    241.5,
    188,
    { align: 'center' }
  );

  return pdf;
}
