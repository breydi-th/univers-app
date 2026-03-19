import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function TeacherCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      setLoading(true);
      const sessionStr = localStorage.getItem('user_session');
      if (!sessionStr) return;
      const user = JSON.parse(sessionStr);

      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('teacher_id', user.id_user)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (err) {
      console.error("Erreur lors de la récupération des cours:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen selection:bg-blue-500/30">
      <header className="flex items-center bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 shadow-2xl">
        <button onClick={() => navigate(-1)} className="text-blue-500 flex size-10 items-center justify-center bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-all">
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </button>
        <div className="flex-1 text-center pr-10">
          <h1 className="text-lg font-black tracking-tighter uppercase text-white">Cours en direct</h1>
          <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest leading-none mt-1">Gestion Vidéos</p>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-4xl mx-auto min-h-[60vh] pb-32">
        <div className="flex justify-between items-center mb-6 mt-2">
           <h2 className="text-xl font-black text-white px-1">Mes Cours</h2>
           <button className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all active:scale-95">
             <span className="material-symbols-outlined text-sm">add</span> Nouveau Cours
           </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="material-symbols-outlined text-5xl text-blue-500 animate-spin mb-4">autorenew</span>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Chargement des cours...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-slate-900/50 border border-slate-800 rounded-[3rem] shadow-xl text-center relative overflow-hidden group mt-10">
            <div className="absolute top-0 right-0 size-32 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="bg-blue-500/10 p-6 rounded-[2rem] mb-6 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)] transform group-hover:scale-110 transition-transform duration-700">
              <span className="material-symbols-outlined text-blue-500 text-5xl font-black">video_library</span>
            </div>
            
            <h2 className="text-xl font-black mb-2 tracking-tighter text-white">Aucun cours disponible</h2>
            <p className="text-slate-500 text-xs font-bold max-w-xs leading-relaxed">
              Vous n'avez pas encore planifié de cours en direct ou de vidéos pré-enregistrées.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex items-center justify-between group hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-2xl bg-slate-950 flex items-center justify-center text-blue-500 border border-slate-800 shadow-inner group-hover:scale-105 transition-transform">
                     <span className="material-symbols-outlined">play_circle</span>
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base leading-none mb-1">{course.title}</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{course.class_id} • {new Date(course.created_at).toLocaleDateString()}</p>
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
