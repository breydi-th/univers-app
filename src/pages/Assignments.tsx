import React from 'react';
import { Link } from 'react-router-dom';

export default function Assignments() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">arrow_back</span>
        </Link>
        <h1 className="text-lg font-bold tracking-tight">Mes Devoirs</h1>
        <button className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">notifications</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-40">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Devoirs</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">Consultez les devoirs assignés par vos professeurs.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto no-scrollbar">
          <button className="px-4 sm:px-6 py-3 text-sm font-bold border-b-2 border-primary text-primary whitespace-nowrap">À faire</button>
          <button className="px-4 sm:px-6 py-3 text-sm font-bold border-b-2 border-transparent text-slate-500 dark:text-slate-400 whitespace-nowrap">Terminés</button>
          <button className="px-4 sm:px-6 py-3 text-sm font-bold border-b-2 border-transparent text-slate-500 dark:text-slate-400 whitespace-nowrap">Retard</button>
        </div>

        {/* Assignment Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">Mathématiques</span>
                <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold">Non fait</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Exercices sur les fonctions</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">person</span> M. Durand
              </p>
              <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                <span className="material-symbols-outlined text-sm mr-1">calendar_today</span>
                À rendre pour le 15 Octobre
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">
                  <span className="material-symbols-outlined text-lg">info</span> Instructions
                </button>
                <button className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">
                  <span className="material-symbols-outlined text-lg">attachment</span> Documents
                </button>
                <button className="col-span-2 flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white rounded-lg text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-colors mt-2">
                  <span className="material-symbols-outlined text-lg">upload_file</span> Soumettre le devoir
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">Français</span>
                <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold">Fait</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Dissertation de Français</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">person</span> Mme. Lefebvre
              </p>
              <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                <span className="material-symbols-outlined text-sm mr-1">calendar_today</span>
                À rendre pour le 18 Octobre
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">
                  <span className="material-symbols-outlined text-lg">visibility</span> Ouvrir
                </button>
                <button className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">
                  <span className="material-symbols-outlined text-lg">attachment</span> Documents
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider">Physique-Chimie</span>
                <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold">Non fait</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">TP : Étude des forces</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">person</span> M. Petit
              </p>
              <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                <span className="material-symbols-outlined text-sm mr-1">calendar_today</span>
                À rendre pour le 20 Octobre
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">
                  <span className="material-symbols-outlined text-lg">info</span> Instructions
                </button>
                <button className="flex items-center justify-center gap-2 py-2 px-4 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                  <span className="material-symbols-outlined text-lg">upload_file</span> Soumettre
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 z-50">
        <div className="flex items-center justify-between px-6 pt-4 pb-10 max-w-7xl mx-auto">
          <Link className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" to="/dashboard">
            <span className="material-symbols-outlined">home</span>
            <span className="text-[10px] font-medium">Accueil</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 text-primary" to="/assignments">
            <span className="material-symbols-outlined fill-1">assignment</span>
            <span className="text-[10px] font-bold">Devoirs</span>
          </Link>
          <Link className="relative -top-5 flex flex-col items-center gap-1" to="/courses">
            <div className="size-14 bg-primary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center text-white ring-4 ring-white dark:ring-slate-900 active:scale-95 transition-transform hover:bg-primary/90">
              <span className="material-symbols-outlined !text-2xl">video_library</span>
            </div>
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-1">Cours</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" to="/results">
            <span className="material-symbols-outlined">school</span>
            <span className="text-[10px] font-medium">Résultats</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" to="/profile">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px] font-medium">Profil</span>
          </Link>
        </div>
      </nav>
  </div>
);
}
