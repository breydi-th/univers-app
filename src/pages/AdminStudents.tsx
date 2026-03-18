import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminStudents() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 p-4 justify-between bg-primary">
        <div className="flex items-center gap-3 max-w-7xl mx-auto w-full">
          <Link to="/admin-dashboard" className="cursor-pointer flex items-center justify-center hover:bg-white/10 p-2 rounded-full transition-colors">
            <span className="material-symbols-outlined text-2xl text-white">arrow_back</span>
          </Link>
          <h2 className="text-xl font-bold leading-tight tracking-tight text-white flex-1">Gestion des élèves</h2>
          <div className="flex gap-2">
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-white">filter_list</span>
            </button>
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-white">more_vert</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col">
        {/* Search and Stats */}
        <div className="p-4 space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <span className="material-symbols-outlined text-slate-400">search</span>
            </div>
            <input 
              className="block w-full p-3 pl-12 text-base border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all dark:text-white" 
              placeholder="Rechercher par nom ou ID..." 
              type="text"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">Total Élèves</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">1,248</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800/50">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-700 dark:text-green-400">Actifs</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">1,120</p>
            </div>
          </div>
        </div>

        {/* Student List Container */}
        <main className="flex-1 px-4 pb-32">
          <div className="flex flex-col gap-3">
            {/* Student Entry 1 */}
            <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="relative shrink-0">
                <div className="size-14 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-blue-100 dark:border-blue-900">
                  <img className="w-full h-full object-cover" alt="Portrait of a male student" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdL7YY3WCK4PEo4cbZXAkRTcWB2oqf-m6P3wuTm7PwqXmAjO-VMdiglHyBeP9ftD_EYXCHS6kKDjTselDntfGech01JSpNzYvVUxRi2IB_9YAtWs9LeXySAHv_2MF7Xag5KXrDc1eFStnnAc7626LmC_VTey_ZEkVPJ0JniQdS2Y-T56X4NgAWOiO3nQNq7R9I6K3tATqTyEVaqs_wKNF4EI-CKRu2gEz3E1aR60evUPR66QzxXykqoXWRx3gEnbtf-yGFDlplGVWu"/>
                </div>
                <div className="absolute bottom-0 right-0 size-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-base font-bold truncate dark:text-white">Jean Dupont</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 uppercase shrink-0 ml-2">Actif</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">NS4 • ID: BS-2024-001</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>

            {/* Student Entry 2 */}
            <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="relative shrink-0">
                <div className="size-14 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-blue-100 dark:border-blue-900">
                  <img className="w-full h-full object-cover" alt="Portrait of a female student" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtqWdJAwPapHjWIXWyX-94OcrzDQziJqDoDLPVFMGBaVbe11tI-CL3_dEvSXg3n4CX9T5YRJSibQqfZL0dhzaIrT-AyKz-adS_ps6G0B-W5I5mc7p-hmD-mPR-imOe3-CJ53eEo7xZBAXCKCdrJjZS1jgALG6rPfxebDphfF_KD3Jv802BBCl3SZSESJm0dTttXXT4oqpxyJZh2qWkXsXekrvsCIvQai1bsAqqyzlWCbeb9G9c3pAnWnEw9jXoSaxp8sQuuI5jCJIk"/>
                </div>
                <div className="absolute bottom-0 right-0 size-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-base font-bold truncate dark:text-white">Marie Laurence</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 uppercase shrink-0 ml-2">Actif</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">7ème année • ID: BS-2024-042</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>

            {/* Student Entry 3 (Inactive) */}
            <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
              <div className="relative shrink-0">
                <div className="size-14 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-slate-300 dark:border-slate-700 grayscale">
                  <img className="w-full h-full object-cover" alt="Portrait of an inactive student" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvfegAzLdINGrl_mrC3VcuH9-j0mzkngASq70gipos2lSF_fk78HXa_7k6r0abQPV56qa019dvqBOpntaeIy2RcMXVs7UeumjOGEJPeWF7O_jObwCoVJLSY3p_n9KWGlC0FrLLywZIlqaWx-SF3b3w-di6XG6AYpf8vTQWJk_1APdVtS8Dw_Jid9i6iMhbFUzIqjp0l7f_C2NYdqLKdfLcABoJamxhK24f8GYy6nABWyzyi29LhdGnbggB7kAgqmBjWDlsRSpjfYv1"/>
                </div>
                <div className="absolute bottom-0 right-0 size-4 bg-slate-400 rounded-full border-2 border-white dark:border-slate-900"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-base font-bold truncate text-slate-600 dark:text-slate-300">Luc Bernard</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 uppercase shrink-0 ml-2">Inactif</span>
                </div>
                <p className="text-sm text-slate-400 dark:text-slate-500 truncate">NS1 • ID: BS-2023-112</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>

            {/* Student Entry 4 */}
            <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="relative shrink-0">
                <div className="size-14 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-blue-100 dark:border-blue-900">
                  <img className="w-full h-full object-cover" alt="Portrait of a young female student" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI731F3t_PeacpmGerPrZCKMStgS_hLWnA73Nh2UIJjWpZsckWZsBii7PrE_43fQAPbat3kUsLdOePmflwpe2B-dhv8gQb5U98n6Jvqev2h3iVLnctVZ7HIE9T7U0ZCE-jAz9WoKr2wC5Wh5NLIh4I5sS3ABMuS1DqFilNLGmhstD21kCJnWTi7vFuQJ7AHW6icWTtQ-7MS0nQ4p1fT7Q1pt6zWwhX5xHWPCPR_krj8Kec0bpvhSOOZfqOoq2Cv7t5fQIUPqLhS8e9"/>
                </div>
                <div className="absolute bottom-0 right-0 size-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-base font-bold truncate dark:text-white">Clara Lefebvre</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 uppercase shrink-0 ml-2">Actif</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">9ème année • ID: BS-2024-088</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Floating Action Button */}
        <div className="fixed bottom-24 left-0 right-0 px-4 pointer-events-none z-40 max-w-7xl mx-auto">
          <button className="pointer-events-auto flex w-full items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/30 active:scale-95 transition-all">
            <span className="material-symbols-outlined">person_add</span>
            Ajouter un nouvel élève
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 pb-8 pt-3 z-50">
        <div className="max-w-7xl mx-auto w-full flex justify-around">
          <Link className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" to="/admin-dashboard">
            <span className="material-symbols-outlined">dashboard</span>
            <p className="text-[10px] font-medium leading-normal tracking-tight uppercase">Dashboard</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center justify-center gap-1 text-primary" to="/admin-students">
            <span className="material-symbols-outlined fill-1">group</span>
            <p className="text-[10px] font-medium leading-normal tracking-tight uppercase">Élèves</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" to="#">
            <span className="material-symbols-outlined">school</span>
            <p className="text-[10px] font-medium leading-normal tracking-tight uppercase">Classes</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" to="#">
            <span className="material-symbols-outlined">settings</span>
            <p className="text-[10px] font-medium leading-normal tracking-tight uppercase">Paramètres</p>
          </Link>
        </div>
      </nav>
    </div>
  );
}
