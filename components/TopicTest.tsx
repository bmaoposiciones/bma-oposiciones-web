
import React, { useState } from 'react';
import { Question } from '../types';

interface TopicTestProps {
  topicTitle: string;
  questions: Question[];
  onClose: () => void;
  onFinish?: (score: number, total: number, answers: Record<number, string>) => void;
}

const TopicTest: React.FC<TopicTestProps> = ({ topicTitle, questions, onClose, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIdx];
  const isLastQuestion = currentIdx === questions.length - 1;

  const handleSelect = (option: string) => {
    if (isFinished) return;
    setSelectedAnswers({ ...selectedAnswers, [currentIdx]: option });
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [idx, ans]) => {
    return ans === questions[parseInt(idx)].correctAnswer ? acc + 1 : acc;
  }, 0);

  const handleNext = () => {
    if (isLastQuestion) {
      setIsFinished(true);
      setShowResults(true);
      if (onFinish) {
        onFinish(score, questions.length, selectedAnswers);
      }
    } else {
      setCurrentIdx(currentIdx + 1);
    }
  };

  if (showResults) {
    return (
      <div className="bg-[#050a30] border border-white/10 rounded-[2.5rem] p-10 md:p-16 shadow-2xl animate-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-[#ff2d21] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(255,45,33,0.4)]">
            <span className="text-3xl font-black text-white">{score}/{questions.length}</span>
          </div>
          <h2 className="text-4xl font-black uppercase italic text-white tracking-tighter">Resultado del <span className="text-[#ff2d21]">Simulacro</span></h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-2">{topicTitle}</p>
        </div>

        <div className="space-y-6 mb-12 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
          {questions.map((q, idx) => {
            const userAns = selectedAnswers[idx];
            const isCorrect = userAns === q.correctAnswer;
            return (
              <div key={idx} className={`p-6 rounded-2xl border ${isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                <p className="text-sm font-black text-white mb-2 uppercase italic">{idx + 1}. {q.question}</p>
                <div className="flex items-center gap-4 text-xs">
                  <span className={`px-3 py-1 rounded font-black ${isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    Tu respuesta: {userAns || 'Sin responder'}
                  </span>
                  {!isCorrect && (
                    <span className="bg-white/10 text-white px-3 py-1 rounded font-black">
                      Correcta: {q.correctAnswer}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-[11px] text-gray-400 leading-relaxed italic border-t border-white/5 pt-4">
                  <strong>Explicación:</strong> {q.explanation}
                </p>
              </div>
            );
          })}
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-[#ff2d21] text-white py-5 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-red-900/20"
        >
          FINALIZAR Y VOLVER AL AULA
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#050a30] border border-white/10 rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-1 bg-white/10 w-full">
        <div 
          className="h-full bg-[#ff2d21] transition-all duration-500" 
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="flex justify-between items-center mb-10">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff2d21]">Pregunta {currentIdx + 1} de {questions.length}</span>
        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <h3 className="text-2xl font-black text-white uppercase italic mb-10 leading-tight">
        {currentQuestion.question}
      </h3>

      <div className="grid grid-cols-1 gap-4 mb-12">
        {(Object.entries(currentQuestion.options) as [string, string][]).map(([key, text]) => (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            className={`w-full text-left p-6 rounded-2xl border-2 transition-all group flex items-center space-x-4 ${
              selectedAnswers[currentIdx] === key 
                ? 'bg-[#ff2d21]/10 border-[#ff2d21] shadow-[0_0_20px_rgba(255,45,33,0.15)]' 
                : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
            }`}
          >
            <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-colors ${
              selectedAnswers[currentIdx] === key ? 'bg-[#ff2d21] text-white' : 'bg-white/10 text-gray-400 group-hover:text-white'
            }`}>
              {key}
            </span>
            <span className={`text-sm font-bold uppercase tracking-tight ${
              selectedAnswers[currentIdx] === key ? 'text-white' : 'text-gray-400 group-hover:text-white'
            }`}>
              {text}
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button 
          disabled={!selectedAnswers[currentIdx]}
          onClick={handleNext}
          className="bg-[#ff2d21] text-white px-12 py-5 rounded-xl font-black uppercase tracking-widest hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xl shadow-red-900/20"
        >
          {isLastQuestion ? 'FINALIZAR TEST' : 'SIGUIENTE PREGUNTA'}
        </button>
      </div>
    </div>
  );
};

export default TopicTest;
