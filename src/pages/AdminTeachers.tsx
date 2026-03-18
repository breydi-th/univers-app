import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminTeachers() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        {/* Header Section */}
        <div className="flex items-center bg-white dark:bg-slate-900 p-4 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 justify-between">
          <div className="flex items-center gap-3 max-w-7xl mx-auto w-full">
            <Link to="/admin-dashboard" className="text-primary flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1">Gestion des professeurs</h2>
            <div className="flex gap-2">
              <button className="flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined">search</span>
              </button>
              <button className="flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col">
          {/* Statistics Cards */}
          <div className="flex flex-wrap gap-4 p-4">
            <div className="flex min-w-[150px] flex-1 flex-col gap-2 rounded-xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-xl">group</span>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Professeurs</p>
              </div>
              <p className="text-slate-900 dark:text-white text-3xl font-bold">48</p>
            </div>
            <div className="flex min-w-[150px] flex-1 flex-col gap-2 rounded-xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-600">
                <span className="material-symbols-outlined text-xl">school</span>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Classes Actives</p>
              </div>
              <p className="text-slate-900 dark:text-white text-3xl font-bold">156</p>
            </div>
          </div>

          {/* Main Action Button */}
          <div className="px-4 py-2">
            <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 px-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors active:scale-95">
              <span className="material-symbols-outlined">person_add</span>
              <span>Ajouter un nouveau professeur</span>
            </button>
          </div>

          {/* Teacher List Section */}
          <div className="flex items-center justify-between px-4 pb-3 pt-6">
            <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">Liste des enseignants</h2>
            <span className="text-xs font-semibold text-slate-500 bg-slate-200 dark:bg-slate-800 px-2.5 py-1 rounded-full uppercase tracking-wider">Mise à jour à 09:41</span>
          </div>
          
          <div className="flex flex-col gap-3 px-4 pb-32">
            {/* Teacher Card 1 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4 items-start">
                <div className="relative shrink-0">
                  <div 
                    className="bg-slate-200 dark:bg-slate-800 aspect-square rounded-xl h-16 w-16 overflow-hidden border border-slate-100 dark:border-slate-700 bg-cover bg-center" 
                    title="Portrait of a male teacher in a professional setting" 
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0_hawgSdrKSVG9YWFmsmHL8a51oxcOgmvc9Hf_BNd4IYqSaqieWUmth5rfQDwpFnE9EXl2PwpV-3JuZBz0WqgSnXA9tRe7bXzX55OaL04KUCR-NWqrjyO6g-BNSW8Dr1tNjTJYz4j4UuJPQhmNJhU3-X54dmkXJCBV54-ZCHneSTTsFgxtvMZYTorcbyvJHxv7k_1swodRNZFJEj4IrCkb8uaFiAIYZ__OIwb_n78z7WxkEf_sfaWHYq7vJQhlj5rOk5gychPt9iR')" }}
                  ></div>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                </div>
                <div className="flex flex-1 flex-col min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0 pr-2">
                      <p className="text-slate-900 dark:text-white text-base font-bold truncate">Jean Dupont</p>
                      <p className="text-primary text-xs font-semibold uppercase tracking-wider truncate">ID: PROF-2024-001</p>
                    </div>
                    <button className="text-slate-400 hover:text-primary transition-colors shrink-0">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-sm">calculate</span> Mathématiques
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-sm">meeting_room</span> Terminale S1
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                  <span className="material-symbols-outlined text-primary">edit</span>
                  <span className="text-[10px] font-bold uppercase">Modifier</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                  <span className="material-symbols-outlined text-primary">assignment_ind</span>
                  <span className="text-[10px] font-bold uppercase">Attribuer</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-600 dark:text-slate-400 group transition-colors">
                  <span className="material-symbols-outlined text-red-500 group-hover:text-red-600">delete</span>
                  <span className="text-[10px] font-bold uppercase">Supprimer</span>
                </button>
              </div>
            </div>

            {/* Teacher Card 2 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4 items-start">
                <div className="relative shrink-0">
                  <div 
                    className="bg-slate-200 dark:bg-slate-800 aspect-square rounded-xl h-16 w-16 overflow-hidden border border-slate-100 dark:border-slate-700 bg-cover bg-center" 
                    title="Portrait of a female teacher smiling" 
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCu0Mjy-2R-TgQPdBk9lNUvH4lbga_3eiik7OSvCF8GwDqLsEkJ3JJFfTF61zPZC_wC1mTd_pdhdHNbMeRzh60sum2HyaYQ_6-NeEoD7XBocchQMjqdqXWSaEbatreVWpV0WUFDUyN0AiyspnY5BvSi7ycEozmNdO-lrbGM7-PkTh7ALWd0VvgSRSdw6EqGnlV9CMUJgn-lpUh88-ssLPlpoxN3R86DkQvPHuDwMHqdHqUGINzoBVvYSzOU49zbCET7FObqg2O0vrY1')" }}
                  ></div>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                </div>
                <div className="flex flex-1 flex-col min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0 pr-2">
                      <p className="text-slate-900 dark:text-white text-base font-bold truncate">Marie Laurent</p>
                      <p className="text-primary text-xs font-semibold uppercase tracking-wider truncate">ID: PROF-2024-042</p>
                    </div>
                    <button className="text-slate-400 hover:text-primary transition-colors shrink-0">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-sm">history_edu</span> Histoire-Géo
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                      Ns2
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                  <span className="material-symbols-outlined text-primary">edit</span>
                  <span className="text-[10px] font-bold uppercase">Modifier</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                  <span className="material-symbols-outlined text-primary">assignment_ind</span>
                  <span className="text-[10px] font-bold uppercase">Attribuer</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-600 dark:text-slate-400 group transition-colors">
                  <span className="material-symbols-outlined text-red-500 group-hover:text-red-600">delete</span>
                  <span className="text-[10px] font-bold uppercase">Supprimer</span>
                </button>
              </div>
            </div>

            {/* Teacher Card 3 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm opacity-90 hover:opacity-100 transition-all hover:shadow-md">
              <div className="flex gap-4 items-start">
                <div className="relative shrink-0">
                  <div 
                    className="bg-slate-200 dark:bg-slate-800 aspect-square rounded-xl h-16 w-16 overflow-hidden border border-slate-100 dark:border-slate-700 bg-cover bg-center" 
                    title="Portrait of a young teacher" 
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAFEfiiYwdHd3CijjXuHWTDoyxRVqXXpx-6qpnxo_uh524da7kLagws5USp-8hYqfS8RE2I38fSf7xQTkAR-LRfjZW7ZayQuzQ1j61BJ2LdF-6LtdfjxGFOkvc2YdoR6fKkiTQNXhNjUfc1sYB24JGBCtOojndWd_uJg9CBBBfY4Zrf_zY57wLD-9mrs80SoohyVXfu4evp36HZExusqtFoVuzbwLHXqSSWx--V8B9zYGkEsD1L5lsbAb6tFGLiXYmQhtJZsJvmOa_M')" }}
                  ></div>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-slate-300 rounded-full border-2 border-white dark:border-slate-900"></div>
                </div>
                <div className="flex flex-1 flex-col min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0 pr-2">
                      <p className="text-slate-900 dark:text-white text-base font-bold truncate">Ahmed Benali</p>
                      <p className="text-primary text-xs font-semibold uppercase tracking-wider truncate">ID: PROF-2024-015</p>
                    </div>
                    <button className="text-slate-400 hover:text-primary transition-colors shrink-0">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-sm">science</span> Physique-Chimie
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-sm">meeting_room</span> Terminale S2
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                  <span className="material-symbols-outlined text-primary">edit</span>
                  <span className="text-[10px] font-bold uppercase">Modifier</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                  <span className="material-symbols-outlined text-primary">assignment_ind</span>
                  <span className="text-[10px] font-bold uppercase">Attribuer</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-600 dark:text-slate-400 group transition-colors">
                  <span className="material-symbols-outlined text-red-500 group-hover:text-red-600">delete</span>
                  <span className="text-[10px] font-bold uppercase">Supprimer</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 flex border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2 pb-8 pt-3 z-20">
          <div className="max-w-7xl mx-auto w-full flex justify-around">
            <Link className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors" to="/admin-dashboard">
              <span className="material-symbols-outlined">dashboard</span>
              <p className="text-[10px] font-medium leading-normal tracking-wide uppercase">Tableau de bord</p>
            </Link>
            <Link className="flex flex-1 flex-col items-center justify-center gap-1 text-primary" to="/admin-teachers">
              <span className="material-symbols-outlined fill-1">group</span>
              <p className="text-[10px] font-bold leading-normal tracking-wide uppercase">Profs</p>
            </Link>
            <Link className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors" to="#">
              <span className="material-symbols-outlined">school</span>
              <p className="text-[10px] font-medium leading-normal tracking-wide uppercase">Classes</p>
            </Link>
            <Link className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors" to="#">
              <span className="material-symbols-outlined">settings</span>
              <p className="text-[10px] font-medium leading-normal tracking-wide uppercase">Paramètres</p>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
