import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <div className="flex-1 w-full max-w-7xl mx-auto pb-40 px-4 sm:px-6 lg:px-8">
        <header className="py-3 sm:py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 sm:size-11 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm">
              <img 
                alt="Student avatar" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaFqOsVG4T6HiaxzHMz4j4sIArZTsYniv0PT-Wu6wOv__9Yp5risVFxnUZMhUrB9EvqO0oHcxt-sjlNsjSuOzfmn98zExurM2QiPgfHIxnj3yqYfPY_uG0F2-dPwwTNneuyt0PyH2neeTfpzynFvqGrf7JweoxyO_fHa2dZVOeb--zO-uxHEa1Dt9IX_DlFU_WwuDm5sj6Fq2N0sgmhIv034eMFfV8rlY-lAZy8iPerPerabJs8TJ0uKDZc-uaM68xixuA58FJabdU" 
              />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight">Bonjour, Jean!</h1>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Classe: NS1 • Terminale</p>
            </div>
          </div>
          <button className="size-8 sm:size-9 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors">
            <span className="material-symbols-outlined text-lg sm:text-xl">notifications</span>
          </button>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            <section>
              <div className="bg-primary rounded-2xl p-4 sm:p-6 shadow-xl shadow-primary/20 relative overflow-hidden">
                <div className="relative z-10 max-w-lg">
                  <h2 className="text-white text-base sm:text-xl font-bold mb-1">Prêt pour commencer?</h2>
                  <p className="text-primary/10 text-[10px] sm:text-sm font-medium mb-4 text-white/80">Continuez votre parcours d'apprentissage aujourd'hui.</p>
                  <Link to="/courses" className="bg-white text-primary font-bold py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg shadow-lg flex items-center gap-2 active:scale-95 transition-transform hover:bg-slate-50 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-lg sm:text-xl">rocket_launch</span>
                    Démarrer mes cours
                  </Link>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12 hidden sm:block">
                  <span className="material-symbols-outlined text-[100px] text-white">school</span>
                </div>
              </div>
            </section>
            
            <section>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm sm:text-base font-bold">Progression</h3>
                <Link to="/courses" className="text-primary text-[10px] sm:text-xs font-semibold hover:underline">Voir tout</Link>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                <div className="min-w-[120px] sm:min-w-[150px] bg-white dark:bg-slate-800 p-2.5 sm:p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                  <div className="size-7 sm:size-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 mb-1.5">
                    <span className="material-symbols-outlined text-lg sm:text-xl">functions</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">Maths</p>
                  <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">85%</p>
                  <div className="mt-1 flex items-center gap-1 text-[9px] font-bold text-green-500">
                    <span className="material-symbols-outlined text-[10px]">trending_up</span>
                    +5%
                  </div>
                </div>
                <div className="min-w-[120px] sm:min-w-[150px] bg-white dark:bg-slate-800 p-2.5 sm:p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                  <div className="size-7 sm:size-9 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 mb-1.5">
                    <span className="material-symbols-outlined text-lg sm:text-xl">menu_book</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">Français</p>
                  <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">92%</p>
                  <div className="mt-1 flex items-center gap-1 text-[9px] font-bold text-red-500">
                    <span className="material-symbols-outlined text-[10px]">trending_down</span>
                    -2%
                  </div>
                </div>
                <div className="min-w-[120px] sm:min-w-[150px] bg-white dark:bg-slate-800 p-2.5 sm:p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                  <div className="size-7 sm:size-9 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-500 mb-1.5">
                    <span className="material-symbols-outlined text-lg sm:text-xl">science</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">Science</p>
                  <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">78%</p>
                  <div className="mt-1 flex items-center gap-1 text-[9px] font-bold text-green-500">
                    <span className="material-symbols-outlined text-[10px]">trending_up</span>
                    +10%
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Area for Desktop */}
          <div className="lg:col-span-4 space-y-6">
            <section>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-sm sm:text-base font-bold">Activités Récentes</h3>
                <Link to="/assignments" className="text-primary text-[10px] sm:text-xs font-semibold hover:underline">Voir tout</Link>
              </div>
              <div className="space-y-2">
                <Link to="/assignments" className="flex items-center gap-2.5 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="size-9 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-lg">quiz</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11px] sm:text-xs font-bold truncate">Quiz d'Algèbre</h4>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 truncate">Score: 18/20 • Terminée il y a 2h</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 shrink-0 text-base">chevron_right</span>
                </Link>
                <Link to="/assignments" className="flex items-center gap-2.5 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="size-9 shrink-0 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <span className="material-symbols-outlined text-lg">history_edu</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11px] sm:text-xs font-bold truncate">Dissertation de Français</h4>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 truncate">À rendre demain • 18:00</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 shrink-0 text-base">chevron_right</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 z-50">
        <div className="flex items-center justify-between px-6 pt-4 pb-10 max-w-7xl mx-auto">
          <Link className="flex flex-col items-center gap-1 text-primary" to="/dashboard">
            <span className="material-symbols-outlined fill-1">home</span>
            <span className="text-[10px] font-bold">Accueil</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" to="/assignments">
            <span className="material-symbols-outlined">assignment</span>
            <span className="text-[10px] font-medium">Devoirs</span>
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
