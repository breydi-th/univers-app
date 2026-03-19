import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import { supabase } from '../lib/supabase';
import { getAuditLogs, AuditLog } from '../lib/audit';

export default function AdminReports() {
  const [activities, setActivities] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFullLogs = async () => {
    setIsLoading(true);
    try {
      const logs = await getAuditLogs(100); // Fetch last 100 activities
      setActivities(logs);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFullLogs();

    // Subscribe to new activities in real-time
    const auditSub = supabase
      .channel('full-audit-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'audit_logs' }, () => {
        fetchFullLogs();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(auditSub);
    };
  }, []);

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen flex flex-col selection:bg-primary/30">
      <AdminHeader 
        title="Journal d'Audit" 
        subtitle="Historique complet des actions"
        showBack={true}
        backTo="/admin-dashboard"
        rightActions={
          <button 
            onClick={() => window.print()} 
            className="flex size-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 transition-colors"
            title="Exporter / Imprimer"
          >
            <span className="material-symbols-outlined text-xl">print</span>
          </button>
        }
      />

      <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-8 space-y-8 pb-40">
        <section className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in duration-700">
           <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-950/20">
             <div>
                <h3 className="text-xl font-black">Historique des Opérations</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Dernières 100 activités enregistrées</p>
             </div>
             <button onClick={fetchFullLogs} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all">
                <span className={`material-symbols-outlined text-xl ${isLoading ? 'animate-spin' : ''}`}>sync</span>
             </button>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-slate-950/40 text-[10px] uppercase font-black tracking-widest text-slate-500">
                   <th className="px-8 py-4">Horodatage</th>
                   <th className="px-8 py-4">Action</th>
                   <th className="px-8 py-4">Cible</th>
                   <th className="px-8 py-4">Auteur</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-800/50">
                 {activities.length > 0 ? activities.map((log, idx) => (
                   <tr key={idx} className="hover:bg-primary/5 transition-colors group">
                     <td className="px-8 py-5">
                       <p className="text-xs font-bold text-white mb-0.5">{new Date(log.created_at!).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</p>
                       <p className="text-[10px] font-medium text-slate-500">{new Date(log.created_at!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                     </td>
                     <td className="px-8 py-5">
                       <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest 
                         ${log.action.includes('Création') ? 'bg-emerald-500/10 text-emerald-500' : 
                          log.action.includes('Suppression') ? 'bg-red-500/10 text-red-500' : 
                          'bg-blue-500/10 text-blue-500'}`}>
                         <span className="material-symbols-outlined text-sm">
                           {log.action.includes('Création') ? 'add' : log.action.includes('Suppression') ? 'delete' : 'edit'}
                         </span>
                         {log.action}
                       </span>
                     </td>
                     <td className="px-8 py-5">
                        <p className="text-xs font-black text-white">{log.target_name}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{log.target_type}</p>
                     </td>
                     <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                           <div className="size-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-black text-primary border border-slate-700">
                              {log.actor_name.charAt(0)}
                           </div>
                           <span className="text-xs font-bold text-slate-300">{log.actor_name}</span>
                        </div>
                     </td>
                   </tr>
                 )) : (
                   <tr>
                      <td colSpan={4} className="py-20 text-center opacity-20">
                         <span className="material-symbols-outlined text-6xl mb-4">history</span>
                         <p className="text-xs font-black uppercase tracking-widest">Aucune donnée disponible</p>
                      </td>
                   </tr>
                 )}
               </tbody>
             </table>
           </div>
        </section>
      </main>

      {/* Persistent Nav */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950/80 backdrop-blur-2xl px-6 pb-10 pt-4 z-50">
        <div className="max-w-4xl mx-auto flex justify-around">
          <Link className="flex flex-1 flex-col items-center gap-1 text-slate-500 transition-colors" to="/admin-dashboard">
            <span className="material-symbols-outlined">grid_view</span>
            <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1 text-slate-500 transition-colors" to="/admin-students">
            <span className="material-symbols-outlined">business_center</span>
            <span className="text-[10px] font-black uppercase tracking-tighter">Gestion</span>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1 text-primary" to="/admin-reports">
            <span className="material-symbols-outlined fill-[1]">bar_chart</span>
            <span className="text-[10px] font-black uppercase tracking-tighter">Rapports</span>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1 text-slate-500 transition-colors" to="/admin-settings">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-[10px] font-black uppercase tracking-tighter">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
