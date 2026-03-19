import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ThemeToggle from '../components/ThemeToggle';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('user_session');
    if (session) {
      const parsed = JSON.parse(session);
      setUser(parsed);
      setNewAvatarUrl(parsed.avatar_url || '');
    }
  }, []);

  const handleSavePhoto = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: newAvatarUrl })
        .eq('id', user.id);

      if (error) throw error;

      // Update local session
      const updatedUser = { ...user, avatar_url: newAvatarUrl };
      localStorage.setItem('user_session', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditingPhoto(false);
      alert("Photo mise à jour avec succès !");
    } catch (err: any) {
      alert("Erreur: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Voulez-vous vous déconnecter ?")) {
      localStorage.removeItem('user_session');
      navigate('/');
    }
  };

  const defaultAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ-A4IMJFJGX3PvWcjPVaJztWk84OSj0xRq42GJj-xe6ZxQGEejZMBNonMR8b98IuXo97RPmFQAP_fJoRhv0FgDhgAjNeaC5ZQ1RnDhWru0YHvE8nNbAAIaXmzIxFm2SaU5B4QcjNgvartLSx7KvAGSKlKr1sCI3BnpavFvzYDLr8becvH6aZ5YJxe_egqqUVeyGLKHWzNhl38FhYWI3SSkgPlWnWqcMStVHfQA9RtYU5Z7wc2KEBz8__m4MZsV5xM4yMdBTNjP8BB";

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen">
      <header className="flex items-center justify-between p-6 bg-slate-900 shadow-2xl border-b border-slate-800 sticky top-0 z-50">
        <Link to={user?.role === 'teacher' ? '/teacher-dashboard' : '/dashboard'} className="size-10 flex items-center justify-center rounded-xl bg-slate-800 text-primary hover:bg-slate-700 transition-all active:scale-95 shadow-lg">
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </Link>
        <h1 className="text-xl font-black text-white uppercase tracking-tighter">Mon Espace</h1>
        <div className="size-10"></div>
      </header>

      <main className="p-6 max-w-xl mx-auto space-y-8 pb-40">
        <section className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary px-1 opacity-80">Préférences d'affichage</h3>
           <ThemeToggle />
        </section>

        {/* Profile Identity Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 size-40 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative mb-6">
            <div className="size-36 rounded-[2.5rem] bg-slate-950 border-4 border-slate-800 shadow-2xl overflow-hidden group">
              <img 
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" 
                alt="Profile" 
                src={user?.avatar_url || defaultAvatar}
                onError={(e) => { (e.target as HTMLImageElement).src = defaultAvatar; }}
              />
              <button 
                onClick={() => setIsEditingPhoto(!isEditingPhoto)}
                className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <span className="material-symbols-outlined text-white text-3xl">add_a_photo</span>
              </button>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-600 size-10 rounded-2xl flex items-center justify-center border-4 border-slate-900 shadow-xl">
               <span className="material-symbols-outlined text-white text-lg">verified_user</span>
            </div>
          </div>

          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{user?.full_name || 'Utilisateur'}</h2>
            <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
              {user?.role === 'teacher' ? 'Corps Professoral' : 'Élève Certifié'}
            </span>
          </div>

          {/* Photo Edit Input */}
          {isEditingPhoto && (
            <div className="w-full space-y-3 p-4 bg-slate-950 rounded-3xl border border-slate-800 animate-in zoom-in-95 duration-300">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">Lien URL de votre photo</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Collez l'URL de votre image ici..."
                  className="flex-1 bg-slate-900 border border-slate-800 p-4 rounded-2xl text-xs font-bold outline-none focus:border-primary transition-all"
                  value={newAvatarUrl}
                  onChange={(e) => setNewAvatarUrl(e.target.value)}
                />
                <button 
                  onClick={handleSavePhoto}
                  disabled={isSaving}
                  className="bg-primary hover:bg-primary/80 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest disabled:opacity-50 transition-all"
                >
                  {isSaving ? '...' : 'OK'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Account Details */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-base">info</span>
            Informations Académiques
          </h3>
          
          <div className="space-y-4">
            <div className="flex flex-col bg-slate-950 p-4 rounded-2xl border border-slate-800/50">
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">ID Utilisateur</span>
              <span className="text-white font-bold tracking-tight text-sm">{user?.id_user}</span>
            </div>
            
            {user?.role === 'teacher' ? (
              <div className="flex flex-col bg-slate-950 p-4 rounded-2xl border border-slate-800/50">
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Spécialité / Discipline</span>
                <span className="text-white font-bold tracking-tight text-sm">{user?.subject || 'Non spécifié'}</span>
              </div>
            ) : (
              <div className="flex flex-col bg-slate-950 p-4 rounded-2xl border border-slate-800/50">
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Classe Actuelle</span>
                <span className="text-white font-bold tracking-tight text-sm">Institution Univers High School</span>
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full bg-red-500/10 border border-red-500/20 text-red-500 py-6 rounded-[2rem] font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-xl group"
        >
           <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">logout</span>
           Fermer la session
        </button>
      </main>
      
      <p className="text-center text-slate-600 text-[9px] font-black uppercase tracking-widest pb-10">Institution Univers © 2026</p>
    </div>
  );
}
