
import React, { useState, useRef, useEffect } from 'react';
import { askFirefighterTutor } from '../services/geminiService';
import { ChatMessage } from '../types';

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: '¡Hola! Soy tu instructor IA de BMA Oposiciones. ¿En qué puedo ayudarte hoy? Puedo resolver dudas sobre el temario IVASPE, requisitos de la convocatoria de Alicante o enseñarte técnicas para dominar el examen de 100 preguntas.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const aiResponse = await askFirefighterTutor(userMsg);
    setMessages(prev => [...prev, { role: 'model', content: aiResponse }]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[700px]">
      <div className="bg-[#050a30] rounded-3xl shadow-2xl flex-1 flex flex-col overflow-hidden border border-white/10">
        <div className="bg-[#010724] p-6 text-white border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
             <div className="w-12 h-12 bg-[#ff2d21] rounded-xl flex items-center justify-center shadow-lg shadow-red-900/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
             </div>
             <div>
                <h2 className="text-xl font-black uppercase italic tracking-wider leading-none">Instructor Técnico IA</h2>
                <p className="text-[10px] text-[#ff2d21] font-bold tracking-widest uppercase mt-1">Conectado / Fase de Soporte</p>
             </div>
          </div>
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse [animation-delay:-0.1s]"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse [animation-delay:-0.2s]"></div>
          </div>
        </div>
        
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#010724]/30 backdrop-blur-sm">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl shadow-lg border ${
                msg.role === 'user' 
                  ? 'bg-[#ff2d21] text-white border-white/10 rounded-tr-none' 
                  : 'bg-white/5 text-gray-200 border-white/5 rounded-tl-none backdrop-blur-sm'
              }`}>
                <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 animate-pulse flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-[#010724] border-t border-white/10">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex space-x-3"
          >
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Haz una pregunta sobre protocolos, hidráulica, legislación..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-[#ff2d21] focus:outline-none transition-all placeholder:text-gray-600 font-bold italic"
            />
            <button 
              disabled={loading}
              className="bg-[#ff2d21] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50 shadow-lg shadow-red-900/20 flex items-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : 'ENVIAR'}
            </button>
          </form>
          <div className="flex justify-between items-center mt-4">
            <span className="text-[10px] text-gray-600 font-black uppercase tracking-tight italic">Exclusivo Alumnos BMA Alicante</span>
            <span className="text-[9px] text-gray-700 font-bold">Respuesta generada mediante IA avanzada</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
