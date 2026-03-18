import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateCredentials, GeneratedCredentials } from '../lib/ai';
import { supabase } from '../lib/supabase';

export default function AdminAccountCreation() {
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [fullName, setFullName] = useState('');
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState<GeneratedCredentials | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleGenerate = async () => {
    if (!fullName) {
      setStatus({ type: 'error', message: 'Veuillez entrer le nom complet' });
      return;
    }

    setIsGenerating(true);
    setStatus(null);
    
    try {
      // 1. Generate with Gemini AI
      const firstName = fullName.split(' ')[0];
      const lastName = fullName.split(' ').slice(1).join(' ') || 'User';
      const credentials = await generateCredentials(firstName, lastName, userType);
      
      // 2. Save to Supabase
      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            full_name: fullName,
            role: userType,
            id_user: credentials.id_user,
            password_user: credentials.password_user, // Note: In production, hash this!
            class_name: userType === 'student' ? className : null,
            subject: userType === 'teacher' ? subject : null,
            created_at: new Date().toISOString(),
          }
        ]);

      if (error) throw error;

      setGenerated(credentials);
      setStatus({ type: 'success', message: 'Compte créé avec succès dans Supabase !' });
    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', message: 'Erreur: ' + err.message });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (generated) {
      navigator.clipboard.writeText(`Identifiant: ${generated.id_user}\nMot de passe: ${generated.password_user}`);
      alert('Copié dans le presse-papier !');
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
          <Link to="/admin-dashboard" className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">arrow_back</span>
          </Link>
          <h1 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white flex-1 text-center">Création des comptes</h1>
          <div className="size-10"></div>
        </div>
      </header>

      <main className="max-w-xl mx-auto w-full p-4 space-y-6 flex-1 pb-32">
        {/* Selection Section */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Type d'utilisateur</h3>
          <div className="flex p-1 bg-slate-200 dark:bg-slate-800 rounded-xl">
            <label className="flex-1 cursor-pointer">
              <input 
                className="sr-only peer" 
                name="user_type" 
                type="radio" 
                checked={userType === 'student'}
                onChange={() => setUserType('student')}
              />
              <div className="flex h-12 items-center justify-center rounded-lg text-sm font-medium transition-all peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:text-primary peer-checked:shadow-sm text-slate-600 dark:text-slate-400">
                Élève
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input 
                className="sr-only peer" 
                name="user_type" 
                type="radio" 
                checked={userType === 'teacher'}
                onChange={() => setUserType('teacher')}
              />
              <div className="flex h-12 items-center justify-center rounded-lg text-sm font-medium transition-all peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:text-primary peer-checked:shadow-sm text-slate-600 dark:text-slate-400">
                Professeur
              </div>
            </label>
          </div>
        </section>

        {/* Form Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-5">
          {status && (
            <div className={`p-3 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {status.message}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nom complet</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3.5 text-slate-400 text-xl">person</span>
              <input 
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white" 
                placeholder="Ex: Jean Dupont" 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          <div className={`space-y-2 transition-opacity duration-300 ${userType === 'student' ? 'opacity-100' : 'hidden'}`}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Classe (pour élève)</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3.5 text-slate-400 text-xl">school</span>
              <select 
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white appearance-none"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              >
                <option value="">Sélectionner une classe</option>
                <option>7ème année</option>
                <option>8ème année</option>
                <option>9ème année</option>
                <option>NS1</option>
                <option>NS2</option>
                <option>NS3</option>
                <option>NS4</option>
              </select>
            </div>
          </div>

          <div className={`space-y-2 transition-opacity duration-300 ${userType === 'teacher' ? 'opacity-100' : 'hidden'}`}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Matière (pour professeur)</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3.5 text-slate-400 text-xl">book</span>
              <input 
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white" 
                placeholder="Ex: Mathématiques" 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-4 active:scale-95 disabled:opacity-50"
          >
            <span className={`material-symbols-outlined ${isGenerating ? 'animate-spin' : ''}`}>
              {isGenerating ? 'autorenew' : 'key'}
            </span>
            {isGenerating ? 'Génération en cours...' : 'Générer identifiant'}
          </button>
        </div>

        {/* Result Card */}
        {generated && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2">Accès générés</h3>
            <div className="bg-primary/5 dark:bg-primary/10 border-2 border-dashed border-primary/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 size-24 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="grid grid-cols-2 gap-6 relative z-10">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-primary uppercase">Identifiant</p>
                  <p className="text-xl font-bold dark:text-white uppercase">{generated.id_user}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-xs font-semibold text-primary uppercase">Mot de passe</p>
                  <p className="text-xl font-bold dark:text-white font-mono tracking-widest">{generated.password_user}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-primary/10 flex gap-3">
                <button 
                  onClick={copyToClipboard}
                  className="flex-1 py-3 bg-white dark:bg-slate-800 text-primary border border-primary/20 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">content_copy</span>
                  Copier
                </button>
                <button className="flex-1 py-3 bg-white dark:bg-slate-800 text-primary border border-primary/20 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors">
                  <span className="material-symbols-outlined text-lg">share</span>
                  Partager
                </button>
              </div>
            </div>
          </div>
        )}
      </main>


      {/* Bottom Navigation Component */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe-area z-50">
        <div className="max-w-4xl mx-auto flex justify-around p-2">
          <Link className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-primary transition-colors" to="/admin-dashboard">
            <span className="material-symbols-outlined">grid_view</span>
            <span className="text-[10px] font-medium uppercase tracking-tighter">Dashboard</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 p-2 text-primary" to="/admin-accounts">
            <span className="material-symbols-outlined fill-[1]">person_add</span>
            <span className="text-[10px] font-medium uppercase tracking-tighter">Gestion</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-primary transition-colors" to="#">
            <span className="material-symbols-outlined">analytics</span>
            <span className="text-[10px] font-medium uppercase tracking-tighter">Rapports</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-primary transition-colors" to="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-[10px] font-medium uppercase tracking-tighter">Paramètres</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
