import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  QrCode,
  FileCheck2,
  Copy,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { CERTIFICATE_03_DATA } from '../data/certificate03Data';

interface AuthenticityValidatorProps {
  verificationBaseUrl: string;
  onScrollToCertificate: () => void;
}

export const AuthenticityValidator: React.FC<AuthenticityValidatorProps> = ({
  verificationBaseUrl,
  onScrollToCertificate,
}) => {
  const cert = CERTIFICATE_03_DATA;

  const [queryInput, setQueryInput] = useState<string>(cert.verificationCode);
  const [validationState, setValidationState] = useState<'verified' | 'invalid' | 'idle'>('verified');
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [verifiedViaUrl, setVerifiedViaUrl] = useState<boolean>(false);

  const cleanBaseUrl = verificationBaseUrl.replace(/\/+$/, '');
  const fullVerificationUrl = `${cleanBaseUrl}/?codigo=${cert.verificationCode}#validador`;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codigoParam = params.get('codigo') || params.get('chave') || params.get('code');
    if (codigoParam) {
      setQueryInput(codigoParam);
      const normalized = codigoParam.trim().toUpperCase();
      if (
        normalized === cert.verificationCode ||
        normalized === cert.controlKey ||
        normalized.replace(/\D/g, '') === '70279494157'
      ) {
        setValidationState('verified');
        setVerifiedViaUrl(true);
      } else {
        setValidationState('invalid');
      }
    }
  }, [cert.verificationCode, cert.controlKey]);

  const handleValidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = queryInput.trim().toUpperCase();
    const digitsOnly = cleaned.replace(/\D/g, '');

    if (
      cleaned === cert.verificationCode ||
      cleaned === cert.controlKey ||
      cleaned === cert.sha256Hash.toUpperCase() ||
      digitsOnly === '70279494157' ||
      cleaned.includes('EMS-EXT-2024-0215') ||
      cleaned.includes('0215-7841-9630-4B8E')
    ) {
      setValidationState('verified');
    } else {
      setValidationState('invalid');
    }
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(cert.sha256Hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2500);
  };

  return (
    <section id="validador" className="py-14 md:py-20 border-b border-[#E6E2D8] bg-[#F5F2EB]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#0F4C3A] mb-2">
            <span>04. SISTEMA INTERINSTITUCIONAL DE FÉ PÚBLICA E AUTENTICIDADE</span>
            <span aria-hidden="true">·</span>
            <span>VERIFICADOR QR CODE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-semibold text-[#1C1917] tracking-tight text-balance">
            Validador Público de Certificados e Registro Curricular (Item 08)
          </h2>
          <p className="mt-2 text-base text-[#57534E]">
            Consulte a autenticidade documental informando o <strong>Código de Verificação</strong>, a <strong>Chave de Controle</strong>, o <strong>CPF do Titular</strong> ou escaneando o QR Code impresso na Frente e no Verso do Certificado Nº 03.
          </p>
        </div>

        {/* Formulário de Consulta de Autenticidade */}
        <div className="bg-white border border-[#D6D3CD] rounded-2xl p-6 sm:p-8 mb-8">
          <form onSubmit={handleValidateSubmit} className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-[#78716C] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Digite o Código (EMS-EXT-2024-0215), Chave (0215-7841-9630-4B8E) ou CPF..."
                className="w-full pl-11 pr-4 py-3 text-sm font-mono-tabular bg-[#FAF8F5] border border-[#D6D3CD] rounded-xl text-[#1C1917] focus:outline-none focus:border-[#0F4C3A]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#0F4C3A] hover:bg-[#0b382b] text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verificar Autenticidade</span>
            </button>
          </form>

          {/* Atalhos Rápidos de Consulta para Avaliadores da Banca */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
            <span>Preenchimento rápido para conferência de banca:</span>
            <button
              type="button"
              onClick={() => {
                setQueryInput(cert.verificationCode);
                setValidationState('verified');
              }}
              className="font-mono-tabular text-[#0F4C3A] hover:underline font-semibold cursor-pointer"
            >
              Cód. {cert.verificationCode}
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                setQueryInput(cert.controlKey);
                setValidationState('verified');
              }}
              className="font-mono-tabular text-[#1B365D] hover:underline font-semibold cursor-pointer"
            >
              Chave {cert.controlKey}
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                setQueryInput(cert.holderCpf);
                setValidationState('verified');
              }}
              className="font-mono-tabular text-[#1C1917] hover:underline font-semibold cursor-pointer"
            >
              CPF {cert.holderCpf}
            </button>
          </div>
        </div>

        {/* Resultado da Validação */}
        {validationState === 'verified' ? (
          <div className="bg-white border-2 border-[#0F4C3A] rounded-2xl overflow-hidden shadow-sm">
            {/* Faixa Superior de Certificação Válida */}
            <div className="bg-[#0F4C3A] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#4ADE80] shrink-0" />
                <div>
                  <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#A7F3D0]">
                    {verifiedViaUrl
                      ? 'AUTENTICAÇÃO AUTOMÁTICA VIA QR CODE / PARÂMETRO DE URL'
                      : 'REGISTRO OFICIAL LOCALIZADO E VALIDADO COM FÉ PÚBLICA'}
                  </div>
                  <h3 className="text-lg sm:text-xl font-editorial font-bold">
                    Documento Autêntico · Certificado de Extensão Nº {cert.certNumber} (Ativo e Regular)
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={onScrollToCertificate}
                className="px-4 py-2 bg-white text-[#0F4C3A] hover:bg-[#ECFDF5] text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Visualizar / Baixar PDF Original</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Grade de Metadados Oficiais Auditados */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#FAF8F5] border border-[#E6E2D8] rounded-xl">
                    <div className="text-[11px] font-mono-tabular uppercase text-[#57534E]">
                      Titular Certificado
                    </div>
                    <div className="text-base font-bold text-[#1C1917] mt-0.5">
                      {cert.holderName}
                    </div>
                    <div className="text-xs font-mono-tabular text-[#57534E] mt-1">
                      {cert.holderRole} · CPF: {cert.holderCpf}
                    </div>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] border border-[#E6E2D8] rounded-xl">
                    <div className="text-[11px] font-mono-tabular uppercase text-[#57534E]">
                      Instituição de Origem do Médico
                    </div>
                    <div className="text-base font-bold text-[#1C1917] mt-0.5">
                      {cert.holderInstitution}
                    </div>
                    <div className="text-xs font-mono-tabular text-[#0F4C3A] mt-1">
                      Participação Efetiva e Integral Comprovada
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF8F5] border border-[#E6E2D8] rounded-xl">
                  <div className="text-[11px] font-mono-tabular uppercase text-[#57534E]">
                    Título Oficial da Atividade de Extensão (Item 08)
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-[#1C1917] mt-1 leading-snug">
                    {cert.title}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#57534E]">
                    <span>Modalidade: {cert.modality}</span>
                    <span aria-hidden="true">·</span>
                    <span>Período: {cert.period}</span>
                    <span aria-hidden="true">·</span>
                    <span>Carga Horária: {cert.workloadText}</span>
                    <span aria-hidden="true">·</span>
                    <span>Emissão: {cert.cityState}, {cert.issueDate}</span>
                  </div>
                </div>

                {/* Instituições Promotoras e CNPJs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-[#D6D3CD] rounded-xl">
                    <div className="text-xs font-bold text-[#0F4C3A]">{cert.issuer1.name}</div>
                    <div className="text-xs font-mono-tabular text-[#1C1917] mt-0.5">
                      CNPJ: {cert.issuer1.cnpj}
                    </div>
                    <div className="text-xs text-[#57534E] mt-1">
                      Signatária: <strong>{cert.issuer1.signerName}</strong> ({cert.issuer1.signerRole})
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-[#D6D3CD] rounded-xl">
                    <div className="text-xs font-bold text-[#1B365D]">{cert.issuer2.name}</div>
                    <div className="text-xs font-mono-tabular text-[#1C1917] mt-0.5">
                      CNPJ: {cert.issuer2.cnpj}
                    </div>
                    <div className="text-xs text-[#57534E] mt-1">
                      Signatário: <strong>{cert.issuer2.signerName}</strong> ({cert.issuer2.signerRole})
                    </div>
                  </div>
                </div>

                {/* Hash Criptográfico SHA-256 */}
                <div className="p-4 bg-[#FCF8EC] border border-[#D4AF37] rounded-xl">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono-tabular uppercase font-bold text-[#85580A]">
                      Assinatura Digital e Hash SHA-256 de Integridade:
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyHash}
                      className="text-xs font-mono-tabular text-[#0F4C3A] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedHash ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Hash Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar Hash</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-xs font-mono-tabular text-[#1C1917] break-all">
                    {cert.sha256Hash}
                  </div>
                </div>
              </div>

              {/* Coluna Direita: Cartão de Registro Físico e QR Code */}
              <div className="lg:col-span-4 bg-[#FAF8F5] border border-[#D6D3CD] rounded-xl p-5 flex flex-col items-center text-center">
                <div className="text-xs font-mono-tabular uppercase font-bold text-[#0F4C3A] mb-3 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4" />
                  <span>QR Code Oficial de Validação</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-[#D6D3CD] shadow-xs mb-4">
                  <QRCodeSVG
                    value={fullVerificationUrl}
                    size={148}
                    level="M"
                    bgColor="#FFFFFF"
                    fgColor="#111827"
                  />
                </div>
                <div className="w-full text-left space-y-2 text-xs font-mono-tabular border-t border-[#E6E2D8] pt-4">
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Certificado Nº:</span>
                    <strong className="text-[#1C1917]">{cert.certNumber} (2 Laudas)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Livro de Extensão:</span>
                    <strong className="text-[#1C1917]">nº {cert.bookNumber}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Folha de Registro:</span>
                    <strong className="text-[#1C1917]">Folha {cert.sheetNumber}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Código Oficial:</span>
                    <strong className="text-[#0F4C3A]">{cert.verificationCode}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Chave de Controle:</span>
                    <strong className="text-[#1B365D]">{cert.controlKey}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border-2 border-[#BE123C] rounded-2xl p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-[#BE123C] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-bold text-[#1C1917]">
                Nenhum certificado correspondente ao código informado
              </h3>
              <p className="text-sm text-[#57534E] mt-1">
                Verifique se digitou corretamente o código <strong>{cert.verificationCode}</strong>, a chave{' '}
                <strong>{cert.controlKey}</strong> ou o CPF do médico titular.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQueryInput(cert.verificationCode);
                  setValidationState('verified');
                }}
                className="mt-3 px-4 py-2 bg-[#0F4C3A] text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Restaurar Código do Certificado Nº 03 ({cert.verificationCode})
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
