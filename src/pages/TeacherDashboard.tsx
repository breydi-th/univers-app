import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function TeacherDashboard() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('user_session');
    if (!session) {
      navigate('/');
      return;
    }
    
    const parsedUser = JSON.parse(session);
    if (parsedUser.role !== 'teacher') {
      navigate('/');
      return;
    }
    
    setUser(parsedUser);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen selection:bg-primary/30">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* Header */}
        <header className="flex items-center bg-slate-900/80 backdrop-blur-xl p-4 border-b border-slate-800 sticky top-0 z-50">
          <div className="text-primary flex size-10 items-center justify-center bg-primary/10 rounded-xl hover:bg-primary/20 transition-all cursor-pointer">
            <span className="material-symbols-outlined font-black">menu_open</span>
          </div>
          <h2 className="text-white text-lg font-black leading-tight flex-1 text-center tracking-tighter uppercase">Univers <span className="text-primary">App</span></h2>
          <button className="relative text-slate-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-4 ring-slate-900"></span>
          </button>
        </header>

        {/* Profile Card */}
        <div className="p-4 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 size-48 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-700"></div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-[1.5rem] h-24 w-24 border-4 border-slate-800 shadow-2xl skew-y-3" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3e_QIZjuP2Z3CMH83dl4zO0RiMzLqtDr-vSbA2YfhHwzq3M4U4HWDM9TDW4b6uHoGBMWXrneaMIMjGmJK9UJlQG4e2xIjbmBnlNlz3fiBwQSg0AEowy5C6LI5IJ4H1r-lNEfhbWJoPbI2WyvC2xnRECzQLymrxxVDJ7GwtYLvS7BISMitSHXN5FXYuZCiRf_qzT5RojN5klFOqB0RY7hGgf4B1nu4IDktt0udH_F-ccu_QeQr8dgD-ctbkyDJNArSquMmv6mUQ91t')" }}
              ></div>
              <div className="text-center sm:text-left flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <p className="text-white text-2xl font-black leading-tight tracking-tighter truncate">Prof. {user?.full_name}</p>
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/30">Actif</span>
                </div>
                <p className="text-primary text-xs font-black uppercase tracking-[0.2em] mb-2">{user?.subject || "Polynômes & Algèbre"}</p>
                <div className="flex items-center justify-center sm:justify-start gap-4 text-slate-500 text-xs font-bold">
                   <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">groups</span> 124 Élèves</span>
                   <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">schedule</span> 18h / Sem</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <main className="flex-1 pb-40 px-4 space-y-8">
          <section className="pt-4 max-w-7xl mx-auto">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 px-1">Actions Principales</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: 'video_call', label: 'Cours Visio', color: 'blue', blur: 'rgba(59,130,246,0.1)' },
                { icon: 'assignment', label: 'Devoirs', color: 'orange', blur: 'rgba(249,115,22,0.1)' },
                { icon: 'quiz', label: 'Examens', color: 'emerald', blur: 'rgba(16,185,129,0.1)' },
                { icon: 'publish', label: 'Résultats', color: 'purple', blur: 'rgba(168,85,247,0.1)' },
              ].map((action) => (
                <button key={action.label} className="flex flex-col items-center justify-center p-6 bg-slate-900/50 rounded-[2rem] border border-slate-800 hover:border-primary/40 transition-all shadow-xl group">
                  <div className={`p-4 rounded-2xl mb-3 shadow-inner transform group-hover:scale-110 transition-transform`} style={{ backgroundColor: action.blur }}>
                    <span className={`material-symbols-outlined font-black text-${action.color}-500 text-3xl`}>{action.icon}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">{action.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Mes Classes */}
          <section className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6 px-1">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Mes Groupes</h2>
              <Link className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline" to="/teacher-classes">Tout voir</Link>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="bg-slate-900/40 p-4 rounded-3xl border border-slate-800 flex items-center gap-4 hover:bg-slate-900 transition-colors cursor-pointer group">
                  <div className="size-14 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-600 group-hover:text-primary transition-colors">
                     <span className="material-symbols-outlined font-black text-3xl">school</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-white">Classe de NS4A</h3>
                    <p className="text-xs text-slate-600 font-bold">42 Élèves inscrits • Session A</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-700">chevron_right</span>
              </div>
              <div className="bg-slate-900/40 border-2 border-dashed border-slate-800 p-8 rounded-[2rem] text-center">
                <p className="text-[10px] text-slate-700 font-black uppercase tracking-[0.2em]">Vous n'avez qu'un groupe assigné pour le moment</p>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="max-w-7xl mx-auto">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 px-1">Activité Récente</h2>
            <div className="space-y-3">
               {[
                 { icon: 'edit_note', title: 'Calcul Intégral', desc: 'Devoir posté il y a 2h', color: 'blue' },
                 { icon: 'grading', title: 'Contrôle NS2', desc: '15 copies à corriger', color: 'orange' },
               ].map((item, idx) => (
                 <div key={idx} className="flex gap-4 items-start p-4 bg-slate-900/30 rounded-2xl border border-slate-800/50">
                    <div className={`p-2 rounded-lg bg-${item.color}-500/10 text-${item.color}-500`}>
                       <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    </div>
                    <div>
                       <h4 className="text-xs font-black text-white">{item.title}</h4>
                       <p className="text-[10px] text-slate-600 font-bold">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </section>
        </main>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800 px-2 pb-8 pt-3">
          <div className="flex justify-around items-center max-w-7xl mx-auto w-full">
            <Link className="flex flex-1 flex-col items-center gap-1 text-primary" to="/teacher-dashboard">
              <span className="material-symbols-outlined fill-1">home</span>
              <p className="text-[10px] font-black uppercase tracking-tighter">Home</p>
            </Link>
            <Link className="flex flex-1 flex-col items-center gap-1 text-slate-500" to="/teacher-classes">
              <span className="material-symbols-outlined">groups</span>
              <p className="text-[10px] font-black uppercase tracking-tighter">Classes</p>
            </Link>
            <Link className="flex flex-1 flex-col items-center gap-1 text-slate-500" to="/messages">
              <span className="material-symbols-outlined">chat_bubble</span>
              <p className="text-[10px] font-black uppercase tracking-tighter">Sms</p>
            </Link>
            <Link className="flex flex-1 flex-col items-center gap-1 text-slate-500" to="/profile">
              <span className="material-symbols-outlined">person</span>
              <p className="text-[10px] font-black uppercase tracking-tighter">Moi</p>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
