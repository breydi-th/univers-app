import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminHeader from '../components/AdminHeader';

export default function TeacherDashboard() {
  const [user, setUser] = useState<any>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('user_session');
    if (!session) {
      navigate('/');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(session);
      if (parsedUser.role !== 'teacher') {
        navigate('/');
        return;
      }
      setUser(parsedUser);
      setIsLoading(false);
      fetchBranding();
    } catch (e) {
      console.error("Session parse error:", e);
      localStorage.removeItem('user_session');
      navigate('/');
    }
  }, [navigate]);

  async function fetchBranding() {
    try {
      const { data } = await supabase.from('school_settings').select('logo_url').limit(1).single();
      if (data && data.logo_url) {
        setLogoUrl(data.logo_url);
      }
    } catch (err) {
      // Ignore
    }
  }

  if (isLoading || !user) {
    return (
      <div className="bg-slate-950 min-h-screen flex flex-col items-center justify-center text-slate-500 font-display">
        <div className="size-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">Chargement de l'espace...</p>
      </div>
    );
  }

  const defaultAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuA3e_QIZjuP2Z3CMH83dl4zO0RiMzLqtDr-vSbA2YfhHwzq3M4U4HWDM9TDW4b6uHoGBMWXrneaMIMjGmJK9UJlQG4e2xIjbmBnlNlz3fiBwQSg0AEowy5C6LI5IJ4H1r-lNEfhbWJoPbI2WyvC2xnRECzQLymrxxVDJ7GwtYLvS7BISMitSHXN5FXYuZCiRf_qzT5RojN5klFOqB0RY7hGgf4B1nu4IDktt0udH_F-ccu_QeQr8dgD-ctbkyDJNArSquMmv6mUQ91t";

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen selection:bg-primary/30 flex flex-col">
       <AdminHeader 
          title="Institution Univers" 
          subtitle="Portail Enseignant"
          rightActions={
            <div className="flex gap-2">
              <Link to="/messages" className="size-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 group relative">
                <span className="material-symbols-outlined text-xl group-hover:text-primary">chat_bubble</span>
                <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
              </Link>
            </div>
          }
       />

      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8 pb-40">
        {/* Welcome Card & Profile */}
        <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 size-60 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-1000"></div>
           
           <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="relative">
                <div className="size-32 rounded-[2.5rem] bg-slate-950 border-4 border-slate-800 shadow-2xl overflow-hidden transform hover:rotate-3 transition-transform">
                  <img 
                    src={user.avatar_url || defaultAvatar}
                    className="w-full h-full object-cover"
                    alt="Professeur"
                    onError={(e) => { (e.target as HTMLImageElement).src = defaultAvatar; }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 size-10 rounded-2xl flex items-center justify-center border-4 border-slate-900 shadow-xl">
                    <span className="material-symbols-outlined text-white text-lg">verified_user</span>
                </div>
              </div>

              <div className="text-center md:text-left space-y-2">
                 <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Bienvenue, Prof. {user.full_name?.split(' ')[0]}</h2>
                 <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs">
                    Spécialité: <span className="text-white">{user.subject || 'Gestion / Économie'}</span>
                 </p>
                 <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                    <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800/50">
                       <span className="material-symbols-outlined text-blue-500 text-sm">groups</span>
                       <span className="text-[10px] font-black uppercase text-slate-400">124 Élèves</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800/50">
                       <span className="material-symbols-outlined text-emerald-500 text-sm">schedule</span>
                       <span className="text-[10px] font-black uppercase text-slate-400">18h / Hebdo</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="space-y-6">
           <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 px-1">Outils de travail</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: 'video_call', label: 'Espace Visio', color: 'blue', desc: 'Démarrer un cours' },
                { icon: 'assignment', label: 'Mes Devoirs', color: 'orange', desc: 'Gestion des exercices' },
                { icon: 'quiz', label: 'Examens', color: 'emerald', desc: 'Création & Notation' },
                { icon: 'publish', label: 'Résultats', color: 'purple', desc: 'Publier les notes' },
              ].map((tool) => (
                <button key={tool.label} className="flex flex-col items-center justify-center p-6 bg-slate-900/40 rounded-[2.5rem] border border-slate-800 hover:border-primary/50 transition-all shadow-xl group hover:bg-slate-900/80">
                  <div className={`p-4 rounded-2xl mb-4 bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform`}>
                    <span className={`material-symbols-outlined font-black text-${tool.color}-500 text-3xl`}>{tool.icon}</span>
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-white mb-1">{tool.label}</span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase">{tool.desc}</span>
                </button>
              ))}
           </div>
        </section>

        {/* Classes List */}
        <section className="space-y-6">
           <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Mes Classes de Référence</h3>
              <Link to="/teacher-classes" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Voir l'emploi du temps</Link>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/teacher-classes" className="bg-slate-900/40 p-5 rounded-3xl border border-slate-800 flex items-center gap-5 hover:bg-slate-900 transition-all group border-b-4 border-b-orange-500/30">
                  <div className="size-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:text-orange-500 transition-colors">
                     <span className="material-symbols-outlined font-black text-4xl">meeting_room</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-white uppercase tracking-tight text-lg">Section NS4-A</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Groupe Terminale • 42 Étudiants</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-700 font-black">chevron_right</span>
              </Link>

              <div className="bg-slate-900/40 p-5 rounded-3xl border border-slate-800 flex items-center gap-5 opacity-60 cursor-not-allowed">
                  <div className="size-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                     <span className="material-symbols-outlined font-black text-4xl">history_edu</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-white uppercase tracking-tight text-lg">Section NS3-B</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">En attente d'activation</p>
                  </div>
              </div>
           </div>
        </section>
      </main>

      {/* Persistent Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0c10]/80 backdrop-blur-2xl border-t border-white/5 px-4 pb-10 pt-4 shadow-2xl">
        <div className="flex justify-around items-center max-w-4xl mx-auto w-full">
          <Link className="flex flex-1 flex-col items-center gap-1.5 text-primary" to="/teacher-dashboard">
            <span className="material-symbols-outlined fill-[1] text-2xl">roofing</span>
            <p className="text-[9px] font-black uppercase tracking-widest">Accueil</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1.5 text-slate-500 hover:text-white transition-all" to="/teacher-classes">
            <span className="material-symbols-outlined text-2xl">groups_3</span>
            <p className="text-[9px] font-black uppercase tracking-widest">Classes</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1.5 text-slate-500 hover:text-white transition-all" to="/messages">
            <span className="material-symbols-outlined text-2xl">forum</span>
            <p className="text-[9px] font-black uppercase tracking-widest">Chat</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1.5 text-slate-500 hover:text-white transition-all" to="/profile">
            <span className="material-symbols-outlined text-2xl">account_circle</span>
            <p className="text-[9px] font-black uppercase tracking-widest">Profil</p>
          </Link>
        </div>
      </nav>
    </div>
  );
}
