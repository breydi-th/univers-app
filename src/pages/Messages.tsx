import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface MessageItem {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  time: string;
  isUnread: boolean;
  type: 'assignment' | 'system' | 'chat';
}

export default function Messages() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState<MessageItem[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('user_session');
    if (!session) { navigate('/'); return; }
    const parsed = JSON.parse(session);
    setUser(parsed);
    fetchData(parsed);
  }, []);

  async function fetchData(userData: any) {
    try {
      setLoading(true);
      const userClass = userData.class_name || userData.class_id || '';
      
      // 1. Fetch assignments as "Notifications"
      const { data: assignments } = await supabase
        .from('assignments')
        .select(`
          *,
          profiles:teacher_id (full_name, avatar_url)
        `)
        .or(`class_id.eq.${userClass},class_id.eq.Toutes,class_id.eq.`)
        .order('created_at', { ascending: false })
        .limit(5);

      if (assignments) {
        const asgnNotif: MessageItem[] = assignments.map((as: any) => ({
          id: as.id,
          sender: as.profiles?.full_name || 'Système',
          avatar: as.profiles?.avatar_url || 'https://api.dicebear.com/7.x/initials/svg?seed=Sys',
          content: `Nouveau devoir : "${as.title}" pour la classe ${as.class_id}.`,
          time: formatRelativeTime(new Date(as.created_at)),
          isUnread: true,
          type: 'assignment'
        }));
        
        // Add a default welcome message
        const welcome: MessageItem = {
          id: 'welcome',
          sender: 'Administration',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Adm',
          content: 'Bienvenue sur votre nouvel espace élève ! Vous y trouverez vos cours et devoirs.',
          time: 'Il y a 1j',
          isUnread: false,
          type: 'system'
        };

        setNotifications([...asgnNotif, welcome]);
      }

      // 2. Fetch Teachers of this class as potential contacts
      const { data: courseTeachers } = await supabase
        .from('courses')
        .select(`
          teacher_id,
          profiles:teacher_id (full_name, avatar_url, role)
        `)
        .eq('class_id', userClass);

      if (courseTeachers) {
        const uniqueTeachers = Array.from(new Set(courseTeachers.map(ct => ct.teacher_id)))
          .map(tid => (courseTeachers.find(ct => ct.teacher_id === tid) as any)?.profiles)
          .filter(p => !!p);
        setTeachers(uniqueTeachers);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const formatRelativeTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `Il y a ${minutes}m`;
    if (hours < 24) return `Il y a ${hours}h`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen selection:bg-indigo-500/30">
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-white/5 p-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="size-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all border border-white/5 active:scale-90">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
          </button>
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest text-white leading-none">Notifications</h1>
            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-1 opacity-70">Centre de messagerie</p>
          </div>
        </div>
        <div className="flex -space-x-3">
          {teachers.slice(0, 3).map((t, i) => (
            <img key={i} src={t.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${t.full_name}`} className="size-8 rounded-lg border-2 border-slate-900 object-cover" title={t.full_name}  alt={t.full_name}/>
          ))}
          {teachers.length > 3 && (
            <div className="size-8 rounded-lg bg-indigo-600 border-2 border-slate-900 flex items-center justify-center text-[10px] font-black">+{teachers.length - 3}</div>
          )}
        </div>
      </header>

      <main className="p-4 sm:p-8 max-w-2xl mx-auto space-y-8 pb-40">
        
        {/* Quick Contacts */}
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Contacter vos professeurs</h2>
            <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-1">
               <span className="size-1.5 rounded-full bg-emerald-500"></span> Dispo
            </span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-none">
            {teachers.map((t, i) => (
              <button key={i} className="flex flex-col items-center gap-2 group shrink-0">
                <div className="relative">
                   <img src={t.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${t.full_name}`} className="size-14 rounded-2xl border border-white/10 group-hover:border-indigo-500/50 transition-all p-0.5"  alt={t.full_name}/>
                   <div className="absolute -bottom-1 -right-1 size-3 bg-emerald-500 rounded-full border-2 border-slate-950"></div>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-tighter text-slate-400 group-hover:text-indigo-400 transition-colors w-14 text-center truncate">{t.full_name.split(' ')[0]}</span>
              </button>
            ))}
            {teachers.length === 0 && (
              <p className="text-[10px] text-slate-600 font-bold uppercase italic py-2">Aucun professeur répertorié pour cette classe.</p>
            )}
          </div>
        </section>

        {/* Notifications / Messages Feed */}
        <section className="space-y-4">
           <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 px-2">Activités Récentes</h2>
           
           {loading ? (
             <div className="space-y-4 animate-pulse">
                {[1,2,3].map(i => (
                  <div key={i} className="h-20 bg-slate-900 border border-white/5 rounded-3xl"></div>
                ))}
             </div>
           ) : notifications.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 bg-slate-900/50 rounded-[3rem] border border-slate-800 border-dashed">
                <span className="material-symbols-outlined text-4xl text-slate-700 mb-3">mark_email_read</span>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Tout est à jour</p>
             </div>
           ) : (
             notifications.map((n) => (
               <div key={n.id} className={`p-5 rounded-[2.5rem] border transition-all flex gap-4 bg-slate-900 shadow-xl group hover:border-slate-700 ${n.isUnread ? 'border-primary/20 bg-indigo-500/5' : 'border-slate-800 opacity-80'}`}>
                 <img src={n.avatar} className="size-12 rounded-2xl border border-white/10 group-hover:scale-105 transition-transform"  alt={n.sender}/>
                 <div className="flex-1 space-y-1">
                   <div className="flex items-center justify-between">
                     <h3 className="text-xs font-black text-white uppercase tracking-tight">{n.sender}</h3>
                     <span className="text-[8px] text-slate-500 font-bold uppercase">{n.time}</span>
                   </div>
                   <p className="text-xs text-slate-400 font-medium leading-relaxed">{n.content}</p>
                   {n.type === 'assignment' && (
                     <Link to="/assignments" className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-black uppercase text-indigo-400 hover:text-indigo-300 transition-colors">
                       Consulter mon travail <span className="material-symbols-outlined text-xs">arrow_forward</span>
                     </Link>
                   )}
                 </div>
                 {n.isUnread && (
                   <div className="size-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] mt-4"></div>
                 )}
               </div>
             ))
           )}
        </section>

      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 p-4 pb-10 z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Link className="text-slate-500 flex flex-col items-center gap-1" to="/dashboard">
            <span className="material-symbols-outlined">home</span>
            <span className="text-[9px] font-black uppercase tracking-widest">Accueil</span>
          </Link>
          <Link className="text-indigo-500 flex flex-col items-center gap-1" to="/messages">
            <span className="material-symbols-outlined fill-[1]">chat</span>
            <span className="text-[9px] font-black uppercase tracking-widest">Messages</span>
          </Link>
          <Link className="text-slate-500 flex flex-col items-center gap-1" to="/assignments">
            <span className="material-symbols-outlined">assignment</span>
            <span className="text-[9px] font-black uppercase tracking-widest">Devoirs</span>
          </Link>
          <Link className="text-slate-500 flex flex-col items-center gap-1" to="/profile">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[9px] font-black uppercase tracking-widest">Profil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
