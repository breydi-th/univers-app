import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

/**
 * Teacher Dashboard - Version de Secours (Emergency Version)
 * Aimed at fixing the "Black Screen" issue by maximizing stability.
 */
export default function TeacherDashboard() {
  const [user, setUser] = useState<any>(null);
  const [branding, setBranding] = useState({ logo: null as string | null, name: 'Institution Univers' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("TeacherDashboard: Component Mounted");
    const session = localStorage.getItem('user_session');
    
    if (!session) {
      console.log("TeacherDashboard: No session, redirecting...");
      navigate('/');
      return;
    }

    try {
      const parsed = JSON.parse(session);
      console.log("TeacherDashboard: User loaded:", parsed.full_name);
      
      if (parsed.role !== 'teacher') {
        navigate('/');
        return;
      }

      // Avatar Override
      const localAvatar = localStorage.getItem(`avatar_override_${parsed.id_user}`);
      if (localAvatar) {
        parsed.avatar_url = localAvatar;
      }

      setUser(parsed);
      setLoading(false);
      
      // Fetch branding (Non-blocking)
      supabase.from('school_settings').select('*').limit(1).single()
        .then(({data}) => {
          if (data) setBranding({ logo: data.logo_url, name: data.school_name || 'Institution Univers' });
        })
        .catch(e => console.log("Branding error:", e));

    } catch (e) {
      console.error("TeacherDashboard: Initialization error", e);
      localStorage.removeItem('user_session');
      navigate('/');
    }
  }, [navigate]);

  if (loading || !user) {
    return (
      <div style={{ backgroundColor: '#020617', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
        <p style={{ fontWeight: 'black', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '10px' }}>Initialisation du Portail...</p>
      </div>
    );
  }

  const avatar = user.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ-A4IMJFJGX3PvWcjPVaJztWk84OSj0xRq42GJj-xe6ZxQGEejZMBNonMR8b98IuXo97RPmFQAP_fJoRhv0FgDhgAjNeaC5ZQ1RnDhWru0YHvE8nNbAAIaXmzIxFm2SaU5B4QcjNgvartLSx7KvAGSKlKr1sCI3BnpavFvzYDLr8becvH6aZ5YJxe_egqqUVeyGLKHWzNhl38FhYWI3SSkgPlWnWqcMStVHfQA9RtYU5Z7wc2KEBz8__m4MZsV5xM4yMdBTNjP8BB";

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen flex flex-col">
       {/* Header */}
       <header className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-2xl">
          <div className="flex items-center gap-3">
             <div className="size-10 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                {branding.logo ? <img src={branding.logo} className="w-full h-full object-contain" alt="Logo" /> : <span className="material-symbols-outlined text-blue-600">school</span>}
             </div>
             <div>
                <h1 className="text-white text-sm font-black uppercase tracking-tighter">{branding.name}</h1>
                <p className="text-blue-500 text-[8px] font-black uppercase tracking-widest mt-0.5">Espace Enseignant</p>
             </div>
          </div>
          <Link to="/profile" className="size-10 rounded-xl overflow-hidden border border-slate-800">
             <img src={avatar} className="w-full h-full object-cover" alt="User" />
          </Link>
       </header>

       {/* Simple Content */}
       <main className="p-6 space-y-8 flex-1">
          <section>
             <h2 className="text-2xl font-black text-white px-1 mt-4">Bonjour, Prof. {user.full_name}</h2>
             <p className="text-slate-500 text-xs font-bold px-1 uppercase tracking-widest mt-1 opacity-70">Heureux de vous revoir sur Univers App.</p>
          </section>

          <div className="grid grid-cols-2 gap-4">
             <button className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl">
                <span className="material-symbols-outlined text-4xl mb-4 text-blue-500">video_call</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Cours en direct</span>
             </button>
             <button className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl">
                <span className="material-symbols-outlined text-4xl mb-4 text-orange-500">assignment</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Devoirs</span>
             </button>
             <Link to="/teacher-classes" className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl">
                <span className="material-symbols-outlined text-4xl mb-4 text-emerald-500">groups</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Mes Classes</span>
             </Link>
             <Link to="/profile" className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl">
                <span className="material-symbols-outlined text-4xl mb-4 text-purple-500">account_circle</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Paramètres</span>
             </Link>
          </div>
       </main>

       {/* Tab Bar Section (Simplified to avoid crashes) */}
       <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800 p-4 pb-10">
          <div className="flex justify-around items-center max-w-md mx-auto">
             <Link className="text-blue-500 flex flex-col items-center gap-1" to="/teacher-dashboard">
                <span className="material-symbols-outlined">home</span>
                <span className="text-[9px] font-black uppercase">Home</span>
             </Link>
             <Link className="text-slate-500 flex flex-col items-center gap-1" to="/teacher-classes">
                <span className="material-symbols-outlined">meeting_room</span>
                <span className="text-[9px] font-black uppercase">Classes</span>
             </Link>
             <Link className="text-slate-500 flex flex-col items-center gap-1" to="/messages">
                <span className="material-symbols-outlined">chat</span>
                <span className="text-[9px] font-black uppercase">Messages</span>
             </Link>
             <Link className="text-slate-500 flex flex-col items-center gap-1" to="/profile">
                <span className="material-symbols-outlined">person</span>
                <span className="text-[9px] font-black uppercase">Profil</span>
             </Link>
          </div>
       </nav>
    </div>
  );
}
