
import React, { useState, useEffect } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Construcción del envío real a bmaoposiciones@gmail.com
    const destinationEmail = "bmaoposiciones@gmail.com";
    const subject = encodeURIComponent(`CONSULTA WEB BMA: ${formData.name}`);
    const body = encodeURIComponent(
      `Nombre del Opositor: ${formData.name}\n` +
      `Email de contacto: ${formData.email}\n\n` +
      `CONSULTA:\n${formData.message}\n\n` +
      `--- Enviado desde la plataforma BMA Oposiciones ---`
    );

    const mailtoUrl = `mailto:${destinationEmail}?subject=${subject}&body=${body}`;

    // Pequeño delay para la animación de carga antes de abrir el correo
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setStatus('success');
    }, 1500);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#050a30] w-full max-w-xl rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative cursor-default"
      >
        {/* Botón X de Cierre */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white hover:scale-110 transition-all z-20 bg-white/5 hover:bg-[#ff2d21] p-2 rounded-full border border-white/10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="p-16 text-center animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter mb-4 leading-none">ENVÍO <span className="text-green-500">PREPARADO</span></h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-10 leading-relaxed max-w-xs mx-auto">
                SE HA ABIERTO TU GESTOR DE CORREO. POR FAVOR, PULSA "ENVIAR" EN TU APLICACIÓN PARA HACER LLEGAR LA CONSULTA A LA ACADEMIA.
            </p>
            <button 
              onClick={onClose}
              className="bg-[#ff2d21] text-white px-12 py-5 rounded-xl font-black uppercase tracking-[0.2em] hover:brightness-110 shadow-xl text-xs"
            >
              ENTENDIDO
            </button>
          </div>
        ) : (
          <>
            <div className="bg-[#ff2d21] p-10 pt-16">
              <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter leading-none">
                CONTACTAR CON <span className="text-black">ACADEMIA</span>
              </h2>
              <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em] mt-3">
                Destino oficial: bmaoposiciones@gmail.com
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Tu Nombre Completo</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-[#ff2d21] outline-none font-bold"
                  placeholder="Ej: Alvaro Buendía"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Tu Email de Respuesta</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-[#ff2d21] outline-none font-bold"
                  placeholder="tu@email.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Tu Consulta Técnica o Administrativa</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-[#ff2d21] outline-none font-bold resize-none"
                  placeholder="Describe tus dudas..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-white/5 text-gray-400 py-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-white/10 hover:text-white transition-all border border-white/5 text-[10px]"
                >
                  CANCELAR
                </button>
                <button 
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex-[2] bg-[#ff2d21] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-xl shadow-red-900/20 flex items-center justify-center space-x-3 text-[10px]"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>PREPARANDO DESPACHO...</span>
                    </>
                  ) : (
                    <span>LANZAR CONSULTA REAL</span>
                  )}
                </button>
              </div>
              <p className="text-[8px] text-gray-600 font-bold uppercase text-center tracking-widest">
                * Se abrirá tu aplicación de correo para confirmar el envío final.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
