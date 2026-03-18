import React from 'react';
import { Link } from 'react-router-dom';

export default function TeacherDashboard() {
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
                <p className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">Prof. Jean</p>
                <p className="text-primary text-sm font-semibold uppercase tracking-wider">Mathématiques</p>
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
          <section className="mt-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between px-4 mb-4">
              <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold">Mes Classes</h2>
              <a className="text-primary text-sm font-semibold hover:underline" href="#">Voir tout</a>
            </div>
            <div className="flex overflow-x-auto pb-4 gap-4 px-4 no-scrollbar">
              {/* Class Card 1 */}
              <div className="flex flex-col gap-3 rounded-xl min-w-[160px] sm:min-w-[200px] bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div 
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" 
                  title="Modern high school classroom environment" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCjeeJSwVgGeT_NH7YZyI3_kgoS5UPc6k0iUW5aQyJqeOnyVderYvMomR-uQifQzMMhRj0-zkSVAo3MeGtAmRn4kGrMzH6_MLqprsyxRNyLLOGsel98n7A7npck_6N1UhRl_8hOeKDLdc-KiKMJfnFytpXbTmgEHur6NNGBjmffNfQKNSHjYBlvnoTzvMbIWcx_yD5wR1fzkEL4LuNmkak8MnaS2DTUO5MP9iqB91wOIH0Qs5qmk106XORKdoVjRxHeR-E5vYyGfHbR')" }}
                ></div>
                <div>
                  <p className="text-slate-900 dark:text-slate-100 text-sm font-bold">7ème année</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">35 élèves • Math</p>
                </div>
              </div>
              {/* Class Card 2 */}
              <div className="flex flex-col gap-3 rounded-xl min-w-[160px] sm:min-w-[200px] bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div 
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" 
                  title="Students collaborating on a math project" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBNsR-LPASO8tmien1__kd7vxLt7nnspEo6bIKvelm3p7Q2hXhBz8mjlJ-F7NN2pwqwE2p64u-dwsXLMnVXPEtiG-5P_DFkEghulGp7KQHBccCYou66JqSYZcA4nkBKTAnjnBMvkcObs6CNSMjmBuLw0DllIQpAC6HORE2Em5A_ry7tyict3ICYhVbvLFC84Wu_SM4fwYLt5LQH3Lvga2tKD286rCIwXosUeTfQrzunHpRYWR6hhxd9iE9Fs7yLy03OGlJxg3HXhFBF')" }}
                ></div>
                <div>
                  <p className="text-slate-900 dark:text-slate-100 text-sm font-bold">NS2</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">28 élèves • Math</p>
                </div>
              </div>
              {/* Class Card 3 */}
              <div className="flex flex-col gap-3 rounded-xl min-w-[160px] sm:min-w-[200px] bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div 
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" 
                  title="Teacher writing complex formulas on whiteboard" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDTQp1rCGC5Tr4oCbNbuadGlmlx7yWm3AejfL_vgrVMdGElE-t6If9bJrKMeJ6PKy7_f1tZL7jGGnZgmmHnzfs95ueGnzk2CICmvbvVLWNXA40UwLyXRtw2cJArHTw96t0phbEqhIJYkzm4PMHe62VXkLEqAGLKv3WPsbMGGNnvlZdlCDzKYuH4HzCenmVuys8ha-ZZbzIbiBMGVLhNyLbtkcB1XOf9Z9ldW2lnv-EaDWarHXQTewLNEUD1tgnCZZW3f78D1szxEkAL')" }}
                ></div>
                <div>
                  <p className="text-slate-900 dark:text-slate-100 text-sm font-bold">NS3</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">30 élèves • Math</p>
                </div>
              </div>
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
            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-medium">Devoir publié</p>
                  <p className="text-xs text-slate-500 italic">NS2 - Géométrie analytique • Il y a 2h</p>
                </div>
              </div>
              <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <span className="material-symbols-outlined">edit_calendar</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-medium">Examen ajouté</p>
                  <p className="text-xs text-slate-500 italic">NS3 - Calcul intégral • Hier</p>
                </div>
              </div>
              <div className="p-4 flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-medium">Notes publiées</p>
                  <p className="text-xs text-slate-500 italic">7ème année - Algèbre • Il y a 2 jours</p>
                </div>
              </div>
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
            <Link className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" to="#">
              <span className="material-symbols-outlined">groups</span>
              <p className="text-[10px] font-medium leading-none">Classes</p>
            </Link>
            <Link className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" to="#">
              <div className="relative">
                <span className="material-symbols-outlined">chat_bubble</span>
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">3</span>
              </div>
              <p className="text-[10px] font-medium leading-none">Messages</p>
            </Link>
            <Link className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" to="#">
              <span className="material-symbols-outlined">account_circle</span>
              <p className="text-[10px] font-medium leading-none">Profil</p>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
