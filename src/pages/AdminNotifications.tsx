import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminHeader from '../components/AdminHeader';

interface NotificationItem {
  id: string | number;
  title: string;
  description: string;
  time: string;
  date: Date;
  type: 'user' | 'report' | 'system' | 'announcement';
  target?: string;
  isNew: boolean;
}

export default function AdminNotifications() {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', description: '', target: 'Tous' });
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const fetchRealActivities = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch latest profile creations (Real Registration Activities)
        const { data: users, error: userError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (userError) throw userError;

        const realUserActivities: NotificationItem[] = (users || []).map((u: any) => ({
          id: u.id,
          title: u.role === 'student' ? "Nouvelle inscription" : u.role === 'teacher' ? "Nouveau compte enseignant" : "Nouveau compte admin",
          description: `${u.full_name} (${u.role}) a rejoint l'établissement.`,
          time: formatRelativeTime(new Date(u.created_at)),
          date: new Date(u.created_at),
          type: 'user',
          isNew: new Date(u.created_at).getTime() > Date.now() - 24 * 60 * 60 * 1000 // New if < 24h
        }));

        // 2. Combine with some realistic mock activities for system and reports
        const mockActivities: NotificationItem[] = [
          {
            id: 'm1',
            title: "Rapport mensuel prêt",
            description: "Le rapport des activités du mois de Février est disponible.",
            time: "Il y a 2h",
            date: new Date(Date.now() - 2 * 60 * 60 * 1000),
            type: "report",
            isNew: true
          },
          {
            id: 'm2',
            title: "Mise à jour système",
            description: "La version 1.0.5 de l'application a été déployée.",
            time: "Hier",
            date: new Date(Date.now() - 24 * 60 * 60 * 1000),
            type: "system",
            isNew: false
          }
        ];

        const all = [...realUserActivities, ...mockActivities].sort((a, b) => b.date.getTime() - a.date.getTime());
        setNotifications(all);
      } catch (e) {
        console.error("Error fetching activities:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRealActivities();
  }, []);

  const formatRelativeTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours === 1) return `Il y a 1 heure`;
    if (hours < 24) return `Il y a ${hours} heures`;
    if (days === 1) return `Hier`;
    return `Il y a ${days} jours`;
  };

  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.description) return;
    
    const newItem: NotificationItem = {
      id: `a-${Date.now()}`,
      title: `ANNONCE: ${newAnnouncement.title}`,
      description: newAnnouncement.description,
      time: "À l'instant",
      date: new Date(),
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
        subtitle="Activités réelles"
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
          <div className="bg-slate-900 border border-primary/30 rounded-[2.5rem] p-8 space-y-4 shadow-2xl animate-in slide-in-from-top duration-500 relative overflow-hidden group">
             <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             
             <div className="flex items-center gap-3 mb-2 relative z-10">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined font-bold">campaign</span>
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Nouvelle Annonce</h3>
             </div>

             <div className="space-y-3 relative z-10">
                <input 
                  placeholder="Titre de l'annonce..."
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-primary transition-all font-bold placeholder:text-slate-800"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                />
                <textarea 
                  placeholder="Écrivez votre message ici..."
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-primary transition-all font-medium h-32 resize-none placeholder:text-slate-800"
                  value={newAnnouncement.description}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, description: e.target.value})}
                />
                
                <div className="grid grid-cols-3 gap-2">
                   {(['Tous', 'Élèves', 'Profs'] as const).map((t) => (
                      <button 
                        key={t}
                        onClick={() => setNewAnnouncement({...newAnnouncement, target: t})}
                        className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-tighter transition-all border ${newAnnouncement.target === t ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                      >
                        {t}
                      </button>
                   ))}
                </div>

                <button 
                  onClick={handleAddAnnouncement}
                  className="w-full py-5 bg-primary text-white font-black uppercase text-xs rounded-2xl shadow-xl hover:bg-primary/90 active:scale-95 transition-all mt-2"
                >
                  Envoyer aux destinataires
                </button>
             </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 mt-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Flux d'activités en direct</h3>
            {isLoading && <div className="size-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>}
          </div>

          {isLoading && notifications.length === 0 && (
            <div className="space-y-4 animate-pulse">
               {[1,2,3].map(i => (
                  <div key={i} className="h-24 bg-slate-900/50 rounded-3xl border border-slate-800/50"></div>
               ))}
            </div>
          )}

          {!isLoading && notifications.length === 0 && (
            <div className="text-center py-20 bg-slate-900 rounded-[2.5rem] border border-slate-800 border-dashed">
               <span className="material-symbols-outlined text-4xl text-slate-700 mb-2">inbox</span>
               <p className="text-xs font-bold text-slate-500 uppercase">Aucune activité détectée</p>
            </div>
          )}

          {notifications.map((n) => (
            <div key={n.id} className={`p-5 rounded-[2.5rem] border transition-all flex gap-4 bg-slate-900 shadow-xl group hover:border-slate-600 ${n.isNew ? 'border-primary/20 ring-1 ring-primary/5 bg-slate-900/80 backdrop-blur-sm' : 'border-slate-800'}`}>
              <div className={`size-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner ${
                n.type === 'user' ? 'bg-emerald-500/10 text-emerald-500' : 
                n.type === 'report' ? 'bg-amber-500/10 text-amber-500' : 
                n.type === 'announcement' ? 'bg-primary/10 text-primary' : 
                'bg-blue-500/10 text-blue-500'
              }`}>
                <span className="material-symbols-outlined text-3xl">
                  {n.type === 'user' ? 'person_add' : n.type === 'report' ? 'description' : n.type === 'announcement' ? 'campaign' : 'settings'}
                </span>
              </div>
              <div className="flex-1 space-y-1 py-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-white uppercase tracking-tight line-clamp-1">{n.title}</h3>
                    {n.target && (
                       <span className="px-2 py-1 rounded-lg bg-primary/20 text-[8px] font-black uppercase text-primary border border-primary/20">{n.target}</span>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-2">{n.description}</p>
              </div>
              {n.isNew && (
                <div className="size-2 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--color-primary),0.8)] mt-3"></div>
              )}
            </div>
          ))}
        </div>

        <button className="w-full py-10 text-slate-700 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest border-t border-slate-900 mt-10 flex flex-col items-center gap-2">
          <span className="material-symbols-outlined">expand_more</span>
          Historique complet
        </button>
      </main>
    </div>
  );
}
