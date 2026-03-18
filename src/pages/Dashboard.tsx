import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
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
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen selection:bg-primary/30">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-40">
        {/* Top Bar */}
        <header className="flex items-center bg-slate-900/80 backdrop-blur-xl p-4 sticky top-0 z-50 border-b border-slate-800 shadow-2xl">
          <div className="flex items-center gap-4 flex-1">
            <div className="size-12 rounded-[1rem] bg-slate-800 border-2 border-slate-700 shadow-2xl overflow-hidden transform hover:rotate-6 transition-transform">
               <img 
                 alt="Student avatar" 
                 className="w-full h-full object-cover" 
                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaFqOsVG4T6HiaxzHMz4j4sIArZTsYniv0PT-Wu6wOv__9Yp5risVFxnUZMhUrB9EvqO0oHcxt-sjlNsjSuOzfmn98zExurM2QiPgfHIxnj3yqYfPY_uG0F2-dPwwTNneuyt0PyH2neeTfpzynFvqGrf7JweoxyO_fHa2dZVOeb--zO-uxHEa1Dt9IX_DlFU_WwuDm5sj6Fq2N0sgmhIv034eMFfV8rlY-lAZy8iPerPerabJs8TJ0uKDZc-uaM68xixuA58FJabdU" 
               />
            </div>
            <div>
              <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] leading-none mb-1">Espace Élève</p>
              <h1 className="text-xl font-black tracking-tighter text-white">Bonjour, {user?.full_name?.split(' ')[0]}</h1>
            </div>
          </div>
          <button className="size-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors relative ring-1 ring-slate-700">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full ring-2 ring-slate-800"></span>
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6 space-y-8 max-w-7xl mx-auto w-full">
          {/* Hero Promo */}
          <section>
            <div className="bg-gradient-to-br from-primary to-blue-700 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(59,130,246,0.3)] relative overflow-hidden group">
               <div className="absolute top-0 right-0 size-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-700"></div>
               <div className="relative z-10">
                 <h2 className="text-3xl font-black text-white leading-tight mb-2 tracking-tighter">Prêt pour tes <br/><span className="text-blue-200">réussites?</span></h2>
                 <p className="text-blue-100/80 text-sm font-bold max-w-xs mb-6 mb-8 uppercase tracking-widest text-[10px]">Continue ton parcours d'apprentissage aujourd'hui</p>
                 <Link to="/courses" className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-slate-50 transition-all active:scale-95 group/btn">
                    <span className="material-symbols-outlined font-black group-hover:rotate-12 transition-transform">rocket_launch</span>
                    Démarrer mes cours
                 </Link>
               </div>
            </div>
          </section>

          {/* Progress Section */}
          <section>
             <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Ta Progression</h2>
                <Link to="/courses" className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Détails</Link>
             </div>
             
             <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {[
                  { label: "Mathématiques", val: "0%", color: "blue" },
                  { label: "Français / Philo", val: "0%", color: "purple" },
                  { label: "Anglais", val: "0%", color: "emerald" },
                ].map((item, idx) => (
                  <div key={idx} className="min-w-[160px] bg-slate-900/50 p-6 rounded-[2rem] border border-slate-800 shadow-xl group hover:border-primary/30 transition-all">
                     <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">{item.label}</p>
                     <p className="text-3xl font-black text-white mb-2 leading-none">{item.val}</p>
                     <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full bg-${item.color}-500 w-[0%] group-hover:w-[10%] transition-all duration-1000`}></div>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Upcoming Assignments */}
          <section>
             <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Tes Devoirs</h2>
                <Link to="/assignments" className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Voir tout</Link>
             </div>
             
             <div className="bg-slate-900/30 border-2 border-dashed border-slate-800 p-12 rounded-[2.5rem] text-center flex flex-col items-center group">
                <div className="size-20 rounded-3xl bg-slate-800/50 flex items-center justify-center text-slate-700 mb-6 group-hover:bg-slate-800 transition-colors transform group-hover:scale-110 duration-500">
                   <span className="material-symbols-outlined text-4xl">history_edu</span>
                </div>
                <h3 className="text-white font-black tracking-tight mb-2">Aucun devoir en attente</h3>
                <p className="text-slate-500 text-xs font-bold max-w-[200px] leading-relaxed">Tes professeurs n'ont pas encore publié de nouveaux devoirs.</p>
             </div>
          </section>
        </main>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800 px-4 pb-8 pt-3 shadow-[0_-10px_50px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <Link className="flex flex-col items-center gap-1 text-primary" to="/dashboard">
              <span className="material-symbols-outlined fill-1">home_app_logo</span>
              <p className="text-[10px] font-black uppercase tracking-tighter">Accueil</p>
            </Link>
            <Link className="flex flex-col items-center gap-1 text-slate-500" to="/assignments">
              <span className="material-symbols-outlined">edit_square</span>
              <p className="text-[10px] font-black uppercase tracking-tighter">Devoirs</p>
            </Link>
            <Link className="relative -top-6 flex flex-col items-center gap-1 active:scale-95 transition-transform" to="/courses">
              <div className="size-16 bg-primary rounded-full shadow-[0_10px_30px_rgba(59,130,246,0.4)] flex items-center justify-center text-white ring-8 ring-slate-950">
                 <span className="material-symbols-outlined text-3xl font-black">play_circle</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-1">Cours</p>
            </Link>
            <Link className="flex flex-col items-center gap-1 text-slate-500" to="/results">
              <span className="material-symbols-outlined">analytics</span>
              <p className="text-[10px] font-black uppercase tracking-tighter">Scores</p>
            </Link>
            <Link className="flex flex-col items-center gap-1 text-slate-500" to="/profile">
              <span className="material-symbols-outlined">account_circle</span>
              <p className="text-[10px] font-black uppercase tracking-tighter">Profil</p>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
