import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const DEMO_USER = {
  id_user: 'prof.demo',
  full_name: 'Professeur Demo',
  role: 'teacher',
  avatar_url: null,
};

export default function TeacherDashboard() {
  const [user, setUser] = useState<any>(null);
  const [branding, setBranding] = useState({ logo: null as string | null, name: 'Institution Univers' });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("TeacherDashboard: Mounted");
    try {
      const session = localStorage.getItem('user_session');

      if (!session) {
        // Pas de session → mode démo enseignant (accès rapide depuis Welcome)
        setUser(DEMO_USER);
        return;
      }

      const parsed = JSON.parse(session);

      if (parsed.role !== 'teacher') {
        // Ce n'est pas un professeur, retour à l'accueil
        navigate('/');
        return;
      }

      // Override avatar local si disponible
      const localAvatar = localStorage.getItem(`avatar_override_${parsed.id_user}`);
      if (localAvatar) parsed.avatar_url = localAvatar;

      setUser(parsed);
    } catch (e) {
      console.error("TeacherDashboard: Erreur session", e);
      setUser(DEMO_USER);
    }

    // Fetch branding en arrière-plan (non-bloquant)
    supabase.from('school_settings').select('*').limit(1).single()
      .then(({ data }) => {
        if (data) setBranding({ logo: data.logo_url, name: data.school_name || 'Institution Univers' });
      })
      .catch(() => {});
  }, [navigate]);

  // Écran de chargement très court — ne bloque plus l'affichage
  if (!user) {
    return (
      <div className="bg-slate-950 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-blue-500 text-5xl animate-spin">autorenew</span>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Chargement...</p>
        </div>
      </div>
    );
  }

  const avatar = user.avatar_url
    || "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ-A4IMJFJGX3PvWcjPVaJztWk84OSj0xRq42GJj-xe6ZxQGEejZMBNonMR8b98IuXo97RPmFQAP_fJoRhv0FgDhgAjNeaC5ZQ1RnDhWru0YHvE8nNbAAIaXmzIxFm2SaU5B4QcjNgvartLSx7KvAGSKlKr1sCI3BnpavFvzYDLr8becvH6aZ5YJxe_egqqUVeyGLKHWzNhl38FhYWI3SSkgPlWnWqcMStVHfQA9RtYU5Z7wc2KEBz8__m4MZsV5xM4yMdBTNjP8BB";

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen flex flex-col">

      {/* ── Header ── */}
      <header className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-white rounded-xl flex items-center justify-center overflow-hidden">
            {branding.logo
              ? <img src={branding.logo} className="w-full h-full object-contain" alt="Logo" />
              : <span className="material-symbols-outlined text-blue-600">school</span>}
          </div>
          <div>
            <h1 className="text-white text-sm font-black uppercase tracking-tighter">{branding.name}</h1>
            <p className="text-blue-500 text-[8px] font-black uppercase tracking-widest mt-0.5">Espace Enseignant</p>
          </div>
        </div>
        <Link to="/profile" className="size-10 rounded-xl overflow-hidden border border-slate-800">
          <img src={avatar} className="w-full h-full object-cover" alt="Profil" />
        </Link>
      </header>

      {/* ── Contenu principal ── */}
      <main className="p-6 space-y-8 flex-1 pb-32">

        {/* Salutation */}
        <section className="mt-4">
          <h2 className="text-2xl font-black text-white tracking-tighter">
            Bonjour, Prof. {user.full_name} 👋
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 opacity-70">
            Heureux de vous revoir sur Univers App.
          </p>
        </section>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-3xl p-5 flex flex-col gap-1">
            <span className="material-symbols-outlined text-blue-400 text-3xl">groups</span>
            <span className="text-2xl font-black text-white">—</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">Classes</span>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-3xl p-5 flex flex-col gap-1">
            <span className="material-symbols-outlined text-orange-400 text-3xl">assignment</span>
            <span className="text-2xl font-black text-white">—</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-orange-400">Devoirs</span>
          </div>
        </div>

        {/* Accès rapides */}
        <section>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 px-1">Accès Rapides</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-4xl mb-4 text-blue-500">video_call</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Cours en direct</span>
            </button>
            <button className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-4xl mb-4 text-orange-500">assignment</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Devoirs</span>
            </button>
            <Link to="/teacher-classes" className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-4xl mb-4 text-emerald-500">groups</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Mes Classes</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-4xl mb-4 text-purple-500">account_circle</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Paramètres</span>
            </Link>
          </div>
        </section>

      </main>

      {/* ── Barre de navigation ── */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 p-4 pb-10">
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
