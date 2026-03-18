import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Messages() {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 className="text-xl font-bold">Messagerie Principale</h1>
          <p className="text-xs text-slate-500">Communications internes</p>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-lg mx-auto w-full">
        <div className="flex flex-col items-center justify-center p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mt-10">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-5 rounded-full mb-4">
            <span className="material-symbols-outlined text-indigo-500 text-4xl">mark_chat_unread</span>
          </div>
          <h2 className="text-lg font-bold mb-1">Aucun nouveau message</h2>
          <p className="text-slate-500 text-sm text-center">Vous n'avez pas encore de conversations actives.</p>
        </div>
      </main>
    </div>
  );
}
