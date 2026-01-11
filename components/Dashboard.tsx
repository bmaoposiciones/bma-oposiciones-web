
import React, { useState, useMemo, useEffect } from 'react';
import { TOPICS as INITIAL_TOPICS } from '../constants';
import { SubscriptionTier, User, Question, StoredTestResult } from '../types';
import { getFile } from '../db';
import { generateTopicTest } from '../services/geminiService';
import AITutor from './AITutor';
import TopicTest from './TopicTest';

interface DashboardProps {
  user: User;
  onUpgrade: () => void;
}

type DashboardTab = 'TEMARIO' | 'INSTRUCTOR' | 'FOROS' | 'PROGRESO';
type ForumSubTab = 'OPOSICIONES' | 'TEMATICO';

const Dashboard: React.FC<DashboardProps> = ({ user, onUpgrade }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('TEMARIO');
  const [activeForumSubTab, setActiveForumSubTab] = useState<ForumSubTab>('OPOSICIONES');
  const [activeForumCategory, setActiveForumCategory] = useState<string | null>(null);
  const [topics] = useState(INITIAL_TOPICS);
  const [viewingPdf, setViewingPdf] = useState<{url: string, title: string} | null>(null);
  const [viewingText, setViewingText] = useState<{content: string, title: string} | null>(null);
  
  // Gestión de resultados de test
  const [testResults, setTestResults] = useState<StoredTestResult[]>([]);
  const [reviewingTest, setReviewingTest] = useState<StoredTestResult | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem(`bma_results_${user.email}`);
    if (savedResults) {
      setTestResults(JSON.parse(savedResults));
    }
  }, [user.email]);

  const saveTestResult = (topicId: string, topicTitle: string, score: number, total: number, questions: Question[], userAnswers: Record<number, string>, isRetry: boolean = false) => {
    const newResult: StoredTestResult = {
      topicId,
      topicTitle,
      score,
      total,
      questions,
      userAnswers,
      isRetry,
      date: new Date().toLocaleString('es-ES', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    const updatedResults = [newResult, ...testResults];
    setTestResults(updatedResults);
    localStorage.setItem(`bma_results_${user.email}`, JSON.stringify(updatedResults));
  };
  
  const [tematicoCategories, setTematicoCategories] = useState([
    { label: 'Hidráulica', icon: '💧' },
    { label: 'Ventilación', icon: '🌀' },
    { label: 'Accidentes de tráfico', icon: '🚗' },
    { label: 'Rescate vertical', icon: '🧗' },
    { label: 'Rescate acuático', icon: '🏊' }
  ]);

  const [activeTest, setActiveTest] = useState<{id: string, title: string, questions: Question[], isRetry: boolean} | null>(null);
  const [isGeneratingTest, setIsGeneratingTest] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('Analizando temario...');

  const isUnlocked = (topic: any) => {
    if (user.tier === SubscriptionTier.PREMIUM) return true;
    if (topic.isFree) return true;
    
    if (user.tier === SubscriptionTier.BASIC) {
      return topic.category === 'LEGISLATIVO' || topic.category === 'IVASPE';
    }

    if (user.tier === SubscriptionTier.BASIC_PROTOCOLOS) {
      if (topic.category === 'LEGISLATIVO') return true;
      if (topic.category === 'IVASPE') {
        const allowedIds = ['T1', 'T2', 'T3', 'T4'];
        return allowedIds.includes(topic.id);
      }
      if (topic.category === 'ALICANTE_PROTOCOL') {
        return topic.id === 'P1';
      }
    }
    
    if (user.tier === SubscriptionTier.PROTOCOLOS) {
      return topic.category === 'ALICANTE_PROTOCOL';
    }
    
    return false;
  };

  const handleOpenPdf = async (topic: any) => {
    if (!isUnlocked(topic)) {
      onUpgrade();
      return;
    }

    // Prioridad 1: Texto estructurado directo (Útil para leyes como la Constitución)
    if (topic.textContent) {
      setViewingText({ content: topic.textContent, title: topic.title });
      return;
    }

    // Prioridad 2: Buscar PDF en DB local
    try {
        const blob = await getFile(topic.id);
        if (blob) {
          const url = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
          setViewingPdf({ url, title: topic.title });
        } else {
          alert('En el entorno de producción real, este PDF se cargaría desde nuestro servidor seguro de BMA Oposiciones. Prueba con el TEMA 1 de Legislación para ver la lectura directa integrada.');
        }
    } catch (err) {
        alert("Error al cargar el PDF técnico.");
    }
  };

  const handleCopyText = async () => {
    if (viewingText) {
      try {
        await navigator.clipboard.writeText(viewingText.content);
        alert('¡Temario copiado al portapapeles!');
      } catch (err) {
        alert('Error al copiar el texto.');
      }
    }
  };

  const handleStartTest = async (topic: any) => {
    if (!isUnlocked(topic)) {
      onUpgrade();
      return;
    }

    setIsGeneratingTest(true);
    setLoadingMsg('Analizando contenido técnico...');
    
    try {
      setTimeout(() => setLoadingMsg('Generando preguntas oficiales SPEIS...'), 1500);
      const questions = await generateTopicTest(topic.title, topic.description);
      setActiveTest({ id: topic.id, title: topic.title, questions, isRetry: false });
    } catch (err) {
      alert("Error al generar el test por IA. Por favor, inténtalo de nuevo.");
    } finally {
      setIsGeneratingTest(false);
    }
  };

  const handleRetryTest = (result: StoredTestResult) => {
    setActiveTest({ 
      id: result.topicId, 
      title: result.topicTitle, 
      questions: result.questions,
      isRetry: true 
    });
  };

  const handleAddTematica = () => {
    const name = prompt("Introduce el nombre de la nueva temática técnica:");
    if (name) {
      setTematicoCategories([...tematicoCategories, { label: name, icon: '🔥' }]);
    }
  };

  const categories = [
    { id: 'LEGISLATIVO', label: 'Bloque I: Legislación' },
    { id: 'IVASPE', label: 'Bloque II: Temario Específico' },
    { id: 'ALICANTE_PROTOCOL', label: 'Bloque III: Protocolos Alicante' }
  ];

  const FORUM_OPOSICIONES_POSTS = [
    { title: 'Actualización sobre la convocatoria SPEIS Alicante 2025', author: 'Instructor BMA', time: 'hace 2 horas', category: 'Próximas Oposiciones', comments: 24 },
    { title: 'Duda sobre el requisito de carnet C+E en las nuevas bases', author: 'Carlos_BOM', time: 'hace 5 horas', category: 'Bases y Requisitos', comments: 12 },
    { title: 'Publicado el listado provisional de admitidos - Ayuntamiento de Elche', author: 'Info_GVA', time: 'ayer', category: 'Listas de Admitidos', comments: 45 },
  ];

  const FORUM_TEMATICO_POSTS = [
    { title: 'Cálculo de pérdidas de carga en tendidos de 45mm', author: 'Oficial_72', time: 'hace 1 hora', category: 'Hidráulica', comments: 15 },
    { title: 'Nuevos protocolos de desencarcelación en vehículos eléctricos', author: 'Rescate_Jefe', time: 'hace 3 horas', category: 'Accidentes de tráfico', comments: 32 },
    { title: 'Técnicas de ventilación por presión positiva en sótanos', author: 'Vent_Expert', time: 'hace 1 día', category: 'Ventilación', comments: 8 },
  ];

  const OPOSICIONES_CATEGORIES = [
    { label: 'Próximas Oposiciones', icon: '📅' },
    { label: 'Bases y Requisitos', icon: '📜' },
    { label: 'Listas de Admitidos', icon: '✅' },
    { label: 'Aprobados y Plazas', icon: '🏆' },
    { label: 'Publicaciones Oficiales', icon: '📢' }
  ];

  const filteredPosts = useMemo(() => {
    const basePosts = activeForumSubTab === 'OPOSICIONES' ? FORUM_OPOSICIONES_POSTS : FORUM_TEMATICO_POSTS;
    if (!activeForumCategory) return basePosts;
    return basePosts.filter(post => post.category === activeForumCategory);
  }, [activeForumCategory, activeForumSubTab]);

  return (
    <div className="min-h-screen bg-[#010724] text-white">
      {/* Modal Lector PDF */}
      {viewingPdf && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col p-4 animate-in fade-in duration-300">
            <div className="flex-1 bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl">
                <div className="bg-[#010724] p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <span className="text-[#ff2d21] font-black italic">BMA READER</span>
                        <span className="text-white/20">|</span>
                        <h2 className="font-black uppercase italic text-sm truncate max-w-md text-white/70">{viewingPdf.title}</h2>
                    </div>
                    <button onClick={() => setViewingPdf(null)} className="bg-[#ff2d21] text-white px-6 py-2 rounded font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all">CERRAR LECTOR</button>
                </div>
                <iframe src={viewingPdf.url} className="flex-1" title="Visor de PDF" />
            </div>
        </div>
      )}

      {/* Modal Lector Texto (Nuevo) */}
      {viewingText && (
        <div className="fixed inset-0 z-[140] bg-black/98 flex flex-col items-center justify-center p-4 md:p-10 animate-in fade-in zoom-in-95 duration-300">
           <div className="w-full max-w-5xl bg-[#050a30] rounded-[3rem] border border-white/10 overflow-hidden flex flex-col shadow-2xl h-[90vh]">
              <div className="bg-[#010724] p-8 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter text-[#ff2d21]">{viewingText.title}</h2>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Texto Legal Oficial • Ayuntamiento de Alicante</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                   <button 
                    onClick={handleCopyText}
                    className="flex-1 md:flex-none bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2"
                   >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                     COPIAR TEMARIO
                   </button>
                   <button 
                    onClick={() => setViewingText(null)}
                    className="flex-1 md:flex-none bg-[#ff2d21] text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:brightness-110 transition-all"
                   >
                     SALIR
                   </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-10 md:p-20 bg-[#010724]/30 custom-scrollbar">
                <pre className="text-white/80 font-medium whitespace-pre-wrap leading-relaxed text-base font-sans selection:bg-[#ff2d21] selection:text-white">
                  {viewingText.content}
                </pre>
              </div>
              <div className="bg-[#ff2d21]/5 p-6 text-center border-t border-white/5">
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest italic">
                  * Este contenido se actualiza periódicamente según el BOE y el DOGV.
                </p>
              </div>
           </div>
        </div>
      )}

      {/* Pantalla de Generación de Test */}
      {isGeneratingTest && (
        <div className="fixed inset-0 z-[110] bg-[#010724]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 mb-8 relative">
                <div className="absolute inset-0 bg-[#ff2d21]/20 rounded-full animate-ping"></div>
                <div className="relative bg-[#ff2d21] w-full h-full rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,45,33,0.4)]">
                    <svg className="w-10 h-10 text-white animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="3" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                </div>
            </div>
            <h2 className="text-3xl font-black uppercase italic text-white tracking-tighter mb-2">{loadingMsg}</h2>
            <p className="text-[#ff2d21] font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Inteligencia Artificial BMA Conectada</p>
        </div>
      )}

      {/* Modal Realizar Test */}
      {activeTest && (
        <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          <div className="w-full max-w-4xl">
            <TopicTest 
              topicTitle={`${activeTest.isRetry ? 'REINTENTO: ' : ''}${activeTest.title}`} 
              questions={activeTest.questions} 
              onClose={() => setActiveTest(null)} 
              onFinish={(score, total, answers) => saveTestResult(activeTest.id, activeTest.title, score, total, activeTest.questions, answers, activeTest.isRetry)}
            />
          </div>
        </div>
      )}

      {/* Modal Revisión de Test Histórico */}
      {reviewingTest && (
        <div className="fixed inset-0 z-[130] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-y-auto animate-in fade-in duration-300">
           <div className="w-full max-w-4xl bg-[#050a30] border border-white/10 rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-black uppercase italic text-white tracking-tighter">Revisión de <span className="text-[#ff2d21]">Resultados</span></h2>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">{reviewingTest.topicTitle} • {reviewingTest.date}</p>
                </div>
                <button onClick={() => setReviewingTest(null)} className="bg-white/5 p-4 rounded-xl text-white hover:bg-[#ff2d21] transition-all">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                 <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                    <p className="text-[8px] font-black text-gray-500 uppercase mb-1">Puntuación</p>
                    <p className="text-2xl font-black italic">{reviewingTest.score}/{reviewingTest.total}</p>
                 </div>
                 <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                    <p className="text-[8px] font-black text-gray-500 uppercase mb-1">Porcentaje</p>
                    <p className="text-2xl font-black italic">{Math.round((reviewingTest.score/reviewingTest.total)*100)}%</p>
                 </div>
                 <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                    <p className="text-[8px] font-black text-gray-500 uppercase mb-1">Apto</p>
                    <p className={`text-2xl font-black italic ${(reviewingTest.score/reviewingTest.total) >= 0.5 ? 'text-green-500' : 'text-red-500'}`}>
                       {(reviewingTest.score/reviewingTest.total) >= 0.5 ? 'SÍ' : 'NO'}
                    </p>
                 </div>
                 <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                    <p className="text-[8px] font-black text-gray-500 uppercase mb-1">Tipo</p>
                    <p className="text-lg font-black italic text-gray-400">{reviewingTest.isRetry ? 'REPETICIÓN' : 'ORIGINAL'}</p>
                 </div>
              </div>

              <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                {reviewingTest.questions.map((q, idx) => {
                  const userAns = reviewingTest.userAnswers[idx];
                  const isCorrect = userAns === q.correctAnswer;
                  return (
                    <div key={idx} className={`p-6 rounded-2xl border ${isCorrect ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                      <p className="text-sm font-black text-white mb-4 uppercase italic leading-snug">{idx + 1}. {q.question}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {(Object.entries(q.options) as [string, string][]).map(([key, text]) => {
                          const isUserChoice = userAns === key;
                          const isTheCorrect = q.correctAnswer === key;
                          
                          let bgClass = 'bg-white/5 border-white/5 text-gray-500';
                          if (isTheCorrect) bgClass = 'bg-green-500/20 border-green-500 text-green-500';
                          if (isUserChoice && !isCorrect) bgClass = 'bg-red-500/20 border-red-500 text-red-500';

                          return (
                            <div key={key} className={`p-3 rounded-xl border-2 flex items-center gap-3 ${bgClass}`}>
                               <span className="font-black text-xs">{key}</span>
                               <span className="text-[10px] font-bold uppercase tracking-tighter leading-none">{text}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-4 border-t border-white/5">
                        <p className="text-[10px] text-gray-400 italic">
                          <strong className="text-white uppercase not-italic mr-2">Explicación Técnica:</strong> {q.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={() => setReviewingTest(null)}
                className="w-full bg-[#ff2d21] text-white py-5 rounded-xl font-black uppercase tracking-[0.2em] mt-10 hover:brightness-110 shadow-xl"
              >
                CERRAR REVISIÓN
              </button>
           </div>
        </div>
      )}

      <div className="bg-[#050a30] border-b border-white/5 pt-12 pb-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <h1 className="text-5xl font-black italic uppercase leading-none tracking-tighter">Mi Aula <span className="text-[#ff2d21]">Privada</span></h1>
              <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest flex items-center text-xs">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                  Alumno: {user.name} {user.lastName} <span className="mx-4 text-white/10">|</span> 
                  Suscripción: <span className="text-[#ff2d21] ml-2">{user.tier}</span>
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl hidden lg:block">
                <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Tu Progreso General</p>
                <div className="flex items-center gap-4">
                  <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-[#ff2d21]"></div>
                  </div>
                  <span className="text-xs font-black">33%</span>
                </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {[
              { id: 'TEMARIO', label: 'Temario Oficial' },
              { id: 'PROGRESO', label: 'Mi Progreso' },
              { id: 'INSTRUCTOR', label: 'Instructor IA' },
              { id: 'FOROS', label: 'Foros Comunidad' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as DashboardTab);
                  if (tab.id === 'FOROS') setActiveForumCategory(null);
                }}
                className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all border ${
                  activeTab === tab.id 
                  ? 'bg-[#ff2d21] border-[#ff2d21] text-white shadow-lg shadow-red-900/20 scale-105' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
        {activeTab === 'TEMARIO' && (
          <div className="space-y-20 animate-in fade-in duration-500">
            {categories.map((cat) => (
              <section key={cat.id}>
                <h2 className="text-2xl font-black uppercase italic mb-8 border-l-4 border-[#ff2d21] pl-4 flex items-center">
                    {cat.label}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topics.filter(t => t.category === cat.id).map((topic: any) => {
                    const unlocked = isUnlocked(topic);
                    return (
                      <div 
                        key={topic.id} 
                        className={`p-6 rounded-2xl border-2 transition-all relative group flex flex-col h-full ${
                          unlocked ? 'bg-[#050a30] border-white/5 hover:border-[#ff2d21]/30 shadow-xl' : 'bg-black/40 border-white/5 opacity-80'
                        }`}
                      >
                        {!unlocked && (
                          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-2xl cursor-pointer" onClick={onUpgrade}>
                              <div className="bg-[#ff2d21] p-4 rounded-xl shadow-2xl text-center scale-90 group-hover:scale-100 transition-transform">
                                  <svg className="w-6 h-6 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-white">MEJORAR PLAN PARA ACCEDER</p>
                              </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-black text-[#ff2d21] italic">{topic.id}</span>
                          {topic.isFree && (
                            <span className="bg-green-500/10 text-green-500 text-[8px] font-black px-2 py-0.5 rounded border border-green-500/20 uppercase">Contenido Gratuito</span>
                          )}
                        </div>

                        <h3 className="text-lg font-black uppercase italic mb-2 leading-tight group-hover:text-white transition-colors">{topic.title}</h3>
                        <p className="text-xs text-gray-400 line-clamp-2 mb-6 flex-1">{topic.description}</p>
                        
                        <div className="space-y-3 mt-auto">
                            <div className="grid grid-cols-2 gap-2">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleOpenPdf(topic); }}
                                    className={`py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                        unlocked ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/5 text-white/20'
                                    }`}
                                >
                                    LEER TEMA
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleStartTest(topic); }}
                                    className={`py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                        unlocked ? 'bg-[#ff2d21] text-white hover:brightness-110 shadow-lg shadow-red-900/20' : 'bg-white/5 text-white/20'
                                    }`}
                                >
                                    HACER TEST
                                </button>
                            </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        {activeTab === 'PROGRESO' && (
          <div className="animate-in fade-in duration-500 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-[#050a30] border border-white/10 p-8 rounded-3xl text-center">
                  <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2">Tests Realizados</p>
                  <p className="text-5xl font-black italic text-white">{testResults.length}</p>
               </div>
               <div className="bg-[#050a30] border border-white/10 p-8 rounded-3xl text-center">
                  <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2">Nota Media</p>
                  <p className="text-5xl font-black italic text-[#ff2d21]">
                    {testResults.length > 0 
                      ? (testResults.reduce((acc, r) => acc + (r.score / r.total), 0) / testResults.length * 10).toFixed(1) 
                      : '0.0'}
                  </p>
               </div>
               <div className="bg-[#050a30] border border-white/10 p-8 rounded-3xl text-center">
                  <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2">Mejor Tema</p>
                  <p className="text-sm font-black italic text-white truncate px-2">
                    {testResults.length > 0 ? testResults[0].topicTitle : 'Sin datos'}
                  </p>
               </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-[#ff2d21] pl-4">
                <h3 className="text-xl font-black uppercase italic">Historial de Exámenes y Mejora</h3>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em]">Analiza tus errores o repite un test anterior</p>
              </div>
              
              {testResults.length > 0 ? (
                <div className="space-y-4">
                  {testResults.map((res, i) => {
                    const percentage = (res.score / res.total) * 100;
                    const colorClass = percentage >= 80 ? 'text-green-500' : percentage >= 50 ? 'text-yellow-500' : 'text-red-500';
                    
                    return (
                      <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-white/[0.08] transition-all group">
                        <div className="flex-1 w-full md:w-auto">
                          <div className="flex items-center gap-3 mb-1">
                            <p className="text-[10px] font-black uppercase text-[#ff2d21] tracking-widest">{res.date}</p>
                            {res.isRetry && (
                              <span className="bg-blue-500/10 text-blue-400 text-[8px] font-black px-2 py-0.5 rounded border border-blue-500/20 uppercase tracking-tighter">REPETICIÓN</span>
                            )}
                          </div>
                          <h4 className="text-lg font-black uppercase italic text-white leading-tight">{res.topicTitle}</h4>
                        </div>
                        
                        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                          <div className="flex gap-2">
                             <button 
                              onClick={() => setReviewingTest(res)}
                              className="bg-white/5 hover:bg-white text-gray-400 hover:text-black p-3 rounded-xl border border-white/10 transition-all flex flex-col items-center gap-1 group/btn"
                              title="Revisar preguntas y fallos"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              <span className="text-[8px] font-black uppercase tracking-tighter">REVISAR</span>
                            </button>

                            <button 
                              onClick={() => handleRetryTest(res)}
                              className="bg-[#ff2d21]/10 hover:bg-[#ff2d21] text-[#ff2d21] hover:text-white p-3 rounded-xl border border-[#ff2d21]/20 transition-all flex flex-col items-center gap-1 group/btn"
                              title="Repetir este mismo test"
                            >
                              <svg className="w-5 h-5 group-hover/btn:rotate-[-45deg] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                              <span className="text-[8px] font-black uppercase tracking-tighter">REPETIR</span>
                            </button>
                          </div>

                          <div className="text-right ml-4">
                             <p className="text-[10px] font-black text-gray-500 mb-1">Nota</p>
                             <p className={`text-2xl font-black italic ${colorClass}`}>{res.score} / {res.total}</p>
                          </div>
                          
                          <div className={`w-16 h-16 rounded-full border-4 border-white/5 flex items-center justify-center font-black italic text-sm ${colorClass}`}>
                            {Math.round(percentage)}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-24 text-center bg-white/5 rounded-[3rem] border border-dashed border-white/10">
                  <svg className="w-16 h-16 text-gray-700 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  <p className="text-gray-500 font-black uppercase tracking-widest">Aún no has realizado ningún test IA.</p>
                  <button onClick={() => setActiveTab('TEMARIO')} className="text-[#ff2d21] font-black uppercase text-xs mt-4 hover:underline">Ir al temario para empezar</button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'INSTRUCTOR' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
             <div className="mb-12 text-center">
                <h2 className="text-3xl font-black uppercase italic text-white">Tu <span className="text-[#ff2d21]">Soporte Técnico</span> 24/7</h2>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-2">Resuelve cualquier duda sobre el temario de Alicante de forma instantánea.</p>
             </div>
             <AITutor />
          </div>
        )}

        {activeTab === 'FOROS' && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <div className="bg-[#050a30] border border-white/10 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff2d21]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <h2 className="text-5xl md:text-6xl font-black uppercase italic text-white mb-6 tracking-tighter">
                  {activeForumSubTab === 'OPOSICIONES' ? 'FORO ' : 'FORO '}
                  <span className="text-[#ff2d21]">{activeForumSubTab === 'OPOSICIONES' ? 'OPOSICIONES' : 'TEMÁTICO'}</span>
                </h2>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm max-w-4xl mx-auto leading-relaxed">
                   {activeForumSubTab === 'OPOSICIONES' 
                    ? 'Consulta bases, listados de admitidos, fechas de examen y todas las novedades oficiales del Ayuntamiento de Alicante y GVA.'
                    : 'Discusión técnica profunda sobre operativa de bomberos: Hidráulica, rescate vertical, incendios industriales y más.'}
                </p>

                <div className="flex items-center justify-center gap-4 mt-12 bg-black/40 w-fit mx-auto p-2 rounded-2xl border border-white/10">
                    <button 
                      onClick={() => { setActiveForumSubTab('OPOSICIONES'); setActiveForumCategory(null); }}
                      className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                        activeForumSubTab === 'OPOSICIONES' ? 'bg-[#ff2d21] text-white' : 'text-gray-500 hover:text-white'
                      }`}
                    >
                      GESTIÓN OPOSICIONES
                    </button>
                    <button 
                      onClick={() => { setActiveForumSubTab('TEMATICO'); setActiveForumCategory(null); }}
                      className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                        activeForumSubTab === 'TEMATICO' ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'text-gray-500 hover:text-white'
                      }`}
                    >
                      ÁREA TÉCNICA
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1 space-y-4">
                    <div className="flex items-center justify-between mb-4 ml-2">
                      <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em]">Explorar Temáticas</h3>
                      {activeForumSubTab === 'TEMATICO' && (
                        <button 
                          onClick={handleAddTematica}
                          className="text-[#ff2d21] hover:scale-110 transition-transform"
                          title="Añadir nueva temática técnica"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                        </button>
                      )}
                    </div>
                    
                    {(activeForumSubTab === 'OPOSICIONES' ? OPOSICIONES_CATEGORIES : tematicoCategories).map((cat, i) => {
                        const isActive = activeForumCategory === cat.label;
                        const accentClass = activeForumSubTab === 'OPOSICIONES' ? 'border-[#ff2d21] text-[#ff2d21]' : 'border-blue-600 text-blue-500';
                        const bgClass = activeForumSubTab === 'OPOSICIONES' ? 'bg-[#ff2d21]' : 'bg-blue-600';

                        return (
                            <button 
                                key={i} 
                                onClick={() => setActiveForumCategory(isActive ? null : cat.label)}
                                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                                    isActive 
                                    ? `bg-white/5 ${accentClass} shadow-xl` 
                                    : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
                                }`}
                            >
                                <span className="flex items-center space-x-3">
                                    <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>{cat.icon}</span>
                                    <span className={`text-xs font-black uppercase tracking-tight ${isActive ? '' : 'text-gray-300 group-hover:text-white'}`}>
                                        {cat.label}
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="lg:col-span-3 space-y-4">
                    <div className="flex items-center justify-between mb-4 ml-2">
                        <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em]">
                            {activeForumCategory ? `Filtrando por: ${activeForumCategory}` : 'Hilos Recientes'}
                        </h3>
                        <button className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-lg border ${activeForumSubTab === 'OPOSICIONES' ? 'border-[#ff2d21] text-[#ff2d21]' : 'border-blue-600 text-blue-500'}`}>
                            NUEVO HILO
                        </button>
                    </div>
                    
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post, i) => (
                          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/[0.08] transition-all cursor-pointer group animate-in fade-in slide-in-from-left-4 duration-300" style={{ animationDelay: `${i * 50}ms` }}>
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                  <div className="space-y-2">
                                      <span className={`text-[9px] font-black uppercase tracking-widest ${activeForumSubTab === 'OPOSICIONES' ? 'text-[#ff2d21]' : 'text-blue-500'}`}>{post.category}</span>
                                      <h4 className="text-lg font-black uppercase italic text-white group-hover:text-[#ff2d21] transition-colors">{post.title}</h4>
                                      <div className="flex items-center space-x-4 text-[10px] text-gray-500 font-bold uppercase tracking-tight">
                                          <span className="flex items-center gap-1">
                                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                              {post.author}
                                          </span>
                                          <span>•</span>
                                          <span className="flex items-center gap-1">
                                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                              {post.time}
                                          </span>
                                      </div>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                      <div className={`text-center bg-white/5 px-4 py-2 rounded-xl border border-white/5 group-hover:border-${activeForumSubTab === 'OPOSICIONES' ? '[#ff2d21]' : 'blue-600'}/30 transition-all`}>
                                          <p className="text-xs font-black text-white leading-none">{post.comments}</p>
                                          <p className="text-[8px] font-bold text-gray-600 uppercase mt-1">Respuestas</p>
                                      </div>
                                      <svg className="w-5 h-5 text-gray-700 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                                  </div>
                              </div>
                          </div>
                      ))
                    ) : (
                      <div className="py-20 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                        <p className="text-gray-500 font-black uppercase tracking-widest text-sm">No hay hilos en esta temática todavía.</p>
                        <button 
                            onClick={() => setActiveForumCategory(null)}
                            className="text-[#ff2d21] font-black uppercase tracking-[0.2em] text-[10px] mt-4 hover:underline"
                        >
                            Ver todos los temas
                        </button>
                      </div>
                    )}
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
