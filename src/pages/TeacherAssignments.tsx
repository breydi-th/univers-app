import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function TeacherAssignments() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<any>(null);
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', class_id: '', due_date: '' });
  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);
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

      const { data: assignmentsData, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('teacher_id', user.id_user)
        .order('due_date', { ascending: true });

      if (error) {
        console.warn("Table assignments absente ou erreur:", error);
      } else {
        setAssignments(assignmentsData || []);
      }

      // Fetch classes for the dropdown
      const { data: classesData } = await supabase.from('classes').select('id, name');
      setClasses(classesData || []);

    } catch (err) {
      console.error("Erreur lors de la récupération des données:", err);
    } finally {
      setLoading(false);
    }
  }

  const openAddModal = () => {
    setEditingAssignment(null);
    setNewAssignment({ title: '', description: '', class_id: '', due_date: '' });
    setAssignmentFile(null);
    setShowModal(true);
  };

  const openEditModal = (assignment: any) => {
    setEditingAssignment(assignment);
    const dateFormatted = assignment.due_date ? new Date(assignment.due_date).toISOString().split('T')[0] : '';
    setNewAssignment({ 
      title: assignment.title, 
      description: assignment.description || '', 
      class_id: assignment.class_id, 
      due_date: dateFormatted 
    });
    setAssignmentFile(null);
    setShowModal(true);
  };

  async function handleSaveAssignment(e: React.FormEvent) {
    e.preventDefault();
    if (!newAssignment.title || !newAssignment.class_id || !newAssignment.due_date) {
      alert("Veuillez remplir tous les champs obligatoires (Titre, Classe, Date de remise).");
      return;
    }

    setIsSubmitting(true);
    try {
      const sessionStr = localStorage.getItem('user_session');
      if (!sessionStr) throw new Error("Non connecté");
      const user = JSON.parse(sessionStr);

      let fileUrl = editingAssignment ? editingAssignment.file_url : '';

      if (assignmentFile) {
        // Upload assignment file to 'documents' bucket
        const fileExt = assignmentFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `assignments/${user.id_user}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, assignmentFile);

        if (uploadError) {
          console.error("Storage error:", uploadError);
          throw new Error("Erreur d'upload du fichier. Vérifiez vos permissions Storage ou la taille du fichier.");
        }

        const { data: publicUrlData } = supabase.storage.from('documents').getPublicUrl(filePath);
        fileUrl = publicUrlData.publicUrl;
      }

      if (editingAssignment) {
        // UPDATE
        const { error: updateError } = await supabase.from('assignments').update({
          title: newAssignment.title,
          description: newAssignment.description,
          class_id: newAssignment.class_id,
          due_date: new Date(newAssignment.due_date).toISOString(),
          file_url: fileUrl
        }).eq('id', editingAssignment.id);

        if (updateError) throw updateError;
        alert("Devoir modifié avec succès !");
      } else {
        // INSERT
        const { error: insertError } = await supabase.from('assignments').insert([{
          title: newAssignment.title,
          description: newAssignment.description,
          class_id: newAssignment.class_id,
          teacher_id: user.id_user,
          due_date: new Date(newAssignment.due_date).toISOString(),
          file_url: fileUrl,
          school_id: user.school_id || 's1'
        }]);

        if (insertError) throw insertError;
        alert("Devoir assigné avec succès !");
      }

      setShowModal(false);
      fetchData(); // refresh UI

    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleDelete = async (assignmentId: string) => {
    if(!window.confirm("Êtes-vous sûr de vouloir supprimer ce devoir ?")) return;
    try {
      const { error } = await supabase.from('assignments').delete().eq('id', assignmentId);
      if (error) throw error;
      fetchData();
    } catch (err: any) {
      alert("Erreur: " + err.message);
    }
  };

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen selection:bg-orange-500/30">
      <header className="flex items-center bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 shadow-2xl">
        <Link to="/teacher-dashboard" className="text-orange-500 flex size-10 items-center justify-center bg-orange-500/10 rounded-xl hover:bg-orange-500/20 transition-all">
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </Link>
        <div className="flex-1 text-center pr-10">
          <h1 className="text-lg font-black tracking-tighter uppercase text-white">Devoirs</h1>
          <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest leading-none mt-1">Gestion Devoirs</p>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-4xl mx-auto min-h-[60vh] pb-32">
        <div className="flex justify-between items-center mb-6 mt-2">
           <h2 className="text-xl font-black text-white px-1">Mes Devoirs</h2>
           <button 
             onClick={openAddModal}
             className="bg-orange-600 hover:bg-orange-500 text-white flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-600/20 transition-all active:scale-95"
           >
             <span className="material-symbols-outlined text-sm">add</span> Ajouter
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
              <div key={assignment.id} className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex items-center justify-between group hover:border-orange-500/30 transition-all flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                  <div className="size-14 rounded-2xl bg-slate-950 flex items-center justify-center text-orange-500 border border-slate-800 shadow-inner group-hover:scale-105 transition-transform shrink-0">
                     <span className="material-symbols-outlined">assignment</span>
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base leading-tight mb-1">{assignment.title}</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest line-clamp-1">
                       Pour le : {new Date(assignment.due_date).toLocaleDateString('fr-FR')} • {assignment.class_id}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4 sm:mt-0 w-full sm:w-auto justify-end border-t border-slate-800 sm:border-0 pt-4 sm:pt-0">
                  <Link to={`/teacher-submissions/${assignment.id}`} className="flex items-center gap-1.5 px-3 py-2 bg-blue-500/10 text-blue-500 hover:text-white hover:bg-blue-600 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest">
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    Remises
                  </Link>
                  {assignment.file_url && (
                    <a href={assignment.file_url} target="_blank" rel="noreferrer" className="p-3 bg-orange-500/10 text-orange-500 hover:text-white hover:bg-orange-500 rounded-xl transition-colors">
                      <span className="material-symbols-outlined text-sm">attachment</span>
                    </a>
                  )}
                  <button onClick={() => openEditModal(assignment)} className="p-3 bg-slate-950 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl border border-slate-800 transition-colors">
                     <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button onClick={() => handleDelete(assignment.id)} className="p-3 bg-slate-950 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl border border-slate-800 transition-colors">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Ajout/Édition Devoir */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-white/5 w-full max-w-md rounded-[2.5rem] p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                {editingAssignment ? 'Modifier le devoir' : 'Nouveau Devoir'}
              </h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Assigner un travail aux élèves</p>
            </div>
            
            <form onSubmit={handleSaveAssignment} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Titre du devoir</label>
                <input 
                  required
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-orange-500 transition-all font-bold" 
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  placeholder="Ex: Devoir de Mathématiques #3"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Instructions (Optionnel)</label>
                <textarea 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-orange-500 transition-all font-bold resize-none h-20" 
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  placeholder="Expliquez ce que l'élève doit faire..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Classe</label>
                  <select 
                    required
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-orange-500 transition-all font-bold appearance-none text-slate-200"
                    value={newAssignment.class_id}
                    onChange={(e) => setNewAssignment({...newAssignment, class_id: e.target.value})}
                  >
                    <option value="" disabled>Choisir...</option>
                    {classes.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                    <option value="Toutes">Toutes</option>
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Date Remise</label>
                  <input 
                    type="date"
                    required
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-orange-500 transition-all font-bold text-slate-200"
                    value={newAssignment.due_date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setNewAssignment({...newAssignment, due_date: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Fichier Joint (PDF, Doc...)</label>
                <input 
                  type="file"
                  onChange={(e) => setAssignmentFile(e.target.files?.[0] || null)}
                  className="w-full bg-slate-950 border border-slate-800 p-3 rounded-2xl text-xs font-bold outline-none focus:border-orange-500 transition-all text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-orange-500/10 file:text-orange-500 hover:file:bg-orange-500/20 cursor-pointer"
                />
                {editingAssignment && (
                  <p className="text-[9px] text-slate-500 font-bold px-1 mt-1">* Laissez vide pour garder le document précédent</p>
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
                  className="flex-1 py-4 bg-orange-600 text-white rounded-2xl font-black uppercase text-xs shadow-xl shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50"
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
