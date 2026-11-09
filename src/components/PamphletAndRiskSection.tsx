import React, { useState } from 'react';
import {
  BookOpen,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  ClipboardCheck,
  ShieldAlert,
  HeartPulse,
  RotateCcw,
} from 'lucide-react';
import { PAMPHLET_PAGES } from '../data/certificate03Data';

export const PamphletAndRiskSection: React.FC = () => {
  // Estado do Leitor de Cartilha / Folheto
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [formatMode, setFormatMode] = useState<'print' | 'whatsapp'>('print');
  const [copiedWhatsapp, setCopiedWhatsapp] = useState<boolean>(false);

  // Estado da Calculadora / Checklist de Risco Glicêmico e Triagem Ocular
  const [diabetesYears, setDiabetesYears] = useState<'menos_5' | '5_a_10' | 'mais_10'>('5_a_10');
  const [hba1cStatus, setHba1cStatus] = useState<'controlada' | 'acima_7' | 'acima_9' | 'nao_sei'>('acima_7');
  const [lastFundusExam, setLastFundusExam] = useState<'menos_1_ano' | 'mais_1_ano' | 'nunca'>('mais_1_ano');
  const [hasHypertension, setHasHypertension] = useState<boolean>(true);
  const [hasVisualSymptoms, setHasVisualSymptoms] = useState<boolean>(false);
  const [submittedAssessment, setSubmittedAssessment] = useState<boolean>(false);

  const currentPage = PAMPHLET_PAGES[activePageIndex];

  const handleCopyWhatsapp = () => {
    navigator.clipboard.writeText(currentPage.whatsappSnippet);
    setCopiedWhatsapp(true);
    setTimeout(() => setCopiedWhatsapp(false), 2500);
  };

  // Cálculo educativo de prioridade de triagem no SUS
  const calculateRiskProfile = () => {
    let score = 0;
    if (diabetesYears === '5_a_10') score += 2;
    if (diabetesYears === 'mais_10') score += 4;
    if (hba1cStatus === 'acima_7') score += 2;
    if (hba1cStatus === 'acima_9' || hba1cStatus === 'nao_sei') score += 4;
    if (lastFundusExam === 'mais_1_ano') score += 2;
    if (lastFundusExam === 'nunca') score += 4;
    if (hasHypertension) score += 2;
    if (hasVisualSymptoms) score += 5;

    if (hasVisualSymptoms || score >= 10) {
      return {
        level: 'PRIORIDADE ALTA — AVALIAÇÃO OFTALMOLÓGICA IMEDIATA',
        colorClass: 'text-[#BE123C]',
        borderClass: 'border-[#BE123C]',
        bgClass: 'bg-[#FFF1F2]',
        summary:
          'Presença de fatores de risco cumulativos importantes ou sintomas visuais ativos. Recomenda-se procurar sua Unidade Básica de Saúde (UBS) ou serviço oftalmológico de referência do SUS com brevidade para realização de Mapeamento de Retina (Exame de Fundo de Olho sob dilatação pupilar).',
        steps: [
          'Se houver manchas escuras súbitas, flashes ou perda rápida de visão, procure pronto-atendimento oftalmológico do SUS imediatamente.',
          'Leve seus últimos exames de glicemia de jejum e Hemoglobina Glicada (HbA1c) à consulta médica na UBS.',
          'Nunca utilize colírios caseiros ou receitas da internet para tentar clarear a visão.',
        ],
      };
    } else if (score >= 5) {
      return {
        level: 'PRIORIDADE MODERADA — AGENDAR EXAME ANUAL DE FUNDO DE OLHO',
        colorClass: 'text-[#B45309]',
        borderClass: 'border-[#B45309]',
        bgClass: 'bg-[#FFFBEB]',
        summary:
          'Mesmo sem sintomas visuais severos no momento, o tempo de diagnóstico ou o atraso na revisão anual justificam agendar o Mapeamento de Retina preventivo na rede pública (SUS).',
        steps: [
          'Solicite na sua UBS o encaminhamento anual para Oftalmologia / Mapeamento de Retina via Regulação (SISREG).',
          'Mantenha o controle rigoroso da pressão arterial e busque a meta de HbA1c orientada pela equipe de saúde.',
          'Acompanhe o agendamento pelo aplicativo oficial Meu SUS Digital.',
        ],
      };
    }
    return {
      level: 'ROTINA PREVENTIVA — MANTER EXAME ANUAL E CONTROLE GLICÊMICO',
      colorClass: 'text-[#0F4C3A]',
      borderClass: 'border-[#0F4C3A]',
      bgClass: 'bg-[#ECFDF5]',
      summary:
        'Excelente adesão ao cuidado preventivo! A Retinopatia Diabética é silenciosa nas fases iniciais, portanto mantenha sua rotina de revisão oftalmológica a cada 12 meses.',
      steps: [
        'Continue realizando o exame de fundo de olho anualmente pelo SUS.',
        'Mantenha a alimentação equilibrada, atividade física regular e uso correto dos medicamentos do programa Farmácia Popular.',
        'Compartilhe a Cartilha Digital com outros familiares portadores de diabetes.',
      ],
    };
  };

  const riskProfile = calculateRiskProfile();

  return (
    <section id="cartilha-e-triagem" className="py-14 md:py-20 border-b border-[#E6E2D8]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* PARTE A: LEITOR INTERATIVO DO FOLHETO ILUSTRADO E CARTILHA DIGITAL DE WHATSAPP */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#0F4C3A] mb-2">
                <span>02. PRODUÇÃO EDITORIAL E COMUNICAÇÃO COMUNITÁRIA</span>
                <span aria-hidden="true">·</span>
                <span>MATERIAL DISTRIBUÍDO</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-semibold text-[#1C1917] tracking-tight text-balance">
                Folheto Ilustrado & Cartilha Digital para WhatsApp (5 Lâminas)
              </h2>
              <p className="mt-2 text-base text-[#57534E] max-w-3xl">
                Material educativo elaborado pelo médico extensionista <strong>Lucas Gonçalves Silveira</strong> em parceria com o Conselho Editorial da <strong>Editora Mente e Saúde</strong> e o <strong>Centro Profissionalizante Maria Dalva de Araújo</strong>.
              </p>
            </div>

            {/* Alternador entre Modo Folheto Impresso e Modo Cartilha Mobile/WhatsApp */}
            <div className="flex items-center gap-1 p-1 bg-[#EBE6DF] rounded-lg self-start lg:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setFormatMode('print')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  formatMode === 'print'
                    ? 'bg-white text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#0F4C3A]" />
                <span>Versão Folheto Impresso</span>
              </button>
              <button
                type="button"
                onClick={() => setFormatMode('whatsapp')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  formatMode === 'whatsapp'
                    ? 'bg-white text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-[#0F4C3A]" />
                <span>Cartilha Mobile / WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Card Principal do Leitor da Cartilha */}
          <div className="bg-white border border-[#D6D3CD] rounded-2xl overflow-hidden">
            {/* Navegação de Lâminas no Topo */}
            <div className="bg-[#FAF8F5] border-b border-[#E6E2D8] px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {PAMPHLET_PAGES.map((page, index) => (
                  <button
                    key={page.pageNumber}
                    type="button"
                    onClick={() => setActivePageIndex(index)}
                    className={`px-3 py-1.5 text-xs font-mono-tabular font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      activePageIndex === index
                        ? 'bg-[#0F4C3A] text-white'
                        : 'bg-white text-[#57534E] border border-[#D6D3CD] hover:text-[#1C1917]'
                    }`}
                  >
                    Lâmina 0{page.pageNumber}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActivePageIndex((prev) =>
                      prev > 0 ? prev - 1 : PAMPHLET_PAGES.length - 1
                    )
                  }
                  className="p-2 rounded-lg bg-white border border-[#D6D3CD] hover:bg-[#F5F2EB] text-[#1C1917] transition-colors cursor-pointer"
                  title="Lâmina Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono-tabular text-[#57534E] px-2">
                  {currentPage.pageNumber} / {PAMPHLET_PAGES.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setActivePageIndex((prev) =>
                      prev < PAMPHLET_PAGES.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="p-2 rounded-lg bg-white border border-[#D6D3CD] hover:bg-[#F5F2EB] text-[#1C1917] transition-colors cursor-pointer"
                  title="Próxima Lâmina"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Corpo da Lâmina */}
            <div className="p-6 sm:p-8 lg:p-10">
              {formatMode === 'print' ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8">
                    <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#0F4C3A] font-semibold mb-2">
                      {currentPage.badge}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-[#1C1917] mb-2">
                      {currentPage.title}
                    </h3>
                    <p className="text-base text-[#57534E] mb-6">{currentPage.subtitle}</p>

                    <div className="space-y-3.5">
                      {currentPage.keyPoints.map((point, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-[#FAF8F5] border border-[#E6E2D8] rounded-xl text-sm sm:text-base text-[#1C1917] leading-relaxed flex items-start gap-3"
                        >
                          <span className="font-mono-tabular font-bold text-[#0F4C3A] shrink-0">
                            0{idx + 1}.
                          </span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Coluna Lateral do Folheto: Destaque Comunitário + Pílula de WhatsApp */}
                  <div className="lg:col-span-4 flex flex-col gap-5">
                    <div className="p-5 bg-[#FCF8EC] border border-[#D4AF37] rounded-xl">
                      <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#85580A] font-bold mb-2 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4" />
                        <span>Orientação Essencial à Comunidade</span>
                      </div>
                      <p className="text-sm text-[#1C1917] leading-relaxed">
                        {currentPage.alertBox}
                      </p>
                    </div>

                    <div className="p-5 bg-[#F3F6F9] border border-[#CBD5E1] rounded-xl">
                      <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#1B365D] font-bold mb-2">
                        Pílula de Disseminação no WhatsApp:
                      </div>
                      <p className="text-xs font-mono-tabular text-[#1E293B] bg-white p-3 rounded-lg border border-[#E2E8F0] leading-relaxed mb-3">
                        {currentPage.whatsappSnippet}
                      </p>
                      <button
                        type="button"
                        onClick={handleCopyWhatsapp}
                        className="w-full py-2.5 px-4 bg-[#0F4C3A] hover:bg-[#0b382b] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {copiedWhatsapp ? (
                          <>
                            <Check className="w-4 h-4 text-[#A7F3D0]" />
                            <span>Texto Copiado para Compartilhar!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copiar Mensagem Educativa p/ WhatsApp</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Visualização em Formato Card Mobile / WhatsApp */
                <div className="max-w-md mx-auto bg-[#ECE5DD] p-4 sm:p-6 rounded-2xl border border-[#D6D3CD]">
                  <div className="bg-[#075E54] text-white px-4 py-3 rounded-t-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold">Campanha Saúde Ocular & Diabetes</div>
                      <div className="text-[11px] text-[#A7F3D0]">
                        Cartilha Digital Verificada · Cód. EMS-EXT-2024-0215
                      </div>
                    </div>
                    <span className="text-xs font-mono-tabular bg-black/20 px-2 py-0.5 rounded">
                      0{currentPage.pageNumber}/05
                    </span>
                  </div>
                  <div className="bg-white p-5 rounded-b-xl shadow-xs space-y-3">
                    <div className="text-xs font-mono-tabular font-bold text-[#0F4C3A] uppercase">
                      {currentPage.badge}
                    </div>
                    <h4 className="text-lg font-editorial font-bold text-[#1C1917]">
                      {currentPage.title}
                    </h4>
                    <ul className="space-y-2 text-xs text-[#292524] leading-relaxed">
                      {currentPage.keyPoints.map((pt, i) => (
                        <li key={i} className="p-2.5 bg-[#FAF8F5] rounded border border-[#E6E2D8]">
                          • {pt}
                        </li>
                      ))}
                    </ul>
                    <div className="p-3 bg-[#FCF8EC] border border-[#D4AF37] rounded-lg text-xs text-[#1C1917]">
                      <strong>Lembrete SUS:</strong> {currentPage.alertBox}
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyWhatsapp}
                      className="w-full py-2.5 px-4 bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {copiedWhatsapp ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copiar Card para WhatsApp</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PARTE B: CALCULADORA / CHECKLIST INTERATIVO DE RISCO GLICÊMICO E TRIAGEM OCULAR */}
        <div className="bg-white border border-[#D6D3CD] rounded-2xl p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#1B365D] mb-2">
              <span>03. INSTRUMENTO DIGITAL DE TRIAGEM E LETRAMENTO EM SAÚDE</span>
              <span aria-hidden="true">·</span>
              <span>COLETA EDUCATIVA</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#1C1917]">
              Checklist Interativo de Risco Glicêmico e Prioridade de Exame de Fundo de Olho
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#57534E]">
              Simule o instrumento educativo aplicado à comunidade para orientar portadores de Diabetes Mellitus e familiares sobre a periodicidade ideal do Mapeamento de Retina no SUS.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Formulário Interativo */}
            <div className="lg:col-span-7 space-y-5">
              {/* 1. Tempo de Diagnóstico */}
              <div>
                <label className="block text-xs font-mono-tabular uppercase tracking-wider text-[#1C1917] font-semibold mb-2">
                  1. Tempo de diagnóstico de Diabetes Mellitus:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'menos_5', label: 'Menos de 5 anos' },
                    { id: '5_a_10', label: 'Entre 5 e 10 anos' },
                    { id: 'mais_10', label: 'Mais de 10 anos' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setDiabetesYears(opt.id as typeof diabetesYears);
                        setSubmittedAssessment(true);
                      }}
                      className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        diabetesYears === opt.id
                          ? 'bg-[#0F4C3A] text-white border-[#0F4C3A]'
                          : 'bg-[#FAF8F5] text-[#1C1917] border-[#D6D3CD] hover:bg-[#F5F2EB]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Controle da Hemoglobina Glicada */}
              <div>
                <label className="block text-xs font-mono-tabular uppercase tracking-wider text-[#1C1917] font-semibold mb-2">
                  2. Resultado da última Hemoglobina Glicada (HbA1c):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'controlada', label: 'Até 7,0% (Na meta)' },
                    { id: 'acima_7', label: 'Entre 7,1% e 8,9%' },
                    { id: 'acima_9', label: 'Acima de 9,0%' },
                    { id: 'nao_sei', label: 'Não realizou recente' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setHba1cStatus(opt.id as typeof hba1cStatus);
                        setSubmittedAssessment(true);
                      }}
                      className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        hba1cStatus === opt.id
                          ? 'bg-[#0F4C3A] text-white border-[#0F4C3A]'
                          : 'bg-[#FAF8F5] text-[#1C1917] border-[#D6D3CD] hover:bg-[#F5F2EB]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Último Exame de Fundo de Olho */}
              <div>
                <label className="block text-xs font-mono-tabular uppercase tracking-wider text-[#1C1917] font-semibold mb-2">
                  3. Quando realizou o último Exame de Fundo de Olho (Mapeamento de Retina)?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'menos_1_ano', label: 'Há menos de 1 ano' },
                    { id: 'mais_1_ano', label: 'Há mais de 1 ou 2 anos' },
                    { id: 'nunca', label: 'Nunca realizou o exame' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setLastFundusExam(opt.id as typeof lastFundusExam);
                        setSubmittedAssessment(true);
                      }}
                      className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        lastFundusExam === opt.id
                          ? 'bg-[#0F4C3A] text-white border-[#0F4C3A]'
                          : 'bg-[#FAF8F5] text-[#1C1917] border-[#D6D3CD] hover:bg-[#F5F2EB]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Condições Associadas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setHasHypertension((v) => !v);
                    setSubmittedAssessment(true);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-colors flex items-center justify-between cursor-pointer ${
                    hasHypertension
                      ? 'bg-[#1B365D] text-white border-[#1B365D]'
                      : 'bg-[#FAF8F5] text-[#1C1917] border-[#D6D3CD]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-semibold">Hipertensão Arterial ou Nefropatia</div>
                    <div
                      className={`text-[11px] ${
                        hasHypertension ? 'text-[#BFDBFE]' : 'text-[#57534E]'
                      }`}
                    >
                      Pressão alta associada ao diabetes
                    </div>
                  </div>
                  <span className="text-xs font-mono-tabular font-bold">
                    {hasHypertension ? 'SIM' : 'NÃO'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setHasVisualSymptoms((v) => !v);
                    setSubmittedAssessment(true);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-colors flex items-center justify-between cursor-pointer ${
                    hasVisualSymptoms
                      ? 'bg-[#BE123C] text-white border-[#BE123C]'
                      : 'bg-[#FAF8F5] text-[#1C1917] border-[#D6D3CD]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-semibold">Visão Borrada ou Manchas Móveis</div>
                    <div
                      className={`text-[11px] ${
                        hasVisualSymptoms ? 'text-[#FECDD3]' : 'text-[#57534E]'
                      }`}
                    >
                      Sintomas percebidos recentemente
                    </div>
                  </div>
                  <span className="text-xs font-mono-tabular font-bold">
                    {hasVisualSymptoms ? 'SIM' : 'NÃO'}
                  </span>
                </button>
              </div>
            </div>

            {/* Painel de Resultado Educativo e Encaminhamento no SUS */}
            <div className="lg:col-span-5">
              <div
                className={`p-6 rounded-2xl border ${riskProfile.borderClass} ${riskProfile.bgClass}`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-xs font-mono-tabular font-bold uppercase tracking-wider flex items-center gap-1.5 ${riskProfile.colorClass}`}
                  >
                    <HeartPulse className="w-4 h-4" />
                    <span>Resultado da Orientação Comunitária</span>
                  </span>
                  {submittedAssessment && (
                    <button
                      type="button"
                      onClick={() => {
                        setDiabetesYears('menos_5');
                        setHba1cStatus('controlada');
                        setLastFundusExam('menos_1_ano');
                        setHasHypertension(false);
                        setHasVisualSymptoms(false);
                        setSubmittedAssessment(false);
                      }}
                      className="text-xs text-[#57534E] hover:text-[#1C1917] flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reiniciar</span>
                    </button>
                  )}
                </div>

                <h4 className={`text-lg font-editorial font-bold mb-2 ${riskProfile.colorClass}`}>
                  {riskProfile.level}
                </h4>
                <p className="text-xs sm:text-sm text-[#1C1917] leading-relaxed mb-4">
                  {riskProfile.summary}
                </p>

                <div className="bg-white/90 border border-[#E6E2D8] rounded-xl p-4 space-y-2">
                  <div className="text-xs font-mono-tabular uppercase font-bold text-[#1C1917] flex items-center gap-1.5">
                    <ClipboardCheck className="w-4 h-4 text-[#0F4C3A]" />
                    <span>Recomendações Práticas de Cidadania no SUS:</span>
                  </div>
                  {riskProfile.steps.map((step, i) => (
                    <div key={i} className="text-xs text-[#292524] leading-relaxed flex items-start gap-2">
                      <span className="font-mono-tabular font-bold text-[#0F4C3A]">0{i + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
