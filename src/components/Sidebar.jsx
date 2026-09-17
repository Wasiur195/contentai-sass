import React from 'react';
import { LayoutDashboard, PenTool, Sparkles, History, Settings, BarChart3, Layers } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'generator', label: 'AI Generator', icon: PenTool },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'templates', label: 'Copy Templates', icon: Layers },
    { id: 'analytics', label: 'Performance', icon: BarChart3 },
    { id: 'history', label: 'Content History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950 p-4 flex flex-col justify-between hidden lg:flex">
      <div className="space-y-1">
        <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Core Features</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                isActive 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-slate-200">Pro Feature</span>
        </div>
        <p className="text-[11px] text-slate-400 mb-3">Direct Auto-Posting to Facebook & Instagram pages.</p>
        <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] py-1.5 rounded-lg transition font-medium">
          Connect Pages
        </button>
      </div>
    </aside>
  );
}