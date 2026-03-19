import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';

export default function AdminNotifications() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "Nouvelle inscription",
      description: "Jean-Baptiste Junior vient de s'inscrire en NS1.",
      time: "Il y a 5 min",
      type: "user",
      isNew: true
    },
    {
      id: 2,
      title: "Rapport mensuel prêt",
      description: "Le rapport des activités du mois de Février est disponible.",
      time: "Il y a 2h",
      type: "report",
      isNew: true
    },
    {
      id: 3,
      title: "Mise à jour système",
      description: "La version 1.0.5 de l'application a été déployée.",
      time: "Hier",
      type: "system",
      isNew: false
    }
  ];

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen">
      <AdminHeader 
        title="Centre d'Alertes" 
        subtitle="Activités récentes"
        showBack={true}
      />

      <main className="p-4 sm:p-6 max-w-2xl mx-auto space-y-4">
        {notifications.map((n) => (
          <div key={n.id} className={`p-5 rounded-3xl border transition-all flex gap-4 bg-slate-900 shadow-xl ${n.isNew ? 'border-blue-500/30 ring-1 ring-blue-500/10' : 'border-slate-800'}`}>
            <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 ${n.type === 'user' ? 'bg-emerald-500/10 text-emerald-500' : n.type === 'report' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'}`}>
              <span className="material-symbols-outlined text-2xl">
                {n.type === 'user' ? 'person_add' : n.type === 'report' ? 'description' : 'settings'}
              </span>
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white uppercase tracking-tight">{n.title}</h3>
                <span className="text-[9px] text-slate-500 font-bold uppercase">{n.time}</span>
              </div>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">{n.description}</p>
            </div>
            {n.isNew && (
              <div className="size-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] mt-1.5"></div>
            )}
          </div>
        ))}

        <button className="w-full py-4 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
          Charger les anciennes notifications
        </button>
      </main>
    </div>
  );
}
