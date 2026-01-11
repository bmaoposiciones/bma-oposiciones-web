
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  user: User | null;
  onAuthClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, user, onAuthClick, onLogout }) => {
  return (
    <nav className="bg-[#010724] text-white sticky top-0 z-50 shadow-2xl border-b border-white/5">
      <div className="max-w-[1800px] mx-auto px-8">
        <div className="flex items-center justify-between h-36">
          {/* Logo BMA */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => onNavigate('home')}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#ff2d21] rounded-xl flex items-center justify-center shadow-lg shadow-red-900/20 group-hover:rotate-6 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black italic tracking-tighter leading-none">BMA</span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#ff2d21] uppercase leading-none mt-1">OPOSICIONES</span>
              </div>
            </div>
          </div>

          {/* Navegación Desktop */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-12">
              {[
                { id: 'home', label: 'Inicio' },
                { id: 'pricing', label: 'Planes' },
                { id: 'dashboard', label: 'Mi Aula' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-2 py-4 rounded-md text-2xl font-black uppercase tracking-widest transition-all border-b-4 ${
                    currentPage === item.id 
                    ? 'border-[#ff2d21] text-white' 
                    : 'border-transparent text-gray-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => onNavigate('profile')}
                  className="flex items-center space-x-4 group"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-[#ff2d21] transition-colors">Editar Perfil</p>
                    <p className="text-xl font-black uppercase italic text-white leading-none">{user.name}</p>
                  </div>
                  <div className="w-14 h-14 rounded-full border-2 border-white/10 overflow-hidden bg-[#0a1240] group-hover:border-[#ff2d21] transition-all">
                      <img 
                        src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name}&background=ff2d21&color=fff&bold=true`} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                  </div>
                </button>
                <button 
                  onClick={onLogout}
                  className="bg-white/5 border border-white/10 text-white/50 p-4 rounded-xl hover:text-white hover:bg-white/10 transition-all"
                  title="Cerrar Sesión"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3 3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </button>
              </div>
            ) : (
              <button 
                onClick={onAuthClick}
                className="bg-[#ff2d21] text-white px-10 py-5 rounded-xl font-black text-xl hover:bg-[#e0281d] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest shadow-xl shadow-red-900/40 border border-red-500/30"
              >
                ACCESO PRIVADO
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
