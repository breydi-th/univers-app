import React from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
      {/* Main Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto pb-40">
        {/* Header / Top Bar */}
        <div className="flex items-center justify-between p-6">
          <Link to="/dashboard" className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow-sm text-primary hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-lg font-bold text-slate-800 dark:text-white">Profil Élève</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow-sm text-primary hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>

        {/* Profile Hero */}
        <div className="flex flex-col items-center px-6 pt-2 pb-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden bg-slate-200 dark:bg-slate-700">
              <img 
                className="w-full h-full object-cover" 
                alt="Portrait of a smiling Haitian student" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ-A4IMJFJGX3PvWcjPVaJztWk84OSj0xRq42GJj-xe6ZxQGEejZMBNonMR8b98IuXo97RPmFQAP_fJoRhv0FgDhgAjNeaC5ZQ1RnDhWru0YHvE8nNbAAIaXmzIxFm2SaU5B4QcjNgvartLSx7KvAGSKlKr1sCI3BnpavFvzYDLr8becvH6aZ5YJxe_egqqUVeyGLKHWzNhl38FhYWI3SSkgPlWnWqcMStVHfQA9RtYU5Z7wc2KEBz8__m4MZsV5xM4yMdBTNjP8BB"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-accent w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center text-white cursor-pointer hover:bg-accent/90 transition-colors">
              <span className="material-symbols-outlined text-sm">edit</span>
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Mania Jean</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">Terminale (NS4)</span>
          </div>
          <p className="mt-2 text-primary font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-base">target</span>
            Objectif: 18/20
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 px-6 mb-6">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-primary mb-1">assignment_turned_in</span>
            <span className="text-xl font-bold dark:text-white">45</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium leading-tight">Devoirs</span>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-primary mb-1">menu_book</span>
            <span className="text-xl font-bold dark:text-white">128</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium leading-tight">Cours</span>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm flex flex-col items-center text-center border-t-4 border-primary/20">
            <span className="material-symbols-outlined text-accent mb-1">auto_graph</span>
            <span className="text-xl font-bold dark:text-white">16.5</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium leading-tight">Moyenne</span>
          </div>
        </div>

        {/* Personal Info Card */}
        <div className="px-6 mb-6">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 dark:text-white border-b border-slate-50 dark:border-slate-700 pb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">person</span>
              Informations académiques
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-tight">Nom Complet</span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">Mania Jean</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-tight">Série</span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">Sciences Économiques et Sociales (SES)</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-tight">Établissement</span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">Lycée National de Pétion-Ville</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progression Graph */}
        <div className="px-6 mb-6">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">trending_up</span>
                Évolution des notes
              </h3>
              <span className="text-xs text-slate-400">Derniers 4 mois</span>
            </div>
            
            {/* Mock Line Chart */}
            <div className="h-32 w-full flex items-end justify-between gap-1 px-2 relative">
              {/* Grid Lines */}
              <div className="absolute inset-x-0 top-0 border-t border-slate-50 dark:border-slate-700 h-px"></div>
              <div className="absolute inset-x-0 top-1/2 border-t border-slate-50 dark:border-slate-700 h-px"></div>
              
              {/* Chart Bar Mocks for a Line Look */}
              <div className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-primary/10 rounded-t-lg relative" style={{ height: '60%' }}>
                  <div className="absolute -top-1 right-0 w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <span className="text-[10px] mt-2 text-slate-400">Jan</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full bg-primary/10 rounded-t-lg relative" style={{ height: '75%' }}>
                  <div className="absolute -top-1 right-0 w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <span className="text-[10px] mt-2 text-slate-400">Fév</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full bg-primary/20 rounded-t-lg relative" style={{ height: '70%' }}>
                  <div className="absolute -top-1 right-0 w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <span className="text-[10px] mt-2 text-slate-400">Mar</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full bg-primary/30 rounded-t-lg relative" style={{ height: '85%' }}>
                  <div className="absolute -top-1 right-0 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-slate-800 shadow-sm scale-125"></div>
                </div>
                <span className="text-[10px] mt-2 text-slate-400 font-bold text-primary">Avr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button (Accent Color) */}
        <div className="px-6">
          <button className="w-full bg-accent text-white py-4 rounded-2xl font-bold shadow-lg shadow-accent/20 flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors active:scale-[0.98]">
            <span className="material-symbols-outlined">analytics</span>
            Voir Rapport Complet
          </button>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 z-50">
        <div className="flex items-center justify-between px-6 pt-4 pb-10 max-w-7xl mx-auto">
          <Link className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" to="/dashboard">
            <span className="material-symbols-outlined">home</span>
            <span className="text-[10px] font-medium">Accueil</span>
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
          <Link className="flex flex-col items-center gap-1 text-primary" to="/profile">
            <div className="relative">
              <span className="material-symbols-outlined fill-1">person</span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
            </div>
            <span className="text-[10px] font-bold">Profil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
