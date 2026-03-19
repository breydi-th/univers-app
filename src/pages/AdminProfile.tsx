import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseAdmin as supabase } from '../lib/supabase-admin';
import AdminHeader from '../components/AdminHeader';

export default function AdminProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ full_name: '', email: '' });
  
  // School Branding State
  const [schoolSettings, setSchoolSettings] = useState({
    id: '',
    logo_url: '',
    school_image_url: '',
    school_name: ''
  });
  const [isBrandingSaving, setIsBrandingSaving] = useState(false);

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

    fetchSchoolSettings();
  }, [navigate]);

  async function fetchSchoolSettings() {
    try {
      const { data, error } = await supabase.from('school_settings').select('*').limit(1).single();
      if (data) {
        setSchoolSettings({
          id: data.id,
          logo_url: data.logo_url || '',
          school_image_url: data.school_image_url || '',
          school_name: data.school_name || ''
        });
      }
    } catch (err) {
      console.error("Error fetching school settings:", err);
    }
  }

  const handleUpdate = async () => {
    try {
      const session = localStorage.getItem('user_session');
      if (session) {
        const parsed = JSON.parse(session);
        const { error: dbError } = await supabase.from('profiles').update({ 
          full_name: formData.full_name 
        }).eq('id', parsed.id);
        
        if (dbError) throw dbError;

        const updated = { ...parsed, full_name: formData.full_name };
        localStorage.setItem('user_session', JSON.stringify(updated));
        setUser(updated);
      }
      setIsEditing(false);
      alert("✅ Profil mis à jour !");
    } catch (e: any) {
      alert("❌ Erreur: " + e.message);
    }
  };

  const handleSaveBranding = async () => {
    setIsBrandingSaving(true);
    try {
      const { error } = await supabase.from('school_settings').upsert({
        id: schoolSettings.id || undefined, // use existing id if available
        logo_url: schoolSettings.logo_url,
        school_image_url: schoolSettings.school_image_url
      });
      if (error) throw error;
      alert("🎨 Identité visuelle mise à jour !");
      // Optional: reload or broadcast change
    } catch (err: any) {
      alert("❌ Erreur branding: " + err.message);
    } finally {
      setIsBrandingSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen">
      <AdminHeader 
        title="Mon Profil" 
        subtitle="Informations Administrateur"
        showBack={true}
      />

      <main className="p-4 sm:p-6 max-w-xl mx-auto space-y-8 pb-32">
        {/* Personal Info Section */}
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="size-32 rounded-[2.5rem] bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-slate-700 shadow-2xl relative group overflow-hidden">
             <span className="material-symbols-outlined text-6xl group-hover:scale-110 transition-transform duration-500">person</span>
             <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="text-center">
             <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{user.full_name}</h2>
             <p className="text-primary text-[10px] font-black uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mt-2 border border-primary/20 shadow-lg shadow-primary/10">Administrateur Système</p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 space-y-6 shadow-2xl relative">
          <div className="absolute top-0 right-0 size-40 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="space-y-4 relative z-10">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">badge</span>
              Informations Personnelles
            </h3>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Nom Complet</label>
               <input 
                  disabled={!isEditing}
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-primary disabled:opacity-50 transition-all font-bold"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
               />
            </div>
            
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">E-mail Administratif</label>
               <input 
                  disabled
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none opacity-40 transition-all font-bold lowercase"
                  value={formData.email}
               />
            </div>

            <div className="pt-4">
               {isEditing ? (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => { setIsEditing(false); setFormData({ full_name: user.full_name, email: user.id_user }); }}
                      className="flex-1 py-4 bg-slate-800 text-slate-300 font-bold uppercase text-xs rounded-2xl hover:bg-slate-700 active:scale-95 transition-all text-[10px] tracking-widest"
                    >
                      Annuler
                    </button>
                    <button 
                      onClick={handleUpdate}
                      className="flex-1 py-4 bg-primary text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-primary/90 active:scale-95 transition-all"
                    >
                      Enregistrer
                    </button>
                  </div>
               ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="w-full py-4 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-black uppercase text-[10px] tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg group"
                  >
                    <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">edit</span>
                    Modifier mon profil
                  </button>
               )}
            </div>
          </div>
        </div>

        {/* Brand/School Identity Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 space-y-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 size-40 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="space-y-4 relative z-10">
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">palette</span>
              Identité de l'école (Logo & Connexion)
            </h3>

            {/* Logo URL */}
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Format URL du Logo</label>
               <div className="flex gap-4 items-center">
                  <div className="size-16 shrink-0 rounded-2xl bg-white/5 border border-slate-800 flex items-center justify-center overflow-hidden">
                    {schoolSettings.logo_url ? <img src={schoolSettings.logo_url} className="w-full h-full object-contain p-2" alt="Logo" /> : <span className="material-symbols-outlined text-slate-700 text-3xl">broken_image</span>}
                  </div>
                  <input 
                    className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold text-xs"
                    placeholder="https://..."
                    value={schoolSettings.logo_url}
                    onChange={(e) => setSchoolSettings({...schoolSettings, logo_url: e.target.value})}
                  />
               </div>
            </div>

            {/* School Image URL */}
            <div className="space-y-2 pt-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Image Écran de Connexion</label>
               <div className="aspect-video w-full rounded-2xl bg-white/5 border border-slate-800 flex items-center justify-center overflow-hidden mb-3 relative">
                 {schoolSettings.school_image_url ? <img src={schoolSettings.school_image_url} className="w-full h-full object-cover" alt="School" /> : <span className="material-symbols-outlined text-slate-700 text-4xl">landscape</span>}
                 {schoolSettings.school_image_url && <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>}
               </div>
               <input 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold text-xs"
                  placeholder="URL de l'image de l'école (HD)"
                  value={schoolSettings.school_image_url}
                  onChange={(e) => setSchoolSettings({...schoolSettings, school_image_url: e.target.value})}
               />
               <p className="text-[9px] text-slate-600 font-bold italic px-1 pt-1">Cette image s'affiche sur la zone de gauche de l'écran de bienvenue.</p>
            </div>

            <div className="pt-4">
              <button 
                disabled={isBrandingSaving}
                onClick={handleSaveBranding}
                className="w-full py-5 bg-blue-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                {isBrandingSaving ? 'Mise à jour...' : "Appliquer l'identité visuelle"}
              </button>
            </div>
          </div>
        </div>

        {/* Security / Logout */}
        <div className="grid grid-cols-1 gap-4">
          <div 
            onClick={() => navigate('/admin-settings/security')}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all active:scale-[0.98]"
          >
             <div className="flex items-center gap-4">
                <div className="size-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                   <span className="material-symbols-outlined">security</span>
                </div>
                <div>
                   <h3 className="text-sm font-black uppercase tracking-tight">Sécurité</h3>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Gérer mon mot de passe</p>
                </div>
             </div>
             <span className="material-symbols-outlined text-slate-700 group-hover:text-primary transition-colors">chevron_right</span>
          </div>

          <button 
            onClick={() => { if(confirm("Se déconnecter ?")) { localStorage.removeItem('user_session'); navigate('/'); } }}
            className="w-full bg-red-500/10 border border-red-500/20 p-5 rounded-3xl flex items-center gap-4 hover:bg-red-500 hover:text-white transition-all active:scale-95 group"
          >
             <div className="size-10 rounded-xl bg-red-500/10 group-hover:bg-red-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-500 group-hover:text-white font-bold">logout</span>
             </div>
             <div className="flex-1 text-left">
                <h3 className="text-sm font-black uppercase tracking-tighter">Déconnexion</h3>
                <p className="text-[10px] opacity-70 font-black uppercase tracking-widest leading-none mt-1">Terminer la session</p>
             </div>
             <span className="material-symbols-outlined opacity-30">chevron_right</span>
          </button>
        </div>
      </main>
    </div>
  );
}
