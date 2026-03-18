import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Welcome() {
  const [showPassword, setShowPassword] = useState(false);
  const [idUser, setIdUser] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    <div className="font-display min-h-screen w-full flex bg-slate-950">

      {/* ── LEFT PANEL (image) ── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCp-Ipg_uYsIJGg5URwMCMzsyI9MMQSNdg3HkM0DjnFD009ioNP7Ed30u_fHx_qjrqtU2C-xY25XhC52WodNYu2YZmSD7G5N6pedYwweCuw60czVJ7DEyrzY5rVYB1EA6OB2780klfCvy9b0DlsCJ4AI3xQa0xfXgTP_y_h15K_Jfouzp2NQt8BHEFsxpj4Oouoh4ncZYos0SBXR1wmdJHW900OZxP7syx32a8YtqcqBuugUcMfr8bTa5-qFl47IKVYvQm_dhBQ-Pxt')" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/60 to-slate-950/90" />

        {/* Content on image */}
        <div className="relative z-10 flex flex-col justify-between p-10 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/20">
              <span className="material-symbols-outlined text-white text-3xl">school</span>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold tracking-tight">Univers App</h1>
              <p className="text-blue-300 text-xs font-medium uppercase tracking-widest">Plateforme Éducative</p>
            </div>
          </div>

          {/* Bottom tagline */}
          <div>
            <h2 className="text-white text-3xl xl:text-4xl font-bold leading-tight mb-3">
              Bienvenue sur<br />
              <span className="text-blue-300">Univers App</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed max-w-md">
              La plateforme éducative complète pour les élèves, professeurs et administrateurs.
            </p>
            {/* Stats */}
            <div className="flex gap-6 mt-8">
              <div className="text-center">
                <p className="text-white text-2xl font-bold">500+</p>
                <p className="text-slate-400 text-xs">Élèves</p>
              </div>
              <div className="w-px bg-white/20" />
              <div className="text-center">
                <p className="text-white text-2xl font-bold">50+</p>
                <p className="text-slate-400 text-xs">Professeurs</p>
              </div>
              <div className="w-px bg-white/20" />
              <div className="text-center">
                <p className="text-white text-2xl font-bold">7</p>
                <p className="text-slate-400 text-xs">Niveaux</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col justify-center items-center min-h-screen bg-slate-950 p-6 sm:p-10">

        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-3 mb-8">
          <div className="bg-blue-600/20 p-2.5 rounded-xl border border-blue-500/30">
            <span className="material-symbols-outlined text-blue-400 text-3xl">school</span>
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">Univers App</h1>
            <p className="text-blue-400 text-xs uppercase tracking-widest">Plateforme Éducative</p>
          </div>
        </div>

        {/* Form card */}
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2">Connexion</h2>
            <p className="text-slate-400">Entrez vos identifiants fournis par l'école</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-5 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-lg shrink-0">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Identifiant */}
            <div className="space-y-2">
              <label className="text-slate-300 text-sm font-semibold" htmlFor="username">
                Identifiant
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">person</span>
                <input
                  id="username"
                  type="text"
                  placeholder="Votre identifiant"
                  value={idUser}
                  onChange={(e) => setIdUser(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-800/60 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="space-y-2">
              <label className="text-slate-300 text-sm font-semibold" htmlFor="password">
                Mot de passe
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">lock</span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-800/60 border border-slate-700 text-white placeholder:text-slate-500 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Se connecter button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-base mt-2"
            >
              {isLoggingIn ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-xl">autorenew</span>
                  Connexion en cours...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl">login</span>
                  Se connecter
                </>
              )}
            </button>
          </form>

          {/* Séparateur */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-slate-600 text-xs uppercase tracking-widest">ou accéder en tant que</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Boutons secondaires */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/teacher-dashboard')}
              className="py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span className="material-symbols-outlined text-lg text-emerald-400">school</span>
              Professeur
            </button>
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span className="material-symbols-outlined text-lg text-indigo-400">admin_panel_settings</span>
              Administration
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-slate-600 text-xs mt-8">
            Identifiants fournis par l'administration · 
            <a href="#" className="text-blue-500 hover:text-blue-400 ml-1">Besoin d'aide ?</a>
          </p>
        </div>
      </div>

    </div>
  );
}
