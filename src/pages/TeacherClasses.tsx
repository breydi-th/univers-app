import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeacherClasses() {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 className="text-xl font-bold">Mes Classes</h1>
          <p className="text-xs text-slate-500">Gestion de vos groupes d'élèves</p>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mt-8">
          <div className="bg-emerald-100 dark:bg-emerald-900/30 p-6 rounded-full mb-4">
            <span className="material-symbols-outlined text-emerald-500 text-5xl">groups</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Aucune classe assignée</h2>
          <p className="text-slate-500 text-center max-w-md">L'administration ne vous a pas encore assigné de classe. Vos classes apparaîtront ici automatiquement.</p>
        </div>
      </main>
    </div>
  );
}
