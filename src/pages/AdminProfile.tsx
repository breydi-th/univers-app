import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminHeader from '../components/AdminHeader';

export default function AdminProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ full_name: '', email: '' });

  useEffect(() => {
    const session = localStorage.getItem('user_session');
    if (!session) {
      navigate('/');
      return;
    }
    const parsedUser = JSON.parse(session);
    setUser(parsedUser);
    setFormData({
      full_name: parsedUser.full_name || '',
      email: parsedUser.id_user || '' 
    });
  }, [navigate]);

  const handleUpdate = async () => {
    try {
      const session = localStorage.getItem('user_session');
      if (session) {
        const parsed = JSON.parse(session);
        const updated = { ...parsed, full_name: formData.full_name };
        localStorage.setItem('user_session', JSON.stringify(updated));
        setUser(updated);
      }
      setIsEditing(false);
      alert("✅ Profil mis à jour !");
    } catch (e) {
      alert("❌ Erreur de mise à jour");
    }
  };

  const handleAvatarChange = () => {
    alert("📸 Changement de photo bientôt disponible !");
  };

  if (!user) return null;

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen">
      <AdminHeader 
        title="Mon Profil" 
        subtitle="Informations Administrateur"
        showBack={true}
      />

      <main className="p-4 sm:p-6 max-w-xl mx-auto space-y-8">
        <div className="flex flex-col items-center gap-4 py-8 animate-in zoom-in-95 duration-500">
          <div className="size-32 rounded-[2.5rem] bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-slate-700 shadow-2xl relative group overflow-hidden">
             <span className="material-symbols-outlined text-6xl group-hover:scale-110 transition-transform duration-500">person</span>
             <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <button 
                onClick={handleAvatarChange}
                className="absolute bottom-1 right-1 size-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all cursor-pointer z-10"
              >
                <span className="material-symbols-outlined text-xl">photo_camera</span>
             </button>
          </div>
          <div className="text-center">
             <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{user.full_name}</h2>
             <p className="text-primary text-[10px] font-black uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mt-2 border border-primary/20 shadow-lg shadow-primary/10">Administrateur Système</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 space-y-6 shadow-2xl relative group pb-10">
          <div className="absolute top-0 right-0 size-40 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="space-y-4 relative z-10">
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Nom Complet</label>
               <input 
                  disabled={!isEditing}
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-primary disabled:opacity-50 transition-all font-bold placeholder:text-slate-800"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
               />
            </div>
            
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">E-mail Administratif</label>
               <input 
                  disabled
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-primary disabled:opacity-30 transition-all font-bold opacity-50 lowercase"
                  value={formData.email}
               />
            </div>

            <div className="pt-4 flex gap-4">
               {isEditing ? (
                  <>
                    <button 
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({ full_name: user.full_name || '', email: user.id_user || '' });
                      }}
                      className="flex-1 py-4 bg-slate-800 text-slate-300 font-bold uppercase text-xs rounded-2xl hover:bg-slate-700 active:scale-95 transition-all"
                    >
                      Annuler
                    </button>
                    <button 
                      onClick={handleUpdate}
                      className="flex-1 py-4 bg-primary text-white font-black uppercase text-xs rounded-2xl shadow-xl hover:bg-primary/90 active:scale-95 transition-all"
                    >
                      Enregistrer
                    </button>
                  </>
               ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="w-full py-5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-black uppercase text-[10px] tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg group"
                  >
                    <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">edit</span>
                    Éditer mes informations
                  </button>
               )}
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigate('/admin-settings/security')}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all active:scale-[0.98]"
        >
           <div className="flex items-center gap-4">
              <div className="size-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                 <span className="material-symbols-outlined">security</span>
              </div>
              <div>
                 <h3 className="text-sm font-black uppercase tracking-tight">Mot de Passe</h3>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Dernière mise à jour: 3 mois</p>
              </div>
           </div>
           <span className="material-symbols-outlined text-slate-700 group-hover:text-primary transition-colors">chevron_right</span>
        </div>

        <button 
          onClick={() => { if(confirm("Se déconnecter ?")) { localStorage.removeItem('user_session'); navigate('/'); } }}
          className="w-full bg-red-500/10 border border-red-500/20 p-5 rounded-3xl flex items-center gap-4 hover:bg-red-500 hover:text-white transition-all active:scale-95 group mb-20"
        >
           <div className="size-10 rounded-xl bg-red-500/10 group-hover:bg-red-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-500 group-hover:text-white font-bold">logout</span>
           </div>
           <div className="flex-1 text-left">
              <h3 className="text-sm font-black uppercase tracking-tighter">Déconnexion</h3>
              <p className="text-[10px] opacity-70 font-black uppercase tracking-widest">Quitter la session</p>
           </div>
           <span className="material-symbols-outlined opacity-30">chevron_right</span>
        </button>
      </main>
    </div>
  );
}
