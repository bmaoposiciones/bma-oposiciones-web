
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Dashboard from './components/Dashboard';
import AITutor from './components/AITutor';
import Syllabus from './components/Syllabus';
import Profile from './components/Profile';
import AuthModal from './components/AuthModal';
import ContactModal from './components/ContactModal';
import { SubscriptionTier, User } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [syllabusFilter, setSyllabusFilter] = useState<string>('ALL');

  useEffect(() => {
    const savedUser = localStorage.getItem('bma_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleNavigate = (page: string, filter: string = 'ALL') => {
    setSyllabusFilter(filter);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('bma_user');
    setUser(null);
    setCurrentPage('home');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('bma_user', JSON.stringify(updatedUser));
  };

  const handleSelectPlan = (tier: SubscriptionTier) => {
    if (user) {
      const updated = { ...user, tier };
      setUser(updated);
      localStorage.setItem('bma_user', JSON.stringify(updated));
      setCurrentPage('dashboard');
    } else {
      setIsAuthOpen(true);
    }
  };

  const ComingSoonStamp = () => (
    <div className="fixed top-32 right-[-80px] z-[160] pointer-events-none select-none transform rotate-[35deg]">
      <div className="bg-[#ff2d21] border-y-[10px] border-black text-black font-black text-5xl py-4 px-24 flex flex-col items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.8)] outline outline-4 outline-[#ff2d21] outline-offset-4">
        <span className="tracking-tighter">PRÓXIMAMENTE</span>
        <span className="text-[12px] tracking-[0.6em] mt-1 text-black font-black uppercase">MATRÍCULA 2026</span>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="relative">
            {!user && <ComingSoonStamp />}
            <Hero onStart={() => handleNavigate('dashboard')} />
            <section className="py-20 bg-[#010724] text-white">
                <div className="max-w-[1800px] mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
                        <div className="p-8 group cursor-pointer" onClick={() => handleNavigate('syllabus', 'GENERAL_SPECIFIC')}>
                            <div className="w-16 h-16 bg-[#ff2d21]/10 text-[#ff2d21] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110 border border-[#ff2d21]/20">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black mb-3 uppercase tracking-tighter italic">Temario General y Específico</h3>
                            <p className="text-gray-400 text-sm max-w-sm mx-auto">Acceso gratuito a la base teórica de la Generalitat Valenciana para tu preparación inicial.</p>
                        </div>
                        <div className="p-8 group cursor-pointer" onClick={() => handleNavigate('syllabus', 'ALICANTE_PROTOCOL')}>
                            <div className="w-16 h-16 bg-[#ff2d21]/10 text-[#ff2d21] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110 border border-[#ff2d21]/20">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.41l-.474-.287A19.194 19.194 0 013 7.07V5.5a2 2 0 012-2h14a2 2 0 012 2v1.57a19.194 19.194 0 01-8.526 14.053l-.474.287z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black mb-3 uppercase tracking-tighter italic">Protocolos SPEIS</h3>
                            <p className="text-gray-400 text-sm max-w-sm mx-auto">Temas específicos del Ayuntamiento de Alicante. Callejero y operativa profesional.</p>
                        </div>
                        <div className="p-8 group cursor-pointer" onClick={() => window.open('https://www.facebook.com/Bmaoposiciones?locale=es_ES', '_blank')}>
                            <div className="w-16 h-16 bg-[#ff2d21]/10 text-[#ff2d21] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110 border border-[#ff2d21]/20">
                                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black mb-3 uppercase tracking-tighter italic">Comunidad BMA</h3>
                            <p className="text-gray-400 text-sm max-w-sm mx-auto">Únete a nuestra red oficial para estar al tanto del lanzamiento de plazas.</p>
                        </div>
                    </div>
                </div>
            </section>
          </div>
        );
      case 'pricing':
        return <Pricing onSelectPlan={handleSelectPlan} onContactClick={() => setIsContactOpen(true)} />;
      case 'dashboard':
        return user ? <Dashboard user={user} onUpgrade={() => handleNavigate('pricing')} /> : null;
      case 'ai-tutor':
        return <div className="bg-[#010724] min-h-screen py-10"><AITutor /></div>;
      case 'syllabus':
        return <Syllabus onBack={() => handleNavigate('pricing')} initialFilter={syllabusFilter} />;
      case 'profile':
        return user ? (
          <Profile 
            user={user} 
            onUpdate={handleUpdateUser} 
            onBack={() => handleNavigate('dashboard')} 
            onUpgrade={() => handleNavigate('pricing')}
          />
        ) : null;
      default:
        return <Hero onStart={() => handleNavigate('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#010724] relative overflow-x-hidden">
      <div className="bg-[#ff2d21] text-white text-[9px] font-black uppercase tracking-[0.3em] py-1 text-center sticky top-0 z-[100] shadow-xl">
        AULA EN MANTENIMIENTO • PRÓXIMA CONVOCATORIA ALICANTE 2026
      </div>
      <Navbar 
        onNavigate={(page) => handleNavigate(page)} 
        currentPage={currentPage} 
        user={user}
        onAuthClick={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />
      <main className="flex-1">
        {renderPage()}
      </main>
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={handleLogin}
      />
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
      <footer className="bg-black text-gray-500 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center space-x-8">
                <span className="text-2xl font-black italic tracking-tighter text-white">BMA OPOSICIONES</span>
                <button 
                  onClick={() => window.open('https://www.facebook.com/Bmaoposiciones?locale=es_ES', '_blank')}
                  className="text-gray-500 hover:text-[#ff2d21] transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
            </div>
            <div className="text-center md:text-right">
                <p className="text-sm font-black uppercase italic text-gray-400 tracking-widest">@2026 BMA OPOSICIONES</p>
                <p className="text-[10px] font-bold uppercase text-gray-600 mt-1">Academia de Bomberos Alicante. El éxito es para los que persisten.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
