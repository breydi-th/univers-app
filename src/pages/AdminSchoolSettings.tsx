import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AdminSchoolSettings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [formData, setFormData] = useState({
    school_name: '',
    address: '',
    phone: '',
    email: '',
    logo_url: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('school_settings')
        .select('*')
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      if (data) setFormData(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setStatus(null);
    try {
      const { error } = await supabase
        .from('school_settings')
        .upsert([{ ...formData, updated_at: new Date().toISOString() }], { onConflict: 'id' });
      
      if (error) throw error;
      setStatus({ type: 'success', message: 'Paramètres mis à jour !' });
      setTimeout(() => setStatus(null), 3000);
    } catch (err: any) {
      setStatus({ type: 'error', message: 'Erreur: ' + err.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen">
      <header className="sticky top-0 z-50 bg-[#0a0c10] border-b border-slate-800/50 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3 max-w-7xl mx-auto w-full">
          <button onClick={() => navigate(-1)} className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-blue-500 hover:bg-blue-600/30 transition-all shadow-lg shadow-blue-600/10">
            <span className="material-symbols-outlined font-black">arrow_back</span>
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-black text-white leading-tight">Infos École</h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Identité de l'établissement</p>
          </div>
          <button 
            disabled={saving}
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl shadow-lg active:scale-95 disabled:opacity-50 transition-all text-xs uppercase tracking-widest"
          >
            {saving ? '...' : 'Enregistrer'}
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6 pb-20">
        {status && (
          <div className={`p-4 rounded-2xl text-xs font-black uppercase tracking-widest text-center animate-in zoom-in-95 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
            {status.message}
          </div>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest px-1">Nom de l'Institution</label>
              <input 
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold"
                value={formData.school_name}
                onChange={(e) => setFormData({...formData, school_name: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest px-1">Adresse Complète</label>
              <input 
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold"
                placeholder="Ex: 45, Rue des Miracles, Port-au-Prince"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest px-1">Téléphone</label>
                <input 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest px-1">E-mail de Contact</label>
                <input 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest px-1">URL du Logo</label>
              <input 
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold"
                value={formData.logo_url}
                onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
