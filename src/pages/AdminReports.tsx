import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';

export default function AdminReports() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen">
      <AdminHeader 
        title="Rapports & Stats" 
        subtitle="Analyse de l'établissement"
        showBack={true}
        backTo="/admin-dashboard"
        rightActions={
          <div className="flex gap-2">
            <button className="flex size-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-xl">share</span>
            </button>
          </div>
        }
      />

      <main className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center p-12 bg-slate-900/50 border border-slate-800 rounded-3xl shadow-xl mt-8 text-center">
          <div className="bg-purple-500/10 p-6 rounded-full mb-6 border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.15)] relative">
            <span className="material-symbols-outlined text-purple-500 text-6xl">analytics</span>
            <div className="absolute -top-1 -right-1 bg-primary p-1.5 rounded-full border-4 border-slate-950"></div>
          </div>
          <h2 className="text-2xl font-black mb-3">Rapports en cours de génération</h2>
          <p className="text-slate-400 max-w-sm mb-8 leading-relaxed font-medium">
            Les statistiques s'accumulent au fur et à mesure de l'utilisation. Revenez bientôt pour voir les graphiques de réussite et de présence.
          </p>
          
          <div className="grid grid-cols-2 gap-3 w-full max-w-md">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 opacity-50 flex items-center gap-3">
               <span className="material-symbols-outlined text-blue-500">bar_chart</span>
               <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-1/3"></div>
               </div>
            </div>
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 opacity-50 flex items-center gap-3">
               <span className="material-symbols-outlined text-emerald-500">pie_chart</span>
               <div className="size-8 rounded-full border-4 border-slate-800 border-t-emerald-500"></div>
            </div>
          </div>
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
          <Link className="flex flex-1 flex-col items-center gap-1 text-primary" to="/admin-reports">
            <span className="material-symbols-outlined fill-[1]">bar_chart</span>
            <p className="text-[10px] font-black uppercase tracking-tighter">Rapports</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1 text-slate-500 hover:text-white transition-colors" to="/admin-settings">
            <span className="material-symbols-outlined">settings</span>
            <p className="text-[10px] font-black uppercase tracking-tighter">Paramètres</p>
          </Link>
        </div>
      </nav>
    </div>
  );
}
