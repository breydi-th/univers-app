import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AdminSecuritySettings() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmins();
  }, []);

  async function fetchAdmins() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'admin')
        .order('full_name');
      if (error) throw error;
      setAdmins(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen">
      <header className="sticky top-0 z-50 bg-[#0a0c10] border-b border-slate-800/50 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3 max-w-7xl mx-auto w-full">
          <button onClick={() => navigate(-1)} className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-blue-500 hover:bg-blue-600/30 transition-all shadow-lg shadow-blue-600/10">
            <span className="material-symbols-outlined font-black">arrow_back</span>
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-black text-white leading-tight">Sécurité & Rôles</h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Accès Administrateurs</p>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
           <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black uppercase tracking-tighter">Administrateurs Actifs</h2>
              <Link to="/admin-accounts" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-[10px] font-black uppercase rounded-xl transition-all border border-slate-700">Ajouter</Link>
           </div>
           
           <div className="space-y-3">
              {loading ? (
                <div className="py-10 text-center text-slate-500">Chargement...</div>
              ) : admins.map((admin) => (
                <div key={admin.id} className="flex items-center gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800/50 transition-all hover:border-emerald-500/30">
                   <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xl">
                      <span className="material-symbols-outlined">verified_user</span>
                   </div>
                   <div className="flex-1">
                      <p className="font-black text-sm">{admin.full_name}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Compte: {admin.id_user}</p>
                   </div>
                   <span className=" material-symbols-outlined text-slate-700">settings</span>
                </div>
              ))}
           </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
          <h2 className="text-lg font-black uppercase tracking-tighter mb-6">Permissions Globales</h2>
          <div className="space-y-4">
            {[
              { label: "Inscription Automatique", enabled: true, desc: "Permettre aux élèves de s'inscrire via QR code" },
              { label: "Accès Professeurs", enabled: true, desc: "Accès total aux listes d'étudiants pour les profs" },
              { label: "Exportation PDF", enabled: false, desc: "Export automatique des rapports chaque mois" },
            ].map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800 hover:border-primary/20 transition-all">
                 <div className="flex-1">
                    <h3 className="text-sm font-black tracking-tight">{p.label}</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">{p.desc}</p>
                 </div>
                 <div className={`h-6 w-12 rounded-full relative cursor-pointer opacity-50 ${p.enabled ? 'bg-primary' : 'bg-slate-800'}`}>
                    <div className={`absolute top-1 bottom-1 w-4 bg-white rounded-full transition-all ${p.enabled ? 'right-1' : 'left-1'}`}></div>
                 </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
