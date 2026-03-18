import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-primary text-3xl">school</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary dark:text-blue-400">Institution Univers</h1>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Espace Administration</p>
            </div>
          </div>
          <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-6 max-w-7xl mx-auto w-full pb-40">
        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-primary dark:text-blue-400">groups</span>
              <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">+4%</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Élèves</p>
            <p className="text-2xl font-bold">1,240</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-primary dark:text-blue-400">person_book</span>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">Stable</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Professeurs</p>
            <p className="text-2xl font-bold">86</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-primary dark:text-blue-400">meeting_room</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Classes</p>
            <p className="text-2xl font-bold">42</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="material-symbols-outlined text-primary dark:text-blue-400">library_books</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Cours</p>
            <p className="text-2xl font-bold">158</p>
          </div>
        </section>

        {/* Management Quick Actions */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">apps</span> Gestion
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link to="/admin-students" className="flex flex-col items-center justify-center p-4 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
              <span className="material-symbols-outlined mb-2">group_add</span>
              <span className="text-xs font-medium text-center">Gérer les élèves</span>
            </Link>
            <Link to="/admin-teachers" className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">
              <span className="material-symbols-outlined mb-2 text-primary">badge</span>
              <span className="text-xs font-medium text-center">Gérer les professeurs</span>
            </Link>
            <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">
              <span className="material-symbols-outlined mb-2 text-primary">door_open</span>
              <span className="text-xs font-medium text-center">Gérer les classes</span>
            </button>
            <Link to="/admin-accounts" className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">
              <span className="material-symbols-outlined mb-2 text-primary">key</span>
              <span className="text-xs font-medium text-center">Générer identifiants</span>
            </Link>
          </div>
        </section>

        {/* Monitoring Section */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">monitoring</span> Suivi en direct
          </h2>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-sm font-semibold">Statut des activités</span>
              <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Voir tout</span>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">upload_file</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Publications Professeurs</p>
                    <p className="text-xs text-slate-500">12 nouveaux cours aujourd'hui</p>
                  </div>
                </div>
                <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shrink-0">
                  <div className="bg-blue-500 h-full w-[85%]"></div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">assignment</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Devoirs Élèves</p>
                    <p className="text-xs text-slate-500">74% de taux de rendu</p>
                  </div>
                </div>
                <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shrink-0">
                  <div className="bg-orange-500 h-full w-[74%]"></div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">analytics</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Résultats Scolaires</p>
                    <p className="text-xs text-slate-500">Moyenne générale: 14.2/20</p>
                  </div>
                </div>
                <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shrink-0">
                  <div className="bg-emerald-500 h-full w-[60%]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activity Analytics */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">show_chart</span> Activité hebdomadaire
          </h2>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary"></span>
                  <span className="text-xs text-slate-500">Élèves</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-blue-300"></span>
                  <span className="text-xs text-slate-500">Profs</span>
                </div>
              </div>
              <select className="text-xs border border-slate-200 dark:border-slate-700 bg-transparent rounded-lg py-1 px-2 focus:ring-primary outline-none dark:text-slate-300">
                <option>7 derniers jours</option>
                <option>30 derniers jours</option>
              </select>
            </div>
            
            {/* Simple Chart Placeholder Representation */}
            <div className="flex items-end justify-between h-40 gap-2 px-2">
              <div className="flex-1 flex flex-col gap-1 items-center group">
                <div className="w-full flex items-end gap-1 h-32">
                  <div className="bg-primary/20 w-1/2 rounded-t h-[40%]"></div>
                  <div className="bg-primary w-1/2 rounded-t h-[60%]"></div>
                </div>
                <span className="text-[10px] text-slate-400">Lun</span>
              </div>
              <div className="flex-1 flex flex-col gap-1 items-center group">
                <div className="w-full flex items-end gap-1 h-32">
                  <div className="bg-primary/20 w-1/2 rounded-t h-[55%]"></div>
                  <div className="bg-primary w-1/2 rounded-t h-[80%]"></div>
                </div>
                <span className="text-[10px] text-slate-400">Mar</span>
              </div>
              <div className="flex-1 flex flex-col gap-1 items-center group">
                <div className="w-full flex items-end gap-1 h-32">
                  <div className="bg-primary/20 w-1/2 rounded-t h-[30%]"></div>
                  <div className="bg-primary w-1/2 rounded-t h-[45%]"></div>
                </div>
                <span className="text-[10px] text-slate-400">Mer</span>
              </div>
              <div className="flex-1 flex flex-col gap-1 items-center group">
                <div className="w-full flex items-end gap-1 h-32">
                  <div className="bg-primary/20 w-1/2 rounded-t h-[60%]"></div>
                  <div className="bg-primary w-1/2 rounded-t h-[95%]"></div>
                </div>
                <span className="text-[10px] text-slate-400">Jeu</span>
              </div>
              <div className="flex-1 flex flex-col gap-1 items-center group">
                <div className="w-full flex items-end gap-1 h-32">
                  <div className="bg-primary/20 w-1/2 rounded-t h-[50%]"></div>
                  <div className="bg-primary w-1/2 rounded-t h-[75%]"></div>
                </div>
                <span className="text-[10px] text-slate-400">Ven</span>
              </div>
              <div className="flex-1 flex flex-col gap-1 items-center group">
                <div className="w-full flex items-end gap-1 h-32">
                  <div className="bg-primary/20 w-1/2 rounded-t h-[20%]"></div>
                  <div className="bg-primary w-1/2 rounded-t h-[30%]"></div>
                </div>
                <span className="text-[10px] text-slate-400">Sam</span>
              </div>
              <div className="flex-1 flex flex-col gap-1 items-center group">
                <div className="w-full flex items-end gap-1 h-32">
                  <div className="bg-primary/20 w-1/2 rounded-t h-[10%]"></div>
                  <div className="bg-primary w-1/2 rounded-t h-[15%]"></div>
                </div>
                <span className="text-[10px] text-slate-400">Dim</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 z-50">
        <div className="flex items-center justify-between px-6 pt-4 pb-10 max-w-7xl mx-auto">
          <Link className="flex flex-col items-center gap-1 text-primary" to="/admin-dashboard">
            <span className="material-symbols-outlined fill-1">dashboard</span>
            <span className="text-[10px] font-bold">Dashboard</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" to="/admin-accounts">
            <span className="material-symbols-outlined">work</span>
            <span className="text-[10px] font-medium">Gestion</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" to="#">
            <span className="material-symbols-outlined">bar_chart_4_bars</span>
            <span className="text-[10px] font-medium">Rapports</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" to="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-[10px] font-medium">Paramètres</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
