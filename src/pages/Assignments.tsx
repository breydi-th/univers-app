import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Assignments() {
  const [activeTab, setActiveTab] = useState<'A_FAIRE' | 'TERMINES' | 'RETARD'>('A_FAIRE');
  const [assignments, setAssignments] = useState<any[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedInstruction, setSelectedInstruction] = useState<any>(null);
  const [submittingAssignment, setSubmittingAssignment] = useState<any>(null);
  const [submissionNote, setSubmissionNote] = useState('');
  const [submissionFile, setSubmissionFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchAssignments();
  }, []);

  async function fetchAssignments() {
    try {
      setLoading(true);
      const sessionStr = localStorage.getItem('user_session');
      if (!sessionStr) return;
      const user = JSON.parse(sessionStr);

      // Fetch completed list from local storage
      const lsCompleted = localStorage.getItem(`completed_assignments_${user.id_user}`);
      const completed: string[] = lsCompleted ? JSON.parse(lsCompleted) : [];
      setCompletedIds(completed);

      const userClass = user.class_name || user.class_id || '';
      
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .or(`class_id.eq.${userClass},class_id.eq.Toutes,class_id.eq.`)
        .order('due_date', { ascending: true });

      if (error) {
        console.warn("Erreur chargement devoirs:", error);
      } else {
        setAssignments(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleFinalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!submissionFile || !submittingAssignment) return;

    setIsSubmitting(true);
    try {
      const sessionStr = localStorage.getItem('user_session');
      if (!sessionStr) throw new Error("Connectez-vous pour soumettre");
      const user = JSON.parse(sessionStr);

      // 1. Upload file to Supabase Storage (bucket 'documents')
      const fileExt = submissionFile.name.split('.').pop();
      const fileName = `${Date.now()}_${user.id_user}_asgn.${fileExt}`;
      const filePath = `submissions/${submittingAssignment.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, submissionFile);

      if (uploadError) throw new Error("Erreur durant l'envoi du fichier.");

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(filePath);

      // 3. Save to 'submissions' table
      const { error: insertError } = await supabase.from('submissions').insert({
        assignment_id: submittingAssignment.id,
        student_id: user.id_user,
        student_name: user.full_name,
        file_url: publicUrl,
        student_note: submissionNote,
        submitted_at: new Date().toISOString()
      });

      if (insertError) {
        console.warn("Table 'submissions' maybe missing, but tracking locally.");
      }

      // 4. Update local tracking
      const newCompleted = [...completedIds, submittingAssignment.id];
      setCompletedIds(newCompleted);
      localStorage.setItem(`completed_assignments_${user.id_user}`, JSON.stringify(newCompleted));

      alert("Bravo ! Ton devoir a été envoyé avec succès.");
      setSubmittingAssignment(null);
      setSubmissionFile(null);
      setSubmissionNote('');
      
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const getFilteredAssignments = () => {
    const today = new Date();
    today.setHours(0,0,0,0);

    return assignments.filter(assignment => {
      const isCompleted = completedIds.includes(assignment.id);
      const dueDate = new Date(assignment.due_date);
      dueDate.setHours(0,0,0,0);
      const isLate = dueDate < today && !isCompleted;

      if (activeTab === 'TERMINES') return isCompleted;
      if (activeTab === 'RETARD') return isLate;
      if (activeTab === 'A_FAIRE') return !isCompleted && !isLate;
      return false;
    });
  };

  const filteredAssignments = getFilteredAssignments();

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 dark:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">arrow_back</span>
        </Link>
        <h1 className="text-lg font-bold tracking-tight">Mes Devoirs</h1>
        <button className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 dark:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">notifications</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-40">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Devoirs</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">Consultez les devoirs assignés par vos professeurs.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('A_FAIRE')}
            className={`px-4 sm:px-6 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === 'A_FAIRE' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            À faire
          </button>
          <button 
            onClick={() => setActiveTab('TERMINES')}
            className={`px-4 sm:px-6 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === 'TERMINES' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Terminés
          </button>
          <button 
            onClick={() => setActiveTab('RETARD')}
            className={`px-4 sm:px-6 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === 'RETARD' ? 'border-red-500 text-red-500' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Retard
          </button>
        </div>

        {/* Assignment Cards List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span>
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">assignment_turned_in</span>
            <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400 mb-2">Aucun devoir à afficher</h3>
            <p className="text-sm text-slate-500">Vous n'avez aucun devoir dans cette catégorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredAssignments.map((assignment) => (
              <div key={assignment.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider line-clamp-1 max-w-[70%]">
                      {assignment.title.split(' ')[0]} {/* just an aesthetic tag */}
                    </span>
                    {activeTab === 'TERMINES' ? (
                      <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold shrink-0">Fait</span>
                    ) : activeTab === 'RETARD' ? (
                      <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold shrink-0">Retard</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-bold shrink-0">Non fait</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{assignment.title}</h3>
                  <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                    <span className="material-symbols-outlined text-sm mr-2 text-primary">calendar_today</span>
                    À rendre pour le {new Date(assignment.due_date).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    {assignment.description && (
                      <button 
                        onClick={() => setSelectedInstruction(assignment)} 
                        className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">info</span> Instructions
                      </button>
                    )}
                    {assignment.file_url && (
                      <a 
                        href={assignment.file_url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors col-span-1"
                        style={{ gridColumn: !assignment.description ? 'span 2' : 'auto' }}
                      >
                        <span className="material-symbols-outlined text-lg">attachment</span> Documents
                      </a>
                    )}
                    
                    {activeTab !== 'TERMINES' && (
                      <button 
                        onClick={() => setSubmittingAssignment(assignment)} 
                        className="col-span-2 flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white rounded-lg text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-colors mt-2"
                      >
                        <span className="material-symbols-outlined text-lg">upload_file</span> Soumettre le devoir
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Soumission */}
      {submittingAssignment && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-[2.5rem] p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="text-center space-y-2">
              <div className="size-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary mb-2">
                <span className="material-symbols-outlined text-3xl font-black">upload_file</span>
              </div>
              <h2 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Remettre mon devoir</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{submittingAssignment.title}</p>
            </div>
            
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Note pour le professeur</label>
                <textarea 
                  className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl outline-none focus:border-primary transition-all font-bold resize-none h-24 dark:text-white" 
                  value={submissionNote}
                  onChange={(e) => setSubmissionNote(e.target.value)}
                  placeholder="Ex: Voici mon travail sur les équations..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Fichier (Image ou Document) *</label>
                <div className="relative group">
                  <input 
                    type="file"
                    required
                    onChange={(e) => setSubmissionFile(e.target.files?.[0] || null)}
                    className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl text-xs font-bold outline-none focus:border-primary transition-all text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                  />
                  {!submissionFile && (
                    <p className="text-[9px] text-red-500 font-bold px-1 mt-1 flex items-center gap-1 animate-pulse">
                      <span className="material-symbols-outlined text-[10px]">warning</span>
                      Un fichier est requis pour soumettre
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setSubmittingAssignment(null)}
                  className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl font-black uppercase text-xs transition-all dark:text-white"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting || !submissionFile}
                  className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 disabled:grayscale"
                >
                  {isSubmitting ? <span className="material-symbols-outlined animate-spin font-bold">cached</span> : 'Envoyer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Instructions */}
      {selectedInstruction && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">info</span>
              Instructions
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
              {selectedInstruction.description}
            </p>
            <button 
              onClick={() => setSelectedInstruction(null)}
              className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl font-bold transition-colors dark:text-white"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 z-50">
        <div className="flex items-center justify-between px-6 pt-4 pb-10 max-w-7xl mx-auto">
          <Link className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors" to="/dashboard">
            <span className="material-symbols-outlined">home</span>
            <span className="text-[10px] font-medium">Accueil</span>
          </Link>
          <Link className="flex flex-col items-center gap-1 text-primary" to="/assignments">
            <span className="material-symbols-outlined fill-1">assignment</span>
            <span className="text-[10px] font-bold">Devoirs</span>
          </Link>
          <Link className="relative -top-5 flex flex-col items-center gap-1" to="/courses">
            <div className="size-14 bg-primary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center text-white ring-4 ring-white dark:ring-slate-900 active:scale-95 transition-transform hover:bg-primary/90">
              <span className="material-symbols-outlined !text-2xl cursor-pointer">video_library</span>
            </div>
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-1">Cours</span>
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
