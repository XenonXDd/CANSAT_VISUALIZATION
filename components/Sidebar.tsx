import React from 'react';
import { DashboardIcon, SettingsIcon, GlobeIcon } from './Icons';

type View = 'dashboard' | 'settings';

interface SidebarProps {
  activeView: View;
  onNavigate: (view: View) => void;
  isOpen: boolean;
  onClose: () => void;
}

const NavLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-sky-100 text-sky-700'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    {icon}
    <span className="ml-4 font-medium">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, isOpen, onClose }) => {
  const handleNavigation = (view: View) => {
    onNavigate(view);
    onClose(); // Close sidebar on mobile after navigation
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-slate-900/30 z-20 md:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white/95 border-r border-slate-200 p-4 z-30
                   flex flex-col transition-transform md:translate-x-0 ${
                     isOpen ? 'translate-x-0' : '-translate-x-full'
                   }`}
      >
        <div className="flex items-center gap-3 mb-8 px-2">
          <GlobeIcon className="w-8 h-8 text-sky-600" />
          <span className="text-xl font-bold text-slate-900">CanSat Dashboard</span>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <NavLink
                icon={<DashboardIcon className="w-6 h-6" />}
                label="Dashboard"
                isActive={activeView === 'dashboard'}
                onClick={() => handleNavigation('dashboard')}
              />
            </li>
            <li>
              <NavLink
                icon={<SettingsIcon className="w-6 h-6" />}
                label="Settings"
                isActive={activeView === 'settings'}
                onClick={() => handleNavigation('settings')}
              />
            </li>
          </ul>
        </nav>

        <div className="text-center text-xs text-slate-500">
            Version 1.0.0
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
