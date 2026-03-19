import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import ThemeToggle from '../components/ThemeToggle';

export default function AdminSettings() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen">
      <AdminHeader 
        title="Paramètres" 
        subtitle="Configuration Système"
        showBack={true}
        rightActions={
          <div className="flex gap-2">
            <button className="flex size-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 transition-colors shadow-lg">
              <span className="material-symbols-outlined text-xl">help</span>
            </button>
          </div>
        }
      />

      <main className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6 pb-40">
        {/* Apperance Section */}
        <section className="space-y-3">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 px-1">Apparence & Thème</h2>
          <ThemeToggle />
        </section>

        {/* Categories Section */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 px-1">Général</h2>
          
          <Link 
            to="/admin-settings/school"
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:border-blue-500/30 transition-all cursor-pointer group active:scale-[0.98] shadow-xl"
          >
            <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">school</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm uppercase tracking-tight">Informations de l'école</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Identité, logo et contacts</p>
            </div>
            <span className="material-symbols-outlined text-slate-700">chevron_right</span>
          </Link>

          <Link 
            to="/admin-settings/academic"
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:border-purple-500/30 transition-all cursor-pointer group active:scale-[0.98] shadow-xl"
          >
            <div className="size-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm uppercase tracking-tight">Année Académique</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Calendrier et trimestres</p>
            </div>
            <span className="material-symbols-outlined text-slate-700">chevron_right</span>
          </Link>

          <Link 
            to="/admin-settings/security"
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:border-emerald-500/30 transition-all cursor-pointer group active:scale-[0.98] shadow-xl"
          >
            <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">security</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm uppercase tracking-tight">Sécurité & Rôles</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Permissions et accès</p>
            </div>
            <span className="material-symbols-outlined text-slate-700">chevron_right</span>
          </Link>

          <Link 
            to="/admin-settings/notifications"
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 hover:border-red-500/30 transition-all cursor-pointer group active:scale-[0.98] shadow-xl"
          >
            <div className="size-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">notifications</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm uppercase tracking-tight">Notifications</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Alertes et communications</p>
            </div>
            <span className="material-symbols-outlined text-slate-700">chevron_right</span>
          </Link>
        </section>

        <div className="pt-6">
            <button 
              onClick={() => { if(confirm("Se déconnecter ?")) { localStorage.removeItem('user_session'); navigate('/'); } }}
              className="w-full bg-red-600/10 border border-red-500/20 rounded-2xl p-5 flex items-center gap-4 hover:bg-red-600/20 hover:border-red-500/40 transition-all cursor-pointer group active:scale-[0.98] shadow-lg"
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

        <div className="pt-8 text-center">
            <p className="text-[9px] text-slate-800 dark:text-slate-700 font-black uppercase tracking-[0.4em] mb-4 opacity-50">Edition Premium • © 2026 Univers-App</p>
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-[#0a0c10]/80 backdrop-blur-2xl px-2 pb-8 pt-4 z-30 shadow-[0_-15px_50px_rgba(0,0,0,0.6)]">
        <div className="max-w-4xl mx-auto w-full flex justify-around">
          <Link className="flex flex-1 flex-col items-center gap-1.5 text-slate-500 hover:text-white transition-all group" to="/admin-dashboard">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">grid_view</span>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Accueil</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1.5 text-slate-500 hover:text-white transition-all group" to="/admin-students">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">business_center</span>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Gestion</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1.5 text-slate-500 hover:text-white transition-all group" to="/admin-reports">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">bar_chart</span>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Rapports</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1.5 text-primary group" to="/admin-settings">
            <span className="material-symbols-outlined fill-[1] group-hover:scale-110 transition-transform">settings</span>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80">Paramètres</p>
          </Link>
        </div>
      </nav>
    </div>
  );
}
