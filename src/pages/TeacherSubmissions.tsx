import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function TeacherSubmissions() {
  const { id: assignmentId } = useParams();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [assignment, setAssignment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [gradingModal, setGradingModal] = useState<any>(null);
  const [gradeValue, setGradeValue] = useState('');
  const [feedbackValue, setFeedbackValue] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, [assignmentId]);

  async function fetchSubmissions() {
    try {
      setLoading(true);
      // Fetch assignment info
      const { data: asgnData } = await supabase.from('assignments').select('*').eq('id', assignmentId).single();
      setAssignment(asgnData);

      // Fetch submissions
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('assignment_id', assignmentId)
        .order('submitted_at', { ascending: false });

      if (error) {
        console.warn("Table 'submissions' maybe empty or missing:", error);
      } else {
        setSubmissions(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingModal) return;

    try {
      const { error } = await supabase
        .from('submissions')
        .update({ 
          grade: gradeValue,
          teacher_feedback: feedbackValue
        })
        .eq('id', gradingModal.id);

      if (error) throw error;
      alert("Correction enregistrée !");
      setGradingModal(null);
      fetchSubmissions();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen selection:bg-blue-500/30">
      <header className="flex items-center bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 shadow-2xl">
        <Link to="/teacher-assignments" className="text-blue-500 flex size-10 items-center justify-center bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-all">
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </Link>
        <div className="flex-1 text-center pr-10">
          <h1 className="text-lg font-black tracking-tighter uppercase text-white truncate max-w-[200px] mx-auto">
            {assignment?.title || 'Devoir'}
          </h1>
          <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest leading-none mt-1">Corrections</p>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-4xl mx-auto min-h-[60vh] pb-32">
        <section className="mb-8 px-1">
           <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-white">Copies à corriger</h2>
              <span className="bg-blue-500/20 text-blue-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-blue-500/30">
                {submissions.length} Remise(s)
              </span>
           </div>
           <p className="text-slate-500 text-xs font-bold leading-relaxed max-w-lg">
             Ouvrez les fichiers envoyés, notez les points importants et envoyez votre correction à l'élève.
           </p>
        </section>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="material-symbols-outlined text-5xl text-blue-500 animate-spin mb-4">autorenew</span>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Chargement des copies...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-slate-900/50 border border-slate-800 rounded-[3rem] shadow-xl text-center relative overflow-hidden mt-10">
             <div className="absolute top-0 right-0 size-32 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
             <div className="bg-blue-500/10 p-6 rounded-[2rem] mb-6 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
               <span className="material-symbols-outlined text-blue-500 text-5xl font-black">history_edu</span>
             </div>
             <h2 className="text-xl font-black mb-2 tracking-tighter text-white uppercase">Aucune remise trouvée</h2>
             <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest max-w-xs leading-relaxed opacity-60">
               Les élèves n'ont pas encore soumis de travail.
             </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {submissions.map((sub) => (
              <div key={sub.id} className="bg-slate-900 border border-slate-800 p-6 rounded-[2.5rem] hover:border-blue-500/40 transition-all shadow-xl relative overflow-hidden">
                 <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                       <div className="size-14 rounded-2xl bg-slate-950 flex items-center justify-center text-blue-500 border border-slate-800 shadow-inner group">
                          <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">person</span>
                       </div>
                       <div>
                          <h3 className="font-black text-white text-base leading-tight uppercase tracking-tight">{sub.student_name || 'Élève'}</h3>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                             Rendu le {new Date(sub.submitted_at).toLocaleDateString('fr-FR')} • {new Date(sub.submitted_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                       </div>
                    </div>
                    {sub.grade ? (
                      <div className="bg-emerald-500 text-white font-black text-base px-5 py-2.5 rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        {sub.grade}
                      </div>
                    ) : (
                      <button 
                        onClick={() => { setGradingModal(sub); setGradeValue(''); setFeedbackValue(''); }}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-2xl shadow-lg shadow-blue-600/20 active:scale-95 transition-all text-[10px] font-black uppercase tracking-widest"
                      >
                         Corriger
                      </button>
                    )}
                 </div>

                 <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    {sub.student_note && (
                      <div className="p-5 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                         <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-2">Note de l'élève</p>
                         <p className="text-xs text-slate-400 font-bold italic leading-relaxed">"{sub.student_note}"</p>
                      </div>
                    )}
                    
                    {sub.teacher_feedback && (
                      <div className="p-5 bg-blue-500/5 rounded-2xl border border-blue-500/20">
                         <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mb-2">Ma Correction</p>
                         <p className="text-xs text-slate-300 font-bold leading-relaxed">{sub.teacher_feedback}</p>
                      </div>
                    )}
                 </div>

                 <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-5">
                    <a 
                      href={sub.file_url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 text-white bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-2xl transition-all text-xs font-bold shadow-inner"
                    >
                       <span className="material-symbols-outlined text-sm text-blue-500">description</span>
                       Consulter la copie
                    </a>
                    {(sub.grade || sub.teacher_feedback) && (
                       <button 
                        onClick={() => { setGradingModal(sub); setGradeValue(sub.grade || ''); setFeedbackValue(sub.teacher_feedback || ''); }}
                        className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors underline"
                       >
                         Modifier la correction
                       </button>
                    )}
                 </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Notation & Correction */}
      {gradingModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-white/5 w-full max-w-md rounded-[2.5rem] p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Corriger le devoir</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{gradingModal.student_name}</p>
            </div>
            
            <form onSubmit={handleGrade} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Note Finale</label>
                <input 
                  autoFocus
                  required
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-black text-center text-2xl text-white placeholder:text-slate-800" 
                  value={gradeValue}
                  onChange={(e) => setGradeValue(e.target.value)}
                  placeholder="ex: 18/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Commentaires / Correction</label>
                <textarea 
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold text-xs text-white h-32 resize-none" 
                  value={feedbackValue}
                  onChange={(e) => setFeedbackValue(e.target.value)}
                  placeholder="Indiquez ici les erreurs ou compliments pour l'élève..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setGradingModal(null)}
                  className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-black uppercase text-xs transition-all"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
