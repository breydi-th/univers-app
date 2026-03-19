import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabaseAdmin as supabase } from '../lib/supabase-admin';
import AdminHeader from '../components/AdminHeader';

interface Teacher {
  id: string;
  full_name: string;
  id_user: string;
  subject: string;
  class_name?: string; // We'll mock this for now or join from classes
}

export default function AdminTeachers() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, activeClasses: 0 });
  const [editModal, setEditModal] = useState<Teacher | null>(null);
  const [assignModal, setAssignModal] = useState<Teacher | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      
      // Fetch teachers
      const { data: teacherData, error: tError } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'teacher');
      
      if (tError) throw tError;
      setTeachers(teacherData || []);

      // Fetch classes for assignment
      const { data: classData } = await supabase.from('classes').select('*').order('name');
      setClasses(classData || []);

      // Fetch stats
      const { count: tCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'teacher');

      const { count: cCount } = await supabase
        .from('classes')
        .select('*', { count: 'exact', head: true });

      setStats({
        total: tCount || 0,
        activeClasses: cCount || 0
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet enseignant ?')) return;
    
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
          subject: editModal.subject 
        })
        .eq('id', editModal.id);
      
      if (error) throw error;
      setEditModal(null);
      fetchData();
      alert("Enseignant mis à jour !");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleAssign = async (className: string) => {
    if (!assignModal) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ class_name: className })
        .eq('id', assignModal.id);
      
      if (error) throw error;
      setAssignModal(null);
      fetchData();
      alert(`Assigné à la classe : ${className}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen flex flex-col">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <AdminHeader 
        title="Gestion des professeurs" 
        subtitle="Enseignants & Personnel"
        showBack={true}
        backTo="/admin-dashboard"
      />

        <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col">
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="flex flex-col gap-1 rounded-2xl p-5 bg-slate-900 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-lg">group</span>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Total Professeurs</p>
              </div>
              <p className="text-white text-3xl font-black">{stats.total}</p>
            </div>
            <div className="flex flex-col gap-1 rounded-2xl p-5 bg-slate-900 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-500">
                <span className="material-symbols-outlined text-lg">school</span>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Classes Actives</p>
              </div>
              <p className="text-white text-3xl font-black">{stats.activeClasses}</p>
            </div>
          </div>

          {/* Main Action Button */}
          <div className="px-4 py-2">
            <Link 
              to="/admin-accounts"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-5 px-4 rounded-2xl font-black shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-[0.98] uppercase tracking-tighter"
            >
              <span className="material-symbols-outlined font-black">person_add</span>
              <span>Inscrire un nouveau professeur</span>
            </Link>
          </div>

          {/* Teacher List */}
          <div className="flex items-center justify-between px-4 pb-3 pt-6">
            <h2 className="text-white text-xl font-bold leading-tight tracking-tight uppercase tracking-widest text-[10px] text-slate-500">Liste des enseignants ({teachers.length})</h2>
          </div>
          
          <div className="flex flex-col gap-4 px-4 pb-32">
            {loading ? (
               <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div></div>
            ) : teachers.length === 0 ? (
               <div className="py-10 text-center text-slate-500 italic">Aucun professeur enregistré.</div>
            ) : teachers.map((teacher) => (
              <div key={teacher.id} className="bg-slate-900 rounded-[2.5rem] border border-slate-800 p-6 shadow-xl transition-all hover:border-primary/40 group relative overflow-hidden">
                <div className="absolute top-0 right-0 size-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="flex gap-5 items-start relative z-10">
                  <div className="relative shrink-0">
                    <div 
                      className="bg-slate-800 aspect-square rounded-2xl h-20 w-20 overflow-hidden border-2 border-slate-800 shadow-inner flex items-center justify-center" 
                    >
                       <span className="material-symbols-outlined text-4xl text-slate-600">person</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-emerald-500 rounded-full border-4 border-slate-900 shadow-lg"></div>
                  </div>
                  <div className="flex flex-1 flex-col min-w-0 py-1">
                    <div className="mb-1">
                      <p className="text-white text-xl font-black leading-tight truncate">{teacher.full_name}</p>
                      <p className="text-primary text-[10px] font-black uppercase tracking-widest">ID: {teacher.id_user.toUpperCase()}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                       <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-[10px] font-black uppercase tracking-tight text-slate-300">
                        <span className="material-symbols-outlined text-lg text-primary">calculate</span> {teacher.subject || "Chimie"}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-[10px] font-black uppercase tracking-tight text-slate-300">
                        <span className="material-symbols-outlined text-lg text-blue-500">meeting_room</span> {teacher.class_name || "Non assigné"}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Actions Grid */}
                <div className="mt-6 grid grid-cols-3 gap-2 pt-5 border-t border-slate-800/50 relative z-10">
                  <button 
                    onClick={() => setEditModal(teacher)}
                    className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl hover:bg-slate-950 text-slate-500 hover:text-white group transition-all"
                  >
                    <span className="material-symbols-outlined text-blue-500 group-hover:scale-125 transition-transform font-bold">edit</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Modifier</span>
                  </button>
                  <button 
                    onClick={() => setAssignModal(teacher)}
                    className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl hover:bg-slate-950 text-slate-500 hover:text-white group transition-all"
                  >
                    <span className="material-symbols-outlined text-emerald-500 group-hover:scale-125 transition-transform font-bold">assignment_ind</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Attribuer</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(teacher.id)}
                    className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl hover:bg-red-500/10 text-slate-500 hover:text-red-500 group transition-all"
                  >
                    <span className="material-symbols-outlined text-red-500 group-hover:scale-125 transition-transform font-bold">delete</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Supprimer</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Modal */}
        {editModal && (
          <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-white/5 w-full max-w-md rounded-[2.5rem] p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Éditer Enseignant</h2>
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
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Spécialité / Matière</label>
                  <input 
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-primary transition-all font-bold" 
                    value={editModal.subject || ''}
                    onChange={(e) => setEditModal({...editModal, subject: e.target.value})}
                  />
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
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Assign Modal */}
        {assignModal && (
          <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-white/5 w-full max-w-md rounded-[2.5rem] p-8 space-y-6 shadow-2xl animate-in zoom-in-95 h-[80vh] flex flex-col">
              <div className="text-center space-y-2 shrink-0">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Attribuer Classe</h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Sélectionnez une salle pour {assignModal.full_name.split(' ')[0]}</p>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {classes.length === 0 ? (
                  <div className="text-center py-10 text-slate-600 bg-slate-950 rounded-3xl border border-slate-800 border-dashed">
                    <p className="text-xs font-bold uppercase">Aucune classe disponible</p>
                  </div>
                ) : classes.map((c) => (
                  <button 
                    key={c.id}
                    onClick={() => handleAssign(c.name)}
                    className="w-full flex items-center justify-between p-5 bg-slate-950 border border-slate-800 rounded-2xl hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
                  >
                     <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-600 group-hover:text-emerald-500 transition-colors">
                           <span className="material-symbols-outlined">meeting_room</span>
                        </div>
                        <span className="font-black text-sm uppercase tracking-tight">{c.name}</span>
                     </div>
                     <span className="material-symbols-outlined text-slate-800 group-hover:text-emerald-500 transition-colors">add_circle</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 shrink-0">
                <button 
                  onClick={() => setAssignModal(null)}
                  className="w-full py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-black uppercase text-xs transition-all"
                >
                  Fermer
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
            <Link className="flex flex-1 flex-col items-center gap-1 text-primary" to="/admin-teachers">
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
    </div>
  );
}
