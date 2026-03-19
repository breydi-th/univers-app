import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';

export default function AdminSettings() {
  const navigate = useNavigate();
  
  const handleAction = (title: string) => {
    alert(`Configuration de "${title}" sera disponible dans la prochaine mise à jour.`);
  };

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen">
      <AdminHeader 
        title="Paramètres" 
        subtitle="Configuration Système"
        showBack={true}
        rightActions={
          <div className="flex gap-2">
            <button className="flex size-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-xl">help</span>
            </button>
          </div>
        }
      />

      <main className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4">
        <Link 
          to="/admin-settings/school"
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
        </Link>

        <Link 
          to="/admin-settings/academic"
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
        </Link>

        <Link 
          to="/admin-settings/security"
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
        </Link>

        <Link 
          to="/admin-settings/notifications"
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
        </Link>

        <div className="pt-4 pb-2">
            <div className="h-px bg-slate-800 w-full mb-6 opacity-50"></div>
            
            <button 
              onClick={() => { localStorage.removeItem('user_session'); navigate('/'); }}
              className="w-full bg-red-600/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-4 hover:bg-red-600/20 hover:border-red-500/40 transition-all cursor-pointer group active:scale-[0.98]"
            >
              <div className="size-12 rounded-xl bg-red-600/20 flex items-center justify-center text-red-500 group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <span className="material-symbols-outlined">logout</span>
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-black text-red-500 uppercase tracking-tighter">Déconnexion</h3>
                <p className="text-[10px] text-red-400/60 font-black uppercase tracking-widest leading-none mt-1">Fermer la session sécurisée</p>
              </div>
              <span className="material-symbols-outlined text-red-500/30">chevron_right</span>
            </button>
        </div>

        <div className="pt-4 text-center">
            <p className="text-[9px] text-slate-800 font-black uppercase tracking-[0.4em] mb-4 opacity-50">Version 1.0.5 • © 2026 Univers-App</p>
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
