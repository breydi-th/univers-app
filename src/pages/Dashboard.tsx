import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('user_session');
    if (!session) {
      navigate('/');
      return;
    }
    
    const parsedUser = JSON.parse(session);
    if (parsedUser.role !== 'student') {
      navigate('/');
      return;
    }
    
    setUser(parsedUser);
    fetchBranding();
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

  if (!user) return null;

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen selection:bg-primary/30">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-40">
        {/* Top Bar with Dynamic Logo */}
        <header className="flex items-center bg-slate-900/80 backdrop-blur-xl p-4 sticky top-0 z-50 border-b border-slate-800 shadow-2xl">
          <div className="flex items-center gap-4 flex-1 min-w-0">
             <div className="size-12 shrink-0 rounded-2xl bg-white p-1.5 shadow-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                {logoUrl ? (
                  <img src={logoUrl} className="w-full h-full object-contain" alt="Logo" />
                ) : (
                  <span className="material-symbols-outlined text-primary text-3xl font-black">school</span>
                )}
             </div>
             <div className="min-w-0">
                <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] leading-none mb-1 truncate">Espace Élève</p>
                <h1 className="text-lg font-black tracking-tighter text-white truncate uppercase">Bonjour, {user?.full_name?.split(' ')[0]}</h1>
             </div>
          </div>
          <button className="size-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors relative ring-1 ring-slate-700 active:scale-95 shadow-lg">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full ring-2 ring-slate-800 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6 space-y-8 max-w-7xl mx-auto w-full">
          {/* Hero Promo */}
          <section className="animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="bg-gradient-to-br from-primary to-blue-700 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(59,130,246,0.25)] relative overflow-hidden group">
               <div className="absolute top-0 right-0 size-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-700"></div>
               <div className="relative z-10">
                 <h2 className="text-3xl font-black text-white leading-tight mb-2 tracking-tighter uppercase shrink-0">Mon Univers <br/><span className="text-blue-200">Educatif.</span></h2>
                 <p className="text-blue-100/80 text-[10px] font-black max-w-xs mb-8 uppercase tracking-[0.3em] opacity-80">Continue ton parcours aujourd'hui</p>
                 <Link to="/courses" className="inline-flex items-center gap-3 bg-white text-primary px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-slate-50 transition-all active:scale-95 group/btn">
                    <span className="material-symbols-outlined font-black group-hover:rotate-12 transition-transform">rocket_launch</span>
                    Démarrer
                 </Link>
               </div>
            </div>
          </section>

          {/* Progress Section */}
          <section className="animate-in fade-in slide-in-from-left-4 duration-700 delay-150">
             <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Progression</h2>
                <Link to="/courses" className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Voir détails</Link>
             </div>
             
             <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {[
                  { label: "Mathématiques", val: "15%", color: "blue", w: "15%" },
                  { label: "Français", val: "40%", color: "purple", w: "40%" },
                  { label: "Anglais", val: "10%", color: "emerald", w: "10%" },
                ].map((item, idx) => (
                  <div key={idx} className="min-w-[180px] bg-slate-900/50 p-6 rounded-[2.2rem] border border-slate-800 shadow-xl group hover:border-primary/40 transition-all relative overflow-hidden">
                     <div className={`absolute bottom-0 left-0 h-1 bg-${item.color}-500/10 w-full`}></div>
                     <p className="text-[10px] text-slate-500 font-black uppercase mb-3 tracking-widest">{item.label}</p>
                     <p className="text-3xl font-black text-white mb-3 leading-none tracking-tighter">{item.val}</p>
                     <div className="w-full h-1.5 bg-slate-800/50 rounded-full overflow-hidden border border-white/5">
                        <div className={`h-full bg-${item.color}-500 transition-all duration-1000`} style={{ width: item.w }}></div>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Upcoming Assignments */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
             <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Devoirs & Cahiers</h2>
                <Link to="/assignments" className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Accéder</Link>
             </div>
             
             <div className="bg-slate-900/30 border-2 border-dashed border-slate-800/50 p-12 rounded-[3rem] text-center flex flex-col items-center group hover:bg-slate-900/50 transition-colors">
                <div className="size-20 rounded-[2rem] bg-slate-800/50 flex items-center justify-center text-slate-700 mb-6 group-hover:bg-primary/20 group-hover:text-primary transition-all transform group-hover:scale-110 duration-500 border border-white/5 shadow-2xl shadow-primary/5">
                   <span className="material-symbols-outlined text-4xl">history_edu</span>
                </div>
                <h3 className="text-white font-black tracking-tighter uppercase text-xl mb-2">Aucun devoir en attente</h3>
                <p className="text-slate-500 text-xs font-bold max-w-[200px] leading-relaxed opacity-60">Tes professeurs n'ont pas encore publié de nouveaux devoirs.</p>
             </div>
          </section>
        </main>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/60 backdrop-blur-3xl border-t border-slate-800 px-4 pb-8 pt-4 shadow-[0_-15px_60px_rgba(0,0,0,0.6)]">
          <div className="flex justify-between items-center max-w-xl mx-auto">
            <Link className="flex flex-col items-center gap-1.5 text-primary group" to="/dashboard">
              <span className="material-symbols-outlined fill-1 transition-transform group-hover:scale-110">home_app_logo</span>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80">Accueil</p>
            </Link>
            <Link className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-white transition-all group" to="/assignments">
              <span className="material-symbols-outlined transition-transform group-hover:scale-110">edit_square</span>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Devoirs</p>
            </Link>
            <Link className="relative -top-10 flex flex-col items-center gap-1.5 active:scale-95 transition-transform" to="/courses">
              <div className="size-18 bg-primary rounded-full shadow-[0_15px_40px_rgba(59,130,246,0.6)] flex items-center justify-center text-white ring-[10px] ring-slate-950 hover:bg-blue-500 transition-colors">
                 <span className="material-symbols-outlined text-4xl font-black">play_circle</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-1 shadow-primary">Cours</p>
            </Link>
            <Link className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-white transition-all group" to="/results">
              <span className="material-symbols-outlined transition-transform group-hover:scale-110">analytics</span>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Scores</p>
            </Link>
            <Link className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-white transition-all group" to="/profile">
              <span className="material-symbols-outlined transition-transform group-hover:scale-110">account_circle</span>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Profil</p>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
