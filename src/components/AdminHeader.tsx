import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabaseAdmin as supabase } from '../lib/supabase-admin';

interface AdminHeaderProps {
  title: string;
  subtitle: string;
  showBack?: boolean;
  backTo?: string;
  rightActions?: React.ReactNode;
}

export default function AdminHeader({ title, subtitle, showBack, backTo, rightActions }: AdminHeaderProps) {
  const navigate = useNavigate();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchLogo();
  }, []);

  async function fetchLogo() {
    try {
      const { data } = await supabase.from('school_settings').select('logo_url').limit(1).single();
      if (data && data.logo_url) {
        setLogoUrl(data.logo_url);
      }
    } catch (err) {
      // Ignore
    }
  }

  return (
    <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 shadow-2xl backdrop-blur-xl bg-slate-900/80">
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button 
              onClick={() => backTo ? navigate(backTo) : navigate(-1)} 
              className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-blue-500 hover:bg-blue-600/30 transition-all shadow-lg shadow-blue-600/10"
            >
              <span className="material-symbols-outlined font-black">arrow_back</span>
            </button>
          ) : (
            <div className="size-12 shrink-0 rounded-2xl bg-white p-1.5 shadow-inner border border-white/10 flex items-center justify-center overflow-hidden">
               {logoUrl ? (
                 <img src={logoUrl} className="w-full h-full object-contain" alt="Logo" />
               ) : (
                 <span className="material-symbols-outlined text-blue-500 text-3xl">account_balance</span>
               )}
            </div>
          )}
          <div className="min-w-0">
            <h1 className="text-lg font-black text-white leading-tight truncate">{title}</h1>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] truncate">{subtitle}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {rightActions}
          <div className="flex items-center gap-2 pl-3 border-l border-slate-800/50">
            <Link to="/admin-notifications" className="flex size-10 items-center justify-center text-slate-400 hover:bg-slate-800 rounded-xl transition-all relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2.5 right-2.5 size-2 bg-blue-500 rounded-full border-2 border-slate-900 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
            </Link>
            <Link to="/admin-profile" className="size-10 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center hover:border-slate-500 transition-all active:scale-95">
              <span className="material-symbols-outlined text-slate-500">person</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
