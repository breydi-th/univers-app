import React from 'react';
import { Link } from 'react-router-dom';

export default function Results() {
  const subjects = [
    { 
      id: 1, 
      name: 'Mathématiques', 
      icon: 'functions', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50 dark:bg-blue-900/20', 
      average: '16.5/20', 
      lastGrade: '18/20', 
      trend: '+5%', 
      trendIcon: 'trending_up', 
      trendColor: 'text-green-500' 
    },
    { 
      id: 2, 
      name: 'Physique', 
      icon: 'biotech', 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-50 dark:bg-orange-900/20', 
      average: '14.2/20', 
      lastGrade: '13/20', 
      trend: '-2%', 
      trendIcon: 'trending_down', 
      trendColor: 'text-red-500' 
    },
    { 
      id: 3, 
      name: 'Chimie', 
      icon: 'science', 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50 dark:bg-purple-900/20', 
      average: '15.0/20', 
      lastGrade: '17/20', 
      trend: '+1.2%', 
      trendIcon: 'trending_up', 
      trendColor: 'text-green-500' 
    },
    { 
      id: 4, 
      name: 'Français', 
      icon: 'menu_book', 
      color: 'text-emerald-600', 
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20', 
      average: '13.8/20', 
      lastGrade: '14/20', 
      trend: '0%', 
      trendIcon: 'horizontal_rule', 
      trendColor: 'text-slate-400' 
    },
  ];

  const chartData = [
    { month: 'Sep', height: 'h-[40%]', opacity: 'bg-primary/20' },
    { month: 'Oct', height: 'h-[65%]', opacity: 'bg-primary/40' },
    { month: 'Nov', height: 'h-[55%]', opacity: 'bg-primary/30' },
    { month: 'Déc', height: 'h-[85%]', opacity: 'bg-primary', active: true },
    { month: 'Jan', height: 'h-[70%]', opacity: 'bg-primary/50' },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
      {/* Header Navigation */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 max-w-7xl mx-auto w-full">
        <Link to="/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="text-lg font-bold tracking-tight">Mes Résultats</h1>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-40 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <section className="px-4 pt-6 pb-4">
          <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-white shadow-lg shadow-primary/20">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold">Résultats scolaires</h2>
              <p className="mt-1 text-white/80 text-sm">Suivez vos notes et votre progression en temps réel.</p>
              <div className="mt-6 flex items-end gap-4">
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wider text-white/70 font-medium">Moyenne Générale</p>
                  <p className="text-3xl font-bold">15.5<span className="text-lg font-normal opacity-80">/20</span></p>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span className="text-sm font-bold">+5%</span>
                </div>
              </div>
            </div>
            {/* Abstract background pattern */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-black/5 rounded-full blur-2xl"></div>
          </div>
        </section>

        {/* Chart Section */}
        <section className="px-4 py-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200">Évolution Trimestrielle</h3>
              <select className="bg-slate-50 dark:bg-slate-800 border-none text-xs font-semibold rounded-lg focus:ring-primary py-1 px-3 outline-none">
                <option>Trimestre 1</option>
                <option>Trimestre 2</option>
                <option>Trimestre 3</option>
              </select>
            </div>
            {/* Mockup Bar Chart */}
            <div className="flex items-end justify-between h-32 gap-2 px-2">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1 gap-2">
                  <div className={`w-full bg-slate-100 dark:bg-slate-800 rounded-t-md ${data.height} relative transition-all duration-500`}>
                    <div className={`absolute inset-0 ${data.opacity} rounded-t-md h-full`}></div>
                  </div>
                  <span className={`text-[10px] font-medium uppercase ${data.active ? 'text-primary font-bold' : 'text-slate-400'}`}>
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subjects List */}
        <section className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 dark:text-slate-200">Par Matière</h3>
            <button className="text-primary text-sm font-semibold hover:underline">Voir tout</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl ${subject.bgColor} flex items-center justify-center ${subject.color}`}>
                  <span className="material-symbols-outlined">{subject.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">{subject.name}</h4>
                    <div className={`flex items-center ${subject.trendColor} gap-0.5`}>
                      <span className="material-symbols-outlined text-xs">{subject.trendIcon}</span>
                      <span className="text-[10px] font-bold">{subject.trend}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-4">
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium uppercase">Moyenne</p>
                      <p className="text-sm font-bold">{subject.average}</p>
                    </div>
                    <div className="h-6 w-px bg-slate-100 dark:bg-slate-800"></div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium uppercase">Dernière note</p>
                      <p className="text-sm font-bold text-primary">{subject.lastGrade}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

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
          <Link className="flex flex-col items-center gap-1 text-primary" to="/results">
            <span className="material-symbols-outlined fill-1">school</span>
            <span className="text-[10px] font-bold">Résultats</span>
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
