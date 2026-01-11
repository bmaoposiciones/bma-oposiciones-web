
import React, { useState, useRef } from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onBack: () => void;
  onUpgrade: () => void;
}

const DEFAULT_AVATARS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&top=shortHair&hairColor=black&clothing=graphicShirt&clothingColor=3d3d3d&accessories=none",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aria&top=longHair&hairColor=brown&clothing=graphicShirt&clothingColor=3d3d3d&accessories=none",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack&top=shaggyMullet&hairColor=blonde",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna&top=bob&hairColor=red",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Milo&top=shortCurly&hairColor=black",
  "https://api.dicebear.com/7.x/bottts/svg?seed=BMA1&baseColor=ff2d21"
];

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onBack, onUpgrade }) => {
  const [formData, setFormData] = useState<User>({ ...user });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    
    setTimeout(() => {
      const storedUsersJson = localStorage.getItem('bma_registered_users');
      if (storedUsersJson) {
        const registeredUsers: User[] = JSON.parse(storedUsersJson);
        const updatedUsers = registeredUsers.map(u => u.email === formData.email ? formData : u);
        localStorage.setItem('bma_registered_users', JSON.stringify(updatedUsers));
      }

      onUpdate(formData);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 800);
  };

  const selectAvatar = (url: string) => {
    setFormData({ ...formData, avatarUrl: url });
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="text-[#ff2d21] font-black uppercase tracking-widest flex items-center hover:scale-105 transition-transform"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          VOLVER AL AULA
        </button>
        <h1 className="text-4xl font-black italic uppercase italic text-white">Mi <span className="text-[#ff2d21]">Perfil</span></h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#050a30] border border-white/10 p-8 rounded-[2rem] text-center shadow-2xl">
            <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-[#ff2d21] overflow-hidden bg-[#010724] mx-auto shadow-[0_0_20px_rgba(255,45,33,0.3)]">
                    <img 
                      src={formData.avatarUrl || `https://ui-avatars.com/api/?name=${formData.name}&background=ff2d21&color=fff&bold=true`} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                </div>
                <button 
                  onClick={handleCameraClick}
                  className="absolute bottom-0 right-0 bg-[#ff2d21] p-3 rounded-full border-2 border-[#050a30] hover:scale-110 active:scale-95 transition-all shadow-lg"
                >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            </div>
            <h2 className="text-xl font-black text-white uppercase italic">{formData.name} {formData.lastName}</h2>
            <p className="text-[#ff2d21] text-xs font-bold uppercase tracking-widest mt-1">{formData.tier} Member</p>
          </div>

          <div className="bg-[#ff2d21]/10 border border-[#ff2d21]/30 p-8 rounded-[2rem] relative overflow-hidden">
              <div className="relative z-10 text-center">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">Estado Suscripción</h3>
                  <p className="text-2xl font-black text-white uppercase italic mb-6 leading-none tracking-tighter">{formData.tier}</p>
                  <button 
                    onClick={onUpgrade}
                    className="w-full bg-white text-[#ff2d21] py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform shadow-xl"
                  >
                    CAMBIAR O MEJORAR PLAN
                  </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full"></div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-[#050a30] border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nombre</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#010724] border border-white/10 rounded-xl px-5 py-3 text-white focus:ring-2 focus:ring-[#ff2d21] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Apellidos</label>
                  <input 
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-[#010724] border border-white/10 rounded-xl px-5 py-3 text-white focus:ring-2 focus:ring-[#ff2d21] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email (No modificable)</label>
                <input type="email" value={formData.email} disabled className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-3 text-gray-500 cursor-not-allowed italic font-medium" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Teléfono</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#010724] border border-white/10 rounded-xl px-5 py-3 text-white focus:ring-2 focus:ring-[#ff2d21] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Edad</label>
                  <input 
                    type="number" 
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#010724] border border-white/10 rounded-xl px-5 py-3 text-white focus:ring-2 focus:ring-[#ff2d21] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-tight max-w-xs text-center md:text-left">
                  Tus datos están protegidos según la LOPD. Solo los instructores de BMA tienen acceso a ellos.
                </p>
                <button 
                  type="submit"
                  disabled={saveStatus !== 'idle'}
                  className={`w-full md:w-auto px-12 py-4 rounded-xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center min-w-[200px] ${
                    saveStatus === 'success' ? 'bg-green-600 text-white' : 'bg-[#ff2d21] text-white hover:scale-105 shadow-xl shadow-red-900/20'
                  }`}
                >
                  {saveStatus === 'saving' && (
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  )}
                  {saveStatus === 'success' ? 'DATOS GUARDADOS' : saveStatus === 'saving' ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
