import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AdminAcademicSettings() {
  const navigate = useNavigate();
  const [terms, setTerms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTerm, setNewTerm] = useState({ name: '', start_date: '', end_date: '', is_active: false });

  useEffect(() => {
    fetchTerms();
  }, []);

  async function fetchTerms() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('academic_terms')
        .select('*')
        .order('start_date', { ascending: true });
      if (error) throw error;
      setTerms(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTerm() {
    try {
      const { error } = await supabase.from('academic_terms').insert([newTerm]);
      if (error) throw error;
      setShowModal(false);
      setNewTerm({ name: '', start_date: '', end_date: '', is_active: false });
      fetchTerms();
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function toggleActive(id: string, current: boolean) {
    try {
      // First disable all
      await supabase.from('academic_terms').update({ is_active: false }).neq('id', '00000000-0000-0000-0000-000000000000');
      // Then enable selected
      const { error } = await supabase.from('academic_terms').update({ is_active: !current }).eq('id', id);
      if (error) throw error;
      fetchTerms();
    } catch (err) {
      console.error(err);
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
            <h1 className="text-xl font-black text-white leading-tight">Année Académique</h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Périodes & Trimestres</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg"
          >
            <span className="material-symbols-outlined text-xl">add</span>
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4">
        {loading ? (
          <div className="py-20 text-center text-slate-600">Chargement...</div>
        ) : terms.length === 0 ? (
          <div className="py-20 text-center text-slate-600 italic">Aucune période configurée.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {terms.map((term) => (
              <div key={term.id} className={`bg-slate-900 border ${term.is_active ? 'border-primary/50 bg-primary/5' : 'border-slate-800'} p-5 rounded-3xl flex flex-col gap-4 shadow-xl transition-all group`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-lg leading-tight uppercase tracking-tighter">{term.name}</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                      {new Date(term.start_date).toLocaleDateString()} — {new Date(term.end_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div 
                    onClick={() => toggleActive(term.id, term.is_active)}
                    className={`h-6 w-12 rounded-full relative cursor-pointer transition-colors ${term.is_active ? 'bg-primary' : 'bg-slate-800'}`}
                  >
                    <div className={`absolute top-1 bottom-1 w-4 bg-white rounded-full transition-all ${term.is_active ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   {term.is_active ? (
                     <span className="px-3 py-1 bg-primary text-white text-[9px] font-black uppercase rounded-lg">Session Actuelle</span>
                   ) : (
                     <span className="px-3 py-1 bg-slate-800 text-slate-500 text-[9px] font-black uppercase rounded-lg">Archive</span>
                   )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-[2.5rem] p-8 space-y-6 shadow-2xl relative">
            <h2 className="text-2xl font-black text-center uppercase tracking-tighter">Nouveau Trimestre</h2>
            <div className="space-y-4">
              <input 
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-primary font-bold" 
                placeholder="Nom (ex: 1er Trimestre)"
                value={newTerm.name}
                onChange={(e) => setNewTerm({...newTerm, name: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-2">Début</label>
                   <input 
                    type="date"
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-primary font-bold" 
                    value={newTerm.start_date}
                    onChange={(e) => setNewTerm({...newTerm, start_date: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                   <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-2">Fin</label>
                   <input 
                    type="date"
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-primary font-bold" 
                    value={newTerm.end_date}
                    onChange={(e) => setNewTerm({...newTerm, end_date: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-4 bg-slate-800 rounded-2xl font-bold uppercase text-xs"
              >
                Annuler
              </button>
              <button 
                onClick={handleAddTerm}
                className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
