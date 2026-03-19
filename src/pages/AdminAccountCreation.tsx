import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { generateCredentials, GeneratedCredentials } from '../lib/ai';
import { supabaseAdmin as supabase } from '../lib/supabase-admin';
import AdminHeader from '../components/AdminHeader';

export default function AdminAccountCreation() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'student' | 'teacher' | 'admin'>('student');
  const [fullName, setFullName] = useState('');
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  
  // Credentials state (Editable by admin)
  const [idUser, setIdUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Generate with AI
  const handleAIGenerate = async () => {
    if (!fullName) {
      setStatus({ type: 'error', message: 'Veuillez entrer le nom complet d\'abord' });
      return;
    }

    setIsGenerating(true);
    setStatus(null);
    try {
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || 'User';
      const credentials = await generateCredentials(firstName, lastName, userType);
      
      setIdUser(credentials.id_user);
      setPasswordUser(credentials.password_user);
      setStatus({ type: 'success', message: 'Identifiants suggérés par l\'IA !' });
    } catch (err: any) {
      setStatus({ type: 'error', message: 'Erreur génération: ' + err.message });
    } finally {
      setIsGenerating(false);
    }
  };

  // Save to Database
  const handleSave = async () => {
    if (!fullName || !idUser || !passwordUser) {
      setStatus({ type: 'error', message: 'Tous les champs sont obligatoires' });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            full_name: fullName,
            role: userType,
            id_user: idUser.toLowerCase().trim(),
            password_user: passwordUser.trim(),
            class_name: userType === 'student' ? className : null,
            subject: userType === 'teacher' ? subject : null,
            created_at: new Date().toISOString(),
          }
        ]);

      if (error) throw error;
      setStatus({ type: 'success', message: 'Compte créé avec succès !' });
      // Keep credentials visible for copy/download
    } catch (err: any) {
      setStatus({ type: 'error', message: 'Erreur sauvegarde: ' + err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`Nom: ${fullName}\nIdentifiant: ${idUser}\nMot de passe: ${passwordUser}`);
    alert('Copié dans le presse-papier !');
  };

  const downloadCredentials = () => {
    const element = document.createElement("a");
    const content = `IDENTIFIANTS UNIVERS-APP\n--------------------\nNom Complet: ${fullName}\nRole: ${userType}\nIdentifiant: ${idUser}\nMot de passe: ${passwordUser}\n--------------------\nVeuillez conserver ces informations en lieu sûr.`;
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `identifiants_${idUser}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen flex flex-col selection:bg-primary/30">
      <AdminHeader 
        title="Gestion des Accès" 
        subtitle="Création de compte sécurisé"
        showBack={true}
      />

      <main className="max-w-xl mx-auto w-full p-4 space-y-6 flex-1 pb-40">
        {/* Role Selection */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Type de compte à créer</h3>
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
                <div className="flex h-11 items-center justify-center rounded-xl text-xs font-black uppercase tracking-tighter transition-all peer-checked:bg-primary peer-checked:text-white text-slate-500">
                   {type === 'student' ? 'Élève' : type === 'teacher' ? 'Prof' : 'Admin'}
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Configuration Form */}
        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-800 space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 size-40 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-all duration-1000"></div>
          
          {status && (
            <div className={`p-4 rounded-2xl text-xs font-black uppercase tracking-widest animate-in zoom-in-95 duration-300 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">{status.type === 'success' ? 'verified' : 'warning'}</span>
                {status.message}
              </div>
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Nom Complet de l'utilisateur</label>
            <input 
              className="w-full p-4 rounded-2xl border border-slate-800 bg-slate-950 focus:border-primary outline-none transition-all font-bold" 
              placeholder="Ex: Jean-Baptiste Junior" 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Conditional Fields */}
          <div className="grid grid-cols-1 gap-4">
            {userType === 'student' && (
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Classe</label>
                <input 
                  className="w-full p-4 rounded-2xl border border-slate-800 bg-slate-950 focus:border-primary outline-none transition-all font-bold" 
                  placeholder="Ex: NS4" 
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
              </div>
            )}
            {userType === 'teacher' && (
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Discipline</label>
                <input 
                  className="w-full p-4 rounded-2xl border border-slate-800 bg-slate-950 focus:border-primary outline-none transition-all font-bold" 
                  placeholder="Ex: Mathématiques" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="h-px bg-slate-800 w-full opacity-50"></div>

          {/* Credentials Generation Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Accès de connexion</h4>
              <button 
                onClick={handleAIGenerate}
                disabled={isGenerating || !fullName}
                className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 flex items-center gap-1 disabled:opacity-30 transition-all"
              >
                <span className={`material-symbols-outlined text-sm ${isGenerating ? 'animate-spin' : ''}`}>magic_button</span>
                Suggestion AI
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Identifiant</label>
                <input 
                  className="w-full p-4 rounded-2xl border border-slate-800 bg-slate-950 focus:border-primary outline-none transition-all font-mono font-bold text-sm" 
                  placeholder="identifiant.unique" 
                  value={idUser}
                  onChange={(e) => setIdUser(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Mot de Passe</label>
                <div className="relative">
                  <input 
                    className="w-full p-4 rounded-2xl border border-slate-800 bg-slate-950 focus:border-primary outline-none transition-all font-mono font-bold text-sm pr-12" 
                    placeholder="••••••••••••" 
                    value={passwordUser}
                    onChange={(e) => setPasswordUser(e.target.value)}
                  />
                  <button 
                    onClick={() => setPasswordUser(Math.random().toString(36).slice(-10) + '!A1')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-primary transition-colors"
                    title="Générer aléatoirement"
                  >
                    <span className="material-symbols-outlined">cached</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <button 
            onClick={handleSave}
            disabled={isSaving || !idUser || !passwordUser}
            className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-40 uppercase tracking-widest text-xs"
          >
            <span className="material-symbols-outlined font-black">save</span>
            {isSaving ? 'Création en cours...' : 'Finaliser le compte'}
          </button>
        </div>

        {/* Download/Copy Area (Visible after generation/entry) */}
        {(idUser && passwordUser) && (
          <div className="p-1 px-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-4">
               <button 
                onClick={copyToClipboard}
                className="flex-1 py-4 bg-slate-900 border border-slate-800 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 shadow-lg"
              >
                <span className="material-symbols-outlined text-sm">content_copy</span>
                Copier tout
              </button>
              <button 
                onClick={downloadCredentials}
                className="flex-1 py-4 bg-slate-900 border border-slate-800 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 shadow-lg"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Télécharger TXT
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Nav bar simplified */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950/80 backdrop-blur-2xl px-6 pb-10 pt-4 z-50">
        <div className="max-w-4xl mx-auto flex justify-between">
           <Link to="/admin-dashboard" className="text-slate-500 flex flex-col items-center gap-1">
              <span className="material-symbols-outlined">grid_view</span>
              <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
           </Link>
           <Link to="/admin-students" className="text-primary flex flex-col items-center gap-1">
              <span className="material-symbols-outlined fill-[1]">business_center</span>
              <span className="text-[10px] font-black uppercase tracking-tighter">Gestion</span>
           </Link>
           <Link to="/admin-settings" className="text-slate-500 flex flex-col items-center gap-1">
              <span className="material-symbols-outlined">settings</span>
              <span className="text-[10px] font-black uppercase tracking-tighter">Paramètres</span>
           </Link>
        </div>
      </nav>
    </div>
  );
}
