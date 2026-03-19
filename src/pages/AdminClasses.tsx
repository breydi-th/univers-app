import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminHeader from '../components/AdminHeader';

export interface ClassData {
  id: string;
  name: string;
  level: string;
}

export default function AdminClasses() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLevel, setNewLevel] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []);

  async function fetchClasses() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('level');
      
      if (error) throw error;
      setClasses(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createClass() {
    if (!newName || !newLevel) return;
    try {
      const { error } = await supabase
        .from('classes')
        .insert([{ name: newName, level: newLevel }]);
      
      if (error) throw error;
      setShowModal(false);
      setNewName('');
      setNewLevel('');
      fetchClasses();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la création');
    }
  }

  async function deleteClass(id: string) {
    if (!window.confirm('Supprimer cette classe ?')) return;
    try {
      const { error } = await supabase.from('classes').delete().eq('id', id);
      if (error) throw error;
      fetchClasses();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen">
      <AdminHeader 
        title="Salles & Classes" 
        subtitle="Structure de l'établissement"
        showBack={true}
        backTo="/admin-dashboard"
        rightActions={
          <div className="flex gap-2">
            <button onClick={() => setShowModal(true)} className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-xl font-black">add</span>
            </button>
          </div>
        }
      />

      <main className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4 pb-40">
        {loading ? (
          <div className="py-20 text-center text-slate-500">Chargement...</div>
        ) : classes.length === 0 ? (
          <div className="py-20 text-center text-slate-600 italic">Aucune classe configurée.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classes.map((c) => (
              <div key={c.id} className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex items-center justify-between group hover:border-primary/40 transition-all">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-slate-800 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">meeting_room</span>
                  </div>
                  <div>
                    <h3 className="font-black text-lg leading-tight">{c.name}</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{c.level}</p>
                  </div>
                </div>
                <button 
                  onClick={() => deleteClass(c.id)}
                  className="p-2 text-slate-700 hover:text-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal logic simplified for brevity but fully functional in terms of structure */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-[2.5rem] p-8 space-y-6 shadow-2xl">
            <h2 className="text-2xl font-black text-center">Nouvelle Classe</h2>
            <div className="space-y-4">
              <input 
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-primary" 
                placeholder="Nom (ex: Session A)"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input 
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-primary" 
                placeholder="Niveau (ex: 9ème année)"
                value={newLevel}
                onChange={(e) => setNewLevel(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-4 bg-slate-800 rounded-2xl font-bold"
              >
                Annuler
              </button>
              <button 
                onClick={createClass}
                className="flex-1 py-4 bg-primary text-white rounded-2xl font-black"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-[#0a0c10]/90 backdrop-blur-2xl px-2 pb-8 pt-3 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
        <div className="max-w-4xl mx-auto w-full flex justify-around">
          <Link className="flex flex-1 flex-col items-center gap-1 text-slate-500 hover:text-white transition-colors" to="/admin-dashboard">
            <span className="material-symbols-outlined">grid_view</span>
            <p className="text-[10px] font-black uppercase tracking-tighter">Dashboard</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1 text-primary" to="/admin-students">
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
