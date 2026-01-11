
import React, { useState, useMemo, useEffect } from 'react';
import { TOPICS } from '../constants';

interface SyllabusProps {
  onBack?: () => void;
  initialFilter?: string;
}

type CategoryFilter = 'ALL' | 'LEGISLATIVO' | 'IVASPE' | 'ALICANTE_PROTOCOL' | 'GENERAL_SPECIFIC';

const Syllabus: React.FC<SyllabusProps> = ({ onBack, initialFilter = 'ALL' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(initialFilter as CategoryFilter);

  useEffect(() => {
    setActiveCategory(initialFilter as CategoryFilter);
  }, [initialFilter]);

  const filteredTopics = useMemo(() => {
    return TOPICS.filter(topic => {
      const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           topic.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesCategory = false;
      if (activeCategory === 'ALL') {
        matchesCategory = true;
      } else if (activeCategory === 'GENERAL_SPECIFIC') {
        matchesCategory = topic.category === 'LEGISLATIVO' || topic.category === 'IVASPE';
      } else {
        matchesCategory = topic.category === activeCategory;
      }

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const legislativoTopics = filteredTopics.filter(t => t.category === 'LEGISLATIVO');
  const ivaspeTopics = filteredTopics.filter(t => t.category === 'IVASPE');
  const alicanteTopics = filteredTopics.filter(t => t.category === 'ALICANTE_PROTOCOL');

  const renderTopicSection = (title: string, topics: typeof TOPICS, blockLabel: string, bgColor: string, accentColor: string, externalLink?: string) => {
    if (topics.length === 0) return null;

    return (
      <section className="mb-24">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-12 gap-4">
          <div className="flex items-center space-x-6">
            <div className={`${bgColor} text-white px-6 py-2 text-2xl font-black italic skew-x-[-12deg]`}>
                {blockLabel}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">{title}</h2>
          </div>
          {externalLink && (
            <a 
              href={externalLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-black uppercase tracking-widest text-[#ff2d21] border border-[#ff2d21]/30 px-4 py-2 rounded hover:bg-[#ff2d21] hover:text-white transition-all flex items-center w-fit"
            >
              <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              Descargar Completo (GVA)
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/[0.08] transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className={`${accentColor} font-black text-xl italic tracking-widest`}>{topic.id}</span>
                {topic.isFree && (
                  <span className="bg-green-500/10 text-green-500 text-[10px] font-black px-2 py-1 rounded uppercase border border-green-500/20">Acceso Libre</span>
                )}
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic mb-3 group-hover:text-[#ff2d21] transition-colors">{topic.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{topic.description}</p>
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center text-[10px] font-black text-gray-600 uppercase tracking-widest">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Incluye Video-Clase y PDF Técnico
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="bg-[#010724] min-h-screen pb-24">
      <div className="relative py-24 bg-gradient-to-b from-black/50 to-transparent border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
            {onBack && (
                <button 
                    onClick={onBack}
                    className="mb-8 text-[#ff2d21] font-black uppercase tracking-widest flex items-center justify-center mx-auto hover:scale-105 transition-transform"
                >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    VOLVER ATRÁS
                </button>
            )}
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white mb-6 uppercase leading-none">
            {activeCategory === 'ALICANTE_PROTOCOL' ? 'PROTOCOLOS' : 'TEMARIO'} <span className="text-[#ff2d21]">{activeCategory === 'ALICANTE_PROTOCOL' ? 'ALICANTE' : 'GENERAL Y ESPECÍFICO'}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-bold uppercase tracking-tight">
            Estructura oficial actualizada para la convocatoria del Ayuntamiento de Alicante.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 mb-16">
        <div className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-[2.5rem] backdrop-blur-md">
          <div className="flex flex-col lg:flex-row gap-8 items-end">
            <div className="w-full lg:flex-1">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4 ml-1">Buscar por palabra clave</label>
              <div className="relative">
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Escribe aquí tu búsqueda..."
                  className="w-full bg-[#010724]/60 border border-white/10 rounded-2xl px-6 py-5 text-white text-xl font-bold focus:ring-2 focus:ring-[#ff2d21] focus:border-transparent outline-none transition-all placeholder:text-gray-700"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4 ml-1">Filtrar por bloque</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'ALL', label: 'Ver Todo' },
                  { id: 'GENERAL_SPECIFIC', label: 'General + Específico' },
                  { id: 'ALICANTE_PROTOCOL', label: 'Protocolos' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveCategory(filter.id as CategoryFilter)}
                    className={`px-5 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all border ${
                      activeCategory === filter.id 
                        ? 'bg-[#ff2d21] border-[#ff2d21] text-white shadow-lg shadow-red-900/30' 
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-2">
        {filteredTopics.length > 0 ? (
          <>
            {renderTopicSection('CONOCIMIENTOS GENERALES', legislativoTopics, 'ANEXO II TEMARIO', 'bg-gray-600', 'text-gray-400')}
            {renderTopicSection('CONOCIMIENTOS ESPECÍFICOS', ivaspeTopics, 'BLOQUE II', 'bg-[#ff2d21]', 'text-[#ff2d21]', 'https://avsre.gva.es/es/web/ivaspe/publicacions')}

            {/* SECCIÓN PROTOCOLOS ALICANTE DETALLADA */}
            {alicanteTopics.length > 0 && (
              <section className="mb-24">
                <div className="flex items-center space-x-6 mb-12">
                  <div className="bg-[#ff2d21] text-white px-6 py-2 text-2xl font-black italic skew-x-[-12deg]">
                      PROTOCOLOS
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight">TEMAS ESPECÍFICOS SEGÚN ANEXO II DEL DECRETO 163/2019</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {alicanteTopics.map((topic) => (
                    <div key={topic.id} className="bg-[#0a1240] border-2 border-[#ff2d21]/20 p-8 rounded-2xl relative overflow-hidden group hover:border-[#ff2d21] transition-all flex flex-col h-full">
                      <div className="absolute top-0 right-0 p-4">
                          <svg className="w-8 h-8 text-[#ff2d21]/20 group-hover:text-[#ff2d21] transition-colors" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                      </div>
                      <span className="text-[#ff2d21] font-black text-lg italic block mb-2">{topic.id}</span>
                      <h3 className="text-xl font-black text-white uppercase italic leading-tight mb-4 group-hover:text-white">{topic.title}</h3>
                      <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter mb-6 opacity-70 flex-1">{topic.description}</p>
                      <div className="bg-[#ff2d21]/10 text-[#ff2d21] text-[9px] font-black p-2 rounded text-center border border-[#ff2d21]/20 uppercase">
                          Exclusivo Plan Premium / Protocolos
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="py-32 text-center bg-white/5 rounded-[3rem] border border-dashed border-white/10">
            <h3 className="text-3xl font-black text-white uppercase italic mb-4">No se han encontrado temas</h3>
            <button 
              onClick={() => { setSearchTerm(''); setActiveCategory('ALL'); }}
              className="bg-[#ff2d21] text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all"
            >
              LIMPIAR BUSCADOR
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Syllabus;
