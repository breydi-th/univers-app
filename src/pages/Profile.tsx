import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

/**
 * Profile - Gestion de l'espace utilisateur (Élève/Professeur)
 * Version avec stockage d'avatar local uniquement.
 */
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
      
      // Load avatar from local storage override
      const savedAvatar = localStorage.getItem(`avatar_override_${parsed.id_user}`);
      setNewAvatarUrl(savedAvatar || parsed.avatar_url || '');
    }
  }, []);

  const handleSavePhoto = () => {
    if (!user) return;
    setIsSaving(true);
    
    // DELAY for effect (premium feel)
    setTimeout(() => {
      // SAVE ONLY LOCALLY
      localStorage.setItem(`avatar_override_${user.id_user}`, newAvatarUrl);
      
      // Update local state and current session
      const updatedUser = { ...user, avatar_url: newAvatarUrl };
      localStorage.setItem('user_session', JSON.stringify(updatedUser)); // Update session for current use
      
      setUser(updatedUser);
      setIsEditingPhoto(false);
      setIsSaving(false);
      // alert("Photo mise à jour localement !");
    }, 800);
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
        {/* Theme Settings Selection */}
        <section className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary px-1 opacity-80">Préférences d'affichage</h3>
           <ThemeToggle />
        </section>

        {/* Profile Identity Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 size-40 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative mb-6">
            <div className="size-36 rounded-[2.5rem] bg-slate-950 border-4 border-slate-800 shadow-2xl overflow-hidden group relative">
              <img 
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" 
                alt="Profile" 
                src={newAvatarUrl || defaultAvatar}
                onError={(e) => { (e.target as HTMLImageElement).src = defaultAvatar; }}
              />
              <button 
                onClick={() => setIsEditingPhoto(!isEditingPhoto)}
                className="absolute inset-x-0 bottom-0 bg-slate-900/80 p-2 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all translate-y-2 group-hover:translate-y-0"
              >
                <span className="material-symbols-outlined text-white text-xl">camera_alt</span>
              </button>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-600 size-10 rounded-2xl flex items-center justify-center border-4 border-slate-900 shadow-xl ring-1 ring-blue-500/50 animate-in zoom-in-50 delay-500">
               <span className="material-symbols-outlined text-white text-lg">verified_user</span>
            </div>
          </div>

          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{user?.full_name || 'Chargement...'}</h2>
            <div className="flex items-center gap-2 justify-center">
               <span className="inline-block bg-primary/10 text-primary px-4 py-1.2 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                {user?.role === 'teacher' ? 'Corps Professoral' : 'Élève Certifié'}
               </span>
            </div>
          </div>

          {/* Photo Edit Input */}
          {isEditingPhoto && (
            <div className="w-full space-y-3 p-5 bg-slate-950 rounded-3xl border border-slate-800 animate-in zoom-in-95 duration-300 shadow-3xl">
              <div className="flex items-center justify-between mb-1">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Sélectionner une photo</label>
                 <span className="text-[8px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-full">Privé</span>
              </div>
              <div className="flex flex-col gap-3">
                <input 
                  type="file"
                  accept="image/*"
                  className="w-full bg-slate-900 border border-slate-800 p-3 rounded-2xl text-xs font-bold outline-none focus:border-primary transition-all text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewAvatarUrl(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <button 
                  onClick={handleSavePhoto}
                  disabled={isSaving}
                  className="bg-primary hover:bg-primary/80 py-4 w-full rounded-[1.25rem] font-black text-[10px] uppercase tracking-widest disabled:opacity-50 transition-all flex items-center justify-center"
                >
                  {isSaving ? <span className="material-symbols-outlined animate-spin text-sm">cached</span> : 'ENREGISTRER LA PHOTO'}
                </button>
              </div>
              <p className="text-[8px] text-slate-600 font-bold uppercase tracking-tighter px-1">* Cette image sera stockée localement sur cet appareil.</p>
            </div>
          )}
        </div>

        {/* Account Details Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 size-40 bg-slate-950/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           
           <h3 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-base">info</span>
            Détails Académiques
          </h3>
          
          <div className="grid gap-4">
            <div className="flex flex-col bg-slate-950/50 p-5 rounded-2xl border border-slate-800/50 backdrop-blur-sm group hover:border-primary/20 transition-colors">
              <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">Identifiant Institutionnel</span>
              <span className="text-white font-bold tracking-tight text-sm uppercase">{user?.id_user}</span>
            </div>
            
            <div className="flex flex-col bg-slate-950/50 p-5 rounded-2xl border border-slate-800/50 backdrop-blur-sm group hover:border-primary/20 transition-colors">
              <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">
                 {user?.role === 'teacher' ? 'Discipline / Spécialité' : 'Établissement de Référence'}
              </span>
              <span className="text-white font-bold tracking-tight text-sm">
                 {user?.role === 'teacher' ? (user?.subject || 'Éducation Générale') : 'Institution Univers de Ouanaminthe'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-4">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-500/10 border border-red-500/20 text-red-500 py-6 rounded-[2rem] font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-xl group border-l-4 border-l-red-500 shadow-red-500/5"
          >
             <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">logout</span>
             Terminer la session
          </button>
        </div>
      </main>
      
      <p className="text-center text-slate-700 text-[9px] font-black uppercase tracking-[0.4em] pb-10 opacity-40">Institution Univers © 2026</p>
    </div>
  );
}
