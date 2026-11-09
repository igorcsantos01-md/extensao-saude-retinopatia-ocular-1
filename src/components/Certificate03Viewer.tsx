import React, { useRef, useState, useEffect } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import {
  Download,
  ZoomIn,
  ZoomOut,
  FileText,
  CheckCircle2,
  Globe,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { CERTIFICATE_03_DATA } from '../data/certificate03Data';
import {
  LogoEditoraMenteSaude,
  LogoCentroMariaDalva,
  SignatureBarbara,
  SignatureJames,
  GoldPublicFaithSeal,
} from './CertificateAssets';
import { buildCertificate03VectorPdf } from '../utils/generateCertificate03Pdf';

interface Certificate03ViewerProps {
  verificationBaseUrl: string;
  onChangeVerificationBaseUrl: (url: string) => void;
  onTriggerVerifyModal?: () => void;
}

export const Certificate03Viewer: React.FC<Certificate03ViewerProps> = ({
  verificationBaseUrl,
  onChangeVerificationBaseUrl,
  onTriggerVerifyModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrCanvasWrapperRef = useRef<HTMLDivElement>(null);

  const [viewMode, setViewMode] = useState<'both' | 'front' | 'back'>('both');
  const [zoom, setZoom] = useState<number>(0.92);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportStatus, setExportStatus] = useState<string | null>(null);
  const [showUrlConfig, setShowUrlConfig] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const cert = CERTIFICATE_03_DATA;

  // Normalize URL for display & QR code (default: https://extensao-saude-retinopatia-ocular.vercel.app)
  const cleanBaseUrl = verificationBaseUrl.replace(/\/+$/, '');
  const displayBaseUrl = `${cleanBaseUrl}/`;
  const fullVerificationUrl = `${cleanBaseUrl}/?codigo=${cert.verificationCode}#validador`;

  // Auto-adjust zoom on smaller screens so the A4 landscape sheet fits cleanly
  useEffect(() => {
    const updateResponsiveZoom = () => {
      if (!containerRef.current) return;
      const availableWidth = containerRef.current.clientWidth - 48;
      if (availableWidth < 1122) {
        const computed = Math.max(
          0.32,
          Math.min(0.95, Number((availableWidth / 1122).toFixed(2)))
        );
        setZoom(computed);
      } else {
        setZoom(0.94);
      }
    };
    updateResponsiveZoom();
    window.addEventListener('resize', updateResponsiveZoom);
    return () => window.removeEventListener('resize', updateResponsiveZoom);
  }, []);

  const getQrCodePngDataUrl = (): string => {
    if (!qrCanvasWrapperRef.current) return '';
    const canvas = qrCanvasWrapperRef.current.querySelector('canvas');
    if (!canvas) return '';
    return canvas.toDataURL('image/png');
  };

  /**
   * Generates a 100% Native Vector, Text-Selectable, Copy-Pasteable PDF with clickable links
   * using jsPDF native text & vector primitives (identical to Certificate Nº 02).
   */
  const handleDownloadVectorPdf = () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportStatus(
      'Gerando PDF Vetorial Editável/Acessível (Texto Selecionável + Links Clicáveis)...'
    );

    try {
      const qrDataUrl = getQrCodePngDataUrl();
      const pdf = buildCertificate03VectorPdf({
        baseUrl: cleanBaseUrl,
        qrCodeDataUrl: qrDataUrl,
      });

      const fileName = `Certificado_Extensao_03_${cert.verificationCode}_Lucas_Goncalves_Silveira.pdf`;
      pdf.save(fileName);

      setExportStatus(
        'PDF Vetorial e Selecionável (2 Laudas) gerado com sucesso! Texto e links 100% ativos.'
      );
      setTimeout(() => setExportStatus(null), 5000);
    } catch (error) {
      console.error('Erro ao gerar PDF vetorial:', error);
      setExportStatus('Erro ao gerar o PDF. Tente novamente.');
      setTimeout(() => setExportStatus(null), 4000);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyCredentials = () => {
    const summaryText = `Certificado Nº ${cert.certNumber} | Titular: ${cert.holderName} (CPF: ${cert.holderCpf}) | Código: ${cert.verificationCode} | Chave: ${cert.controlKey} | Verificação: ${fullVerificationUrl}`;
    navigator.clipboard.writeText(summaryText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section id="certificado-oficial" className="py-14 md:py-20 border-b border-[#E6E2D8]">
      {/* Hidden High-Res QRCodeCanvas (480x480) for embedding into the native jsPDF document */}
      <div ref={qrCanvasWrapperRef} className="hidden" aria-hidden="true">
        <QRCodeCanvas
          value={fullVerificationUrl}
          size={480}
          level="M"
          bgColor="#FFFFFF"
          fgColor="#0F172A"
          marginSize={1}
        />
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Cabeçalho da Seção do Visualizador PDF */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#0F4C3A] mb-2">
              <span>DOCUMENTO OFICIAL VETORIAL E SELECIONÁVEL</span>
              <span aria-hidden="true">·</span>
              <span>CERTIFICADO Nº 03 (2 LAUDAS A4)</span>
              <span aria-hidden="true">·</span>
              <span>CÓD. {cert.verificationCode}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-semibold text-[#1C1917] tracking-tight text-balance">
              Certificado de Atividade de Extensão Nº 03 (PDF Editável / Acessível)
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#57534E] max-w-3xl">
              Padrão documental idêntico ao Certificado Nº 02: <strong>texto 100% selecionável para copiar e colar</strong> sem perda de formatação, logotipos e assinaturas originais em alta definição e <strong>links clicáveis permanentes</strong> direcionados a{' '}
              <a
                href={fullVerificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-tabular text-[#0F4C3A] underline font-semibold"
              >
                {displayBaseUrl}
              </a>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCopyCredentials}
              className="px-3.5 py-2.5 text-xs font-medium text-[#1C1917] bg-white border border-[#D6D3CD] rounded-xl hover:bg-[#F5F2EB] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedCode ? (
                <>
                  <Check className="w-4 h-4 text-[#0F4C3A]" />
                  <span>Dados Copiados!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#0F4C3A]" />
                  <span>Copiar Dados de Registro</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowUrlConfig((prev) => !prev)}
              className="px-3.5 py-2.5 text-xs font-medium text-[#1C1917] bg-white border border-[#D6D3CD] rounded-xl hover:bg-[#F5F2EB] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Globe className="w-4 h-4 text-[#0F4C3A]" />
              <span>Link de Acesso: {cleanBaseUrl.replace(/^https?:\/\//, '')}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadVectorPdf}
              disabled={isExporting}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0F4C3A] hover:bg-[#0b382b] disabled:opacity-60 rounded-xl shadow-xs transition-all flex items-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>
                {isExporting
                  ? 'Gerando PDF Vetorial...'
                  : 'Baixar PDF Editável / Selecionável (2 Laudas)'}
              </span>
            </button>
          </div>
        </div>

        {/* Barra Opcional de Configuração de Domínio para o QR Code e Rodapé */}
        {showUrlConfig && (
          <div className="mb-6 p-5 bg-white border border-[#D6D3CD] rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <label
                  htmlFor="qr-base-url-input"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#0F4C3A] mb-1"
                >
                  Link Permanente de Acesso e Validação no Certificado (Clicável no PDF):
                </label>
                <p className="text-xs text-[#57534E] mb-3">
                  Configurado por padrão como{' '}
                  <strong className="font-mono-tabular text-[#1C1917]">
                    https://extensao-saude-retinopatia-ocular.vercel.app/
                  </strong>
                  . Todos os hiperlinks e QR Codes do PDF apontam diretamente para este endereço.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id="qr-base-url-input"
                    type="text"
                    value={verificationBaseUrl}
                    onChange={(e) => onChangeVerificationBaseUrl(e.target.value)}
                    placeholder="https://extensao-saude-retinopatia-ocular.vercel.app"
                    className="flex-1 px-3.5 py-2 text-xs font-mono-tabular bg-[#FAF8F5] border border-[#D6D3CD] rounded-lg text-[#1C1917] focus:outline-none focus:border-[#0F4C3A]"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        onChangeVerificationBaseUrl(
                          'https://extensao-saude-retinopatia-ocular.vercel.app'
                        )
                      }
                      className="px-3 py-2 text-xs font-semibold bg-[#0F4C3A] text-white rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Padrão Oficial (extensao-saude-retinopatia-ocular.vercel.app)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onChangeVerificationBaseUrl('https://extensao-mente-saude.vercel.app')
                      }
                      className="px-3 py-2 text-xs font-medium bg-[#FAF8F5] hover:bg-[#EBE6DF] text-[#1B365D] border border-[#D6D3CD] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      extensao-mente-saude.vercel.app
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Barra de Ferramentas estilo Leitor de PDF */}
        <div className="bg-[#1C1917] text-[#FAF8F5] rounded-t-2xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 border-b border-[#33302E]">
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-mono-tabular text-[#E7E5E4] truncate max-w-[260px] sm:max-w-md">
              Certificado_Extensao_03_{cert.verificationCode}_Lucas_Goncalves_Silveira.pdf
            </span>
            <span className="hidden md:inline-block text-xs text-[#A7F3D0] font-mono-tabular">
              · Texto 100% Selecionável &amp; Links Clicáveis
            </span>
          </div>

          {/* Seletor de Laudas */}
          <div className="flex items-center gap-1 bg-[#292524] p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                viewMode === 'both'
                  ? 'bg-[#0F4C3A] text-white'
                  : 'text-[#D6D3CD] hover:text-white'
              }`}
            >
              Frente + Verso (2 Laudas)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('front')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                viewMode === 'front'
                  ? 'bg-[#0F4C3A] text-white'
                  : 'text-[#D6D3CD] hover:text-white'
              }`}
            >
              Lauda 1 (Frente)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('back')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                viewMode === 'back'
                  ? 'bg-[#0F4C3A] text-white'
                  : 'text-[#D6D3CD] hover:text-white'
              }`}
            >
              Lauda 2 (Verso)
            </button>
          </div>

          {/* Controle de Zoom e Ações */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.4, Number((z - 0.08).toFixed(2))))}
              className="p-1.5 rounded bg-[#292524] hover:bg-[#3F3A36] text-[#E7E5E4] transition-colors cursor-pointer"
              title="Reduzir Zoom"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono-tabular min-w-[46px] text-center text-[#E7E5E4]">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.15, Number((z + 0.08).toFixed(2))))}
              className="p-1.5 rounded bg-[#292524] hover:bg-[#3F3A36] text-[#E7E5E4] transition-colors cursor-pointer"
              title="Aumentar Zoom"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {onTriggerVerifyModal && (
              <button
                type="button"
                onClick={onTriggerVerifyModal}
                className="ml-2 px-3 py-1.5 text-xs font-medium bg-[#1B365D] hover:bg-[#25477a] text-white rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4ADE80]" />
                <span>Validar Certificado</span>
              </button>
            )}
          </div>
        </div>

        {/* Status de Exportação PDF */}
        {exportStatus && (
          <div className="bg-[#0F4C3A] text-white px-4 py-2.5 text-xs font-medium flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{exportStatus}</span>
          </div>
        )}

        {/* Palco do Leitor PDF com Texto 100% Selecionável e Links Ativos */}
        <div
          ref={containerRef}
          className="bg-[#262422] p-4 sm:p-8 rounded-b-2xl overflow-x-auto flex flex-col items-center gap-10 border border-t-0 border-[#1C1917] select-text"
        >
          {/* =====================================================================
              LAUDA 1 — FRENTE DO CERTIFICADO Nº 03 (RÉPLICA EXATA DO CERT Nº 02)
              Proporção A4 Paisagem: 1122px x 794px (297mm x 210mm)
          ===================================================================== */}
          <div
            style={{
              display: viewMode === 'back' ? 'none' : 'block',
              width: `${Math.round(1122 * zoom)}px`,
              height: `${Math.round(794 * zoom)}px`,
              position: 'relative',
            }}
          >
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'top left',
                width: '1122px',
                height: '794px',
              }}
              className="shadow-2xl"
            >
              <div
                style={{
                  width: '1122px',
                  height: '794px',
                  backgroundColor: '#FFFDFA',
                  position: 'relative',
                  boxSizing: 'border-box',
                  color: '#0F172A',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  userSelect: 'text',
                }}
              >
                {/* Moldura Tripla Oficial idêntica ao Certificado Nº 02:
                    1. Verde (#064E3B) em 5mm (19px)
                    2. Filete Dourado (#D97706) em 6.8mm (26px)
                    3. Azul Marinho (#0A1D56) em 8.2mm (31px) */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '19px',
                    border: '3px solid #064E3B',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: '26px',
                    border: '1.3px solid #D97706',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: '31px',
                    border: '2px solid #0A1D56',
                    pointerEvents: 'none',
                  }}
                />

                {/* Conteúdo Interno Posicionado com Precisão Milimétrica */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '31px',
                    padding: '15px 22px 14px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* TOPO E CORPO CENTRAL */}
                  <div>
                    {/* 1. CABEÇALHO SUPERIOR */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: '12px',
                        borderBottom: '1.2px solid #064E3B',
                      }}
                    >
                      {/* Esquerda: Editora Mente e Saúde */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <LogoEditoraMenteSaude size={74} />
                        <div style={{ lineHeight: 1.3 }}>
                          <div
                            style={{
                              fontSize: '11.5px',
                              fontWeight: 700,
                              color: '#064E3B',
                            }}
                          >
                            {cert.issuer1.name}
                          </div>
                          <div
                            style={{
                              fontSize: '10.2px',
                              fontWeight: 700,
                              color: '#0F172A',
                              fontFamily: "'Courier New', Courier, monospace",
                              marginTop: '2px',
                            }}
                          >
                            CNPJ: {cert.issuer1.cnpj}
                          </div>
                          <div
                            style={{
                              fontSize: '9.5px',
                              color: '#0D9488',
                              marginTop: '2px',
                            }}
                          >
                            {cert.issuer1.department}
                          </div>
                        </div>
                      </div>

                      {/* Centro: Programa Interinstitucional (em 2 linhas + 1 linha de registro sem quebrar) */}
                      <div style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            fontSize: '11.5px',
                            fontWeight: 700,
                            color: '#064E3B',
                            lineHeight: 1.32,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA
                          <br />E EDUCAÇÃO EM SAÚDE
                        </div>
                        <div
                          style={{
                            fontSize: '10.2px',
                            fontWeight: 700,
                            color: '#0A1D56',
                            fontFamily: "'Courier New', Courier, monospace",
                            marginTop: '5px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Certificado Nº {cert.certNumber} · Livro de Extensão nº {cert.bookNumber}{' '}
                          · Cód. {cert.verificationCode}
                        </div>
                      </div>

                      {/* Direita: Centro Profissionalizante Maria Dalva de Araújo */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ textAlign: 'right', lineHeight: 1.3 }}>
                          <div
                            style={{
                              fontSize: '11.5px',
                              fontWeight: 700,
                              color: '#0A1D56',
                            }}
                          >
                            CENTRO PROFISSIONALIZANTE
                            <br />
                            MARIA DALVA DE ARAÚJO
                          </div>
                          <div
                            style={{
                              fontSize: '10.2px',
                              fontWeight: 700,
                              color: '#0F172A',
                              fontFamily: "'Courier New', Courier, monospace",
                              marginTop: '3px',
                            }}
                          >
                            CNPJ: {cert.issuer2.cnpj}
                          </div>
                        </div>
                        <LogoCentroMariaDalva size={74} />
                      </div>
                    </div>

                    {/* 2. TÍTULO PRINCIPAL + SUBLINHADO DOURADO */}
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                      <h1
                        style={{
                          fontFamily: "'Times New Roman', Times, Georgia, serif",
                          fontSize: '32px',
                          fontWeight: 700,
                          color: '#064E3B',
                          letterSpacing: '0.6px',
                          margin: 0,
                          lineHeight: 1.15,
                        }}
                      >
                        CERTIFICADO DE ATIVIDADE DE EXTENSÃO
                      </h1>
                      <div
                        style={{
                          width: '405px',
                          height: '2px',
                          backgroundColor: '#D97706',
                          margin: '6px auto 12px auto',
                        }}
                      />
                      <p
                        style={{
                          fontSize: '14px',
                          color: '#0F172A',
                          margin: '0 auto',
                          maxWidth: '940px',
                          lineHeight: 1.38,
                        }}
                      >
                        A Editora Mente e Saúde (CNPJ: {cert.issuer1.cnpj}), em parceria
                        institucional com o Centro Profissionalizante Maria Dalva de Araújo (CNPJ:
                        <br />
                        {cert.issuer2.cnpj}), certifica para os devidos fins de comprovação
                        curricular e acadêmica que
                      </p>
                    </div>

                    {/* 3. QUADRO DE DESTAQUE DO TITULAR (#EDFCF5 com borda dourada #D97706 idêntico ao Cert 2) */}
                    <div
                      style={{
                        margin: '14px auto',
                        backgroundColor: '#EDFCF5',
                        border: '1.2px solid #D97706',
                        padding: '10px 24px',
                        textAlign: 'center',
                        width: '940px',
                        boxSizing: 'border-box',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Times New Roman', Times, Georgia, serif",
                          fontSize: '30px',
                          fontWeight: 700,
                          color: '#0A1D56',
                          letterSpacing: '0.5px',
                          lineHeight: 1.15,
                        }}
                      >
                        {cert.holderName}
                      </div>
                      <div
                        style={{
                          fontSize: '13.4px',
                          fontWeight: 700,
                          color: '#0F172A',
                          marginTop: '4px',
                        }}
                      >
                        {cert.holderRole} &nbsp;|&nbsp; CPF: {cert.holderCpf} &nbsp;|&nbsp;{' '}
                        {cert.holderInstitution}
                      </div>
                    </div>

                    {/* 4. CORPO DO CERTIFICADO (2 PARÁGRAFOS SELECIONÁVEIS) */}
                    <div
                      style={{
                        width: '940px',
                        margin: '12px auto 0 auto',
                        fontSize: '13.5px',
                        lineHeight: 1.42,
                        color: '#0F172A',
                        textAlign: 'left',
                      }}
                    >
                      <p style={{ margin: '0 0 12px 0' }}>
                        participou de forma efetiva da Atividade de Extensão intitulada &quot;
                        {cert.title}&quot;, desenvolvida na modalidade de {cert.modality}, realizada
                        no período de {cert.period}, contabilizando carga horária total de{' '}
                        {cert.workloadText}.
                      </p>
                      <p style={{ margin: 0 }}>
                        No âmbito desta ação extensionista, o profissional atuou na elaboração e
                        distribuição comunitária de materiais educativos (folhetos ilustrados e
                        cartilhas digitais no formato mobile/WhatsApp) voltados a portadores de
                        Diabetes Mellitus e familiares, conscientização sobre sinais de alerta e
                        exame periódico de fundo de olho, comunicação científica para combate à
                        desinformação (fake news) sobre colírios e curas caseiras, divulgação dos
                        canais oficiais de referência em Oftalmologia do SUS e aplicação de
                        instrumentos digitais interativos para coleta de dados populacionais.
                      </p>
                    </div>

                    {/* 5. LOCAL E DATA */}
                    <div
                      style={{
                        textAlign: 'center',
                        marginTop: '18px',
                        fontFamily: "'Times New Roman', Times, Georgia, serif",
                        fontStyle: 'italic',
                        fontSize: '17.5px',
                        color: '#0F172A',
                      }}
                    >
                      {cert.cityState}, {cert.issueDate}.
                    </div>
                  </div>

                  {/* 6. RODAPÉ DE ASSINATURAS, SELO OFICIAL, QR CODE E AUTENTICAÇÃO MANUAL */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        padding: '0 4px',
                      }}
                    >
                      {/* Assinatura Esquerda: Bárbara Lima dos Santos */}
                      <div style={{ width: '295px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <SignatureBarbara width={220} height={62} />
                        </div>
                        <div
                          style={{
                            borderTop: '1.4px solid #0F172A',
                            paddingTop: '5px',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '10.5px',
                              fontWeight: 700,
                              color: '#064E3B',
                            }}
                          >
                            {cert.issuer1.signerName}
                          </div>
                          <div style={{ fontSize: '9.2px', color: '#0F172A', marginTop: '2px' }}>
                            {cert.issuer1.signerRole}
                          </div>
                          <div
                            style={{
                              fontSize: '8.6px',
                              fontFamily: "'Courier New', Courier, monospace",
                              color: '#064E3B',
                              fontWeight: 700,
                              marginTop: '2px',
                            }}
                          >
                            Editora Mente e Saúde (CNPJ: {cert.issuer1.cnpj})
                          </div>
                        </div>
                      </div>

                      {/* Centro: Selo Dourado + QR Code Clicável + Caixa de Autenticação Manual Clicável */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <GoldPublicFaithSeal code={cert.verificationCode} size={86} />

                        {/* Caixa QR Code com Link Clicável */}
                        <a
                          href={fullVerificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Abrir Validador Oficial de Fé Pública"
                          style={{
                            width: '94px',
                            height: '94px',
                            border: '1px solid #064E3B',
                            backgroundColor: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4px',
                            boxSizing: 'border-box',
                          }}
                        >
                          <QRCodeSVG
                            value={fullVerificationUrl}
                            size={84}
                            level="M"
                            bgColor="#FFFFFF"
                            fgColor="#0F172A"
                          />
                        </a>

                        {/* Caixa Autenticação Pública Manual com Link Clicável */}
                        <div
                          style={{
                            width: '195px',
                            height: '94px',
                            border: '1px solid #064E3B',
                            backgroundColor: '#FFFFFF',
                            padding: '7px 9px',
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            fontSize: '8.5px',
                            lineHeight: 1.3,
                          }}
                        >
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: '8.2px',
                              color: '#064E3B',
                            }}
                          >
                            AUTENTICAÇÃO PÚBLICA MANUAL
                          </div>
                          <div
                            style={{
                              fontFamily: "'Courier New', Courier, monospace",
                              fontWeight: 700,
                              color: '#0F172A',
                            }}
                          >
                            Cód.: {cert.verificationCode}
                          </div>
                          <div
                            style={{
                              fontFamily: "'Courier New', Courier, monospace",
                              fontWeight: 700,
                              color: '#92400E',
                            }}
                          >
                            Chave: {cert.controlKey}
                          </div>
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: '7.6px',
                              color: '#0A1D56',
                            }}
                          >
                            Endereço p/ Verificação Online:
                          </div>
                          <a
                            href={fullVerificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontFamily: "'Courier New', Courier, monospace",
                              fontSize: '6.8px',
                              color: '#0F172A',
                              textDecoration: 'underline',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {displayBaseUrl}
                          </a>
                        </div>
                      </div>

                      {/* Assinatura Direita: James Araújo de Santana */}
                      <div style={{ width: '305px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <SignatureJames width={220} height={62} />
                        </div>
                        <div
                          style={{
                            borderTop: '1.4px solid #0F172A',
                            paddingTop: '5px',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '10.5px',
                              fontWeight: 700,
                              color: '#0A1D56',
                            }}
                          >
                            {cert.issuer2.signerName}
                          </div>
                          <div style={{ fontSize: '9.2px', color: '#0F172A', marginTop: '2px' }}>
                            {cert.issuer2.signerRole}
                          </div>
                          <div
                            style={{
                              fontSize: '8.2px',
                              fontFamily: "'Courier New', Courier, monospace",
                              color: '#0A1D56',
                              fontWeight: 700,
                              marginTop: '2px',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Centro Profissionalizante Maria Dalva de Araújo (CNPJ:{' '}
                            {cert.issuer2.cnpj})
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Linha Final de Verificação com Link Clicável */}
                    <div
                      style={{
                        marginTop: '10px',
                        textAlign: 'center',
                        fontSize: '8.8px',
                        fontFamily: "'Courier New', Courier, monospace",
                        fontWeight: 700,
                        color: '#064E3B',
                      }}
                    >
                      Verifique via QR Code ou acesse{' '}
                      <a
                        href={fullVerificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#064E3B', textDecoration: 'underline' }}
                      >
                        {displayBaseUrl}
                      </a>{' '}
                      informando o Código {cert.verificationCode} ou Chave {cert.controlKey}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================================
              LAUDA 2 — VERSO DO CERTIFICADO Nº 03 (RÉPLICA EXATA DO CERT Nº 02)
              Proporção A4 Paisagem: 1122px x 794px (297mm x 210mm)
          ===================================================================== */}
          <div
            style={{
              display: viewMode === 'front' ? 'none' : 'block',
              width: `${Math.round(1122 * zoom)}px`,
              height: `${Math.round(794 * zoom)}px`,
              position: 'relative',
            }}
          >
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'top left',
                width: '1122px',
                height: '794px',
              }}
              className="shadow-2xl"
            >
              <div
                style={{
                  width: '1122px',
                  height: '794px',
                  backgroundColor: '#FFFDFA',
                  position: 'relative',
                  boxSizing: 'border-box',
                  color: '#0F172A',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  userSelect: 'text',
                }}
              >
                {/* Moldura Tripla Oficial */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '19px',
                    border: '3px solid #064E3B',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: '26px',
                    border: '1.3px solid #D97706',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: '31px',
                    border: '2px solid #0A1D56',
                    pointerEvents: 'none',
                  }}
                />

                {/* Conteúdo Interno da Lauda 2 */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '31px',
                    padding: '14px 22px 12px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                  }}
                >
                  <div>
                    {/* 1. CABEÇALHO DO VERSO OFICIAL */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        paddingBottom: '9px',
                        borderBottom: '2px solid #064E3B',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <LogoEditoraMenteSaude size={49} />
                        <LogoCentroMariaDalva size={49} />
                      </div>
                      <div>
                        <h2
                          style={{
                            fontFamily: "'Times New Roman', Times, Georgia, serif",
                            fontSize: '18.5px',
                            fontWeight: 700,
                            color: '#064E3B',
                            margin: 0,
                            lineHeight: 1.2,
                          }}
                        >
                          MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE DE EXTENSÃO
                        </h2>
                        <div
                          style={{
                            fontSize: '11.3px',
                            color: '#0F172A',
                            marginTop: '2px',
                          }}
                        >
                          Verso Oficial do Certificado Nº {cert.certNumber} · Fé Pública
                          Interinstitucional e Validação Curricular
                        </div>
                      </div>
                    </div>

                    {/* 2. QUADROS 1 E 2 LADO A LADO */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '585px 1fr',
                        gap: '14px',
                        marginTop: '11px',
                      }}
                    >
                      {/* Quadro 1 */}
                      <div
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #064E3B',
                          padding: '10px 14px',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#064E3B',
                            marginBottom: '6px',
                          }}
                        >
                          1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL EXTENSIONISTA
                        </div>
                        <div style={{ fontSize: '11.2px', lineHeight: 1.52, color: '#0F172A' }}>
                          <div>Titular Certificado: {cert.holderName}</div>
                          <div>CPF Registrado: {cert.holderCpf}</div>
                          <div>Qualificação Profissional: {cert.holderRole}</div>
                          <div>Instituição de Origem: {cert.holderInstitution}</div>
                        </div>
                      </div>

                      {/* Quadro 2 */}
                      <div
                        style={{
                          backgroundColor: '#F0F5FF',
                          border: '1px solid #0A1D56',
                          padding: '10px 14px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#0A1D56',
                              marginBottom: '6px',
                            }}
                          >
                            2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO
                          </div>
                          <div
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#0F172A',
                              lineHeight: 1.4,
                            }}
                          >
                            {cert.editalFraming}
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            fontFamily: "'Courier New', Courier, monospace",
                            color: '#064E3B',
                            marginTop: '8px',
                          }}
                        >
                          Período: {cert.periodShort} &nbsp;|&nbsp; Total: {cert.workloadShort}
                        </div>
                      </div>
                    </div>

                    {/* 3. MATRIZ DE ATIVIDADES PRÁTICAS (12 HORAS) */}
                    <div
                      style={{
                        marginTop: '11px',
                        border: '1px solid #064E3B',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: '#EDFCF5',
                          borderBottom: '1px solid #064E3B',
                          padding: '5px 14px',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#064E3B',
                        }}
                      >
                        3. MATRIZ DE ATIVIDADES PRÁTICAS E METODOLOGIA EXTENSIONISTA (12 HORAS)
                      </div>
                      <div>
                        {cert.axes.map((axis, idx) => (
                          <div
                            key={axis.id}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '295px 1fr 90px',
                              alignItems: 'center',
                              padding: '7px 14px',
                              borderBottom:
                                idx < cert.axes.length - 1 ? '1px solid #CCD6E0' : 'none',
                              gap: '12px',
                            }}
                          >
                            <div
                              style={{
                                borderRight: '1px solid #E3E8F0',
                                paddingRight: '10px',
                              }}
                            >
                              <div
                                style={{
                                  fontSize: '10.2px',
                                  fontWeight: 700,
                                  color: '#0A1D56',
                                  lineHeight: 1.25,
                                }}
                              >
                                {axis.axisTitle}
                              </div>
                              <div
                                style={{
                                  fontSize: '9.2px',
                                  color: '#475569',
                                  marginTop: '2px',
                                }}
                              >
                                {axis.subtitle}
                              </div>
                            </div>
                            <div
                              style={{
                                fontSize: '10.4px',
                                color: '#0F172A',
                                lineHeight: 1.35,
                              }}
                            >
                              {axis.description}
                            </div>
                            <div
                              style={{
                                borderLeft: '1px solid #E3E8F0',
                                paddingLeft: '10px',
                                textAlign: 'right',
                                fontFamily: "'Courier New', Courier, monospace",
                                fontSize: '11px',
                                fontWeight: 700,
                                color: '#064E3B',
                              }}
                            >
                              {axis.hours}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. REGISTRO OFICIAL DE FÉ PÚBLICA E LINKS CLICÁVEIS */}
                    <div
                      style={{
                        marginTop: '11px',
                        backgroundColor: '#FFFAEB',
                        border: '1.3px solid #D97706',
                        padding: '9px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '14px',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#92400E',
                            marginBottom: '4px',
                          }}
                        >
                          4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO DE
                          AUTENTICIDADE
                        </div>
                        <div
                          style={{
                            fontSize: '10.5px',
                            color: '#0F172A',
                            lineHeight: 1.35,
                            marginBottom: '5px',
                          }}
                        >
                          Certificado registrado sob o nº {cert.certNumber} no Livro de Extensão nº{' '}
                          {cert.bookNumber}, Folha {cert.sheetNumber}, expedido pela Editora Mente e
                          Saúde (CNPJ: {cert.issuer1.cnpj}) e Centro Profissionalizante Maria Dalva
                          de Araújo (CNPJ: {cert.issuer2.cnpj}).
                        </div>
                        <div
                          style={{
                            fontFamily: "'Courier New', Courier, monospace",
                            fontSize: '9.8px',
                            lineHeight: 1.45,
                            fontWeight: 700,
                          }}
                        >
                          <div style={{ color: '#064E3B' }}>
                            CÓDIGO DE AUTENTICIDADE: {cert.verificationCode} &nbsp;|&nbsp; CHAVE DE
                            CONTROLE / DÍGITO: {cert.controlKey}
                          </div>
                          <div style={{ color: '#0A1D56' }}>
                            ENDEREÇO PARA VERIFICAÇÃO MANUAL (SEM QR CODE):{' '}
                            <a
                              href={fullVerificationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: '#0A1D56', textDecoration: 'underline' }}
                            >
                              {fullVerificationUrl}
                            </a>
                          </div>
                          <div style={{ color: '#0F172A' }}>HASH SHA-256: {cert.sha256Hash}</div>
                        </div>
                      </div>

                      <a
                        href={fullVerificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Abrir Validador Oficial"
                        style={{
                          backgroundColor: '#FFFFFF',
                          padding: '4px',
                          border: '1px solid #064E3B',
                          flexShrink: 0,
                          display: 'block',
                        }}
                      >
                        <QRCodeSVG
                          value={fullVerificationUrl}
                          size={86}
                          level="M"
                          bgColor="#FFFFFF"
                          fgColor="#0F172A"
                        />
                      </a>
                    </div>
                  </div>

                  {/* 5. ASSINATURAS DO VERSO */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      padding: '0 8px',
                    }}
                  >
                    {/* Esquerda */}
                    <div style={{ width: '275px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <SignatureBarbara width={185} height={50} />
                      </div>
                      <div style={{ borderTop: '1.3px solid #0F172A', paddingTop: '4px' }}>
                        <div style={{ fontSize: '10.2px', fontWeight: 700, color: '#064E3B' }}>
                          {cert.issuer1.signerName}
                        </div>
                        <div
                          style={{
                            fontSize: '8.4px',
                            fontFamily: "'Courier New', Courier, monospace",
                            color: '#064E3B',
                            fontWeight: 700,
                            marginTop: '1px',
                          }}
                        >
                          Editora Mente e Saúde (CNPJ: {cert.issuer1.cnpj})
                        </div>
                      </div>
                    </div>

                    {/* Centro */}
                    <div style={{ textAlign: 'center', paddingBottom: '1px' }}>
                      <div
                        style={{
                          fontFamily: "'Times New Roman', Times, Georgia, serif",
                          fontStyle: 'italic',
                          fontSize: '14px',
                          color: '#0F172A',
                          marginBottom: '2px',
                        }}
                      >
                        {cert.cityState}, {cert.issueDate}.
                      </div>
                      <div style={{ fontSize: '9.2px', fontWeight: 700, color: '#475569' }}>
                        Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o Território
                        Nacional
                      </div>
                      <div
                        style={{
                          fontSize: '8.4px',
                          fontFamily: "'Courier New', Courier, monospace",
                          color: '#064E3B',
                          marginTop: '2px',
                        }}
                      >
                        Registro: {cert.verificationCode} · Chave: {cert.controlKey}
                      </div>
                    </div>

                    {/* Direita */}
                    <div style={{ width: '275px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <SignatureJames width={185} height={50} />
                      </div>
                      <div style={{ borderTop: '1.3px solid #0F172A', paddingTop: '4px' }}>
                        <div style={{ fontSize: '10.2px', fontWeight: 700, color: '#0A1D56' }}>
                          {cert.issuer2.signerName}
                        </div>
                        <div
                          style={{
                            fontSize: '8.4px',
                            fontFamily: "'Courier New', Courier, monospace",
                            color: '#0A1D56',
                            fontWeight: 700,
                            marginTop: '1px',
                          }}
                        >
                          {cert.issuer2.shortName} (CNPJ: {cert.issuer2.cnpj})
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
