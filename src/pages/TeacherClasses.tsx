import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeacherClasses() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen selection:bg-primary/30">
      <header className="flex items-center bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 shadow-2xl">
        <button onClick={() => navigate(-1)} className="text-primary flex size-10 items-center justify-center bg-primary/10 rounded-xl hover:bg-primary/20 transition-all">
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </button>
        <div className="flex-1 text-center pr-10">
          <h1 className="text-lg font-black tracking-tighter uppercase">Mes Classes</h1>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">Gestion des Groupes</p>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center justify-center p-12 bg-slate-900/50 border border-slate-800 rounded-[3rem] shadow-2xl text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 size-32 bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="bg-emerald-500/10 p-8 rounded-3xl mb-6 border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)] transform group-hover:scale-110 transition-transform duration-700">
            <span className="material-symbols-outlined text-emerald-500 text-6xl font-black">diversity_3</span>
          </div>
          
          <h2 className="text-2xl font-black mb-3 tracking-tighter">Aucune classe assignée</h2>
          <p className="text-slate-500 text-sm font-bold max-w-xs leading-relaxed">
            L'administration est en train de configurer vos accès. Revenez bientôt pour voir la liste de vos élèves.
          </p>

          <div className="mt-8 flex gap-2">
             <div className="size-2 bg-slate-800 rounded-full animate-bounce"></div>
             <div className="size-2 bg-slate-800 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
             <div className="size-2 bg-slate-800 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
