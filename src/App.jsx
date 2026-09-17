import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import GeneratorWorkspace from './components/GeneratorWorkspace';
import Auth from './components/Auth';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('generator');
  const [userPlan, setUserPlan] = useState({
    tier: 'Starter',
    usageCount: 8,
    usageLimit: 20,
  });

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  if (!isAuthenticated) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Navbar userPlan={userPlan} user={currentUser} onLogout={handleLogout} />
      
      <div className="flex-1 flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          {activeTab === 'generator' && (
            <GeneratorWorkspace userPlan={userPlan} setUserPlan={setUserPlan} />
          )}

          {activeTab !== 'generator' && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-12 text-center">
              <h2 className="text-lg font-semibold text-white mb-2 uppercase tracking-wide">
                {activeTab} Module
              </h2>
              <p className="text-xs text-slate-400">This enterprise feature module is under active development.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}