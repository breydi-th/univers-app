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

      if (sbError || !data) {
        throw new Error('Identifiant ou mot de passe incorrect');
      }

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
    <div className="font-display bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 h-[100dvh] w-screen flex flex-col overflow-hidden">
      <header className="w-full flex items-center justify-between p-3 sm:p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 p-1.5 sm:p-2 rounded-lg text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl sm:text-3xl">school</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight">Univers App</h1>
        </div>
        <div className="hidden sm:block">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Plateforme Éducative</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
        <div className="w-full max-w-lg xl:max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-full">
          <div className="relative h-32 sm:h-48 md:h-56 w-full shrink-0 overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-6xl sm:text-7xl opacity-20">history_edu</span>
            </div>
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCp-Ipg_uYsIJGg5URwMCMzsyI9MMQSNdg3HkM0DjnFD009ioNP7Ed30u_fHx_qjrqtU2C-xY25XhC52WodNYu2YZmSD7G5N6pedYwweCuw60czVJ7DEyrzY5rVYB1EA6OB2780klfCvy9b0DlsCJ4AI3xQa0xfXgTP_y_h15K_Jfouzp2NQt8BHEFsxpj4Oouoh4ncZYos0SBXR1wmdJHW900OZxP7syx32a8YtqcqBuugUcMfr8bTa5-qFl47IKVYvQm_dhBQ-Pxt')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
          </div>
          
          <div className="px-6 sm:px-10 pb-6 sm:pb-10 -mt-6 sm:-mt-8 relative flex-1 flex flex-col overflow-hidden">
            <div className="text-center mb-6 sm:mb-8 shrink-0">
              <h2 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white">Connexion à Univers App</h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1 sm:mt-2 text-sm sm:text-base">Accédez à votre espace étudiant ou enseignant</p>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-xl text-center font-medium">
                {error}
              </div>
            )}

            <form className="space-y-4 sm:space-y-6 flex-1 flex flex-col justify-center" onSubmit={handleLogin}>
              <div className="space-y-1 sm:space-y-2">
                <label className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-300 ml-1" htmlFor="username">Identifiant fourni par l’école</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-slate-500 text-base sm:text-lg">person</span>
                  <input 
                    className="w-full pl-12 pr-4 py-3 sm:py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-slate-900 dark:text-white text-sm sm:text-base placeholder:text-slate-400" 
                    id="username" 
                    name="username" 
                    placeholder="Votre identifiant" 
                    type="text" 
                    value={idUser}
                    onChange={(e) => setIdUser(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                <label className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-300 ml-1" htmlFor="password">Mot de passe</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-slate-500 text-base sm:text-lg">lock</span>
                  <input 
                    className="w-full pl-12 pr-12 py-3 sm:py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-slate-900 dark:text-white text-sm sm:text-base placeholder:text-slate-400" 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-500 hover:text-primary transition-colors flex items-center justify-center focus:outline-none"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    <span className="material-symbols-outlined text-base sm:text-lg">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>
              
              <div className="pt-2 sm:pt-4 flex flex-col gap-3">
                <button 
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold py-3 sm:py-4 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 text-sm sm:text-lg" 
                  type="submit"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? 'Connexion en cours...' : 'Se connecter'}
                  <span className="material-symbols-outlined text-xl sm:text-2xl">
                    {isLoggingIn ? 'autorenew' : 'login'}
                  </span>
                </button>
                <button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 sm:py-4 px-6 rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 text-sm sm:text-lg" 
                  type="button"
                  onClick={() => navigate('/admin-dashboard')}
                >
                  Administration
                  <span className="material-symbols-outlined text-xl sm:text-2xl">admin_panel_settings</span>
                </button>
              </div>
            </form>
            
            <div className="mt-6 sm:mt-8 p-3 sm:p-5 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/10 shrink-0">
              <div className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-primary text-xl sm:text-2xl shrink-0">info</span>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Les identifiants sont fournis par l’administration de l’école. Si vous n'avez pas reçu les vôtres, veuillez consulter votre courrier d'inscription.
                </p>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-8 text-center shrink-0">
              <a className="text-xs sm:text-base font-medium text-primary hover:underline flex items-center justify-center gap-1" href="#">
                Problème de connexion ? Contactez l’administration
                <span className="material-symbols-outlined text-sm sm:text-lg">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-2 sm:p-6 text-center text-slate-400 text-[9px] sm:text-xs shrink-0">
        © 2026 Univers school. Tous droits réservés.
      </footer>
    </div>
  );
}
