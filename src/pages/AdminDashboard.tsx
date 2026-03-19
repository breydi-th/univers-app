import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminHeader from '../components/AdminHeader';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ students: 0, teachers: 0, classes: 0, courses: 0 });
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
        courses: 0 // Placeholder
      });
    } catch (e) {
      console.error("Error fetching stats:", e);
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

    // REALTIME SUBSCRIPTIONS
    // Listen for any changes in classes table
    const classesSub = supabase
      .channel('classes-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'classes' }, () => {
        fetchStats();
      })
      .subscribe();

    // Listen for any changes in profiles table (students/teachers)
    const profilesSub = supabase
      .channel('profiles-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        fetchStats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(classesSub);
      supabase.removeChannel(profilesSub);
    };
  }, [navigate]);

  return (
    <div className="bg-slate-950 font-display text-slate-100 min-h-screen flex flex-col selection:bg-primary/30">
      <AdminHeader 
        title="Institution Univers" 
        subtitle="Administration"
      />

      <main className="flex-1 p-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full pb-32">
        {/* Welcome Text */}
        <section className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black">Bonjour, {user?.full_name?.split(' ')[0] || 'Admin'} 👋</h2>
          <p className="text-slate-400 font-medium">Voici le résumé de l'activité de l'établissement aujourd'hui.</p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl group hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
                <span className="material-symbols-outlined">groups</span>
              </div>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg uppercase tracking-wider animate-pulse">Live</span>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Élèves</p>
            <p className="text-3xl font-black text-white group-hover:scale-105 transition-transform origin-left">{stats.students}</p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl group hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                <span className="material-symbols-outlined">badge</span>
              </div>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg uppercase tracking-wider animate-pulse">Live</span>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Professeurs</p>
            <p className="text-3xl font-black text-white group-hover:scale-105 transition-transform origin-left">{stats.teachers}</p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl group hover:border-orange-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-500/10 rounded-xl text-orange-500">
                <span className="material-symbols-outlined">door_open</span>
              </div>
              <span className="text-[10px] font-black text-orange-500 bg-orange-500/10 px-2 py-1 rounded-lg uppercase tracking-wider animate-pulse">Live</span>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Classes</p>
            <p className="text-3xl font-black text-white group-hover:scale-105 transition-transform origin-left">{stats.classes}</p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl group hover:border-purple-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-500/10 rounded-xl text-purple-500">
                <span className="material-symbols-outlined">auto_stories</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Cours Activés</p>
            <p className="text-3xl font-black text-white group-hover:scale-105 transition-transform origin-left">{stats.courses}</p>
          </div>
        </section>

        {/* Management Grid */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-black flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">touch_app</span> Actions de gestion
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/admin-students" className="flex flex-col items-center justify-center p-6 bg-blue-600 rounded-3xl shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-95 border-b-4 border-blue-800">
              <span className="material-symbols-outlined text-4xl mb-3">person_add</span>
              <span className="text-sm font-black uppercase tracking-tighter">Inscrire Élèves</span>
            </Link>
            <Link to="/admin-teachers" className="flex flex-col items-center justify-center p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:bg-slate-800 transition-all active:scale-95 shadow-xl border-b-4 border-slate-700">
              <span className="material-symbols-outlined text-4xl mb-3 text-emerald-500">badge</span>
              <span className="text-sm font-black uppercase tracking-tighter">Gérer Profs</span>
            </Link>
            <Link to="/admin-classes" className="flex flex-col items-center justify-center p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:bg-slate-800 transition-all active:scale-95 shadow-xl border-b-4 border-slate-700">
              <span className="material-symbols-outlined text-4xl mb-3 text-orange-500">meeting_room</span>
              <span className="text-sm font-black uppercase tracking-tighter">Salles & Classes</span>
            </Link>
            <Link to="/admin-accounts" className="flex flex-col items-center justify-center p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:bg-slate-800 transition-all active:scale-95 shadow-xl border-b-4 border-slate-700">
              <span className="material-symbols-outlined text-4xl mb-3 text-primary">vpn_key</span>
              <span className="text-sm font-black uppercase tracking-tighter">Identifiants AI</span>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
            <h4 className="text-lg font-black mb-4 flex items-center gap-2">
               <span className="material-symbols-outlined text-purple-500">assessment</span> Rapports Récents
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-2xl border border-slate-800/50">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-500">description</span>
                  <span className="text-xs font-bold">Rapport mensuel Mars</span>
                </div>
                <button className="text-primary font-black text-[10px] uppercase">Voir</button>
              </div>
              <Link to="/admin-reports" className="block text-center py-2 text-slate-500 text-xs font-bold hover:text-white transition-colors">Voir tous les rapports</Link>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
             <h4 className="text-lg font-black mb-4 flex items-center gap-2">
               <span className="material-symbols-outlined text-pink-500">calendar_month</span> Calendrier
            </h4>
            <div className="p-8 text-center text-slate-500 bg-slate-950 rounded-2xl border border-slate-800/50">
               <span className="material-symbols-outlined text-4xl mb-2 opacity-20">event_busy</span>
               <p className="text-xs font-bold">Aucun événement prévu</p>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-[#0a0c10]/90 backdrop-blur-2xl px-2 pb-8 pt-3 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
        <div className="max-w-4xl mx-auto w-full flex justify-around">
          <Link className="flex flex-1 flex-col items-center gap-1 text-primary" to="/admin-dashboard">
            <span className="material-symbols-outlined fill-[1]">grid_view</span>
            <p className="text-[10px] font-black uppercase tracking-tighter">Dashboard</p>
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
            <p className="text-[10px] font-black uppercase tracking-tighter">Paramètres</p>
          </Link>
        </div>
      </nav>
    </div>
  );
}
