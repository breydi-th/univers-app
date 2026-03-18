import React from 'react';
import { Link } from 'react-router-dom';

export default function Courses() {
  const subjects = [
    { id: 1, name: 'Maths', icon: 'calculate', active: true },
    { id: 2, name: 'Physique', icon: 'science', active: false },
    { id: 3, name: 'Chimie', icon: 'experiment', active: false },
    { id: 4, name: 'Français', icon: 'menu_book', active: false },
    { id: 5, name: 'Histoire', icon: 'history_edu', active: false },
    { id: 6, name: 'Géo', icon: 'public', active: false },
    { id: 7, name: 'Biologie', icon: 'biotech', active: false },
    { id: 8, name: 'Géologie', icon: 'terrain', active: false },
  ];

  const lessons = [
    {
      id: 1,
      title: 'Les Fonctions Dérivées - Introduction',
      teacher: 'M. Jean-Pierre',
      duration: '15:30',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgNaOGmYj8zqG0MVUPNsLmKbmuRmk9WIvPGF5aOhkLdaq-6FN30x5JSu5cQY8FF7QAKAC6MVhGBmNJ-EboDWXvQRefB4acKviayRSnPQhnSguOzVgco7yr_shisRJ4VhxpTcRsEHV1O14KDjtgK7-C1Xntlf2uHaUxSPk7lncnOBWIQEZ5jVre8E8QfCb5bKqYmj9VaZm4UNlsru0OqwFSRYFAzzTHjV97L5HCKC3UHhP74vsRAmY2jAVPtJTuvNoTBv0OfIN8MVwV',
    },
    {
      id: 2,
      title: 'Lois de Newton et Dynamique',
      teacher: 'Mme. Sophie Laurent',
      duration: '22:45',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHnEXvQIs7jTemTT-lY8KArLQr-ch6P2Y6zuNXenedWjApuVZ8HdzwS_O7dWCemhgNMwkcaX1X8CIS5HW6o2GhlEcWSvxDiFtM-xOnVkBTV315p-aI1cGN0idDcOQKyM58Q8kHJSfmATTBWF3asIC5lAYlqJDG_EBEDeqmezE5V_K825qFv52XoCNIyMrXNtj3kBDSIpVPjm4-76MaYT6RBtvV-F6ygd135qKZkaKjJgWacOEpxMSa74Wx4TPBwXgKU5Ze0z3ttcJo',
    },
    {
      id: 3,
      title: 'Analyse Littéraire : Le Romantisme',
      teacher: 'M. Robert Durand',
      duration: '18:15',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoQOxjQOpYUlI6kcQvrLc_iyn2qZJ_aeGE658bvs3w5DiWZoPhjYXilkxIpNnZ_xvHhohCTZE1l9ifUjRvsyUulfqguUzu1bGtQkSmjFoi2H-B4zrO2LV-4A_R-MTfn-MexuRxvgcvweUhUdnbyhtfounExYjw_oiHz_VY6V6fW4ksJSGApXcYkv5Zmg63Tls3USHVK1u2RE9EXcoc3Y1zOqMPxBJAZKHzyuiTQX04u8G3dI_5nWw9vVtkufbVpTmVDCU2MLtlm1uE',
    },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
      {/* Header */}
      <header className="flex flex-col p-6 pb-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <Link to="/dashboard" className="flex items-center justify-center size-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <button className="flex items-center justify-center size-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Cours Vidéo</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Apprenez avec les vidéos de vos professeurs</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-40 max-w-7xl mx-auto w-full">
        {/* Subjects Section */}
        <section className="mt-2">
          <div className="flex items-center justify-between px-6 mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Matières</h2>
          </div>
          <div className="flex gap-3 px-6 overflow-x-auto hide-scrollbar pb-2">
            {subjects.map((subject) => (
              <div key={subject.id} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
                <div className={`flex size-14 items-center justify-center rounded-2xl transition-all ${subject.active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-slate-200'}`}>
                  <span className="material-symbols-outlined">{subject.icon}</span>
                </div>
                <p className={`text-xs font-medium ${subject.active ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>{subject.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lessons Section */}
        <section className="mt-8 px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Dernières Leçons</h2>
            <button className="text-primary text-sm font-semibold hover:underline">Voir tout</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="group flex flex-col bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md active:scale-[0.98] cursor-pointer">
                <div className="relative aspect-video w-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                    style={{ backgroundImage: `url('${lesson.thumbnail}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="size-12 rounded-full bg-white/90 dark:bg-primary/90 flex items-center justify-center text-primary dark:text-white shadow-xl transform transition-transform group-hover:scale-110">
                      <span className="material-symbols-outlined !text-3xl fill-1">play_arrow</span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg backdrop-blur-md">{lesson.duration}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors">{lesson.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                      <span className="material-symbols-outlined !text-sm text-primary">person</span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{lesson.teacher}</span>
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
            <div className="size-14 bg-primary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center text-white ring-4 ring-white dark:ring-slate-900 active:scale-95 transition-transform">
              <span className="material-symbols-outlined !text-2xl fill-1">video_library</span>
            </div>
            <span className="text-[10px] font-bold text-primary mt-1">Cours</span>
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
