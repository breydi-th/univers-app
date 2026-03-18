import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function TeacherDashboard() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('user_session');
    if (!session) {
      navigate('/');
    } else {
      setUser(JSON.parse(session));
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* Header / Top Bar */}
        <header className="flex items-center bg-white dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
          <div className="text-primary flex size-10 shrink-0 items-center justify-center bg-primary/10 rounded-lg">
            <span className="material-symbols-outlined">menu</span>
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight flex-1 text-center">Univers App</h2>
          <div className="flex w-10 items-center justify-end">
            <button className="relative text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900"></span>
            </button>
          </div>
        </header>

        {/* Teacher Profile Section */}
        <div className="flex p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-16 w-16 border-2 border-primary/20" 
                title="Professional teacher portrait smiling in a classroom" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3e_QIZjuP2Z3CMH83dl4zO0RiMzLqtDr-vSbA2YfhHwzq3M4U4HWDM9TDW4b6uHoGBMWXrneaMIMjGmJK9UJlQG4e2xIjbmBnlNlz3fiBwQSg0AEowy5C6LI5IJ4H1r-lNEfhbWJoPbI2WyvC2xnRECzQLymrxxVDJ7GwtYLvS7BISMitSHXN5FXYuZCiRf_qzT5RojN5klFOqB0RY7hGgf4B1nu4IDktt0udH_F-ccu_QeQr8dgD-ctbkyDJNArSquMmv6mUQ91t')" }}
              ></div>
              <div className="flex flex-col justify-center">
                <p className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">{user?.full_name || "Professeur"}</p>
                <p className="text-primary text-sm font-semibold uppercase tracking-wider">{user?.subject || "Matière non définie"}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Bienvenue dans votre espace professeur</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Scroll Area */}
        <main className="flex-1 pb-40">
          {/* Quick Actions Grid */}
          <section className="px-4 pt-6 max-w-7xl mx-auto">
            <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-4">Actions principales</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:border-primary/50">
                <div className="bg-primary/10 p-3 rounded-full mb-2">
                  <span className="material-symbols-outlined text-primary">video_call</span>
                </div>
                <span className="text-xs font-medium text-center">Cours vidéo</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:border-primary/50">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full mb-2">
                  <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">assignment</span>
                </div>
                <span className="text-xs font-medium text-center">Nouveau devoir</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:border-primary/50">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-2">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400">quiz</span>
                </div>
                <span className="text-xs font-medium text-center">Nouvel examen</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:border-primary/50">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-2">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">publish</span>
                </div>
                <span className="text-xs font-medium text-center">Résultats</span>
              </button>
            </div>
          </section>

          {/* Mes Classes Horizontal Scroll */}
          <section className="mt-8 max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold">Mes Classes</h2>
              <Link className="text-primary text-sm font-semibold hover:underline" to="/teacher-classes">Voir tout</Link>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 text-center text-slate-500">
              Vous n'avez pas encore été assigné à une classe.
            </div>
          </section>

          {/* Gestion des élèves */}
          <section className="px-4 mt-4 max-w-7xl mx-auto">
            <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-4">Gestion des élèves</h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <span className="material-symbols-outlined text-slate-400">group</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Liste des élèves</p>
                  <p className="text-xs text-slate-500">Les noms des élèves</p>
                </div>
                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600">chevron_right</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <span className="material-symbols-outlined text-slate-400">checklist_rtl</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Devoirs remis</p>
                  <p className="text-xs text-slate-500">12 nouveaux devoirs à corriger</p>
                </div>
                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600">chevron_right</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <span className="material-symbols-outlined text-slate-400">monitoring</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Résultats scolaires</p>
                  <p className="text-xs text-slate-500">Moyenne générale par classe</p>
                </div>
                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600">chevron_right</span>
              </div>
            </div>
          </section>

          {/* Activité récente */}
          <section className="px-4 mt-8 max-w-7xl mx-auto">
            <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-4">Activité récente</h2>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center text-slate-500">
              Aucune activité récente.
            </div>
          </section>
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
          <div className="flex justify-around items-center pt-4 pb-10 max-w-7xl mx-auto px-4">
            <Link className="flex flex-col items-center gap-1 text-primary" to="/teacher-dashboard">
              <span className="material-symbols-outlined fill-1">home</span>
              <p className="text-[10px] font-medium leading-none">Accueil</p>
            </Link>
            <Link className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" to="/teacher-classes">
              <span className="material-symbols-outlined">groups</span>
              <p className="text-[10px] font-medium leading-none">Classes</p>
            </Link>
            <Link className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" to="/messages">
              <div className="relative">
                <span className="material-symbols-outlined">chat_bubble</span>
              </div>
              <p className="text-[10px] font-medium leading-none">Messages</p>
            </Link>
            <Link className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" to="/profile">
              <span className="material-symbols-outlined">account_circle</span>
              <p className="text-[10px] font-medium leading-none">Profil</p>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
