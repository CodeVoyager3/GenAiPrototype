import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import RightSidebar from "../components/RightSidebar"
import Sidebar from "../components/Sidebar";
import ProfileModal from "../components/ProfileModal";

const FaBars = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>
);

const FaCog = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path>
  </svg>
);

// Enhanced Animated Background Component
const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // Enhanced floating particles with better variety
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 3 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      pulseSpeed: Math.random() * 0.03 + 0.01,
      pulsePhase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.7 ? 'rgba(147, 51, 234, ' : // violet
             Math.random() > 0.4 ? 'rgba(16, 185, 129, ' : // emerald  
             'rgba(59, 130, 246, ', // blue
    }));

    // Enhanced circuit nodes
    const connectionNodes = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      pulse: 0,
      pulseSpeed: Math.random() * 0.04 + 0.01,
      size: Math.random() * 2 + 2,
    }));

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008;

      // Enhanced grid background with depth
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)'; // emerald
      ctx.lineWidth = 1;
      const gridSize = 80;
      
      // Primary grid
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.globalAlpha = 0.2 + 0.15 * Math.sin(time + x * 0.008);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.globalAlpha = 0.2 + 0.15 * Math.sin(time + y * 0.008);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Secondary finer grid
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.06)'; // indigo
      const fineGridSize = 20;
      for (let x = 0; x < canvas.width; x += fineGridSize) {
        ctx.globalAlpha = 0.1 + 0.05 * Math.sin(time * 1.5 + x * 0.01);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Update and draw enhanced floating particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx + 0.1 * Math.sin(time + index * 0.1);
        particle.y += particle.vy + 0.1 * Math.cos(time + index * 0.1);
        particle.pulsePhase += particle.pulseSpeed;

        // Smooth edge wrapping instead of bouncing
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        // Enhanced mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          const force = (120 - distance) / 120;
          particle.x -= dx * force * 0.008;
          particle.y -= dy * force * 0.008;
        }

        // Draw particle with enhanced effects
        const pulseOpacity = particle.opacity + 0.3 * Math.sin(particle.pulsePhase);
        const currentSize = particle.size + 0.5 * Math.sin(particle.pulsePhase);
        
        ctx.save();
        ctx.globalAlpha = Math.max(0.1, pulseOpacity);
        ctx.fillStyle = particle.color + pulseOpacity + ')';
        ctx.shadowColor = particle.color.replace('rgba', '').replace(', ', '').slice(0, -2);
        ctx.shadowBlur = 12 + 6 * Math.sin(particle.pulsePhase);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle inner glow
        ctx.globalAlpha = pulseOpacity * 0.3;
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (pulseOpacity * 0.5) + ')';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Enhanced connection nodes with better effects
      connectionNodes.forEach((node, index) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        // Smooth edge wrapping
        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;

        // Draw enhanced pulsing node
        const pulseIntensity = 0.5 + 0.4 * Math.sin(node.pulse);
        const nodeSize = node.size + 1.5 * Math.sin(node.pulse);
        
        ctx.save();
        ctx.globalAlpha = pulseIntensity;
        ctx.fillStyle = index % 3 === 0 ? '#10B981' : // emerald
                        index % 3 === 1 ? '#3B82F6' : // blue
                        '#9333EA'; // violet
        ctx.shadowColor = index % 3 === 0 ? '#10B981' :
                         index % 3 === 1 ? '#3B82F6' :
                         '#9333EA';
        ctx.shadowBlur = 20 + 10 * Math.sin(node.pulse);
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Outer ring effect
        ctx.globalAlpha = pulseIntensity * 0.3;
        ctx.strokeStyle = index % 3 === 0 ? '#10B981' :
                         index % 3 === 1 ? '#3B82F6' :
                         '#9333EA';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize + 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Enhanced connections with data flow effect
        connectionNodes.forEach((otherNode, otherIndex) => {
          if (index >= otherIndex) return;
          
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 250 && distance > 0) {
            const opacity = (250 - distance) / 250 * 0.4;
            const pulseIntensity = 0.1 + 0.1 * Math.sin(time * 2 + distance * 0.01);
            
            ctx.save();
            ctx.globalAlpha = opacity + pulseIntensity;
            ctx.strokeStyle = distance % 100 < 50 ? '#10B981' : '#3B82F6'; // emerald or blue
            ctx.lineWidth = 1 + 0.5 * Math.sin(time + distance * 0.02);
            ctx.shadowColor = distance % 100 < 50 ? '#10B981' : '#3B82F6';
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
            
            // Data flow particles along connections
            if (Math.random() > 0.98) {
              const flowProgress = (time * 3 + distance * 0.1) % 1;
              const flowX = node.x + (otherNode.x - node.x) * flowProgress;
              const flowY = node.y + (otherNode.y - node.y) * flowProgress;
              
              ctx.globalAlpha = 0.8;
              ctx.fillStyle = '#F59E0B'; // amber for contrast
              ctx.shadowColor = '#F59E0B';
              ctx.shadowBlur = 8;
              ctx.beginPath();
              ctx.arc(flowX, flowY, 2, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          }
        });
      });

      // Enhanced scanning beam with gradient
      const beamY = (Math.sin(time * 0.4) * 0.5 + 0.5) * canvas.height;
      const gradient = ctx.createLinearGradient(0, beamY - 10, 0, beamY + 10);
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0)');
      gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.4)');
      gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
      
      ctx.save();
      ctx.fillStyle = gradient;
      ctx.fillRect(0, beamY - 5, canvas.width, 10);
      ctx.restore();

      // Enhanced energy pulses with trails
      const pulseProgress = (time * 0.6) % 1;
      const edgePositions = [
        { x: pulseProgress * canvas.width, y: 25, color: '#10B981' }, // emerald
        { x: canvas.width - 25, y: pulseProgress * canvas.height, color: '#3B82F6' }, // blue
        { x: (1 - pulseProgress) * canvas.width, y: canvas.height - 25, color: '#9333EA' }, // violet
        { x: 25, y: (1 - pulseProgress) * canvas.height, color: '#F59E0B' }, // amber
      ];

      edgePositions.forEach((pos, index) => {
        // Main pulse
        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = pos.color;
        ctx.shadowColor = pos.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 5 + Math.sin(time * 4 + index), 0, Math.PI * 2);
        ctx.fill();
        
        // Trail effect
        for (let t = 0.1; t < 1; t += 0.1) {
          ctx.globalAlpha = 0.3 * (1 - t);
          ctx.beginPath();
          ctx.arc(pos.x - t * 10, pos.y - t * 10, 3 * (1 - t), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // Add subtle vignette effect
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.8
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      
      ctx.save();
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleResize = () => {
      resizeCanvas();
      particles.forEach((particle) => {
        if (particle.x > canvas.width) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = canvas.height;
      });
      connectionNodes.forEach((node) => {
        if (node.x > canvas.width) node.x = canvas.width;
        if (node.y > canvas.height) node.y = canvas.height;
      });
    };

    animate();
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

// --- Enhanced Main Dashboard Layout Component ---
const DashboardLayout = () => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // Using a simple state instead of localStorage for this example
    const [profile, setProfile] = useState({ name: "Neon User", image: "" });

    const handleProfileSave = (newProfile) => {
        setProfile(newProfile);
    };

    return (
        <div className="relative flex h-screen font-mono text-emerald-300 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-hidden">
            {/* Enhanced Animated Background */}
            <AnimatedBackground />
            
            {/* Enhanced ambient elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
                {/* Enhanced floating orbs with better variety */}
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full animate-pulse"
                        style={{
                            width: `${Math.random() * 200 + 60}px`,
                            height: `${Math.random() * 200 + 60}px`,
                            background: i % 4 === 0 
                                ? `radial-gradient(circle, rgba(147, 51, 234, ${0.15 + Math.random() * 0.2}) 0%, transparent 70%)` // violet
                                : i % 4 === 1
                                ? `radial-gradient(circle, rgba(16, 185, 129, ${0.15 + Math.random() * 0.2}) 0%, transparent 70%)` // emerald
                                : i % 4 === 2
                                ? `radial-gradient(circle, rgba(59, 130, 246, ${0.15 + Math.random() * 0.2}) 0%, transparent 70%)` // blue
                                : `radial-gradient(circle, rgba(245, 158, 11, ${0.15 + Math.random() * 0.2}) 0%, transparent 70%)`, // amber
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDuration: `${4 + Math.random() * 8}s`,
                            animationDelay: `${Math.random() * 6}s`,
                            filter: 'blur(2px)',
                            transform: `scale(${0.5 + Math.random() * 0.5})`,
                        }}
                    />
                ))}
                
                {/* Enhanced corner accents with better styling */}
                <div className="absolute top-0 left-0 w-40 h-40">
                    <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-emerald-400/60 animate-pulse shadow-lg shadow-emerald-400/20"></div>
                    <div className="absolute top-10 left-10 w-3 h-3 bg-emerald-400/80 rounded-full animate-ping shadow-lg shadow-emerald-400/40"></div>
                    <div className="absolute top-8 left-16 w-1 h-8 bg-gradient-to-b from-emerald-400/60 to-transparent animate-pulse"></div>
                    <div className="absolute top-16 left-8 w-8 h-1 bg-gradient-to-r from-emerald-400/60 to-transparent animate-pulse"></div>
                </div>
                
                <div className="absolute top-0 right-0 w-40 h-40">
                    <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-blue-400/60 animate-pulse shadow-lg shadow-blue-400/20"></div>
                    <div className="absolute top-10 right-10 w-3 h-3 bg-blue-400/80 rounded-full animate-ping shadow-lg shadow-blue-400/40" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-8 right-16 w-1 h-8 bg-gradient-to-b from-blue-400/60 to-transparent animate-pulse"></div>
                    <div className="absolute top-16 right-8 w-8 h-1 bg-gradient-to-l from-blue-400/60 to-transparent animate-pulse"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-40 h-40">
                    <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-violet-400/60 animate-pulse shadow-lg shadow-violet-400/20"></div>
                    <div className="absolute bottom-10 left-10 w-3 h-3 bg-violet-400/80 rounded-full animate-ping shadow-lg shadow-violet-400/40" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-8 left-16 w-1 h-8 bg-gradient-to-t from-violet-400/60 to-transparent animate-pulse"></div>
                    <div className="absolute bottom-16 left-8 w-8 h-1 bg-gradient-to-r from-violet-400/60 to-transparent animate-pulse"></div>
                </div>
                
                <div className="absolute bottom-0 right-0 w-40 h-40">
                    <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-amber-400/60 animate-pulse shadow-lg shadow-amber-400/20"></div>
                    <div className="absolute bottom-10 right-10 w-3 h-3 bg-amber-400/80 rounded-full animate-ping shadow-lg shadow-amber-400/40" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute bottom-8 right-16 w-1 h-8 bg-gradient-to-t from-amber-400/60 to-transparent animate-pulse"></div>
                    <div className="absolute bottom-16 right-8 w-8 h-1 bg-gradient-to-l from-amber-400/60 to-transparent animate-pulse"></div>
                </div>

                {/* Additional ambient lines */}
                <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent animate-pulse"></div>
                <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-violet-400/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-amber-400/30 to-transparent animate-pulse" style={{ animationDelay: '3s' }}></div>
            </div>

            <Sidebar 
                isOpen={isMobileSidebarOpen} 
                onClose={() => setIsMobileSidebarOpen(false)}
                onSettingsClick={() => setIsRightSidebarOpen(true)} 
                style={{ zIndex: 50 }}
            />
            
            <div className="flex-1 flex flex-col overflow-hidden relative" style={{ zIndex: 10 }}>
                {/* Enhanced header with glassmorphism */}
                <header className="md:hidden p-4 flex justify-between items-center bg-slate-900/40 border-b border-emerald-500/40 backdrop-blur-xl shadow-lg shadow-emerald-500/10 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-indigo-500/5 to-blue-400/10"></div>
                    <button 
                        onClick={() => setIsMobileSidebarOpen(true)} 
                        className="relative z-10 text-emerald-400 cursor-pointer hover:text-emerald-300 hover:scale-110 transition-all duration-300 text-2xl p-2 rounded-lg hover:bg-emerald-400/20 hover:shadow-lg hover:shadow-emerald-400/30"
                    >
                        <FaBars />
                    </button>
                    <h1 className="relative z-10 text-lg font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                        Dashboard
                    </h1>
                    <button 
                        onClick={() => setIsRightSidebarOpen(true)} 
                        className="relative z-10 text-blue-400 cursor-pointer hover:text-blue-300 hover:scale-110 transition-all duration-300 text-2xl p-2 rounded-lg hover:bg-blue-400/20 hover:shadow-lg hover:shadow-blue-400/30"
                    >
                        <FaCog />
                    </button>
                </header>
                
                {/* Enhanced main content area */}
                <main className="flex-1 overflow-y-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-indigo-900/40 pointer-events-none"></div>
                    <div className="relative z-10">
                        {/* This is the key change: Outlet renders the nested routes */}
                        <Outlet />
                    </div>
                </main>
            </div>

            <RightSidebar
                isOpen={isRightSidebarOpen}
                onClose={() => setIsRightSidebarOpen(false)}
                profile={profile}
                onProfileClick={() => setIsProfileModalOpen(true)}
                style={{ zIndex: 50 }}
            />

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                currentName={profile.name}
                currentImage={profile.image}
                onSave={handleProfileSave}
                style={{ zIndex: 100 }}
            />
        </div>
    );
};

export default DashboardLayout;