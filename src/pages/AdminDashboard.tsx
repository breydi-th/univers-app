import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminHeader from '../components/AdminHeader';
import { getAuditLogs, AuditLog } from '../lib/audit';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ students: 0, teachers: 0, classes: 0, courses: 0 });
  const [activities, setActivities] = useState<AuditLog[]>([]);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const { count: studentCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student');
      const { count: teacherCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'teacher');
      const { count: classCount } = await supabase.from('classes').select('*', { count: 'exact', head: true });
      
      setStats({
        students: studentCount || 0,
        teachers: teacherCount || 0,
        classes: classCount || 0,
        courses: 0
      });
    } catch (e) {
      console.error("Error fetching stats:", e);
    }
  };

  const fetchActivities = async () => {
    try {
      const logs = await getAuditLogs(5);
      setActivities(logs);
    } catch (e) {
      console.error("Error fetching logs:", e);
    }
  };

  useEffect(() => {
    const session = localStorage.getItem('user_session');
    if (!session) {
      navigate('/');
      return;
    }
    
    const parsedUser = JSON.parse(session);
    if (parsedUser.role !== 'admin') {
      navigate('/');
      return;
    }
    
    setUser(parsedUser);
    fetchStats();
    fetchActivities();

    // REALTIME SUBSCRIPTIONS
    const classesSub = supabase
      .channel('classes-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'classes' }, () => {
        fetchStats();
        fetchActivities();
      })
      .subscribe();

    const profilesSub = supabase
      .channel('profiles-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        fetchStats();
        fetchActivities();
      })
      .subscribe();

    const auditSub = supabase
      .channel('audit-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'audit_logs' }, () => {
        fetchActivities();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(classesSub);
      supabase.removeChannel(profilesSub);
      supabase.removeChannel(auditSub);
    };
  }, [navigate]);

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen flex flex-col selection:bg-primary/30">
      <AdminHeader title="Institution Univers" subtitle="Administration" />

      <main className="flex-1 p-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full pb-40">
        {/* Welcome Section */}
        <section className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black">Bonjour, {user?.full_name?.split(' ')[0] || 'Admin'} 👋</h2>
          <p className="text-slate-400 font-medium">Résumé de l'activité institutionnelle en temps réel.</p>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl group hover:border-blue-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
                <span className="material-symbols-outlined">groups</span>
              </div>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase tracking-widest animate-pulse">Live</span>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Élèves</p>
            <p className="text-4xl font-black text-white">{stats.students}</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl group hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
                <span className="material-symbols-outlined">badge</span>
              </div>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase tracking-widest animate-pulse">Live</span>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Professeurs</p>
            <p className="text-4xl font-black text-white">{stats.teachers}</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl group hover:border-orange-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
                <span className="material-symbols-outlined">door_open</span>
              </div>
              <span className="text-[10px] font-black text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-full uppercase tracking-widest animate-pulse">Live</span>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Classes</p>
            <p className="text-4xl font-black text-white">{stats.classes}</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl group hover:border-purple-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500">
                <span className="material-symbols-outlined">auto_stories</span>
              </div>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Cours</p>
            <p className="text-4xl font-black text-white">{stats.courses}</p>
          </div>
        </section>

        {/* Audit Logs / Activity Section */}
        <section className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-500">history</span>
                Journal d'activité
              </h3>
              <Link to="/admin-reports" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">Tout voir</Link>
            </div>
            
            <div className="space-y-4">
              {activities.length > 0 ? activities.map((log, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50 hover:border-primary/30 transition-all group">
                  <div className="p-2.5 bg-slate-900 rounded-xl text-slate-500 group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">
                      {log.action.includes('Création') ? 'add_circle' : log.action.includes('Suppression') ? 'delete_forever' : 'edit'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-xs font-black uppercase tracking-tight text-white">{log.action}: {log.target_name}</p>
                      <span className="text-[9px] font-bold text-slate-500">{new Date(log.created_at!).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <p className="text-[10px] font-medium text-slate-500">Effectué par <span className="text-slate-300 font-bold">{log.actor_name}</span> • {log.target_type}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-12 text-slate-600">
                  <span className="material-symbols-outlined text-5xl opacity-20 mb-3">query_stats</span>
                  <p className="text-xs font-bold uppercase tracking-widest">Aucune activité récente</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl h-fit">
            <h3 className="text-lg font-black mb-6">Actions Rapides</h3>
            <div className="grid grid-cols-1 gap-3">
               <Link to="/admin-students" className="p-5 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-95 flex items-center gap-4">
                <span className="material-symbols-outlined">person_add</span>
                <span className="text-xs font-black uppercase tracking-widest">Nouvel Élève</span>
              </Link>
              <Link to="/admin-classes" className="p-5 bg-slate-950 border border-slate-800 rounded-2xl hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-4">
                <span className="material-symbols-outlined text-orange-500">meeting_room</span>
                <span className="text-xs font-black uppercase tracking-widest text-slate-300">Gérer Classes</span>
              </Link>
              <Link to="/admin-accounts" className="p-5 bg-slate-950 border border-slate-800 rounded-2xl hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-4">
                <span className="material-symbols-outlined text-emerald-500">vpn_key</span>
                <span className="text-xs font-black uppercase tracking-widest text-slate-300">Identifiants AI</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950/80 backdrop-blur-2xl px-6 pb-10 pt-4 z-50">
        <div className="max-w-4xl mx-auto flex justify-around">
          <Link className="flex flex-1 flex-col items-center gap-1 text-primary" to="/admin-dashboard">
            <span className="material-symbols-outlined fill-[1]">grid_view</span>
            <p className="text-[10px] font-black uppercase tracking-tighter">Home</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1 text-slate-500 hover:text-white transition-colors" to="/admin-students">
            <span className="material-symbols-outlined">business_center</span>
            <p className="text-[10px] font-black uppercase tracking-tighter">Gestion</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1 text-slate-500 hover:text-white transition-colors" to="/admin-reports">
            <span className="material-symbols-outlined">bar_chart</span>
            <p className="text-[10px] font-black uppercase tracking-tighter">Rapports</p>
          </Link>
          <Link className="flex flex-1 flex-col items-center gap-1 text-slate-500 hover:text-white transition-colors" to="/admin-settings">
            <span className="material-symbols-outlined">settings</span>
            <p className="text-[10px] font-black uppercase tracking-tighter">Settings</p>
          </Link>
        </div>
      </nav>
    </div>
  );
}
