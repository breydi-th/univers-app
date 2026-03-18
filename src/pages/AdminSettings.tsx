import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function AdminSettings() {
  const navigate = useNavigate();
  
  const handleAction = (title: string) => {
    alert(`Configuration de "${title}" sera disponible dans la prochaine mise à jour.`);
  };

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen">
      <header className="sticky top-0 z-50 bg-[#0a0c10] border-b border-slate-800/50 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3 max-w-7xl mx-auto w-full">
          <button onClick={() => navigate(-1)} className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-blue-500 hover:bg-blue-600/30 transition-all shadow-lg shadow-blue-600/10">
            <span className="material-symbols-outlined font-black">arrow_back</span>
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-black leading-tight text-white">Paramètres</h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Configuration Système</p>
          </div>
          <div className="flex gap-2">
            <button className="flex size-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-xl">help</span>
            </button>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4">
        <div 
          onClick={() => handleAction("Informations de l'école")}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:border-blue-500/30 transition-all cursor-pointer group active:scale-[0.98]"
        >
          <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">school</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Informations de l'école</h3>
            <p className="text-xs text-slate-500">Nom, logo, adresse et contact</p>
          </div>
          <span className="material-symbols-outlined text-slate-700">chevron_right</span>
        </div>

        <div 
          onClick={() => handleAction("Année Académique")}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:border-purple-500/30 transition-all cursor-pointer group active:scale-[0.98]"
        >
          <div className="size-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">calendar_today</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Année Académique</h3>
            <p className="text-xs text-slate-500">Périodes, trimestres et vacances</p>
          </div>
          <span className="material-symbols-outlined text-slate-700">chevron_right</span>
        </div>

        <div 
          onClick={() => handleAction("Sécurité & Rôles")}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:border-emerald-500/30 transition-all cursor-pointer group active:scale-[0.98]"
        >
          <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">security</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Sécurité & Rôles</h3>
            <p className="text-xs text-slate-500">Permissions et accès administrateurs</p>
          </div>
          <span className="material-symbols-outlined text-slate-700">chevron_right</span>
        </div>

        <div 
          onClick={() => handleAction("Notifications")}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:border-red-500/30 transition-all cursor-pointer group active:scale-[0.98]"
        >
          <div className="size-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">notifications</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Notifications</h3>
            <p className="text-xs text-slate-500">Alertes SMS, Email et Push</p>
          </div>
          <span className="material-symbols-outlined text-slate-700">chevron_right</span>
        </div>

        <div className="pt-8 text-center">
            <p className="text-[10px] text-slate-700 font-bold uppercase tracking-[0.2em] mb-4">Version 1.0.4 • © 2026 Univers-App</p>
            <button 
              onClick={() => { localStorage.removeItem('user_session'); navigate('/'); }}
              className="bg-red-500/10 text-red-500 px-6 py-2 rounded-xl font-bold text-sm hover:bg-red-500 hover:text-white transition-all shadow-lg active:scale-95"
            >
              Déconnexion
            </button>
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-[#0a0c10]/90 backdrop-blur-2xl px-2 pb-8 pt-3 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
        <div className="max-w-4xl mx-auto w-full flex justify-around">
          <Link className="flex flex-1 flex-col items-center gap-1 text-slate-500 hover:text-white transition-colors" to="/admin-dashboard">
            <span className="material-symbols-outlined">grid_view</span>
            <p className="text-[10px] font-black uppercase tracking-tighter">Dashboard</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1 text-slate-500 hover:text-white transition-colors" to="/admin-students">
            <span className="material-symbols-outlined">business_center</span>
            <p className="text-[10px] font-black uppercase tracking-tighter">Gestion</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1 text-slate-500 hover:text-white transition-colors" to="/admin-reports">
            <span className="material-symbols-outlined">bar_chart</span>
            <p className="text-[10px] font-black uppercase tracking-tighter">Rapports</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1 text-primary" to="/admin-settings">
            <span className="material-symbols-outlined fill-[1]">settings</span>
            <p className="text-[10px] font-black uppercase tracking-tighter">Paramètres</p>
          </Link>
        </div>
      </nav>
    </div>
  );
}
