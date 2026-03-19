import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
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
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, activeClasses: 0 });

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

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen flex flex-col">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <AdminHeader 
        title="Gestion des professeurs" 
        subtitle="Enseignants & Personnel"
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

        <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col">
          {/* Statistics Cards (IMAGE 2 Style) */}
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

          {/* Main Action Button (IMAGE 2) */}
          <div className="px-4 py-2">
            <Link 
              to="/admin-accounts"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 px-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined font-bold">person_add</span>
              <span>Ajouter un nouveau professeur</span>
            </Link>
          </div>

          {/* Teacher List */}
          <div className="flex items-center justify-between px-4 pb-3 pt-6">
            <h2 className="text-white text-xl font-bold leading-tight tracking-tight">Liste des enseignants</h2>
          </div>
          
          <div className="flex flex-col gap-4 px-4 pb-32">
            {loading ? (
               <div className="py-10 text-center text-slate-500">Chargement...</div>
            ) : teachers.length === 0 ? (
               <div className="py-10 text-center text-slate-500 italic">Aucun professeur enregistré.</div>
            ) : teachers.map((teacher) => (
              <div key={teacher.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-xl transition-all hover:border-primary/40">
                <div className="flex gap-5 items-start">
                  <div className="relative shrink-0">
                    <div 
                      className="bg-slate-800 aspect-square rounded-2xl h-16 w-16 overflow-hidden border border-slate-700 bg-cover bg-center shadow-inner" 
                      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0_hawgSdrKSVG9YWFmsmHL8a51oxcOgmvc9Hf_BNd4IYqSaqieWUmth5rfQDwpFnE9EXl2PwpV-3JuZBz0WqgSnXA9tRe7bXzX55OaL04KUCR-NWqrjyO6g-BNSW8Dr1tNjTJYz4j4UuJPQhmNJhU3-X54dmkXJCBV54-ZCHneSTTsFgxtvMZYTorcbyvJHxv7k_1swodRNZFJEj4IrCkb8uaFiAIYZ__OIwb_n78z7WxkEf_sfaWHYq7vJQhlj5rOk5gychPt9iR')" }}
                    ></div>
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-emerald-500 rounded-full border-4 border-slate-900"></div>
                  </div>
                  <div className="flex flex-1 flex-col min-w-0">
                    <div className="mb-1">
                      <p className="text-white text-lg font-black leading-tight">{teacher.full_name}</p>
                      <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest">ID: {teacher.id_user.toUpperCase()}</p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                       <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800/80 border border-slate-700/50 px-3 py-1.5 text-xs font-bold text-slate-300">
                        <span className="material-symbols-outlined text-sm text-primary">calculate</span> {teacher.subject || "Sans matière"}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800/80 border border-slate-700/50 px-3 py-1.5 text-xs font-bold text-slate-300">
                        <span className="material-symbols-outlined text-sm text-primary">door_open</span> {teacher.class_name || "Non assigné"}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Actions Grid (IMAGE 3 Style) */}
                <div className="mt-5 grid grid-cols-3 gap-2 pt-4 border-t border-slate-800">
                  <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl hover:bg-slate-800 text-slate-400 group transition-all">
                    <span className="material-symbols-outlined text-blue-500 group-hover:scale-110 transition-transform">edit</span>
                    <span className="text-[9px] font-black uppercase tracking-tighter">Modifier</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl hover:bg-slate-800 text-slate-400 group transition-all">
                    <span className="material-symbols-outlined text-blue-400 group-hover:scale-110 transition-transform">assignment_ind</span>
                    <span className="text-[9px] font-black uppercase tracking-tighter">Attribuer</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(teacher.id)}
                    className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl hover:bg-red-500/10 text-slate-400 group transition-all"
                  >
                    <span className="material-symbols-outlined text-red-500 group-hover:scale-110 transition-transform">delete</span>
                    <span className="text-[9px] font-black uppercase tracking-tighter">Supprimer</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

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
