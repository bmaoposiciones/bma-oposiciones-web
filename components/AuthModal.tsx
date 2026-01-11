
import React, { useState, useEffect } from 'react';
import { SubscriptionTier, User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Inicializar al administrador en el almacenamiento local para permitir el login
  useEffect(() => {
    const storedUsersJson = localStorage.getItem('bma_registered_users');
    let registeredUsers: User[] = storedUsersJson ? JSON.parse(storedUsersJson) : [];

    const adminExists = registeredUsers.some(u => u.email === 'alvaro@bma.com');
    if (!adminExists) {
      const adminUser: User = {
        name: 'Alvaro',
        lastName: 'Buendia Juarez',
        email: 'alvaro@bma.com',
        age: 28,
        phone: '600000000',
        tier: SubscriptionTier.PREMIUM,
        weeksEnrolled: 1,
        registrationDate: new Date().toISOString(),
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&top=shortHair&hairColor=black&clothing=graphicShirt&clothingColor=3d3d3d&accessories=none'
      };
      registeredUsers.push(adminUser);
      localStorage.setItem('bma_registered_users', JSON.stringify(registeredUsers));
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setError('');
      setFormData({ email: '', password: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const inputEmail = formData.email.toLowerCase().trim();
    const inputPass = formData.password.trim();

    // ÚNICA FORMA DE ENTRAR: Alvaro (Admin)
    if (inputEmail === 'alvaro@bma.com' && inputPass === 'admin') {
      const storedUsersJson = localStorage.getItem('bma_registered_users');
      const registeredUsers: User[] = storedUsersJson ? JSON.parse(storedUsersJson) : [];
      const adminUser = registeredUsers.find(u => u.email === 'alvaro@bma.com');
      
      if (adminUser) {
        localStorage.setItem('bma_user', JSON.stringify(adminUser));
        onLogin(adminUser);
        onClose();
        return;
      }
    }

    setError('Acceso denegado. Solo personal autorizado.');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
      <div className="bg-[#050a30] w-full max-w-lg rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
        <div className="bg-[#ff2d21] p-10 text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white/40 hover:text-white transition-all bg-black/20 p-2 rounded-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">
            ACCESO PRIVADO
          </h2>
          <p className="text-white/60 text-[9px] font-black uppercase tracking-[0.3em] mt-2">
            ADMINISTRACIÓN BMA OPOSICIONES
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6" autoComplete="off">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl text-[10px] font-black uppercase text-center tracking-widest">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email</label>
            <input 
              required
              type="email" 
              autoComplete="off"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-[#ff2d21] outline-none transition-all"
              placeholder="Introduce tu correo electrónico"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Contraseña</label>
            <input 
              required
              type="password" 
              autoComplete="off"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-[#ff2d21] outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#ff2d21] text-white py-5 rounded-xl font-black uppercase tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-red-900/40 mt-4 text-[11px]"
          >
            ENTRAR AL SISTEMA
          </button>

          <div className="pt-8 text-center border-t border-white/5">
            <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest leading-relaxed">
              EL REGISTRO DE NUEVOS USUARIOS ESTÁ DESACTIVADO.<br/>
              SOLO PERSONAL AUTORIZADO PUEDE ACCEDER.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
