import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateCredentials, GeneratedCredentials } from '../lib/ai';
import { supabase } from '../lib/supabase';
import AdminHeader from '../components/AdminHeader';

export default function AdminAccountCreation() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'student' | 'teacher' | 'admin'>('student');
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
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || 'User';
      const credentials = await generateCredentials(firstName, lastName, userType);
      
      // 2. Save to Supabase
      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            full_name: fullName,
            role: userType,
            id_user: credentials.id_user,
            password_user: credentials.password_user,
            grade_level: userType === 'student' ? className : null,
            subject: userType === 'teacher' ? subject : null,
            created_at: new Date().toISOString(),
          }
        ]);

      if (error) throw error;

      setGenerated(credentials);
      setStatus({ type: 'success', message: 'Compte créé avec succès !' });
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
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen flex flex-col selection:bg-primary/30">
      <AdminHeader 
        title="Accès & Comptes AI" 
        subtitle="Configuration des identifiants"
        showBack={true}
        rightActions={
          <div className="flex gap-2">
            <button className="flex size-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-xl">help</span>
            </button>
          </div>
        }
      />

      <main className="max-w-xl mx-auto w-full p-4 space-y-6 flex-1 pb-40">
        {/* Selection Section */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Niveau de privilège</h3>
          <div className="flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl gap-2 shadow-inner">
            {(['student', 'teacher', 'admin'] as const).map((type) => (
              <label key={type} className="flex-1 cursor-pointer">
                <input 
                  className="sr-only peer" 
                  name="user_type" 
                  type="radio" 
                  checked={userType === type}
                  onChange={() => setUserType(type)}
                />
                <div className="flex h-11 items-center justify-center rounded-xl text-xs font-black uppercase tracking-tighter transition-all peer-checked:bg-primary peer-checked:text-white peer-checked:shadow-[0_0_20px_rgba(var(--color-primary),0.3)] text-slate-500">
                  {type === 'student' ? 'Élève' : type === 'teacher' ? 'Prof' : 'Admin'}
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Form Section */}
        <div className="bg-slate-900 p-6 rounded-3xl shadow-2xl border border-slate-800 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 size-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          {status && (
            <div className={`p-4 rounded-2xl text-xs font-bold animate-in zoom-in-95 duration-300 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">{status.type === 'success' ? 'check_circle' : 'error'}</span>
                {status.message}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Identité Complète</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-3.5 text-slate-600 text-xl group-focus-within:text-primary transition-colors">person</span>
              <input 
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-800 bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all placeholder:text-slate-700 font-bold" 
                placeholder="Ex: Jean-Baptiste Junior" 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          {userType === 'student' && (
            <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Niveau d'étude</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-3.5 text-slate-600 text-xl group-focus-within:text-primary transition-colors">school</span>
                <select 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-800 bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all appearance-none font-bold"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                >
                  <option value="" className="text-slate-700">Sélectionner une classe</option>
                  {['7ème année', '8ème année', '9ème année', 'NS1', 'NS2', 'NS3', 'NS4'].map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-3.5 text-slate-600 pointer-events-none">expand_more</span>
              </div>
            </div>
          )}

          {userType === 'teacher' && (
            <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Spécialité</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-3.5 text-slate-600 text-xl group-focus-within:text-primary transition-colors">book</span>
                <input 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-800 bg-slate-950 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all placeholder:text-slate-700 font-bold" 
                  placeholder="Ex: Chimie Organique" 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </div>
          )}

          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3 mt-4 active:scale-[0.98] disabled:opacity-40 uppercase tracking-tighter"
          >
            <span className={`material-symbols-outlined font-black ${isGenerating ? 'animate-spin' : ''}`}>
              {isGenerating ? 'autorenew' : 'key'}
            </span>
            {isGenerating ? 'Traitement AI...' : 'Générer les accès'}
          </button>
        </div>

        {/* Result Card */}
        {generated && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary text-center">Accès Sécurisés Générés</h3>
            <div className="bg-slate-900 border-2 border-dashed border-primary/30 rounded-3xl p-8 relative overflow-hidden group shadow-[0_0_50px_rgba(var(--color-primary),0.1)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50"></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Identifiant Unique</p>
                  <p className="text-2xl font-black text-white uppercase tracking-tighter selection:bg-primary/50">{generated.id_user}</p>
                </div>
                <div className="space-y-2 text-left sm:text-right">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mot de Passe Provisoire</p>
                  <p className="text-2xl font-black text-primary font-mono tracking-widest selection:bg-white/30">{generated.password_user}</p>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-800 flex gap-4 relative z-10">
                <button 
                  onClick={copyToClipboard}
                  className="flex-1 py-4 bg-slate-950 text-slate-300 border border-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">content_copy</span>
                  Copier
                </button>
                <button className="flex-1 py-4 bg-slate-950 text-slate-300 border border-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95">
                  <span className="material-symbols-outlined text-lg">print</span>
                  Imprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-[#0a0c10]/90 backdrop-blur-2xl px-2 pb-8 pt-3 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
        <div className="max-w-4xl mx-auto w-full flex justify-around">
          <Link className="flex flex-1 flex-col items-center gap-1 text-slate-500 hover:text-white transition-colors" to="/admin-dashboard">
            <span className="material-symbols-outlined">grid_view</span>
            <p className="text-[10px] font-black uppercase tracking-tighter">Dashboard</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1 text-primary transition-colors" to="/admin-students">
            <span className="material-symbols-outlined fill-[1]">business_center</span>
            <p className="text-[10px] font-black uppercase tracking-tighter">Gestion</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1 text-slate-500 hover:text-white transition-colors" to="/admin-reports">
            <span className="material-symbols-outlined">bar_chart</span>
            <p className="text-[10px] font-black uppercase tracking-tighter">Rapports</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1 text-slate-500 hover:text-white transition-colors" to="/admin-settings">
            <span className="material-symbols-outlined">settings</span>
            <p className="text-[10px] font-black uppercase tracking-tighter">Paramètres</p>
          </Link>
        </div>
      </nav>
    </div>
  );
}
