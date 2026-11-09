/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Eye,
  BookOpen,
  HeartPulse,
  Microscope,
} from 'lucide-react';
import { CERTIFICATE_03_DATA } from './data/certificate03Data';
import { Certificate03Viewer } from './components/Certificate03Viewer';
import { RetinopathySimulator } from './components/RetinopathySimulator';
import { PamphletAndRiskSection } from './components/PamphletAndRiskSection';
import { AuthenticityValidator } from './components/AuthenticityValidator';
import { LogoEditoraMenteSaude, LogoCentroMariaDalva } from './components/CertificateAssets';

export default function App() {
  const cert = CERTIFICATE_03_DATA;

  const [verificationBaseUrl, setVerificationBaseUrl] = useState<string>(
    'https://extensao-saude-retinopatia-ocular.vercel.app'
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917]">
      {/* TOP NAVIGATION BAR — 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-xs border-b border-[#E6E2D8]">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#topo"
            className="text-lg font-editorial font-bold tracking-tight text-[#0F4C3A] whitespace-nowrap shrink-0"
          >
            Extensão Mente &amp; Saúde
          </a>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#57534E]">
            <a
              href="#certificado-oficial"
              className="hover:text-[#0F4C3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Certificado Nº 03
            </a>
            <a
              href="#fisiopatologia-retiniana"
              className="hover:text-[#0F4C3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Retinopatia Diabética
            </a>
            <a
              href="#simulador-retinopatia"
              className="hover:text-[#0F4C3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Simulador Ocular
            </a>
            <a
              href="#cartilha-e-triagem"
              className="hover:text-[#0F4C3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Folheto &amp; Cartilha
            </a>
            <a
              href="#validador"
              className="hover:text-[#0F4C3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Validador Oficial
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('certificado-oficial')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0F4C3A] hover:bg-[#0b382b] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Certificado PDF (2 Laudas)
            </button>
          </div>
        </div>
      </header>

      <main id="topo" className="flex-1">
        {/* HERO SECTION — Editorial Científico e Institucional Oftalmológico */}
        <section className="pt-10 pb-14 md:pt-14 md:pb-20 border-b border-[#E6E2D8] bg-gradient-to-b from-[#FAF8F5] to-[#F4F0E8]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
            {/* Operational Utility Strip (Unboxed Editorial Metadata) */}
            <div className="mb-8 pb-4 border-b border-[#DED9CE] flex flex-wrap items-center justify-between gap-4 text-xs text-[#57534E]">
              <div className="flex flex-wrap items-center gap-2 font-mono-tabular">
                <span className="text-[#0F4C3A] font-semibold">
                  PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA E EDUCAÇÃO EM SAÚDE
                </span>
                <span aria-hidden="true">·</span>
                <span>CERTIFICADO Nº {cert.certNumber}</span>
                <span aria-hidden="true">·</span>
                <span>LIVRO {cert.bookNumber}, FOLHA {cert.sheetNumber}</span>
              </div>

              <div className="flex items-center gap-2 font-mono-tabular text-[#1B365D] font-semibold">
                <span>CÓDIGO OFICIAL: {cert.verificationCode}</span>
                <span aria-hidden="true">·</span>
                <span>CHAVE: {cert.controlKey}</span>
              </div>
            </div>

            {/* 2-Column Split Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#B45309] font-semibold mb-3">
                    <span>SAÚDE OCULAR COMUNITÁRIA</span>
                    <span aria-hidden="true">·</span>
                    <span>PREVENÇÃO DA CEGUEIRA EVITÁVEL</span>
                    <span aria-hidden="true">·</span>
                    <span>EDITAL ITEM 08</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-editorial font-semibold text-[#1C1917] leading-[1.13] tracking-tight text-balance">
                    Ação Comunitária de Educação em Saúde: Entrega de Folhetos Ilustrados e Cartilhas Digitais sobre Prevenção da Retinopatia Diabética
                  </h1>

                  <p className="mt-5 text-base sm:text-lg text-[#44403C] leading-relaxed max-w-2xl">
                    Publicação institucional e acervo documental da campanha educativa conduzida pelo médico{' '}
                    <strong className="text-[#1C1917]">{cert.holderName}</strong> ({cert.holderInstitution}), dedicada à conscientização de pacientes portadores de Diabetes Mellitus e familiares sobre o controle da Hemoglobina Glicada (HbA1c), a detecção precoce do Edema Macular Diabético e o acesso ao exame anual de <strong>Mapeamento de Retina no SUS</strong>.
                  </p>
                </div>

                {/* CTAs do Hero */}
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => scrollToSection('certificado-oficial')}
                    className="px-5 py-3.5 bg-[#0F4C3A] hover:bg-[#0b382b] text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2.5 whitespace-nowrap cursor-pointer shadow-xs"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Visualizar e Baixar Certificado Nº 03 (PDF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('validador')}
                    className="px-5 py-3.5 bg-white hover:bg-[#FAF8F5] text-[#1C1917] border border-[#D6D3CD] text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#0F4C3A]" />
                    <span>Autenticar Código {cert.verificationCode}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('simulador-retinopatia')}
                    className="px-4 py-3.5 bg-[#1B365D] hover:bg-[#13294B] text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-[#93C5FD]" />
                    <span>Explorar Simulador de Retina</span>
                  </button>
                </div>
              </div>

              {/* Card Institucional de Fé Pública e Credenciais da Ação */}
              <div className="lg:col-span-5 bg-white border border-[#D6D3CD] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E6E2D8]">
                    <div className="flex items-center gap-3">
                      <LogoEditoraMenteSaude size={52} showBadgeBg={true} />
                      <LogoCentroMariaDalva size={52} />
                    </div>
                    <div className="text-right font-mono-tabular">
                      <div className="text-[11px] uppercase text-[#57534E]">Certificação Interinstitucional</div>
                      <div className="text-xs font-bold text-[#0F4C3A] flex items-center justify-end gap-1 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>FÉ PÚBLICA VERIFICADA</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3.5 text-xs sm:text-sm">
                    <div>
                      <div className="text-[11px] font-mono-tabular uppercase text-[#57534E]">
                        Profissional Médico Extensionista
                      </div>
                      <div className="font-editorial font-bold text-[#1C1917] text-lg mt-0.5">
                        {cert.holderName}
                      </div>
                      <div className="text-xs font-mono-tabular text-[#44403C] mt-0.5">
                        {cert.holderRole} · CPF: {cert.holderCpf} · {cert.holderInstitution}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E6E2D8]">
                      <div className="text-[11px] font-mono-tabular uppercase text-[#57534E]">
                        Entidades Promotoras e Certificadoras
                      </div>
                      <div className="text-xs text-[#1C1917] mt-1.5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <strong>{cert.issuer1.name}</strong>
                          <span className="font-mono-tabular text-[#57534E]">CNPJ: {cert.issuer1.cnpj}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <strong>{cert.issuer2.shortName.toUpperCase()}</strong>
                          <span className="font-mono-tabular text-[#57534E]">CNPJ: {cert.issuer2.cnpj}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E6E2D8] grid grid-cols-2 gap-3 font-mono-tabular text-xs">
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E6E2D8]">
                    <div className="text-[10px] uppercase text-[#57534E]">Código de Verificação</div>
                    <div className="font-bold text-[#0F4C3A] mt-0.5 text-sm">{cert.verificationCode}</div>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E6E2D8]">
                    <div className="text-[10px] uppercase text-[#57534E]">Chave de Controle</div>
                    <div className="font-bold text-[#1B365D] mt-0.5 text-sm">{cert.controlKey}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Proof & Outreach Strip */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-[#D6D3CD] rounded-xl p-4">
                <div className="text-xs font-mono-tabular uppercase text-[#57534E]">
                  Período e Carga Horária
                </div>
                <div className="text-2xl font-editorial font-bold text-[#0F4C3A] mt-1 font-mono-tabular">
                  12 Horas (4 Eixos)
                </div>
                <div className="text-xs text-[#57534E] mt-1">
                  Realização: {cert.period} · Emissão: {cert.issueDate}
                </div>
              </div>

              <div className="bg-white border border-[#D6D3CD] rounded-xl p-4">
                <div className="text-xs font-mono-tabular uppercase text-[#57534E]">
                  Enquadramento Acadêmico
                </div>
                <div className="text-2xl font-editorial font-bold text-[#1B365D] mt-1">
                  Item 08 · Extensão
                </div>
                <div className="text-xs text-[#57534E] mt-1">
                  Atividade Comunitária, Campanha Educativa e Coleta de Dados
                </div>
              </div>

              <div className="bg-white border border-[#D6D3CD] rounded-xl p-4">
                <div className="text-xs font-mono-tabular uppercase text-[#57534E]">
                  Entregas Editoriais e Digitais
                </div>
                <div className="text-2xl font-editorial font-bold text-[#1C1917] mt-1">
                  Folhetos &amp; Cartilha
                </div>
                <div className="text-xs text-[#57534E] mt-1">
                  Material impresso comunitário e lâminas mobile p/ WhatsApp
                </div>
              </div>

              <div className="bg-white border border-[#D6D3CD] rounded-xl p-4">
                <div className="text-xs font-mono-tabular uppercase text-[#57534E]">
                  Escrituração e Fé Pública
                </div>
                <div className="text-2xl font-editorial font-bold text-[#B45309] mt-1 font-mono-tabular">
                  Livro 01/2024 · Fl. 19
                </div>
                <div className="text-xs text-[#57534E] mt-1">
                  Documento de 2 laudas com validação via QR Code e SHA-256
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 1: CERTIFICADO Nº 03 EM ESTILO PDF NATIVO (FRENTE E VERSO) + DOWNLOAD PDF */}
        <Certificate03Viewer
          verificationBaseUrl={verificationBaseUrl}
          onChangeVerificationBaseUrl={setVerificationBaseUrl}
          onTriggerVerifyModal={() => scrollToSection('validador')}
        />

        {/* SEÇÃO 2: FUNDAMENTAÇÃO CLÍNICA E EPIDEMIOLÓGICA SOBRE RETINOPATIA DIABÉTICA */}
        <section id="fisiopatologia-retiniana" className="py-14 md:py-20 border-b border-[#E6E2D8] bg-[#F5F2EB]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-10">
              <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#0F4C3A] mb-2">
                <span>FUNDAMENTAÇÃO CIENTÍFICA DA CAMPANHA COMUNITÁRIA</span>
                <span aria-hidden="true">·</span>
                <span>OFTALMOLOGIA PREVENTIVA</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-semibold text-[#1C1917] tracking-tight text-balance">
                Por Que a Retinopatia Diabética Exige Educação Comunitária e Triagem Precoce?
              </h2>
              <p className="mt-3 text-base text-[#44403C] leading-relaxed">
                A Retinopatia Diabética é a principal causa de cegueira evitável na população economicamente ativa. Por evoluir de modo silencioso nos estágios iniciais, a educação em saúde voltada ao paciente e à família é o elo decisivo entre a Atenção Primária (UBS) e o exame oftalmológico especializado.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pilar 1 */}
              <div className="bg-white border border-[#D6D3CD] rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-[#0F4C3A] font-semibold mb-3">
                    <span>01 · MICROANGIOPATIA RETINIANA</span>
                    <Microscope className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-editorial font-bold text-[#1C1917] mb-2">
                    Do Dano Capilar Silencioso ao Edema Macular
                  </h3>
                  <p className="text-sm text-[#44403C] leading-relaxed">
                    A hiperglicemia persistente provoca apoptose dos pericitos e quebra da barreira hematorretiniana interna. Surgem microaneurismas, hemorragias intrarretinianas e extravasamento lipídico (exsudatos duros) na mácula antes que o paciente perceba queda na acuidade visual.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E6E2D8] text-xs font-mono-tabular text-[#57534E]">
                  Foco da Cartilha: Explicar que enxergar bem hoje não exclui lesão inicial na retina.
                </div>
              </div>

              {/* Pilar 2 */}
              <div className="bg-white border border-[#D6D3CD] rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-[#1B365D] font-semibold mb-3">
                    <span>02 · CONTROLE METABÓLICO INTEGRADO</span>
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-editorial font-bold text-[#1C1917] mb-2">
                    A Tríade de Proteção: HbA1c, Pressão Arterial e Lipídios
                  </h3>
                  <p className="text-sm text-[#44403C] leading-relaxed">
                    Grandes estudos clínicos (DCCT e UKPDS) demonstram que cada redução de 1% na Hemoglobina Glicada (HbA1c), aliada ao controle da hipertensão arterial sistêmica, reduz em mais de 35% o risco de desenvolvimento e progressão da retinopatia.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E6E2D8] text-xs font-mono-tabular text-[#57534E]">
                  Foco do Folheto: Traduzir o exame de HbA1c em metas claras para a família.
                </div>
              </div>

              {/* Pilar 3 */}
              <div className="bg-white border border-[#D6D3CD] rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-[#B45309] font-semibold mb-3">
                    <span>03 · INFODEMIOLOGIA E ACESSO AO SUS</span>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-editorial font-bold text-[#1C1917] mb-2">
                    Combate a Colírios Caseiros e Fluxo de Regulação no SUS
                  </h3>
                  <p className="text-sm text-[#44403C] leading-relaxed">
                    Pacientes idosos e diabéticos são frequentemente alvo de desinformação digital prometendo "reversão do diabetes ocular" com gotas naturais. A ação extensionista substitui boatos perigosos pelo passo a passo de acesso ao Mapeamento de Retina na rede pública.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E6E2D8] text-xs font-mono-tabular text-[#57534E]">
                  Foco Comunitário: Proteger contra automedicação e orientar o uso do Meu SUS Digital.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 3: SIMULADOR INTERATIVO DE RETINOPATIA DIABÉTICA E FUNDO DE OLHO */}
        <RetinopathySimulator />

        {/* SEÇÃO 4: LEITOR DA CARTILHA DIGITAL DE WHATSAPP / FOLHETO + CHECKLIST DE TRIAGEM */}
        <PamphletAndRiskSection />

        {/* SEÇÃO 5: MEMORIAL METODOLÓGICO E ESCOPO TÉCNICO-CIENTÍFICO (4 EIXOS) */}
        <section id="metodologia-extensao" className="py-14 md:py-20 border-b border-[#E6E2D8]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-10">
              <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#0F4C3A] mb-2">
                <span>04. MEMORIAL DESCRITIVO E MATRIZ CURRICULAR (ITEM 08)</span>
                <span aria-hidden="true">·</span>
                <span>12 HORAS AUDITADAS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-semibold text-[#1C1917] tracking-tight text-balance">
                Detalhamento Metodológico dos 4 Eixos de Extensão
              </h2>
              <p className="mt-2 text-base text-[#57534E]">
                Registro integral das atividades práticas desenvolvidas pelo médico extensionista e averbadas no Verso Oficial (Lauda 2) do Certificado Nº 03.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {cert.axes.map((axis) => (
                <div
                  key={axis.id}
                  className="bg-white border border-[#D6D3CD] rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs font-mono-tabular text-[#0F4C3A] font-semibold mb-2">
                      <span>EIXO METODOLÓGICO {axis.id}</span>
                      <span>CARGA HORÁRIA: {axis.hours}</span>
                    </div>
                    <h3 className="text-lg font-editorial font-bold text-[#1C1917]">
                      {axis.axisTitle}
                    </h3>
                    <div className="text-xs font-medium text-[#1B365D] mt-0.5 mb-3">
                      {axis.subtitle}
                    </div>
                    <p className="text-sm text-[#44403C] leading-relaxed">{axis.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E6E2D8] flex items-center justify-between text-xs text-[#57534E] font-mono-tabular">
                    <span>Certificado Nº {cert.certNumber} · Livro {cert.bookNumber}, Fl. {cert.sheetNumber}</span>
                    <span className="text-[#0F4C3A] font-semibold">Averbação Oficial</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quadro de Diretrizes Científicas e Canais Oficiais Divulgados */}
            <div className="bg-white border border-[#D6D3CD] rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#1B365D] font-bold mb-2">
                  Referencial Normativo e Canais Públicos Orientados à População
                </div>
                <h3 className="text-xl font-editorial font-bold text-[#1C1917] mb-2">
                  Articulação com a Linha de Cuidado do Diabetes Mellitus na Rede Pública (SUS)
                </h3>
                <p className="text-sm text-[#44403C] leading-relaxed">
                  Todos os folhetos ilustrados e cartilhas digitais distribuídos na campanha seguem as recomendações oficiais do{' '}
                  <strong>Conselho Brasileiro de Oftalmologia (CBO)</strong>, da{' '}
                  <strong>Sociedade Brasileira de Diabetes (SBD)</strong> e do{' '}
                  <strong>Ministério da Saúde</strong>, promovendo a busca ativa do exame anual de fundo de olho via Atenção Primária à Saúde (UBS) e o acompanhamento pelo aplicativo <strong>Meu SUS Digital</strong>.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-2.5 text-xs font-mono-tabular">
                <a
                  href="https://meususdigital.saude.gov.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#FAF8F5] hover:bg-[#F5F2EB] border border-[#D6D3CD] rounded-xl flex items-center justify-between text-[#1C1917] transition-colors"
                >
                  <span>Portal Meu SUS Digital (Gov.br)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0F4C3A]" />
                </a>
                <a
                  href="https://www.cbo.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#FAF8F5] hover:bg-[#F5F2EB] border border-[#D6D3CD] rounded-xl flex items-center justify-between text-[#1C1917] transition-colors"
                >
                  <span>Conselho Brasileiro de Oftalmologia</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0F4C3A]" />
                </a>
                <a
                  href="https://diabetes.org.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#FAF8F5] hover:bg-[#F5F2EB] border border-[#D6D3CD] rounded-xl flex items-center justify-between text-[#1C1917] transition-colors"
                >
                  <span>Sociedade Brasileira de Diabetes</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0F4C3A]" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 6: SISTEMA AUTENTICADOR PÚBLICO E VERIFICAÇÃO DE QR CODE */}
        <AuthenticityValidator
          verificationBaseUrl={verificationBaseUrl}
          onScrollToCertificate={() => scrollToSection('certificado-oficial')}
        />
      </main>

      {/* RODAPÉ INSTITUCIONAL */}
      <footer className="bg-[#1C1917] text-[#E7E5E4] py-12 border-t border-[#292524]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#292524]">
            <div className="md:col-span-5">
              <div className="text-lg font-editorial font-bold text-white mb-2">
                Programa Interinstitucional de Extensão e Educação em Saúde
              </div>
              <p className="text-xs text-[#A8A29E] leading-relaxed max-w-md">
                Plataforma oficial de publicação de materiais educativos comunitários sobre Prevenção da Retinopatia Diabética e verificação pública de autenticidade documental.
              </p>
            </div>

            <div className="md:col-span-4 space-y-2 text-xs">
              <div className="font-mono-tabular uppercase text-[#D4AF37] font-semibold">
                Instituições Certificadoras
              </div>
              <div className="text-[#E7E5E4]">
                <strong>{cert.issuer1.name}</strong> · CNPJ: {cert.issuer1.cnpj}
              </div>
              <div className="text-[#E7E5E4]">
                <strong>{cert.issuer2.name}</strong> · CNPJ: {cert.issuer2.cnpj}
              </div>
              <div className="text-[#A8A29E] font-mono-tabular pt-1">
                Registro Ativo: {cert.verificationCode} · Chave: {cert.controlKey}
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between gap-3">
              <button
                type="button"
                onClick={() => scrollToSection('certificado-oficial')}
                className="px-4 py-2.5 bg-[#0F4C3A] hover:bg-[#0b382b] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Acessar Certificado Nº 03 (PDF)
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('validador')}
                className="text-xs text-[#A7F3D0] hover:underline font-mono-tabular cursor-pointer"
              >
                Consultar Validador de Fé Pública
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C] font-mono-tabular">
            <div>
              © 2024–2026 Editora Mente e Saúde &amp; Centro Profissionalizante Maria Dalva de Araújo. Fé Pública Documental.
            </div>
            <div>Hash SHA-256: {cert.sha256Hash}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
