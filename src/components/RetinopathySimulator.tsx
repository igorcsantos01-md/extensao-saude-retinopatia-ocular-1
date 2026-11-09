import React, { useState } from 'react';
import { Eye, Activity, AlertTriangle, CheckCircle, Sliders, Compass } from 'lucide-react';
import { RETINOPATHY_STAGES, RetinopathyStage } from '../data/certificate03Data';

export const RetinopathySimulator: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<RetinopathyStage['id']>('normal');
  const [viewTab, setViewTab] = useState<'fundus' | 'patient_vision'>('fundus');
  const [hba1c, setHba1c] = useState<number>(6.4);
  const [selectedHotspot, setSelectedHotspot] = useState<string>('macula');

  const currentStage =
    RETINOPATHY_STAGES.find((s) => s.id === selectedStageId) || RETINOPATHY_STAGES[0];

  const handleStageSelect = (stage: RetinopathyStage) => {
    setSelectedStageId(stage.id);
    if (stage.id === 'normal') setHba1c(6.4);
    if (stage.id === 'rdnp_leve') setHba1c(7.9);
    if (stage.id === 'rdnp_grave') setHba1c(9.2);
    if (stage.id === 'rdp_emd') setHba1c(10.8);
  };

  const handleHba1cSlider = (val: number) => {
    setHba1c(val);
    if (val < 7.2) setSelectedStageId('normal');
    else if (val < 8.5) setSelectedStageId('rdnp_leve');
    else if (val < 9.9) setSelectedStageId('rdnp_grave');
    else setSelectedStageId('rdp_emd');
  };

  const hotspotDetails: Record<string, { title: string; text: string }> = {
    disco: {
      title: 'Disco Óptico (Cabeça do Nervo Óptico)',
      text:
        currentStage.id === 'rdp_emd'
          ? 'Presença de Neovascularização do Disco (NVD): vasos anômalos e frágeis formados em resposta à isquemia retiniana severa, com alto risco de sangramento vítreo.'
          : 'Ponto de convergência das fibras nervosas da retina e emergência dos vasos centrais. Apresenta contorno regular e coloração rósea fisiológica.',
    },
    macula: {
      title: 'Mácula e Fóvea (Centro da Visão de Detalhes e Leitura)',
      text:
        currentStage.id === 'normal'
          ? 'Mácula íntegra e avascular no centro foveal, garantindo acuidade visual 20/20 para leitura e reconhecimento facial.'
          : currentStage.id === 'rdnp_leve'
          ? 'Discretos microaneurismas perifoveais sem espessamento clinicamente significativo do centro macular.'
          : 'Edema Macular Diabético e exsudatos duros lipídicos (pontos amarelados brilhantes) próximos à fóvea, provocando borramento e distorção central (metamorfopsia).',
    },
    vasos: {
      title: 'Arcadas Vasculares Retinianas (Artérias e Veias)',
      text:
        currentStage.id === 'normal'
          ? 'Paredes endoteliais preservadas com barreira hematorretiniana íntegra, sem extravasamento de plasma ou hemácias.'
          : 'A hiperglicemia crônica causa perda dos pericitos capilares, formando microaneurismas, hemorragias em chama de vela/borrão e áreas de não perfusão capilar.',
    },
  };

  return (
    <section id="simulador-retinopatia" className="py-14 md:py-20 border-b border-[#E6E2D8]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Cabeçalho Editorial da Seção */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#0F4C3A] mb-2">
            <span>01. FISIOPATOLOGIA INTERATIVA E EDUCAÇÃO VISUAL</span>
            <span aria-hidden="true">·</span>
            <span>MAPEAMENTO DE RETINA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-semibold text-[#1C1917] tracking-tight text-balance">
            Simulador Clínico: O Impacto da Glicemia na Retina e na Acuidade Visual
          </h2>
          <p className="mt-3 text-base text-[#57534E] leading-relaxed">
            Explore como o descontrole glicêmico prolongado afeta os microvasos da retina antes mesmo de o paciente notar perda visual. Alterne entre o <strong>Exame de Fundo de Olho (Fundoscopia)</strong> e a <strong>Visão Simulada do Paciente</strong>.
          </p>
        </div>

        {/* Layout Sandbox de 2 Zonas (65% Palco Visual Interativo / 35% Deck de Controle) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* ZONA ESQUERDA: PALCO INTERATIVO (7 COLUNAS) */}
          <div className="lg:col-span-7 bg-white border border-[#D6D3CD] rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
            {/* Barra Superior do Palco: Alternador de Modo Visual + Indicador de Acuidade */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E6E2D8]">
              <div className="flex items-center gap-1 p-1 bg-[#F5F2EB] rounded-lg">
                <button
                  type="button"
                  onClick={() => setViewTab('fundus')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    viewTab === 'fundus'
                      ? 'bg-[#0F4C3A] text-white shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Exame de Fundo de Olho (Retinografia)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewTab('patient_vision')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    viewTab === 'patient_vision'
                      ? 'bg-[#0F4C3A] text-white shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Visão do Paciente no Dia a Dia</span>
                </button>
              </div>

              <div className="text-xs font-mono-tabular text-[#57534E]">
                <span>Acuidade Estimada: </span>
                <strong className="text-[#1C1917]">{currentStage.visualAcuity}</strong>
              </div>
            </div>

            {/* Canvas Visual Principal */}
            <div className="my-5 relative rounded-xl overflow-hidden bg-[#140C0A] border border-[#292524] min-h-[360px] flex items-center justify-center">
              {viewTab === 'fundus' ? (
                /* DIAGRAMA OFTALMOSCÓPICO INTERATIVO DO FUNDO DE OLHO */
                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                  <svg
                    viewBox="0 0 520 340"
                    className="w-full max-w-[500px] h-auto select-none"
                    aria-label="Simulação de Exame de Fundo de Olho"
                  >
                    <defs>
                      <radialGradient id="retinaBg" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#D9532F" />
                        <stop offset="68%" stopColor="#B8331A" />
                        <stop offset="92%" stopColor="#7C1D10" />
                        <stop offset="100%" stopColor="#1C0B08" />
                      </radialGradient>
                      <radialGradient id="maculaGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#68180D" stopOpacity="0.88" />
                        <stop offset="55%" stopColor="#9A2615" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#D9532F" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="opticDiscGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FFF7D6" />
                        <stop offset="70%" stopColor="#FCD34D" />
                        <stop offset="100%" stopColor="#D97706" />
                      </radialGradient>
                    </defs>

                    {/* Moldura da Lente Oftalmoscópica */}
                    <rect width="520" height="340" fill="#120907" />
                    <circle
                      cx="260"
                      cy="170"
                      r="155"
                      fill="url(#retinaBg)"
                      stroke="#3E1F18"
                      strokeWidth="6"
                    />

                    {/* Arcadas Vasculares Retinianas (Artérias e Veias Superiores e Inferiores) */}
                    <g strokeLinecap="round" fill="none">
                      {/* Veia temporal superior */}
                      <path
                        d="M175 162 C195 110, 255 75, 345 78 C375 79, 395 92, 405 102"
                        stroke="#7F1111"
                        strokeWidth={currentStage.id === 'rdnp_grave' || currentStage.id === 'rdp_emd' ? '5.2' : '4'}
                      />
                      {/* Artéria temporal superior */}
                      <path
                        d="M175 165 C205 120, 265 92, 355 95"
                        stroke="#EF4444"
                        strokeWidth="2.4"
                      />
                      {/* Ramos capilares superiores */}
                      <path
                        d="M250 96 C265 120, 280 132, 292 140 M310 82 C318 110, 312 128, 305 142"
                        stroke="#991B1B"
                        strokeWidth="1.6"
                      />

                      {/* Veia temporal inferior */}
                      <path
                        d="M175 176 C200 228, 260 262, 348 258 C378 256, 396 242, 406 230"
                        stroke="#7F1111"
                        strokeWidth={currentStage.id === 'rdnp_grave' || currentStage.id === 'rdp_emd' ? '5.2' : '4'}
                      />
                      {/* Artéria temporal inferior */}
                      <path
                        d="M175 173 C210 218, 270 245, 355 242"
                        stroke="#EF4444"
                        strokeWidth="2.4"
                      />
                      {/* Ramos capilares inferiores */}
                      <path
                        d="M252 242 C268 218, 282 204, 294 196 M315 254 C320 226, 314 206, 306 194"
                        stroke="#991B1B"
                        strokeWidth="1.6"
                      />

                      {/* Ramos nasais (esquerda do disco óptico) */}
                      <path
                        d="M168 162 C148 130, 128 112, 115 105 M168 176 C148 208, 128 228, 116 235"
                        stroke="#881313"
                        strokeWidth="3"
                      />
                    </g>

                    {/* Região da Mácula e Fóvea (Centro da Visão) */}
                    <circle cx="295" cy="170" r="42" fill="url(#maculaGrad)" />

                    {/* Edema Macular Diabético (se estágio avançado) */}
                    {currentStage.macularDistortion && (
                      <g>
                        <circle
                          cx="295"
                          cy="170"
                          r="32"
                          fill="#FDE047"
                          fillOpacity="0.16"
                          stroke="#FACC15"
                          strokeWidth="1.2"
                          strokeDasharray="3 3"
                        />
                      </g>
                    )}

                    {/* Disco Óptico (Nervo Óptico) */}
                    <ellipse
                      cx="172"
                      cy="170"
                      rx="22"
                      ry="26"
                      fill="url(#opticDiscGrad)"
                    />

                    {/* Exsudatos Duros (Depósitos Lipídicos Amarelo-Brilhantes) */}
                    {currentStage.exudates > 0 && (
                      <g fill="#FEF08A" opacity="0.92">
                        <circle cx="268" cy="152" r="2.8" />
                        <circle cx="274" cy="147" r="2.2" />
                        <circle cx="318" cy="184" r="3" />
                        <circle cx="324" cy="178" r="2.1" />
                        {currentStage.exudates >= 6 && (
                          <>
                            <circle cx="278" cy="188" r="3.2" />
                            <circle cx="285" cy="193" r="2.5" />
                            <circle cx="312" cy="148" r="3.1" />
                            <circle cx="319" cy="154" r="2.4" />
                            {/* Manchas algodonosas (isquemia focal) */}
                            <ellipse cx="238" cy="122" rx="9" ry="6" fill="#FFFBEB" fillOpacity="0.65" />
                            <ellipse cx="246" cy="218" rx="10" ry="6" fill="#FFFBEB" fillOpacity="0.65" />
                          </>
                        )}
                      </g>
                    )}

                    {/* Microaneurismas e Hemorragias Intrarretinianas */}
                    {currentStage.microaneurysms > 0 && (
                      <g fill="#450A0A">
                        <circle cx="255" cy="142" r="2.2" />
                        <circle cx="326" cy="160" r="2" />
                        <circle cx="282" cy="135" r="1.8" />
                        <circle cx="308" cy="202" r="2.2" />
                        <circle cx="262" cy="196" r="2" />
                        <circle cx="338" cy="176" r="1.9" />
                      </g>
                    )}

                    {currentStage.hemorrhages >= 6 && (
                      <g fill="#3B0707" opacity="0.88">
                        <ellipse cx="232" cy="146" rx="6" ry="4" transform="rotate(-15 232 146)" />
                        <ellipse cx="342" cy="134" rx="7" ry="4.5" transform="rotate(20 342 134)" />
                        <ellipse cx="335" cy="208" rx="6.5" ry="4" transform="rotate(-25 335 208)" />
                        <ellipse cx="225" cy="198" rx="5.5" ry="3.8" />
                        <ellipse cx="288" cy="116" rx="6" ry="3.5" />
                      </g>
                    )}

                    {/* Neovasos e Hemorragia Pré-Retiniana (Estágio 4: Proliferativa) */}
                    {currentStage.neovessels && (
                      <g>
                        {/* Neovasos no disco (NVD) */}
                        <path
                          d="M172 165 C182 152, 194 156, 188 168 C198 164, 202 176, 190 180 C184 188, 174 182, 176 173"
                          stroke="#DC2626"
                          strokeWidth="1.5"
                          fill="none"
                        />
                        {/* Hemorragia vítrea / pré-retiniana extensa */}
                        <path
                          d="M272 158 C285 148, 312 152, 316 168 C320 182, 302 192, 282 186 C268 181, 264 166, 272 158 Z"
                          fill="#2A0404"
                          fillOpacity="0.82"
                        />
                      </g>
                    )}

                    {/* Marcadores Interativos de Anatomia da Retina */}
                    <g
                      onClick={() => setSelectedHotspot('disco')}
                      className="cursor-pointer"
                    >
                      <circle
                        cx="172"
                        cy="170"
                        r="29"
                        fill="none"
                        stroke={selectedHotspot === 'disco' ? '#FFFFFF' : '#FDE047'}
                        strokeWidth={selectedHotspot === 'disco' ? '2.2' : '1.2'}
                        strokeDasharray="4 2"
                      />
                      <text x="172" y="212" textAnchor="middle" fill="#FEF08A" fontSize="10" fontWeight="700">
                        Disco Óptico
                      </text>
                    </g>

                    <g
                      onClick={() => setSelectedHotspot('macula')}
                      className="cursor-pointer"
                    >
                      <circle
                        cx="295"
                        cy="170"
                        r="36"
                        fill="none"
                        stroke={selectedHotspot === 'macula' ? '#FFFFFF' : '#38BDF8'}
                        strokeWidth={selectedHotspot === 'macula' ? '2.2' : '1.2'}
                        strokeDasharray="4 2"
                      />
                      <text x="295" y="220" textAnchor="middle" fill="#BAE6FD" fontSize="10" fontWeight="700">
                        Mácula / Fóvea
                      </text>
                    </g>

                    <g
                      onClick={() => setSelectedHotspot('vasos')}
                      className="cursor-pointer"
                    >
                      <circle
                        cx="310"
                        cy="90"
                        r="18"
                        fill="none"
                        stroke={selectedHotspot === 'vasos' ? '#FFFFFF' : '#FCA5A5'}
                        strokeWidth={selectedHotspot === 'vasos' ? '2.2' : '1.2'}
                      />
                      <text x="310" y="66" textAnchor="middle" fill="#FECACA" fontSize="10" fontWeight="700">
                        Arcada Vascular
                      </text>
                    </g>
                  </svg>

                  {/* Legenda Interativa do Ponto Anatômico Selecionado */}
                  <div className="w-full mt-2 bg-[#1F1614] border border-[#3E2723] rounded-lg p-3.5 text-left">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-[#FDE047] flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" />
                        <span>{hotspotDetails[selectedHotspot].title}</span>
                      </span>
                      <span className="text-[11px] text-[#A8A29E]">
                        Clique nas regiões demarcadas da retina
                      </span>
                    </div>
                    <p className="text-xs text-[#E7E5E4] leading-relaxed">
                      {hotspotDetails[selectedHotspot].text}
                    </p>
                  </div>
                </div>
              ) : (
                /* SIMULADOR DE CAMPO VISUAL DO PACIENTE */
                <div className="w-full h-full min-h-[360px] relative flex flex-col justify-between p-6 bg-gradient-to-br from-[#E0F2FE] via-[#FEF3C7] to-[#DCFCE7] overflow-hidden">
                  {/* Cena Cotidiana Simulada (Consultório / Leitura de Receituário ePlaca) */}
                  <div
                    style={{
                      filter: `blur(${currentStage.blurPx}px) contrast(${
                        currentStage.id === 'rdnp_grave' || currentStage.id === 'rdp_emd' ? 0.78 : 1
                      })`,
                      transform: currentStage.macularDistortion ? 'skewX(-1.5deg) scale(1.01)' : 'none',
                      transition: 'all 180ms ease-out',
                    }}
                    className="max-w-lg mx-auto w-full bg-white/95 border border-[#D6D3CD] rounded-xl p-5 shadow-md text-[#1C1917] my-auto"
                  >
                    <div className="flex items-center justify-between border-b border-[#E6E2D8] pb-3 mb-3">
                      <div>
                        <div className="text-[11px] font-mono-tabular uppercase text-[#0F4C3A] font-semibold">
                          UNIDADE BÁSICA DE SAÚDE — RECEITUÁRIO E CONTROLE GLICÊMICO
                        </div>
                        <div className="text-lg font-editorial font-bold text-[#1C1917]">
                          Cartão de Acompanhamento do Paciente Diabético
                        </div>
                      </div>
                      <div className="text-right font-mono-tabular">
                        <div className="text-xs text-[#57534E]">Glicemia de Jejum</div>
                        <div className="text-base font-bold text-[#0F4C3A]">98 mg/dL</div>
                      </div>
                    </div>
                    <p className="text-sm text-[#292524] leading-relaxed mb-3">
                      <strong>Orientação de Leitura:</strong> Tomar Metformina 850mg após o café da manhã e o jantar. Comparecer ao exame anual de <strong>Mapeamento de Retina</strong> no Centro de Especialidades.
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E6E2D8] text-center font-mono-tabular text-xs">
                      <div className="p-2 bg-[#FAF8F5] rounded">
                        <div className="text-[#57534E]">HbA1c Meta</div>
                        <div className="font-bold text-[#1C1917]">&lt; 7,0%</div>
                      </div>
                      <div className="p-2 bg-[#FAF8F5] rounded">
                        <div className="text-[#57534E]">Pressão Arterial</div>
                        <div className="font-bold text-[#1C1917]">120/80 mmHg</div>
                      </div>
                      <div className="p-2 bg-[#FAF8F5] rounded">
                        <div className="text-[#57534E]">Fundo de Olho</div>
                        <div className="font-bold text-[#0F4C3A]">Anual (SUS)</div>
                      </div>
                    </div>
                  </div>

                  {/* Camada de Escotomas / Manchas Móveis (Hemorragia Vítrea e Edema Macular) */}
                  {currentStage.scotomaOpacity > 0 && (
                    <div
                      className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200"
                      style={{ opacity: currentStage.scotomaOpacity }}
                    >
                      {/* Escotoma central macular */}
                      <div
                        className="w-48 h-48 rounded-full"
                        style={{
                          background:
                            'radial-gradient(circle, rgba(20,12,10,0.92) 0%, rgba(45,20,15,0.65) 48%, rgba(0,0,0,0) 75%)',
                        }}
                      />
                      {/* Manchas flutuantes periféricas */}
                      {currentStage.floatersCount >= 5 && (
                        <>
                          <div
                            className="w-28 h-16 rounded-full absolute top-12 left-16"
                            style={{
                              background:
                                'radial-gradient(circle, rgba(28,10,10,0.85) 0%, rgba(0,0,0,0) 72%)',
                            }}
                          />
                          <div
                            className="w-32 h-20 rounded-full absolute bottom-12 right-16"
                            style={{
                              background:
                                'radial-gradient(circle, rgba(28,10,10,0.85) 0%, rgba(0,0,0,0) 72%)',
                            }}
                          />
                        </>
                      )}
                    </div>
                  )}

                  <div className="relative z-10 mt-3 bg-[#1C1917]/90 text-white px-4 py-2.5 rounded-lg text-xs flex items-center justify-between">
                    <span>
                      <strong>Percepção do Paciente:</strong> {currentStage.patientSymptom}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Achados Clínicos de Fundoscopia do Estágio Selecionado */}
            <div className="bg-[#FAF8F5] border border-[#E6E2D8] rounded-xl p-4">
              <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#0F4C3A] font-semibold mb-2">
                Achados Oftalmoscópicos no Exame de Fundo de Olho ({currentStage.name}):
              </div>
              <ul className="space-y-1.5">
                {currentStage.fundusFindings.map((finding, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-[#292524] flex items-start gap-2">
                    <span className="font-mono-tabular text-[#0F4C3A] font-bold">•</span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ZONA DIREITA: PAINEL DE CONTROLE CLÍNICO E ESTÁGIOS (5 COLUNAS) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Controle Deslizante de Hemoglobina Glicada (HbA1c) */}
            <div className="bg-white border border-[#D6D3CD] rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="hba1c-slider"
                  className="text-xs font-mono-tabular uppercase tracking-wider text-[#57534E] font-semibold flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#0F4C3A]" />
                  <span>Simular Nível Crônico de HbA1c:</span>
                </label>
                <span
                  className={`text-lg font-mono-tabular font-bold ${
                    hba1c < 7.2
                      ? 'text-[#0F4C3A]'
                      : hba1c < 8.6
                      ? 'text-[#B45309]'
                      : 'text-[#BE123C]'
                  }`}
                >
                  {hba1c.toFixed(1)}%
                </span>
              </div>

              <input
                id="hba1c-slider"
                type="range"
                min={5.5}
                max={11.5}
                step={0.1}
                value={hba1c}
                onChange={(e) => handleHba1cSlider(parseFloat(e.target.value))}
                className="w-full accent-[#0F4C3A] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono-tabular text-[#78716C] mt-1">
                <span>5,5% (Controle Ideal)</span>
                <span>8,0% (Alerta)</span>
                <span>11,5% (Alto Risco)</span>
              </div>
            </div>

            {/* Seletor dos 4 Estágios Evolutivos */}
            <div className="bg-white border border-[#D6D3CD] rounded-2xl p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#1C1917] mb-3">
                  Selecione o Estágio Clínico para Comparar:
                </h3>
                <div className="space-y-2.5">
                  {RETINOPATHY_STAGES.map((stage) => {
                    const isSelected = stage.id === selectedStageId;
                    return (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => handleStageSelect(stage)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0F4C3A] text-white border-[#0F4C3A]'
                            : 'bg-[#FAF8F5] hover:bg-[#F5F2EB] text-[#1C1917] border-[#E6E2D8]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold">{stage.name}</span>
                          <span
                            className={`text-[11px] font-mono-tabular ${
                              isSelected ? 'text-[#A7F3D0]' : 'text-[#57534E]'
                            }`}
                          >
                            {stage.clinicalTag}
                          </span>
                        </div>
                        <div
                          className={`text-xs mt-1 font-mono-tabular ${
                            isSelected ? 'text-[#E7E5E4]' : 'text-[#78716C]'
                          }`}
                        >
                          {stage.hba1cRange}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Conduta Oficial Recomendada no SUS */}
              <div className="mt-5 pt-4 border-t border-[#E6E2D8]">
                <div className="flex items-start gap-2.5">
                  {currentStage.id === 'normal' ? (
                    <CheckCircle className="w-4 h-4 text-[#0F4C3A] shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#0F4C3A] font-semibold">
                      Conduta na Linha de Cuidado do SUS:
                    </div>
                    <p className="text-xs sm:text-sm text-[#292524] mt-1 leading-relaxed">
                      {currentStage.susConduct}
                    </p>
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
