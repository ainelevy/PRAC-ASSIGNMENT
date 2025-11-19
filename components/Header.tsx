import React from 'react';
import { Leaf, Sprout } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <header className="flex h-16 w-full max-w-5xl items-center justify-between rounded-2xl border border-white/40 bg-white/70 px-6 shadow-lg shadow-slate-200/20 backdrop-blur-xl transition-all hover:bg-white/80">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-agri-400 to-agri-600 text-white shadow-lg shadow-agri-500/30">
            <Leaf size={20} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Agri<span className="text-agri-600">Scan</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'Features', 'About'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-medium text-slate-600 hover:text-agri-600 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full border border-agri-200 bg-agri-50/50 px-3 py-1.5 text-xs font-semibold text-agri-700 backdrop-blur-sm">
            <Sprout size={14} />
            <span>v1.0</span>
          </div>
        </div>
      </header>
    </div>
  );
};