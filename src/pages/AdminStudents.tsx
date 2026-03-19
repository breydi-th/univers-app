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
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'student')
        .order('full_name');
      
      if (error) throw error;
      setStudents(data || []);
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
      fetchStudents();
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
        rightActions={
          <div className="flex gap-2">
            <button className="flex size-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-xl">search</span>
            </button>
            <button className="flex size-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-xl">filter_list</span>
            </button>
          </div>
        }
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
                <div key={student.id} className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl hover:border-primary/40 transition-all group">
                  <div className="relative shrink-0">
                    <div className="size-14 rounded-2xl bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-700 shadow-inner">
                       <span className="material-symbols-outlined text-3xl text-slate-600">person</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 size-4 bg-emerald-500 rounded-full border-4 border-slate-900"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-base font-black truncate">{student.full_name}</p>
                    </div>
                    <p className="text-xs text-slate-500 font-bold">
                       <span className="text-primary">{student.class_name || "Pas de classe"}</span> • ID: {student.id_user.toUpperCase()}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="p-2 text-slate-500 hover:text-blue-500 hover:bg-slate-800 rounded-xl transition-all">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(student.id)}
                      className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <span className="material-symbols-outlined">delete</span>
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
            className="pointer-events-auto flex w-full items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black shadow-2xl shadow-blue-500/30 active:scale-95 transition-all uppercase tracking-tighter"
          >
            <span className="material-symbols-outlined font-black">person_add</span>
            Inscrire un nouvel élève
          </Link>
        </div>
      </div>

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
