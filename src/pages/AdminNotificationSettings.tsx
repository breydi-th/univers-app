import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AdminNotificationSettings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetchNotificationSettings();
  }, []);

  async function fetchNotificationSettings() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('notification_settings').select('*');
      if (error) throw error;
      setNotifications(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function toggleChannel(id: string, current: boolean) {
    try {
      const { error } = await supabase
        .from('notification_settings')
        .update({ is_enabled: !current })
        .eq('id', id);
      if (error) throw error;
      fetchNotificationSettings();
    } catch (err) {
      console.error(err);
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
            <h1 className="text-xl font-black text-white leading-tight">Notifications</h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Canaux de communication</p>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group">
          <h2 className="text-xl font-black uppercase tracking-tighter mb-8 text-center sm:text-left">Canaux d'alerte</h2>
          
          <div className="space-y-4">
            {loading ? (
              <div className="py-20 text-center text-slate-500">Chargement...</div>
            ) : notifications.length === 0 ? (
              <div className="py-20 text-center text-slate-600 italic">Aucune configuration trouvée.</div>
            ) : notifications.map((n) => (
              <div key={n.id} className={`flex items-center justify-between p-5 bg-slate-950 rounded-3xl border border-slate-800 transition-all ${n.is_enabled ? 'border-primary/20' : ''}`}>
                 <div className="flex items-center gap-4">
                    <div className={`size-12 rounded-2xl flex items-center justify-center transition-all ${n.type === 'sms' ? 'bg-blue-500/10 text-blue-500' : n.type === 'email' ? 'bg-purple-500/10 text-purple-500' : 'bg-orange-500/10 text-orange-500'}`}>
                       <span className="material-symbols-outlined text-3xl">{n.type === 'sms' ? 'sms' : n.type === 'email' ? 'alternate_email' : 'notifications_active'}</span>
                    </div>
                    <div>
                       <h3 className="text-sm font-black uppercase tracking-widest">{n.type === 'sms' ? 'Messages SMS' : n.type === 'email' ? 'E-mail Hebdo' : 'Notifications Mobiles'}</h3>
                       <p className="text-xs text-slate-500 font-bold group-hover:text-slate-400">Canal {n.type}</p>
                    </div>
                 </div>
                 <div 
                   onClick={() => toggleChannel(n.id, n.is_enabled)}
                   className={`h-7 w-14 rounded-full relative cursor-pointer transition-colors ${n.is_enabled ? 'bg-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-slate-800'}`}
                 >
                    <div className={`absolute top-1 bottom-1 w-5 bg-white rounded-full transition-all ${n.is_enabled ? 'right-1' : 'left-1'}`}></div>
                 </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl opacity-50 pointer-events-none">
           <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 px-2">Modèles de messages</h3>
           <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[10px] text-slate-700 font-mono">
              "Bonjour [NOM], [ÉCOLE] vous informe que..."
           </div>
        </div>
      </main>
    </div>
  );
}
