import React from "react";
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

// --- SVG Icons ---
const ChartPieIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
        <path d="M12 2a8 8 0 014.95 14.37A8 8 0 0110 18H2.63A8 8 0 0112 2z" />
        <path d="M11 10a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
);

const UserGraduateIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 12a5 5 0 100-10 5 5 0 000 10zm0-2a3 3 0 100-6 3 3 0 000 6z" />
        <path fillRule="evenodd" d="M2 17.653C2 15.637 4.582 14 7.5 14h5c2.918 0 5.5 1.637 5.5 3.653V18H2v-.347z" clipRule="evenodd" />
    </svg>
);

const TasksIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zM3 7a1 1 0 000 2h14a1 1 0 100-2H3zM3 11a1 1 0 100 2h14a1 1 0 100-2H3zM3 15a1 1 0 100 2h14a1 1 0 100-2H3z" />
    </svg>
);

const CogIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01-.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
);

const TimesIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

// --- Main Sidebar Component ---
const Sidebar = ({ isOpen, onClose, onSettingsClick }) => {
  const navigate = useNavigate();
  const { signOut } = useClerk();

  const navItems = [
    { icon: <ChartPieIcon />, label: 'Dashboard', path: '/dashboard', color: 'emerald' },
    { icon: <UserGraduateIcon />, label: 'Career Paths', path: '/dashboard/career-paths', color: 'blue' },
    { icon: <TasksIcon />, label: 'Skills Assessment', path: '/dashboard/skills-assessment', color: 'violet' },
  ];

  const handleNavigation = (path) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
    onClose();
  };

  const getHoverColors = (color) => {
    switch (color) {
      case 'emerald': return 'hover:bg-emerald-500/10 hover:border-emerald-500/30 group-hover:text-emerald-300';
      case 'blue': return 'hover:bg-blue-500/10 hover:border-blue-500/30 group-hover:text-blue-300';
      case 'violet': return 'hover:bg-violet-500/10 hover:border-violet-500/30 group-hover:text-violet-300';
      default: return 'hover:bg-slate-500/10 hover:border-slate-500/30 group-hover:text-slate-300';
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar Container */}
      <div 
        className={`
          font-mono bg-slate-900/90 backdrop-blur-xl border-r border-emerald-400/30 text-slate-200 w-64 flex flex-col p-5
          fixed inset-y-0 left-0 z-40
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          shadow-2xl shadow-emerald-500/10
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex justify-between ml-10 h-32 w-28 cursor-pointer hover:translate-y-1.5 items-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            <img src="/logo.png" alt="Logo" />
          </h1>
          <button 
            onClick={onClose} 
            className="md:hidden cursor-pointer text-slate-400 hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-slate-800/50"
          >
            <TimesIcon />
          </button>
        </div>

        {/* Navigation */}
        <ul className="space-y-3 flex-grow">
          {navItems.map(item => (
            <li 
              key={item.label}
              onClick={() => {
                handleNavigation(item.path);
                onClose();
              }}
              className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 border border-transparent group ${getHoverColors(item.color)}`}
            >
              <div className="transition-colors duration-300">
                {item.icon}
              </div>
              <span className="text-sm transition-colors duration-300">
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        {/* Settings Button */}
        <button
          onClick={onSettingsClick}
          className="hidden md:flex items-center gap-4 p-3 w-full cursor-pointer rounded-xl transition-all duration-300 hover:bg-slate-500/10 hover:border-slate-500/30 border border-transparent group text-slate-300"
        >
          <div className="group-hover:text-slate-100 transition-colors duration-300">
            <CogIcon />
          </div>
          <span className="text-sm group-hover:text-slate-100 transition-colors duration-300">
            Settings
          </span>
        </button>

        {/* Sign Out Button */}
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <button
            onClick={() => {
              console.log('Signing out...');
              signOut(() => navigate('/'));
            }}
            className="flex items-center gap-4 p-3 w-full cursor-pointer rounded-xl transition-all duration-300 hover:bg-red-500/10 hover:border-red-500/30 border border-transparent group text-red-400"
          >
            <svg className="w-5 h-5 group-hover:text-red-300 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm group-hover:text-red-300 transition-colors duration-300">
              Sign Out
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;