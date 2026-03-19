import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabaseAdmin as supabase } from '../lib/supabase-admin';
import AdminHeader from '../components/AdminHeader';

interface Student {
  id: string;
  full_name: string;
  id_user: string;
  class_name?: string;
}

export default function AdminStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editModal, setEditModal] = useState<Student | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      
      // Fetch students
      const { data: studentData, error: sError } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'student')
        .order('full_name');
      
      if (sError) throw sError;
      setStudents(studentData || []);

      // Fetch classes for selection
      const { data: classData } = await supabase.from('classes').select('*').order('name');
      setClasses(classData || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Supprimer cet élève ?')) return;
    try {
      const { error } = await supabase.from('profiles').delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleUpdate = async () => {
    if (!editModal) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          full_name: editModal.full_name,
          class_name: editModal.class_name 
        })
        .eq('id', editModal.id);
      
      if (error) throw error;
      setEditModal(null);
      fetchData();
      alert("Élève mis à jour !");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredStudents = students.filter(s => 
    s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id_user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-950 text-slate-100 font-display min-h-screen flex flex-col selection:bg-primary/30">
      <AdminHeader 
        title="Gestion des Éléves" 
        subtitle={`${students.length} Inscrits`}
        showBack={true}
        backTo="/admin-dashboard"
      />

      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col">
        {/* Search */}
        <div className="p-4">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors group-focus-within:text-primary">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full p-4 pl-12 text-sm border border-slate-800 rounded-2xl bg-slate-900 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 outline-none transition-all placeholder:text-slate-600 font-bold" 
              placeholder="Rechercher par nom ou identifiant..." 
              type="text"
            />
          </div>
        </div>

        {/* List Content */}
        <main className="flex-1 px-4 pb-40">
          {loading ? (
             <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div></div>
          ) : filteredStudents.length === 0 ? (
             <div className="py-20 text-center text-slate-600 italic font-bold">Aucun élève trouvé.</div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredStudents.map((student) => (
                <div key={student.id} className="flex items-center gap-4 bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-xl hover:border-primary/40 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 size-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative shrink-0">
                    <div className="size-16 rounded-2xl bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-700 shadow-inner">
                       <span className="material-symbols-outlined text-4xl text-slate-600">person</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 size-5 bg-emerald-500 rounded-full border-4 border-slate-900 shadow-lg"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0 z-10">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-lg font-black truncate text-white uppercase tracking-tight">{student.full_name}</p>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                       <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg border border-primary/20">{student.class_name || "Pas de classe"}</span> 
                       <span className="text-slate-600">•</span>
                       <span className="text-slate-500">ID: {student.id_user.toUpperCase()}</span>
                    </p>
                  </div>
                  
                  <div className="flex gap-2 shrink-0 z-10">
                    <button 
                      onClick={() => setEditModal(student)}
                      className="p-3 text-slate-500 hover:text-blue-500 hover:bg-slate-800 rounded-2xl transition-all active:scale-90"
                    >
                      <span className="material-symbols-outlined font-bold">edit</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(student.id)}
                      className="p-3 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all active:scale-90"
                    >
                      <span className="material-symbols-outlined font-bold">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Floating Action Button */}
        <div className="fixed bottom-24 left-0 right-0 px-4 pointer-events-none z-40 max-w-4xl mx-auto">
          <Link 
            to="/admin-accounts"
            className="pointer-events-auto flex w-full items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-[2rem] font-black shadow-2xl shadow-blue-500/30 active:scale-95 transition-all uppercase tracking-tighter"
          >
            <span className="material-symbols-outlined font-black">person_add</span>
            Inscrire un nouvel élève
          </Link>
        </div>
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-white/5 w-full max-w-md rounded-[2.5rem] p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Éditer Élève</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">ID: {editModal.id_user.toUpperCase()}</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Nom Complet</label>
                <input 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-primary transition-all font-bold" 
                  value={editModal.full_name}
                  onChange={(e) => setEditModal({...editModal, full_name: e.target.value})}
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Classe / Niveau</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-primary transition-all font-bold appearance-none"
                  value={editModal.class_name || ''}
                  onChange={(e) => setEditModal({...editModal, class_name: e.target.value})}
                >
                  <option value="">Aucune classe</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setEditModal(null)}
                className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-black uppercase text-xs transition-all"
              >
                Annuler
              </button>
              <button 
                onClick={handleUpdate}
                className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                Mettre à jour
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
