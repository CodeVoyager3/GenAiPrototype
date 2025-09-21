import React from 'react';

// --- Profile Button Component ---
const ProfileButton = ({ name, image, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center cursor-pointer gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30 group font-mono w-full"
    >
      <div className="relative">
        <img 
          src={image || 'https://placehold.co/40x40/000000/10B981?text=P'} 
          alt="Profile" 
          className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500/50 group-hover:border-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-500/20"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 to-blue-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      {name && (
        <span className="text-sm text-slate-300 group-hover:text-emerald-300 transition-colors duration-300 font-medium">
          {name}
        </span>
      )}
    </button>
  );
};

// --- Right Sidebar Component ---
const RightSidebar = ({ isOpen, onClose, profile = {}, onProfileClick }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-slate-900/90 backdrop-blur-xl border-l border-blue-400/30 text-slate-200 z-50 shadow-2xl shadow-blue-500/10 transform transition-transform duration-300 ease-in-out font-mono ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 flex-shrink-0">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Settings
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800/50 cursor-pointer rounded-xl transition-all duration-300 text-slate-400 hover:text-blue-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="space-y-4 flex-grow">
            {/* Profile Section */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-400/20 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wide">
                Profile
              </h3>
              <ProfileButton
                name={profile.name || 'Anonymous User'} 
                image={profile.image || 'https://placehold.co/40x40/000000/10B981?text=A'} 
                onClick={onProfileClick}
              />
            </div>

            {/* Settings Options */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-400/20 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wide">
                Preferences
              </h3>
              <div className="space-y-2">
                {[
                  { icon: '🌙', label: 'Dark Mode', enabled: true },
                  { icon: '🔔', label: 'Notifications', enabled: false },
                  { icon: '🌐', label: 'Language', value: 'English' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm text-slate-300">{item.label}</span>
                    </div>
                    {item.enabled !== undefined ? (
                      <div className={`w-10 h-6 rounded-full p-1 transition-colors ${item.enabled ? 'bg-emerald-500' : 'bg-slate-600'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${item.enabled ? 'translate-x-4' : ''}`}></div>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-violet-400/20 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wide">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {[
                  { icon: '📊', label: 'Export Data' },
                  { icon: '🔄', label: 'Sync Account' },
                  { icon: '❓', label: 'Help & Support' },
                ].map((item, index) => (
                  <button key={index} className="flex items-center gap-3 p-2 w-full text-left rounded-lg hover:bg-slate-700/50 transition-colors text-slate-300 hover:text-slate-100">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-slate-700/50 text-center">
            <p className="text-xs text-slate-500">
              Elevate v1.0 • Made with ❤️
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;