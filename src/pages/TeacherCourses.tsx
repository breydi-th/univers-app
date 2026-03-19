import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function TeacherCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', class_id: '' });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const sessionStr = localStorage.getItem('user_session');
      if (!sessionStr) return;
      const user = JSON.parse(sessionStr);

      const { data: coursesData, error } = await supabase
        .from('courses')
        .select('*')
        .eq('teacher_id', user.id_user)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(coursesData || []);

      const { data: classesData } = await supabase.from('classes').select('id, name');
      setClasses(classesData || []);

    } catch (err) {
      console.error("Erreur lors de la récupération des données:", err);
    } finally {
      setLoading(false);
    }
  }

  const openAddModal = () => {
    setEditingCourse(null);
    setNewCourse({ title: '', description: '', class_id: '' });
    setVideoFile(null);
    setShowModal(true);
  };

  const openEditModal = (course: any) => {
    setEditingCourse(course);
    setNewCourse({ title: course.title, description: course.description || '', class_id: course.class_id });
    setVideoFile(null);
    setShowModal(true);
  };

  async function handleSaveCourse(e: React.FormEvent) {
    e.preventDefault();
    if (!newCourse.title || !newCourse.class_id) {
      alert("Veuillez remplir le titre et la classe.");
      return;
    }

    if (!editingCourse && !videoFile) {
      alert("Veuillez sélectionner une vidéo pour le nouveau cours.");
      return;
    }

    setIsSubmitting(true);
    try {
      const sessionStr = localStorage.getItem('user_session');
      if (!sessionStr) throw new Error("Non connecté");
      const user = JSON.parse(sessionStr);

      let videoUrl = editingCourse ? editingCourse.video_url : '';

      if (videoFile) {
        // Upload video to Supabase Storage (bucket 'videos')
        const fileExt = videoFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `courses/${user.id_user}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('videos')
          .upload(filePath, videoFile);

        if (uploadError) {
           throw new Error("Erreur d'upload vidéo. Vérifiez vos permissions Storage ou la taille du fichier.");
        }

        const { data: publicUrlData } = supabase.storage.from('videos').getPublicUrl(filePath);
        videoUrl = publicUrlData.publicUrl;
      }

      if (editingCourse) {
        // UPDATE
        const { error: updateError } = await supabase.from('courses').update({
          title: newCourse.title,
          description: newCourse.description,
          class_id: newCourse.class_id,
          video_url: videoUrl
        }).eq('id', editingCourse.id);

        if (updateError) throw updateError;
        alert("Cours modifié avec succès !");
      } else {
        // INSERT
        const { error: insertError } = await supabase.from('courses').insert([{
          title: newCourse.title,
          description: newCourse.description,
          class_id: newCourse.class_id,
          teacher_id: user.id_user,
          video_url: videoUrl,
          school_id: user.school_id || 's1'
        }]);

        if (insertError) throw insertError;
        alert("Cours ajouté avec succès !");
      }

      setShowModal(false);
      fetchData(); // refresh list

    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleDelete = async (courseId: string) => {
    if(!window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) return;
    try {
      const { error } = await supabase.from('courses').delete().eq('id', courseId);
      if (error) throw error;
      fetchData();
    } catch (err: any) {
      alert("Erreur: " + err.message);
    }
  };

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen selection:bg-blue-500/30">
      <header className="flex items-center bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 shadow-2xl">
        <Link to="/teacher-dashboard" className="text-blue-500 flex size-10 items-center justify-center bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-all">
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </Link>
        <div className="flex-1 text-center pr-10">
          <h1 className="text-lg font-black tracking-tighter uppercase text-white">Cours en direct</h1>
          <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest leading-none mt-1">Gestion Vidéos</p>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-4xl mx-auto min-h-[60vh] pb-32">
        <div className="flex justify-between items-center mb-6 mt-2">
           <h2 className="text-xl font-black text-white px-1">Mes Cours</h2>
           <button 
             onClick={openAddModal}
             className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all active:scale-95"
           >
             <span className="material-symbols-outlined text-sm">add</span> Ajouter
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
                <div className="flex gap-2">
                  <a href={course.video_url} target="_blank" rel="noreferrer" className="p-3 bg-blue-500/10 text-blue-500 hover:text-white hover:bg-blue-500 rounded-xl transition-colors">
                    <span className="material-symbols-outlined text-sm">visibility</span>
                  </a>
                  <button onClick={() => openEditModal(course)} className="p-3 bg-slate-950 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl border border-slate-800 transition-colors">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button onClick={() => handleDelete(course.id)} className="p-3 bg-slate-950 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl border border-slate-800 transition-colors">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Ajout/Édition Cours */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-white/5 w-full max-w-md rounded-[2.5rem] p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                {editingCourse ? 'Modifier le cours' : 'Nouveau Cours'}
              </h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Partager une ressource vidéo</p>
            </div>
            
            <form onSubmit={handleSaveCourse} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Titre du cours</label>
                <input 
                  required
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold" 
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  placeholder="Ex: Chapitre 1 - Introduction"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Description (Optionnel)</label>
                <textarea 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold resize-none h-20" 
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  placeholder="Ce que les élèves vont apprendre..."
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Sélectionner la classe</label>
                <select 
                  required
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold appearance-none text-slate-200"
                  value={newCourse.class_id}
                  onChange={(e) => setNewCourse({...newCourse, class_id: e.target.value})}
                >
                  <option value="" disabled>--- Choisissez une classe ---</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                  <option value="Toutes">Toutes les classes</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Fichier Vidéo (.mp4, .mov)</label>
                <input 
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  className="w-full bg-slate-950 border border-slate-800 p-3 rounded-2xl text-xs font-bold outline-none focus:border-primary transition-all text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 cursor-pointer"
                />
                {editingCourse && (
                  <p className="text-[9px] text-slate-500 font-bold px-1 mt-1">* Laissez vide si vous ne voulez pas changer la vidéo</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-black uppercase text-xs transition-all"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50"
                >
                  {isSubmitting ? <span className="material-symbols-outlined animate-spin font-bold">cached</span> : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
