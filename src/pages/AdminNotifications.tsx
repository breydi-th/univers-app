import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';

interface NotificationItem {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'user' | 'report' | 'system' | 'announcement';
  target?: string;
  isNew: boolean;
}

export default function AdminNotifications() {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', description: '', target: 'Tous' });
  const [notifications, setNotifications] = useState<NotificationItem[]>([
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
  ]);

  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.description) return;
    
    const newItem: NotificationItem = {
      id: Date.now(),
      title: `ANNONCE: ${newAnnouncement.title}`,
      description: newAnnouncement.description,
      time: "À l'instant",
      type: 'announcement',
      target: newAnnouncement.target,
      isNew: true
    };

    setNotifications([newItem, ...notifications]);
    setNewAnnouncement({ title: '', description: '', target: 'Tous' });
    setIsAdding(false);
    alert(`📢 Annonce envoyée aux : ${newAnnouncement.target}`);
  };

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen">
      <AdminHeader 
        title="Centre d'Alertes" 
        subtitle="Activités récentes"
        showBack={true}
        rightActions={
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className={`flex size-10 items-center justify-center rounded-xl border transition-all ${isAdding ? 'bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-primary/10 border-primary/30 text-primary hover:bg-primary hover:text-white'}`}
          >
            <span className="material-symbols-outlined font-black">
              {isAdding ? 'close' : 'campaign'}
            </span>
          </button>
        }
      />

      <main className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6 pb-40">
        {/* Form to add announcement */}
        {isAdding && (
          <div className="bg-slate-900 border border-primary/30 rounded-[2rem] p-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-500">
             <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary">campaign</span>
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Nouvelle Annonce</h3>
             </div>

             <div className="space-y-3">
                <input 
                  placeholder="Titre de l'annonce..."
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl outline-none focus:border-primary transition-all font-bold"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                />
                <textarea 
                  placeholder="Écrivez votre message ici..."
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl outline-none focus:border-primary transition-all font-medium h-32 resize-none"
                  value={newAnnouncement.description}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, description: e.target.value})}
                />
                
                <div className="grid grid-cols-3 gap-2">
                   {(['Tous', 'Élèves', 'Profs'] as const).map((t) => (
                      <button 
                        key={t}
                        onClick={() => setNewAnnouncement({...newAnnouncement, target: t})}
                        className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all border ${newAnnouncement.target === t ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                      >
                        {t}
                      </button>
                   ))}
                </div>

                <button 
                  onClick={handleAddAnnouncement}
                  className="w-full py-4 bg-primary text-white font-black uppercase text-xs rounded-xl shadow-xl hover:bg-primary/90 active:scale-95 transition-all mt-2"
                >
                  Envoyer l'annonce
                </button>
             </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2 mt-4">Historique des flux</h3>
          {notifications.map((n) => (
            <div key={n.id} className={`p-5 rounded-3xl border transition-all flex gap-4 bg-slate-900 shadow-xl group hover:border-slate-600 ${n.isNew ? 'border-blue-500/30 ring-1 ring-blue-500/10' : 'border-slate-800'}`}>
              <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${
                n.type === 'user' ? 'bg-emerald-500/10 text-emerald-500' : 
                n.type === 'report' ? 'bg-amber-500/10 text-amber-500' : 
                n.type === 'announcement' ? 'bg-primary/10 text-primary' : 
                'bg-blue-500/10 text-blue-500'
              }`}>
                <span className="material-symbols-outlined text-2xl">
                  {n.type === 'user' ? 'person_add' : n.type === 'report' ? 'description' : n.type === 'announcement' ? 'campaign' : 'settings'}
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-white uppercase tracking-tight">{n.title}</h3>
                    {n.target && (
                       <span className="px-2 py-0.5 rounded-md bg-white/5 text-[8px] font-black uppercase text-slate-500 border border-white/10">{n.target}</span>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase">{n.time}</span>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">{n.description}</p>
              </div>
              {n.isNew && (
                <div className="size-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] mt-1.5"></div>
              )}
            </div>
          ))}
        </div>

        <button className="w-full py-10 text-slate-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest border-t border-slate-900 mt-10">
          Charger les anciennes notifications
        </button>
      </main>
    </div>
  );
}
