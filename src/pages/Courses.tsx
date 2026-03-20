import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userClass, setUserClass] = useState('');

  const allSubjects = [
    { id: 1, name: 'Maths', icon: 'calculate' },
    { id: 2, name: 'Physique', icon: 'science' },
    { id: 3, name: 'Chimie', icon: 'experiment' },
    { id: 4, name: 'Français', icon: 'menu_book' },
    { id: 5, name: 'Histoire', icon: 'history_edu' },
    { id: 6, name: 'Géo', icon: 'public' },
    { id: 7, name: 'Biologie', icon: 'biotech' },
    { id: 8, name: 'Géologie', icon: 'terrain' },
    { id: 9, name: 'Créole', icon: 'translate' },
    { id: 10, name: 'Anglais', icon: 'language' },
    { id: 11, name: 'Espagnol', icon: 'language' },
    { id: 12, name: 'Art & Musique', icon: 'palette' },
    { id: 13, name: 'Économie', icon: 'trending_up' },
    { id: 14, name: 'Philosophie', icon: 'psychology' },
    { id: 15, name: 'Informatique', icon: 'computer' },
  ];

  // Logic to filter subjects based on class level
  const filteredSubjects = allSubjects.filter(subject => {
    if (subject.name === 'Philosophie') {
      // Show philosophy only for NS4
      return userClass.toUpperCase().includes('NS4');
    }
    return true;
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      setLoading(true);
      const sessionStr = localStorage.getItem('user_session');
      if (!sessionStr) return;
      const user = JSON.parse(sessionStr);

      const userClassVal = user.class_name || user.class_id || '';
      setUserClass(userClassVal);

      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          profiles!courses_teacher_id_fkey(first_name, last_name)
        `)
        .or(`class_id.eq.${userClassVal},class_id.eq.Toutes,class_id.eq.`)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn("Erreur chargement cours:", error);
      } else {
        setCourses(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const [activeSubject, setActiveSubject] = useState(1);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
      {/* Header */}
      <header className="flex flex-col p-6 pb-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <Link to="/dashboard" className="flex items-center justify-center size-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <button className="flex items-center justify-center size-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Cours Vidéo</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Apprenez avec les vidéos de vos professeurs</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-40 max-w-7xl mx-auto w-full">
        {/* Subjects Section */}
        <section className="mt-2">
          <div className="flex items-center justify-between px-6 mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Matières</h2>
          </div>
          <div className="flex gap-3 px-6 overflow-x-auto hide-scrollbar pb-2">
            {filteredSubjects.map((subject) => (
              <div 
                key={subject.id} 
                onClick={() => setActiveSubject(subject.id)}
                className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group"
              >
                <div className={`flex size-14 items-center justify-center rounded-2xl transition-all ${activeSubject === subject.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-slate-200'}`}>
                  <span className="material-symbols-outlined">{subject.icon}</span>
                </div>
                <p className={`text-[10px] sm:text-xs font-medium whitespace-nowrap ${activeSubject === subject.id ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>{subject.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lessons Section */}
        <section className="mt-8 px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Dernières Leçons</h2>
            <button className="text-primary text-sm font-semibold hover:underline">Voir tout</button>
          </div>
          
          {loading ? (
             <div className="flex justify-center py-20">
               <span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span>
             </div>
          ) : courses.length === 0 ? (
             <div className="text-center py-20 bg-slate-100 dark:bg-slate-800 rounded-3xl">
               <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">video_library</span>
               <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400 mb-2">Aucun cours disponible</h3>
               <p className="text-sm text-slate-500">Pas de nouvelle vidéo postée pour votre classe.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {courses.map((course) => (
                <div key={course.id} className="group flex flex-col bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md active:scale-[0.98] cursor-pointer"
                     onClick={() => { if(course.video_url) window.open(course.video_url, '_blank') }}
                >
                  <div className="relative aspect-video w-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 absolute">movie</span>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="size-16 rounded-full bg-white/90 dark:bg-primary/90 flex items-center justify-center text-primary dark:text-white shadow-xl transform scale-50 group-hover:scale-100 transition-transform">
                        <span className="material-symbols-outlined !text-4xl fill-1">play_arrow</span>
                      </div>
                    </div>
                    {/* Fallback Date instead of duration for now */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg backdrop-blur-md">
                      {new Date(course.created_at).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-2">{course.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                        <span className="material-symbols-outlined !text-sm text-primary">person</span>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
                        {course.profiles ? `${course.profiles.first_name || ''} ${course.profiles.last_name || ''}` : 'Votre Professeur'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 z-50">
        <div className="flex items-center justify-between px-6 pt-4 pb-10 max-w-7xl mx-auto">
          <Link className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" to="/dashboard">
            <span className="material-symbols-outlined">home</span>
            <span className="text-[10px] font-medium">Accueil</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" to="/assignments">
            <span className="material-symbols-outlined">assignment</span>
            <span className="text-[10px] font-medium">Devoirs</span>
          </Link>
          <Link className="relative -top-5 flex flex-col items-center gap-1" to="/courses">
            <div className="size-14 bg-primary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center text-white ring-4 ring-white dark:ring-slate-900 active:scale-95 transition-transform">
              <span className="material-symbols-outlined !text-2xl fill-1">video_library</span>
            </div>
            <span className="text-[10px] font-bold text-primary mt-1">Cours</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" to="/results">
            <span className="material-symbols-outlined">school</span>
            <span className="text-[10px] font-medium">Résultats</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" to="/profile">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px] font-medium">Profil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
