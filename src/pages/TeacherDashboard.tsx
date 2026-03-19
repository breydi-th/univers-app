import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

/**
 * Teacher Dashboard - Portiel Enseignant
 * Optimized for institutional performance and branding.
 */
export default function TeacherDashboard() {
  const [user, setUser] = useState<any>(null);
  const [branding, setBranding] = useState<{logo_url: string | null, school_name: string}>({
    logo_url: null,
    school_name: 'Institution Univers'
  });
  const [status, setStatus] = useState({ loading: true, error: null as string | null });
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Validate Session with extra safety
    console.log("Teacher dashboard initialization...");
    const sessionStr = localStorage.getItem('user_session');
    
    if (!sessionStr) {
      console.warn("No active session found, redirecting to login.");
      navigate('/');
      return;
    }

    try {
      const parsed = JSON.parse(sessionStr);
      if (parsed.role !== 'teacher') {
        console.warn("User role not authorized for teacher portal.");
        navigate('/');
        return;
      }
      setUser(parsed);
      setStatus(prev => ({ ...prev, loading: false }));
      
      // 2. Load institutional branding
      fetchInstitutionalIdentity();
    } catch (err: any) {
      console.error("Dashboard session failure:", err);
      localStorage.removeItem('user_session');
      navigate('/');
    }
  }, [navigate]);

  async function fetchInstitutionalIdentity() {
    try {
      const { data, error } = await supabase
        .from('school_settings')
        .select('logo_url, school_name')
        .limit(1)
        .single();
      
      if (data && !error) {
        setBranding({
          logo_url: data.logo_url || null,
          school_name: data.school_name || 'Institution Univers'
        });
      }
    } catch (e) {
      console.log("Branding fetch silent fail:", e);
    }
  }

  // Loading Screen (Premium Style)
  if (status.loading || !user) {
    return (
      <div className="bg-slate-950 min-h-screen flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="relative mb-8">
           <div className="size-20 rounded-[2rem] bg-primary/20 animate-pulse border-2 border-primary/30 shadow-[0_0_50px_rgba(var(--color-primary),0.2)]"></div>
           <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-4xl animate-bounce">school</span>
           </div>
        </div>
        <h3 className="text-white text-xl font-black uppercase tracking-tighter mb-2">Chargement Univers App</h3>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] max-w-[200px] leading-loose">
          Synchronisation sécurisée avec le portail enseignant...
        </p>
      </div>
    );
  }

  const defaultAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuA3e_QIZjuP2Z3CMH83dl4zO0RiMzLqtDr-vSbA2YfhHwzq3M4U4HWDM9TDW4b6uHoGBMWXrneaMIMjGmJK9UJlQG4e2xIjbmBnlNlz3fiBwQSg0AEowy5C6LI5IJ4H1r-lNEfhbWJoPbI2WyvC2xnRECzQLymrxxVDJ7GwtYLvS7BISMitSHXN5FXYuZCiRf_qzT5RojN5klFOqB0RY7hGgf4B1nu4IDktt0udH_F-ccu_QeQr8dgD-ctbkyDJNArSquMmv6mUQ91t";

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen flex flex-col selection:bg-primary/30">
      {/* Header Professionnel */}
      <header className="flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-2xl border-b border-slate-800 sticky top-0 z-50 shadow-2xl">
        <div className="flex items-center gap-3">
           <div className="size-12 rounded-2xl bg-white p-1.5 shadow-2xl border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
             {branding.logo_url ? (
               <img src={branding.logo_url} className="w-full h-full object-contain" alt="Logo" />
             ) : (
               <span className="material-symbols-outlined text-primary text-3xl">account_balance</span>
             )}
           </div>
           <div className="min-w-0">
             <h1 className="text-white text-lg font-black uppercase tracking-tighter leading-none truncate">{branding.school_name}</h1>
             <p className="text-primary text-[9px] font-black uppercase tracking-widest mt-1 opacity-80">Portail Enseignant</p>
           </div>
        </div>
        
        <div className="flex items-center gap-3">
           <Link to="/messages" className="size-10 flex items-center justify-center bg-slate-800 border border-slate-700/50 rounded-xl text-slate-400 hover:text-white relative">
              <span className="material-symbols-outlined">chat_bubble</span>
              <span className="absolute top-2 right-2 size-2.5 bg-red-600 rounded-full border-2 border-slate-900 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]"></span>
           </Link>
           <Link to="/profile" className="size-10 rounded-xl border border-slate-800 overflow-hidden shadow-lg group">
              <img src={user.avatar_url || defaultAvatar} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" alt="Profile" />
           </Link>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8 pb-40">
        {/* Welcome Text Section */}
        <section className="space-y-1 animate-in fade-in slide-in-from-top-4 duration-500">
          <h2 className="text-2xl sm:text-3xl font-black text-white px-1">Salut, Prof. {user.full_name?.split(' ')[0]} 👋</h2>
          <p className="text-slate-500 text-sm font-medium px-1">Voici le résumé de vos cours et sessions aujourd'hui.</p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-700">
          <div className="bg-slate-900/60 p-6 rounded-[2.5rem] border border-slate-800/80 shadow-xl group hover:border-blue-500/50 transition-all h-full">
            <div className="p-3 bg-blue-500/10 rounded-2xl size-fit mb-4 text-blue-500">
               <span className="material-symbols-outlined">groups</span>
            </div>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Total Élèves</p>
            <p className="text-3xl font-black text-white">124</p>
          </div>
          <div className="bg-slate-900/60 p-6 rounded-[2.5rem] border border-slate-800/80 shadow-xl group hover:border-orange-500/50 transition-all h-full">
            <div className="p-3 bg-orange-500/10 rounded-2xl size-fit mb-4 text-orange-500">
               <span className="material-symbols-outlined">timer</span>
            </div>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Heures Hebdo</p>
            <p className="text-3xl font-black text-white">18h</p>
          </div>
          <div className="bg-slate-900/60 p-6 rounded-[2.5rem] border border-slate-800/80 shadow-xl group hover:border-emerald-500/50 transition-all h-full">
            <div className="p-3 bg-emerald-500/10 rounded-2xl size-fit mb-4 text-emerald-500">
               <span className="material-symbols-outlined">quiz</span>
            </div>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Examens Prévus</p>
            <p className="text-3xl font-black text-white">03</p>
          </div>
          <div className="bg-slate-900/60 p-6 rounded-[2.5rem] border border-slate-800/80 shadow-xl group hover:border-purple-500/50 transition-all h-full">
            <div className="p-3 bg-purple-500/10 rounded-2xl size-fit mb-4 text-purple-500">
               <span className="material-symbols-outlined">reviews</span>
            </div>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">À Corriger</p>
            <p className="text-3xl font-black text-white">12</p>
          </div>
        </section>

        {/* Action Widgets */}
        <section className="grid md:grid-cols-2 gap-6">
           <div className="bg-slate-900/40 p-8 rounded-[3rem] border border-slate-800 shadow-2xl space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-500 flex items-center gap-2">
                 <span className="material-symbols-outlined text-base">video_chat</span>
                 Espace Interactif
              </h3>
              <div className="grid grid-cols-2 gap-4">
                 <button className="flex flex-col items-center justify-center p-6 bg-slate-950/80 border border-slate-800 rounded-3xl hover:bg-slate-800 transition-all group active:scale-95">
                    <span className="material-symbols-outlined text-3xl mb-3 text-slate-500 group-hover:text-primary transition-colors">video_call</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Cours Visio</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-6 bg-slate-950/80 border border-slate-800 rounded-3xl hover:bg-slate-800 transition-all group active:scale-95">
                    <span className="material-symbols-outlined text-3xl mb-3 text-slate-500 group-hover:text-orange-500 transition-colors">assignment_add</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Poster Devoir</span>
                 </button>
              </div>
           </div>

           <div className="bg-slate-900/40 p-8 rounded-[3rem] border border-slate-800 shadow-2xl space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-2">
                 <span className="material-symbols-outlined text-base">school</span>
                 Mes Classes actives
              </h3>
              <div className="space-y-3">
                 <Link to="/teacher-classes" className="flex items-center gap-4 p-4 bg-slate-950/80 border border-slate-800/80 rounded-[2rem] hover:bg-slate-900 transition-all group">
                    <div className="size-12 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-500 group-hover:text-emerald-500 transition-colors">
                       <span className="material-symbols-outlined text-3xl font-black">door_open</span>
                    </div>
                    <div className="flex-1">
                       <h4 className="text-xs font-black text-white uppercase tracking-tighter">Terminales Section A</h4>
                       <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Mathematiques • 42 Élèves</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-700">arrow_forward</span>
                 </Link>
                 <div className="flex items-center gap-4 p-4 bg-slate-950/30 border border-slate-800/30 rounded-[2rem] opacity-50 grayscale">
                    <div className="size-12 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-700">
                       <span className="material-symbols-outlined text-3xl font-black">lock</span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Section NS3 - Verrouillée</p>
                 </div>
              </div>
           </div>
        </section>
      </main>

      {/* Navigation Mobile Simplifiée */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0c10]/90 backdrop-blur-2xl border-t border-slate-800/50 px-4 pb-10 pt-4">
        <div className="max-w-xl mx-auto flex justify-between">
          <Link className="flex flex-col items-center gap-1.5 text-primary" to="/teacher-dashboard">
            <span className="material-symbols-outlined fill-[1]">home_app_logo</span>
            <span className="text-[9px] font-black uppercase tracking-tighter">Home</span>
          </Link>
          <Link className="flex flex-col items-center gap-1.5 text-slate-600 hover:text-white" to="/teacher-classes">
            <span className="material-symbols-outlined">groups_3</span>
            <span className="text-[9px] font-black uppercase tracking-tighter">Mes Groupes</span>
          </Link>
          <Link className="flex flex-col items-center gap-1.5 text-slate-600 hover:text-white" to="/profile">
            <span className="material-symbols-outlined">person_pin</span>
            <span className="text-[9px] font-black uppercase tracking-tighter">Mon Espace</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
