import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function TeacherAssignments() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  async function fetchAssignments() {
    try {
      setLoading(true);
      const sessionStr = localStorage.getItem('user_session');
      if (!sessionStr) return;
      const user = JSON.parse(sessionStr);

      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('teacher_id', user.id_user)
        .order('due_date', { ascending: true });

      // If assignments table doesn't exist, Supabase returns error. Catch it to show empty state.
      if (error) {
        console.warn("Table assignments absente ou erreur:", error);
        setAssignments([]);
        return;
      }
      setAssignments(data || []);
    } catch (err) {
      console.error("Erreur lors de la récupération des devoirs:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen selection:bg-orange-500/30">
      <header className="flex items-center bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 shadow-2xl">
        <button onClick={() => navigate(-1)} className="text-orange-500 flex size-10 items-center justify-center bg-orange-500/10 rounded-xl hover:bg-orange-500/20 transition-all">
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </button>
        <div className="flex-1 text-center pr-10">
          <h1 className="text-lg font-black tracking-tighter uppercase text-white">Devoirs</h1>
          <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest leading-none mt-1">Gestion Devoirs</p>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-4xl mx-auto min-h-[60vh] pb-32">
        <div className="flex justify-between items-center mb-6 mt-2">
           <h2 className="text-xl font-black text-white px-1">Mes Devoirs</h2>
           <button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 transition-all active:scale-95">
             <span className="material-symbols-outlined text-sm">add</span> Créer Devoir
           </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="material-symbols-outlined text-5xl text-orange-500 animate-spin mb-4">autorenew</span>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Chargement des devoirs...</p>
          </div>
        ) : assignments.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-slate-900/50 border border-slate-800 rounded-[3rem] shadow-xl text-center relative overflow-hidden group mt-10">
            <div className="absolute top-0 right-0 size-32 bg-orange-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="bg-orange-500/10 p-6 rounded-[2rem] mb-6 border border-orange-500/20 shadow-[0_0_50px_rgba(249,115,22,0.1)] transform group-hover:scale-110 transition-transform duration-700">
              <span className="material-symbols-outlined text-orange-500 text-5xl font-black">assignment</span>
            </div>
            
            <h2 className="text-xl font-black mb-2 tracking-tighter text-white">Aucun devoir en cours</h2>
            <p className="text-slate-500 text-xs font-bold max-w-xs leading-relaxed">
              Vous n'avez pas encore assigné de devoirs à vos élèves. Commencez dès maintenant.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex items-center justify-between group hover:border-orange-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-2xl bg-slate-950 flex items-center justify-center text-orange-500 border border-slate-800 shadow-inner group-hover:scale-105 transition-transform">
                     <span className="material-symbols-outlined">assignment</span>
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base leading-none mb-1">{assignment.title}</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                       Pour: {new Date(assignment.due_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button className="p-3 bg-slate-950 text-slate-500 hover:text-white rounded-xl border border-slate-800 transition-colors">
                   <span className="material-symbols-outlined text-sm">edit</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
