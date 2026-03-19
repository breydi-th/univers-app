import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const isL = document.documentElement.classList.contains('light-mode');
    setIsLight(isL);
  }, []);

  const toggle = () => {
    const newMode = !isLight;
    setIsLight(newMode);
    if (newMode) {
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('app-theme', 'light');
    } else {
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('app-theme', 'dark');
    }
  };

  return (
    <button 
      onClick={toggle}
      className={`relative w-full p-5 rounded-3xl flex items-center justify-between transition-all active:scale-95 group border ${isLight ? 'bg-white border-blue-100 shadow-xl' : 'bg-slate-900 border-slate-800'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`size-10 rounded-xl flex items-center justify-center transition-all ${isLight ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-950 text-slate-400'}`}>
          <span className="material-symbols-outlined font-black">
            {isLight ? 'light_mode' : 'dark_mode'}
          </span>
        </div>
        <div className="text-left">
          <h3 className={`text-sm font-black uppercase tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
             {isLight ? 'Mode Clair Activé' : 'Mode Sombre Activé'}
          </h3>
          <p className={`text-[10px] font-black uppercase tracking-widest opacity-60 ${isLight ? 'text-slate-600' : 'text-slate-500'}`}>
             {isLight ? 'Optimisé pour le jour' : 'Optimisé pour la nuit'}
          </p>
        </div>
      </div>
      
      <div className={`w-12 h-6 rounded-full relative transition-all border-2 ${isLight ? 'bg-blue-600 border-blue-500' : 'bg-slate-950 border-slate-800'}`}>
         <div className={`absolute top-1/2 -translate-y-1/2 size-4 bg-white rounded-full shadow-lg transition-all ${isLight ? 'right-1' : 'left-1'}`}></div>
      </div>
    </button>
  );
}
