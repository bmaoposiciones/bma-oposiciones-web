
import React from 'react';
import { PRICING_PLANS } from '../constants';
import { SubscriptionTier } from '../types';

interface PricingProps {
  onViewSyllabus?: () => void;
  onSelectPlan: (tier: SubscriptionTier) => void;
  onContactClick: () => void; // Nueva prop para abrir el modal de contacto
}

const Pricing: React.FC<PricingProps> = ({ onSelectPlan, onContactClick }) => {
  return (
    <div className="bg-[#010724] min-h-screen">
      {/* Cabecera de Página */}
      <div className="py-24 bg-gradient-to-b from-black/50 to-transparent border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white mb-6 uppercase leading-none">
            NUESTROS <span className="text-[#ff2d21]">PLANES</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-bold uppercase tracking-tight">
            ESTRATEGIAS DE FORMACIÓN ADAPTADAS A TU RITMO Y OBJETIVOS.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-[1800px] mx-auto px-4">
          {/* Grid de Tarjetas de Precios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-32">
            {PRICING_PLANS.map((plan, idx) => (
              <div 
                key={idx} 
                className={`relative rounded-2xl p-6 flex flex-col border transition-all duration-500 hover:-translate-y-2 ${
                  plan.highlight 
                    ? 'bg-white border-[#ff2d21] shadow-[0_20px_50px_rgba(255,45,33,0.2)] scale-105 z-10' 
                    : 'bg-[#050a30] border-white/5 shadow-2xl'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff2d21] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-xl">
                    MÁS PROFESIONAL
                  </div>
                )}
                
                <div className="flex-1">
                  <h3 className={`text-xl font-black mb-1 uppercase italic ${plan.highlight ? 'text-gray-900' : 'text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-[10px] mb-6 font-bold uppercase tracking-widest ${plan.highlight ? 'text-gray-500' : 'text-gray-400'}`}>
                    {plan.description}
                  </p>
                  <div className={`text-4xl font-black mb-8 italic tracking-tighter ${plan.highlight ? 'text-[#ff2d21]' : 'text-white'}`}>
                    {plan.price}
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className={`flex items-start text-[11px] font-bold uppercase tracking-tighter leading-tight ${plan.highlight ? 'text-gray-700' : 'text-gray-300'}`}>
                        <svg className={`w-4 h-4 mr-2 shrink-0 ${plan.highlight ? 'text-[#ff2d21]' : 'text-[#ff2d21]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  onClick={() => onSelectPlan(plan.tier)}
                  className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                    plan.highlight 
                      ? 'bg-[#ff2d21] text-white hover:brightness-110 shadow-lg' 
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  SELECCIONAR PLAN
                </button>
              </div>
            ))}
          </div>

          {/* Sección de Comparativa Detallada */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
                GUÍA DE <span className="text-[#ff2d21]">ELECCIÓN</span>
              </h2>
              <div className="h-1 w-24 bg-[#ff2d21] mx-auto"></div>
            </div>

            <div className="space-y-12">
              {[
                {
                  step: "1",
                  title: "FREE – 0€",
                  color: "bg-green-500",
                  textColor: "text-green-500",
                  desc: "3 temas legislación | 2 temas específicos | 1 test por tema",
                  goal: "Objetivo: Probar la plataforma, conocer la metodología y verificar la calidad de los materiales sin compromiso."
                },
                {
                  step: "2",
                  title: "BASIC – 49 €/mes",
                  color: "bg-blue-500",
                  textColor: "text-blue-500",
                  desc: "Temario completo bloqueado progresivamente | Tests ilimitados por tema desbloqueado",
                  goal: "Nota: Simulacros y Protocolos no incluidos. Ideal para el opositor que estudia a su aire pero necesita contenido actualizado."
                },
                {
                  step: "3",
                  title: "PROTOCOLOS – 285€/anual",
                  color: "bg-orange-500",
                  textColor: "text-orange-500",
                  desc: "Acceso total a los 11 protocolos municipales de Alicante | Visualización completa | Temas explicativos | Tests específicos",
                  goal: "El valor diferencial: Diseñado específicamente para asegurar la plaza en la fase de protocolos del SPEIS Alicante."
                },
                {
                  step: "4",
                  title: "BASIC + PROTOCOLOS – 70 €/mes",
                  color: "bg-purple-600",
                  textColor: "text-purple-500",
                  desc: "🔓 4 temas específicos/mes | 🔓 1 protocolo/mes | 🧪 Tests obligatorios para avanzar en el temario",
                  goal: "Formación Guiada: En 11-12 meses completas toda la formación de manera estructurada y constante."
                },
                {
                  step: "5",
                  title: "PREMIUM – 700 € (Anual)",
                  color: "bg-[#ff2d21]",
                  textColor: "text-[#ff2d21]",
                  desc: "🔓 TODO DESBLOQUEADO desde el día 1 | Temario completo | Tests ilimitados | Simulacros completos | Protocolos completos",
                  goal: "La Opción Profesional: Sin bloqueos ni esperas. El camino más directo y económico a medio plazo para la plaza."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                   <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white font-black text-xl shrink-0 shadow-lg group-hover:rotate-6 transition-transform`}>
                    {item.step}
                   </div>
                   <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex-1 hover:border-white/20 transition-all">
                      <h3 className={`text-2xl font-black ${item.textColor} uppercase italic mb-2 tracking-tighter`}>{item.title}</h3>
                      <p className="text-white text-sm font-black uppercase tracking-widest mb-4 leading-relaxed">{item.desc}</p>
                      <p className="text-gray-500 text-xs italic font-medium">{item.goal}</p>
                   </div>
                </div>
              ))}
            </div>

            <div className="mt-20 p-12 bg-[#ff2d21]/5 border border-[#ff2d21]/20 rounded-[3rem] text-center">
               <h4 className="text-xl font-black text-white uppercase italic mb-4">¿AÚN TIENES DUDAS?</h4>
               <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-8">Nuestros instructores pueden asesorarte personalmente sobre qué plan encaja mejor con tu situación actual.</p>
               <button 
                  onClick={onContactClick}
                  className="bg-white text-[#010724] px-10 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-transform"
               >
                  CONTACTAR CON ACADEMIA
               </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
