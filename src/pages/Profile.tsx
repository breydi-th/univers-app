import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const session = localStorage.getItem('user_session');
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Voulez-vous vous déconnecter ?")) {
      localStorage.removeItem('user_session');
      navigate('/');
    }
  };

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-slate-900 shadow-2xl border-b border-slate-800 sticky top-0 z-50">
        <Link to={user?.role === 'teacher' ? '/teacher-dashboard' : '/dashboard'} className="size-10 flex items-center justify-center rounded-xl bg-slate-800 text-primary hover:bg-slate-700 transition-all active:scale-95 shadow-lg">
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </Link>
        <h1 className="text-xl font-black text-white uppercase tracking-tighter">Mon Espace</h1>
        <div className="size-10"></div> {/* Spacer */}
      </header>

      <main className="p-6 max-w-xl mx-auto space-y-8 pb-40">
        {/* Theme Settings Section */}
        <section className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary px-1 opacity-80">Préférences d'affichage</h3>
           <ThemeToggle />
        </section>

        {/* Profile Info */}
        <div className="flex flex-col items-center gap-4 py-4 animate-in fade-in duration-700">
          <div className="relative group">
            <div className="size-32 rounded-[2.5rem] bg-slate-900 border-4 border-slate-800 shadow-2xl overflow-hidden group-hover:scale-105 transition-all duration-500">
              <img 
                className="w-full h-full object-cover" 
                alt="Profile" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ-A4IMJFJGX3PvWcjPVaJztWk84OSj0xRq42GJj-xe6ZxQGEejZMBNonMR8b98IuXo97RPmFQAP_fJoRhv0FgDhgAjNeaC5ZQ1RnDhWru0YHvE8nNbAAIaXmzIxFm2SaU5B4QcjNgvartLSx7KvAGSKlKr1sCI3BnpavFvzYDLr8becvH6aZ5YJxe_egqqUVeyGLKHWzNhl38FhYWI3SSkgPlWnWqcMStVHfQA9RtYU5Z7wc2KEBz8__m4MZsV5xM4yMdBTNjP8BB"
              />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{user?.full_name || 'Utilisateur'}</h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/30">
                {user?.role === 'teacher' ? 'Professeur' : 'Élève'}
              </span>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 size-40 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-all duration-1000"></div>
          
          <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">badge</span>
            Détails du compte
          </h3>
          
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Identifiant Institutionnel</span>
              <span className="text-white font-bold tracking-tight bg-slate-950 p-4 rounded-2xl border border-slate-800">{user?.id_user}</span>
            </div>
            
            {user?.role !== 'teacher' && (
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Niveau d'étude</span>
                <span className="text-white font-bold tracking-tight bg-slate-950 p-4 rounded-2xl border border-slate-800">Terminale (NS4)</span>
              </div>
            )}
            
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Établissement</span>
              <span className="text-white font-bold tracking-tight bg-slate-950 p-4 rounded-2xl border border-slate-800">Univers de Ouanaminthe</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button className="w-full bg-slate-900 border border-slate-800 text-slate-300 py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 shadow-xl group">
             <span className="material-symbols-outlined text-primary group-hover:rotate-12 transition-transform">security</span>
             Changer de mot de passe
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full bg-red-500/10 border border-red-500/20 text-red-500 py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-xl group"
          >
             <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">logout</span>
             Déconnexion
          </button>
        </div>
      </main>

      {/* Persistence message */}
      <p className="text-center text-slate-600 text-[9px] font-black uppercase tracking-widest pb-10">Univers App © 2026</p>
    </div>
  );
}
