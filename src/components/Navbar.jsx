import React from 'react';
import { Sparkles, Zap, ShieldCheck, Bell, LogOut } from 'lucide-react';

export default function Navbar({ userPlan, user, onLogout }) {
  const usagePercentage = (userPlan.usageCount / userPlan.usageLimit) * 100;

  return (
    <header className="border-b border-slate-800 bg-slate-950 px-6 py-3.5 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600/20 p-2 rounded-xl border border-indigo-500/30">
          <Sparkles className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-white tracking-wide">
              ContentAI
            </span>
            <span className="text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Enterprise
            </span>
          </div>
          <p className="text-[11px] text-slate-400">AI Social Media Marketing Engine</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        {/* Usage Card */}
        <div className="hidden md:flex items-center gap-3 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <div className="text-xs">
            <span className="text-slate-400">Plan: </span>
            <strong className="text-indigo-400 font-semibold">{userPlan.tier}</strong>
            <span className="text-slate-500 mx-1.5">|</span>
            <span className="text-slate-300">{userPlan.usageCount}/{userPlan.usageLimit} Credits</span>
          </div>
          <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700">
            <div 
              className="bg-indigo-500 h-full rounded-full transition-all" 
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
        </div>

        <button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition shadow-lg shadow-indigo-600/20 active:scale-95">
          <Zap className="w-3.5 h-3.5 fill-current" /> Upgrade Plan
        </button>

        <div className="h-4 w-px bg-slate-800 hidden sm:block" />

        {/* User Info & Logout Button */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 hidden sm:inline">{user?.email}</span>
          <button 
            onClick={onLogout}
            title="Log Out"
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}