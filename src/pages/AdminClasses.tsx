import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminClasses() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 className="text-xl font-bold">Gestion des Classes</h1>
          <p className="text-xs text-slate-500">Créer et administrer les classes</p>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mt-8">
          <div className="bg-primary/10 p-6 rounded-full mb-4">
            <span className="material-symbols-outlined text-primary text-5xl">meeting_room</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Aucune classe pour le moment</h2>
          <p className="text-slate-500 text-center max-w-md mb-6">Vous n'avez pas encore créé de classe. Ajoutez des classes pour pouvoir y assigner des élèves et des professeurs.</p>
          <button className="bg-primary text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">add</span>
            Créer une classe
          </button>
        </div>
      </main>
    </div>
  );
}
