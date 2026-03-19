import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Welcome() {
  const [showPassword, setShowPassword] = useState(false);
  const [idUser, setIdUser] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Dynamic branding
  const [branding, setBranding] = useState({
    logo_url: '',
    school_image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp-Ipg_uYsIJGg5URwMCMzsyI9MMQSNdg3HkM0DjnFD009ioNP7Ed30u_fHx_qjrqtU2C-xY25XhC52WodNYu2YZmSD7G5N6pedYwweCuw60czVJ7DEyrzY5rVYB1EA6OB2780klfCvy9b0DlsCJ4AI3xQa0xfXgTP_y_h15K_Jfouzp2NQt8BHEFsxpj4Oouoh4ncZYos0SBXR1wmdJHW900OZxP7syx32a8YtqcqBuugUcMfr8bTa5-qFl47IKVYvQm_dhBQ-Pxt',
    school_name: 'Univers App'
  });

  useEffect(() => {
    fetchBranding();
  }, []);

  async function fetchBranding() {
    try {
      const { data } = await supabase.from('school_settings').select('*').limit(1).single();
      if (data) {
        setBranding({
          logo_url: data.logo_url || '',
          school_image_url: data.school_image_url || branding.school_image_url,
          school_name: data.school_name || branding.school_name
        });
      }
    } catch (err) {
      console.error("Branding fetch error:", err);
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idUser || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    setIsLoggingIn(true);
    setError('');
    try {
      const { data, error: sbError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id_user', idUser.toLowerCase())
        .eq('password_user', password)
        .single();

      if (sbError || !data) throw new Error('Identifiant ou mot de passe incorrect');

      localStorage.setItem('user_session', JSON.stringify(data));

      if (data.role === 'teacher') {
        navigate('/teacher-dashboard');
      } else if (data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="font-display min-h-screen w-full flex flex-col lg:flex-row bg-slate-950">
      {/* LEFT PANEL — IMAGE BACKGROUND */}
      <div className="relative w-full h-56 sm:h-64 lg:h-auto lg:flex-1 overflow-hidden transition-all duration-700">
        {/* Dynamic School Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url('${branding.school_image_url}')` }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/60 to-slate-950/90" />

        {/* Branding Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-4">
            {branding.logo_url ? (
              <div className="size-16 rounded-2xl bg-white p-2 shadow-2xl border border-white/20">
                <img src={branding.logo_url} className="w-full h-full object-contain" alt="Logo" />
              </div>
            ) : (
              <div className="bg-blue-600/20 backdrop-blur-md p-3 rounded-2xl border border-blue-500/20 shadow-xl">
                 <span className="material-symbols-outlined text-white text-3xl">school</span>
              </div>
            )}
            <div>
              <h1 className="text-white text-xl lg:text-2xl font-black tracking-tighter uppercase leading-none">{branding.school_name}</h1>
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] opacity-90 mt-1">Plateforme Éducative</p>
            </div>
          </div>

          <div className="hidden lg:block">
            <h2 className="text-white text-4xl xl:text-5xl font-bold leading-tight mb-5 tracking-tight">
              Bienvenue sur<br />
              <span className="text-blue-400">Univers App</span>
            </h2>
            <p className="text-white/80 text-lg leading-relaxed max-w-xl font-medium">
              La plateforme éducative complète pour les élèves, professeurs et administrateurs du collège <span className="text-blue-400 font-bold">Univers de Ouanaminthe</span>.
            </p>
          </div>

          <div className="lg:hidden">
            <h2 className="text-white text-2xl font-black uppercase tracking-tighter leading-tight">
              Connexion <span className="text-blue-400">Active</span>
            </h2>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — LOGIN FORM */}
      <div className="w-full lg:w-[450px] xl:w-[500px] shrink-0 flex flex-col justify-center bg-slate-950 p-6 sm:p-10 lg:p-14 lg:overflow-y-auto z-20">
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-10">
            <h2 className="text-white text-3xl font-black uppercase tracking-tighter mb-2">Se Connecter</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Entrez vos identifiants d'établissement</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-[11px] font-black uppercase tracking-widest rounded-2xl flex items-center gap-3 animate-pulse">
              <span className="material-symbols-outlined text-xl shrink-0">warning</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest px-1">Identifiant Unique</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl group-focus-within:text-blue-500 transition-colors">person</span>
                <input
                  type="text"
                  placeholder="EX: NOM.USER.2023"
                  value={idUser}
                  onChange={(e) => setIdUser(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 text-white placeholder:text-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all font-bold text-sm tracking-tight"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest px-1">Mot de Passe</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl group-focus-within:text-blue-500 transition-colors">lock</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-slate-900 border border-slate-800 text-white placeholder:text-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all font-bold text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
            >
              {isLoggingIn ? (
                <span className="animate-spin material-symbols-outlined">autorenew</span>
              ) : (
                <>Accéder à l'espace</>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-10">
            <div className="flex-1 h-px bg-slate-900" />
            <span className="text-slate-700 text-[9px] font-black uppercase tracking-widest">Rôles Rapides</span>
            <div className="flex-1 h-px bg-slate-900" />
          </div>

          <div className="grid grid-cols-2 gap-3 pb-10">
            <button
              onClick={() => navigate('/teacher-dashboard')}
              className="py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white font-black rounded-2xl transition-all flex flex-col items-center gap-1 group"
            >
              <span className="material-symbols-outlined text-xl text-emerald-500 group-hover:scale-110 transition-transform">school</span>
              <span className="text-[9px] uppercase tracking-widest">Professeur</span>
            </button>
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white font-black rounded-2xl transition-all flex flex-col items-center gap-1 group"
            >
              <span className="material-symbols-outlined text-xl text-indigo-500 group-hover:scale-110 transition-transform">admin_panel_settings</span>
              <span className="text-[9px] uppercase tracking-widest">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
