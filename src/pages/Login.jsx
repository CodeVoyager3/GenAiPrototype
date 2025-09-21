import React, { useEffect } from 'react';
import { SignIn, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, isLoaded, navigate]);

  // Show loading state while Clerk loads
  if (!isLoaded) {
    return (
      <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-black to-indigo-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <div className="text-emerald-300 text-xl font-mono">Loading...</div>
        </div>
      </div>
    );
  }

  // Don't render login if already signed in
  if (isSignedIn) {
    return (
      <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-black to-indigo-900 flex items-center justify-center">
        <div className="text-emerald-400 text-xl font-mono">Redirecting to dashboard...</div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-black to-indigo-900 font-mono">
      {/* Enhanced Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
        {/* Fine grid overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Floating particles with modern colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: i % 4 === 0 ? '#10B981' : // emerald
                         i % 4 === 1 ? '#3B82F6' : // blue  
                         i % 4 === 2 ? '#8B5CF6' : // violet
                         '#F59E0B', // amber
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.4 + Math.random() * 0.4,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              boxShadow: `0 0 10px ${i % 4 === 0 ? '#10B981' : 
                                   i % 4 === 1 ? '#3B82F6' : 
                                   i % 4 === 2 ? '#8B5CF6' : '#F59E0B'}40`
            }}
          />
        ))}
      </div>

      {/* Enhanced floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              background: i % 3 === 0 
                ? 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)'
                : i % 3 === 1
                ? 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              filter: 'blur(2px)',
            }}
          />
        ))}
      </div>

      {/* Scanning lines with modern colors */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-full h-px opacity-30"
          style={{
            background: 'linear-gradient(to right, transparent, #10B981, transparent)',
            animation: 'scan 12s linear infinite',
          }}
        />
        <div
          className="absolute w-full h-px opacity-20"
          style={{
            background: 'linear-gradient(to right, transparent, #3B82F6, transparent)',
            animation: 'scan 15s linear infinite',
            animationDelay: '2s',
          }}
        />
      </div>

      {/* Corner accents matching homepage */}
      <div className="absolute inset-0 pointer-events-none">
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

      {/* Main Login Container */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Modern header */}
          <div className="mb-8 text-center">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-blue-400 to-violet-400 bg-clip-text text-transparent"
              style={{ textShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}
            >
              Welcome Back
            </h1>
            <p className="text-slate-400 text-lg">
              Sign in to continue your journey
            </p>
          </div>

          {/* Clerk SignIn Component with Modern Styling */}
          <div className="flex justify-center">
            <SignIn
              appearance={{
                variables: {
                  colorPrimary: '#10B981',
                  colorBackground: 'rgba(15, 23, 42, 0.95)',
                  colorText: '#E2E8F0',
                  colorTextSecondary: 'rgba(148, 163, 184, 0.8)',
                  colorInputBackground: 'rgba(30, 41, 59, 0.8)',
                  colorInputText: '#E2E8F0',
                  borderRadius: '16px',
                  fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                },
                elements: {
                  // Main card styling
                  card: {
                    background: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '20px',
                    boxShadow: '0 0 40px rgba(16, 185, 129, 0.1), 0 0 80px rgba(59, 130, 246, 0.05)',
                  },
                  
                  // Header styling
                  headerTitle: {
                    background: 'linear-gradient(135deg, #10B981, #3B82F6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    textShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
                  },
                  headerSubtitle: {
                    color: 'rgba(148, 163, 184, 0.8)',
                  },
                  
                  // Form elements
                  formButtonPrimary: {
                    background: 'linear-gradient(135deg, #10B981, #3B82F6)',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #059669, #2563EB)',
                      boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)',
                      transform: 'translateY(-2px)',
                    },
                  },
                  
                  formFieldInput: {
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '12px',
                    color: '#E2E8F0',
                    backdropFilter: 'blur(10px)',
                    '&:focus': {
                      borderColor: '#10B981',
                      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
                      background: 'rgba(30, 41, 59, 0.9)',
                    },
                    '&::placeholder': {
                      color: 'rgba(148, 163, 184, 0.6)',
                    },
                  },
                  
                  formFieldLabel: {
                    color: '#E2E8F0',
                    fontWeight: '500',
                  },
                  
                  // Social buttons
                  socialButtonsBlockButton: {
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '12px',
                    color: '#E2E8F0',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderColor: '#3B82F6',
                      transform: 'translateY(-1px)',
                    },
                  },
                  
                  // Links
                  footerActionLink: {
                    color: '#3B82F6',
                    '&:hover': {
                      color: '#60A5FA',
                    },
                  },
                  
                  // Divider
                  dividerLine: {
                    background: 'rgba(148, 163, 184, 0.3)',
                  },
                  dividerText: {
                    color: 'rgba(148, 163, 184, 0.7)',
                  },
                  
                  // Other elements
                  alertText: {
                    color: '#F87171',
                  },
                  formResendCodeLink: {
                    color: '#10B981',
                    '&:hover': {
                      color: '#34D399',
                    },
                  },
                  otpCodeFieldInput: {
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#10B981',
                    borderRadius: '8px',
                  },
                },
              }}
              redirectUrl="/GenAiPrototype/dashboard"
              signUpUrl="/GenAiPrototype/sign-up"
            />
          </div>

          {/* Back to Home Link with modern styling */}
          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.href = '/GenAiPrototype/'}
              className="group relative inline-flex items-center space-x-2 text-slate-400 hover:text-emerald-400 transition-all duration-300 text-sm font-mono"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="relative">
                Back to Homepage
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-emerald-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes scan {
          0% { top: -2px; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100vh; opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default Login;