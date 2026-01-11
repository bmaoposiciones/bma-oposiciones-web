
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-[#010724] text-white border-b border-white/5">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544776193-352d2364ded4?auto=format&fit=crop&q=80&w=2000" 
          alt="Bomberos SPEIS Alicante" 
          className="w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#010724] via-[#010724]/80 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        <div className="md:w-2/3">
          <div className="inline-block bg-white/10 border border-white/20 text-white text-[10px] font-black px-4 py-1 rounded-sm mb-6 uppercase tracking-[0.3em] backdrop-blur-md">
            PROYECTO EN FASE DE LANZAMIENTO
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black leading-[0.85] tracking-tighter mb-8 italic">
            ACADEMIA ONLINE <br/>
            <span className="text-white uppercase">OPOSICIONES A BOMBERO</span> <br/>
            <span className="text-[#ff2d21] uppercase">AYUNTAMIENTO DE ALICANTE.</span>
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-2xl font-medium leading-relaxed uppercase tracking-tight">
            ESTAMOS PREPARANDO EL SISTEMA TÉCNICO MÁS AVANZADO PARA LA PRÓXIMA CONVOCATORIA.
          </p>
          <div className="mt-12 flex flex-wrap gap-6">
            <button 
              onClick={onStart}
              className="bg-white text-black hover:bg-[#ff2d21] hover:text-white px-10 py-5 rounded-md font-black text-lg uppercase tracking-widest transition-all transform hover:scale-105 shadow-2xl"
            >
              ACCESO ALUMNOS
            </button>
          </div>
        </div>
        <div className="hidden md:block md:w-1/3 mt-12 md:mt-0">
          <div className="bg-black/40 border border-white/5 p-10 rounded-[3rem] backdrop-blur-2xl shadow-2xl">
            <div className="space-y-10">
                <div className="flex items-start space-x-6">
                  <span className="text-4xl font-black text-[#ff2d21]/40 tracking-tighter">01</span>
                  <div>
                    <h3 className="font-black uppercase tracking-wider text-sm">Temario Actualizado</h3>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase">Legislación y Específico 2025/26</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <span className="text-4xl font-black text-[#ff2d21]/40 tracking-tighter">02</span>
                  <div>
                    <h3 className="font-black uppercase tracking-wider text-sm">Protocolos SPEIS</h3>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase">Exclusivo Ayuntamiento Alicante</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <span className="text-4xl font-black text-[#ff2d21]/40 tracking-tighter">03</span>
                  <div>
                    <h3 className="font-black uppercase tracking-wider text-sm">Inteligencia Artificial</h3>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase">Simulacros y Tutoría 24/7</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
