import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminSettings() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 className="text-xl font-bold">Paramètres</h1>
          <p className="text-xs text-slate-500">Configuration de l'établissement</p>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col items-center">
            <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-6xl mb-4">settings_suggest</span>
            <p className="font-semibold mb-2">Configurations en cours de développement</p>
            <p className="text-sm text-slate-500 text-center max-w-sm">Les paramètres globaux de l'application (années scolaires, matières, système de notation) seront bientôt disponibles.</p>
        </div>
      </main>
    </div>
  );
}
