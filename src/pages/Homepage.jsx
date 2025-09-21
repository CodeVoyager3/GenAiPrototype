import React, { useState, useEffect, useRef } from 'react';
import { useUser, SignInButton } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

// Enhanced Typewriter component with modern styling and effects
const ModernTypewriter = ({ text, phrases }) => {
  const [currentText, setCurrentText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeoutId;

    if (!isDeleting && charIndex < currentPhrase.length) {
      const speed = Math.random() * 100 + 50;
      timeoutId = setTimeout(() => {
        setCurrentText((prev) => prev + currentPhrase[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, speed);
    } else if (isDeleting && charIndex > 0) {
      const speed = Math.random() * 50 + 30;
      timeoutId = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, speed);
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      timeoutId = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  return (
    <div className="text-center font-mono">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 relative leading-tight">
        <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
          {text}
        </span>
        <span className="relative inline-block">
          <span
            className="bg-gradient-to-r from-emerald-400 via-blue-400 to-violet-400 bg-clip-text text-transparent"
            style={{
              // REDUCE BLUR RADIUS HERE FOR SHARPER TEXT
              textShadow: '0 0 5px rgba(16, 185, 129, 0.8), 0 0 10px rgba(59, 130, 246, 0.6), 0 0 15px rgba(147, 51, 234, 0.4)',
              filter: 'drop-shadow(0 0 5px rgba(147, 51, 234, 0.5))' // Also reduce this
            }}
          >
            {currentText.split('').map((char, index) => (
              <span
                key={index}
                className="relative inline-block" // Removed animate-pulse for clearer text
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {char}
              </span>
            ))}
          </span>
          <span
            className="inline-block w-1 h-12 sm:h-14 md:h-16 ml-2 bg-gradient-to-b from-emerald-400 to-blue-400 animate-pulse"
            style={{
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.8), 0 0 30px rgba(59, 130, 246, 0.4)'
            }}
          />
        </span>
      </h1>
    </div>
  );
};

// Enhanced Interactive background with improved visual effects
const EnhancedBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const animationFrameRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Initialize enhanced particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 100; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: Math.random() * 3 + 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          color: Math.random() > 0.7 ? 'rgba(147, 51, 234, ' : // violet
            Math.random() > 0.4 ? 'rgba(16, 185, 129, ' : // emerald
              'rgba(59, 130, 246, ', // blue
          pulseSpeed: Math.random() * 0.03 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    let time = 0;

    // Enhanced grid with multiple layers
    const drawEnhancedGrid = () => {
      // Primary grid
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 60;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.globalAlpha = 0.3 + 0.2 * Math.sin(time + x * 0.01);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.globalAlpha = 0.3 + 0.2 * Math.sin(time + y * 0.01);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Secondary fine grid
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
      const fineGridSize = 20;
      for (let x = 0; x < canvas.width; x += fineGridSize) {
        ctx.globalAlpha = 0.15 + 0.1 * Math.sin(time * 1.5 + x * 0.02);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
    };

    // Enhanced animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      drawEnhancedGrid();

      // Update and draw enhanced particles
      particlesRef.current.forEach((particle, index) => {
        // Enhanced movement with subtle wave motion
        particle.x += particle.vx + 0.1 * Math.sin(time + index * 0.1);
        particle.y += particle.vy + 0.1 * Math.cos(time + index * 0.1);
        particle.pulsePhase += particle.pulseSpeed;

        // Smooth edge wrapping
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        // Enhanced mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const force = (200 - distance) / 200;
          particle.x -= dx * force * 0.012;
          particle.y -= dy * force * 0.012;
        }

        // Draw enhanced particle
        const pulseOpacity = particle.opacity + 0.3 * Math.sin(particle.pulsePhase);
        const currentSize = Math.max(0.1, particle.size + 0.8 * Math.sin(particle.pulsePhase));

        ctx.save();
        ctx.globalAlpha = Math.max(0.2, pulseOpacity);
        ctx.fillStyle = particle.color + pulseOpacity + ')';
        ctx.shadowColor = particle.color.replace('rgba', '').replace(', ', '').slice(0, -2);
        ctx.shadowBlur = 15 + 8 * Math.sin(particle.pulsePhase);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fill();

        // Inner glow
        ctx.globalAlpha = pulseOpacity * 0.5;
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (pulseOpacity * 0.3) + ')';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, Math.max(0.1, currentSize * 0.4), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Enhanced connections
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index >= otherIndex) return;

          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.4;
            const pulseIntensity = 0.1 + 0.1 * Math.sin(time * 2 + distance * 0.02);

            ctx.save();
            ctx.globalAlpha = opacity + pulseIntensity;
            ctx.strokeStyle = distance % 80 < 40 ? '#10B981' : '#3B82F6';
            ctx.lineWidth = 1 + 0.5 * Math.sin(time + distance * 0.03);
            ctx.shadowColor = distance % 80 < 40 ? '#10B981' : '#3B82F6';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      // Scanning beams
      const beamY1 = (Math.sin(time * 0.3) * 0.5 + 0.5) * canvas.height;
      const beamY2 = (Math.cos(time * 0.4) * 0.5 + 0.5) * canvas.height;

      [beamY1, beamY2].forEach((beamY, index) => {
        const gradient = ctx.createLinearGradient(0, beamY - 8, 0, beamY + 8);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0)');
        gradient.addColorStop(0.5, `rgba(${index === 0 ? '16, 185, 129' : '59, 130, 246'}, 0.3)`);
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

        ctx.save();
        ctx.fillStyle = gradient;
        ctx.fillRect(0, beamY - 4, canvas.width, 8);
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Event handlers
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    initParticles();
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
      className="absolute inset-0 w-full h-full"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.95) 0%, rgba(0, 0, 0, 0.98) 70%)'
      }}
    />
  );
};

// Enhanced Custom Clerk Sign In Button
const EnhancedSignInButton = ({ isSignedIn, userName }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleNavigate = () => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  };

  if (isSignedIn) {
    return (
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-500 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
        <button
          onClick={handleNavigate}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex items-center space-x-3 px-8 py-4 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 rounded-2xl border border-emerald-500/30 text-emerald-300 font-semibold transition-all duration-500 hover:scale-105 hover:border-emerald-400/50 backdrop-blur-xl shadow-2xl hover:shadow-emerald-500/20"
        >
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent text-lg">
              Welcome back, {userName}!
            </span>
          </div>
          <svg
            className={`w-6 h-6 transition-all duration-500 ${isHovered ? 'translate-x-2 text-blue-400' : 'text-emerald-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <SignInButton
      mode="modal"
      appearance={{
        variables: {
          colorPrimary: '#10B981',
          colorText: '#10B981',
          colorBackground: 'rgba(15, 23, 42, 0.95)',
          colorInputBackground: 'rgba(30, 41, 59, 0.8)',
          colorInputText: '#E2E8F0',
          borderRadius: '16px',
        },
        elements: {
          formButtonPrimary: 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-white font-bold rounded-xl transition-all duration-300',
          card: 'bg-slate-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl',
          headerTitle: 'text-emerald-400 font-bold',
          headerSubtitle: 'text-slate-300',
          socialButtonsBlockButton: 'border-emerald-500/30 hover:border-emerald-400/50 bg-slate-800/50 hover:bg-slate-700/50 text-slate-200',
          formFieldInput: 'bg-slate-800/60 border-emerald-500/30 focus:border-emerald-400/50 text-slate-200',
          formFieldLabel: 'text-slate-300',
          footerActionLink: 'text-blue-400 hover:text-blue-300',
        }
      }}
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-500 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex items-center space-x-4 px-8 py-4 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 rounded-2xl border border-emerald-500/30 font-semibold transition-all duration-500 hover:scale-105 hover:border-emerald-400/50 backdrop-blur-xl shadow-2xl hover:shadow-emerald-500/20"
        >
          <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent text-lg">
            Start Your Journey
          </span>
          <svg
            className={`w-6 h-6 transition-all duration-500 ${isHovered ? 'translate-x-2 text-violet-400' : 'text-emerald-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </SignInButton>
  );
};

// Enhanced Homepage component
const Homepage = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  const phrases = [
    "Your-Skills",
    "Your-Career",
    "Your-Future",
    "Your-Potential"
  ];

  // Enhanced loading state
  if (!isLoaded) {
    return (
      <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-black to-indigo-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <div className="text-emerald-300 text-xl font-mono">Initializing Elevate...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-black to-indigo-900">
      {/* Enhanced background */}
      <EnhancedBackground />

      {/* Enhanced ambient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Enhanced floating orbs */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              background: i % 4 === 0
                ? 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)'
                : i % 4 === 1
                  ? 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)'
                  : i % 4 === 2
                    ? 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
              filter: 'blur(1px)',
            }}
          />
        ))}

        {/* Enhanced corner accents */}
        <div className="absolute top-0 left-0 w-40 h-40">
          <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-emerald-400/40 animate-pulse"></div>
          <div className="absolute top-12 left-12 w-2 h-2 bg-emerald-400/60 rounded-full animate-ping"></div>
        </div>

        <div className="absolute top-0 right-0 w-40 h-40">
          <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-blue-400/40 animate-pulse"></div>
          <div className="absolute top-12 right-12 w-2 h-2 bg-blue-400/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="absolute bottom-0 left-0 w-40 h-40">
          <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-violet-400/40 animate-pulse"></div>
          <div className="absolute bottom-12 left-12 w-2 h-2 bg-violet-400/60 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="absolute bottom-0 right-0 w-40 h-40">
          <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-amber-400/40 animate-pulse"></div>
          <div className="absolute bottom-12 right-12 w-2 h-2 bg-amber-400/60 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center gap-12 max-w-4xl mx-auto text-center">
          {/* Enhanced typewriter title */}
          <div className="space-y-6">
            <ModernTypewriter text="Elevate " phrases={phrases} />
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
              Unlock your career potential with AI-powered insights, personalized guidance, and data-driven recommendations.
            </p>
          </div>

          {/* Enhanced action button */}
          <EnhancedSignInButton
            isSignedIn={isSignedIn}
            userName={user?.firstName || user?.username || 'User'}
          />

          {/* Enhanced user status */}
          {isSignedIn && (
            <div className="flex items-center space-x-2 text-slate-500 text-sm font-mono bg-slate-800/30 px-4 py-2 rounded-full border border-slate-700/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>Connected as {user?.emailAddresses?.[0]?.emailAddress}</span>
            </div>
          )}

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 max-w-3xl">
            {[
              { icon: '🎯', title: 'AI Analysis', desc: 'Smart career insights' },
              { icon: '📈', title: 'Growth Path', desc: 'Personalized roadmaps' },
              { icon: '💼', title: 'Opportunities', desc: 'Curated job matches' }
            ].map((feature, index) => (
              <div key={index} className="group p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm hover:bg-slate-700/40 hover:border-emerald-500/30 transition-all duration-300">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-emerald-400 font-semibold mb-1">{feature.title}</h3>
                <p className="text-slate-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CSS animations */}
      <style>{`
        @keyframes scan {
          0% { top: -4px; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100vh; opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Homepage;