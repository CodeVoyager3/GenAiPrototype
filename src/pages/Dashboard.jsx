import React from 'react';
import ChatBox from '../components/ChatBox';

// --- Enhanced Main Dashboard Component ---
const Dashboard = () => {
  const guidelines = [
    {
      icon: '💬',
      title: 'Start the Conversation',
      description: 'Tell me what\'s on your mind. Try "I\'m feeling lost in my career" or "Suggest jobs for a biology major."',
      color: 'emerald',
      gradient: 'from-emerald-400/20 to-emerald-600/10',
      shadow: 'shadow-emerald-400/20',
      border: 'border-emerald-500/30',
      hover: 'hover:bg-emerald-900/20 hover:border-emerald-400/50',
      glow: 'hover:shadow-emerald-400/30'
    },
    {
      icon: '🎯',
      title: 'Define Your Goals',
      description: 'I\'ll ask questions to understand your skills and ambitions to provide tailored suggestions.',
      color: 'blue',
      gradient: 'from-blue-400/20 to-blue-600/10',
      shadow: 'shadow-blue-400/20',
      border: 'border-blue-500/30',
      hover: 'hover:bg-blue-900/20 hover:border-blue-400/50',
      glow: 'hover:shadow-blue-400/30'
    },
    {
      icon: '🚀',
      title: 'Launch Your Plan',
      description: 'Receive a clear action plan—from recommended careers and courses to interview tips.',
      color: 'violet',
      gradient: 'from-violet-400/20 to-violet-600/10',
      shadow: 'shadow-violet-400/20',
      border: 'border-violet-500/30',
      hover: 'hover:bg-violet-900/20 hover:border-violet-400/50',
      glow: 'hover:shadow-violet-400/30'
    },
  ];

  return (
    <main className="relative min-h-screen w-full font-mono text-emerald-300 bg-gradient-to-br from-slate-900/50 via-transparent to-indigo-900/30">
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse opacity-30"
            style={{
              width: `${40 + Math.random() * 80}px`,
              height: `${40 + Math.random() * 80}px`,
              background: i % 4 === 0 
                ? 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)'
                : i % 4 === 1
                ? 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
                : i % 4 === 2
                ? 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 8}s`,
              filter: 'blur(1px)',
            }}
          />
        ))}
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-8 p-4 sm:p-6 lg:p-8">
        {/* Hero Section */}
        <div className="w-full bg-gradient-to-br from-slate-800/60 via-slate-900/40 to-indigo-900/60 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8 sm:p-10 lg:p-12 text-center shadow-2xl shadow-emerald-500/10 relative overflow-hidden">
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/5 via-transparent to-blue-400/5 pointer-events-none"></div>
          
          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-3xl border border-gradient-to-r from-emerald-400/20 via-blue-400/20 to-violet-400/20 animate-pulse"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-blue-400 to-violet-400 bg-clip-text text-transparent leading-tight">
              Your Future, Powered by AI
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Get instant, personalized career guidance with cutting-edge AI technology. 
              <span className="text-emerald-400 font-semibold"> Transform your career journey today.</span>
            </p>

            {/* Guidelines Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {guidelines.map((item, index) => (
                <div 
                  key={index} 
                  className={`group relative p-6 rounded-2xl border transition-all duration-500 transform hover:scale-105 cursor-pointer ${item.border} ${item.hover} ${item.shadow} hover:shadow-xl ${item.glow}`}
                  style={{
                    background: `linear-gradient(135deg, ${item.gradient.replace('from-', 'rgba(').replace('to-', 'rgba(').replace('/20', ', 0.2)').replace('/10', ', 0.1)')})`,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {/* Card glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-start space-y-4">
                    <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className={`text-xl font-bold text-${item.color}-300 group-hover:text-${item.color}-200 transition-colors duration-300`}>
                        {item.title}
                      </h3>
                      <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Animated corner accent */}
                  <div className={`absolute top-3 right-3 w-2 h-2 bg-${item.color}-400 rounded-full opacity-60 group-hover:opacity-100 animate-pulse`}></div>
                </div>
              ))}
            </div>
            
            {/* Call to action */}
            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-emerald-900/30 via-blue-900/20 to-violet-900/30 border border-emerald-400/20">
              <p className="text-emerald-300 font-semibold text-lg">
                ✨ Ready to unlock your potential? Start chatting below!
              </p>
            </div>
          </div>
        </div>
        
        {/* Chat Section */}
        <div className="w-full relative">
          {/* Chat container with enhanced styling */}
          <div className="bg-gradient-to-br from-slate-800/40 via-slate-900/60 to-indigo-900/40 backdrop-blur-xl border border-blue-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10 relative">
            {/* Top accent line */}
            <div className="h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-violet-400"></div>
            
            
            
            {/* Chat content */}
            <div className="relative">
              <ChatBox />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
    </main>
  );
};

export default Dashboard;