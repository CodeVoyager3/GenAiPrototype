import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnalysisContext } from '../context/AnalysisContext';

// Career Path Visualization Component
const CareerPathVisualization = ({ roles, selectedPath, onPathSelect }) => {
  const svgRef = useRef(null);
  const [animatedPaths, setAnimatedPaths] = useState(new Set());

  useEffect(() => {
    // Animate paths on mount
    roles.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedPaths(prev => new Set([...prev, index]));
      }, index * 300);
    });
  }, [roles]);

  const colors = ['#10B981', '#3B82F6', '#9333EA', '#F59E0B', '#EF4444'];

  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-slate-800/60 via-slate-900/80 to-indigo-900/60 rounded-3xl border border-emerald-500/30 backdrop-blur-xl overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}></div>

      <svg ref={svgRef} className="w-full h-full relative z-10" viewBox="0 0 800 300">
        <defs>
          {/* Gradient definitions */}
          {colors.map((color, index) => (
            <linearGradient key={index} id={`pathGradient${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: color, stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.6 }} />
            </linearGradient>
          ))}
          
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
        </defs>

        {/* Career paths as flowing curves */}
        {roles.map((role, index) => {
          const yPosition = 60 + (index * 40);
          const pathData = `M 50 ${yPosition} Q 200 ${yPosition + Math.sin(index) * 30} 400 ${yPosition} T 750 ${yPosition}`;
          
          return (
            <g key={index}>
              {/* Path background */}
              <path
                d={pathData}
                fill="none"
                stroke={colors[index % colors.length]}
                strokeWidth="3"
                strokeOpacity="0.3"
                strokeDasharray="5,5"
              />
              
              {/* Animated path */}
              <path
                d={pathData}
                fill="none"
                stroke={`url(#pathGradient${index % colors.length})`}
                strokeWidth="4"
                filter="url(#glow)"
                strokeDasharray="10,5"
                strokeDashoffset={animatedPaths.has(index) ? 0 : 1000}
                className={`transition-all duration-2000 ease-out cursor-pointer hover:stroke-width-6 ${
                  selectedPath === index ? 'stroke-opacity-100' : 'stroke-opacity-70'
                }`}
                onClick={() => onPathSelect(index)}
                style={{
                  strokeDashoffset: animatedPaths.has(index) ? 0 : 1000,
                }}
              />

              {/* Path nodes */}
              <circle
                cx="50"
                cy={yPosition}
                r="6"
                fill={colors[index % colors.length]}
                className="animate-pulse"
              />
              <circle
                cx="750"
                cy={yPosition}
                r="8"
                fill={colors[index % colors.length]}
                stroke="white"
                strokeWidth="2"
                className="animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              />

              {/* Floating particles along path */}
              {Array.from({ length: 3 }, (_, particleIndex) => (
                <circle
                  key={particleIndex}
                  r="2"
                  fill={colors[index % colors.length]}
                  opacity="0.8"
                >
                  <animateMotion
                    dur={`${4 + particleIndex}s`}
                    repeatCount="indefinite"
                    path={pathData}
                    begin={`${particleIndex * 1.5}s`}
                  />
                </circle>
              ))}

              {/* Role label */}
              <text
                x="400"
                y={yPosition - 15}
                textAnchor="middle"
                className={`fill-current text-sm font-mono transition-all duration-300 ${
                  selectedPath === index ? 'text-white' : 'text-slate-400'
                }`}
                style={{ fontSize: '12px' }}
              >
                {role.split(' ').slice(0, 2).join(' ')}
              </text>
            </g>
          );
        })}

        {/* Central hub */}
        <circle
          cx="400"
          cy="150"
          r="20"
          fill="url(#pathGradient0)"
          stroke="white"
          strokeWidth="2"
          filter="url(#glow)"
          className="animate-pulse"
        />
        <text
          x="400"
          y="155"
          textAnchor="middle"
          className="fill-white text-xs font-bold"
          style={{ fontSize: '10px' }}
        >
          YOU
        </text>
      </svg>

      {/* Interactive overlay */}
      <div className="absolute top-4 right-4 text-slate-400 text-xs font-mono">
        Click paths to explore
      </div>
    </div>
  );
};

// Enhanced Career Role Card
const CareerRoleCard = ({ role, index, isSelected, onClick, skills }) => {
  const colors = ['emerald', 'blue', 'violet', 'amber', 'red'];
  const color = colors[index % colors.length];
  
  const icons = ['🎯', '💼', '🚀', '⚡', '🌟', '💡', '🔥', '⭐'];
  const icon = icons[index % icons.length];

  return (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer transform transition-all duration-500 hover:scale-105 ${
        isSelected ? 'scale-105' : ''
      }`}
    >
      {/* Animated border */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-3xl blur opacity-60 group-hover:opacity-100 transition duration-500 ${
        isSelected ? 'opacity-100' : ''
      }`}></div>
      
      {/* Card content */}
      <div className={`relative bg-gradient-to-br from-slate-800/80 via-slate-900/60 to-slate-800/80 rounded-3xl p-6 border border-${color}-500/30 backdrop-blur-xl shadow-2xl hover:shadow-${color}-500/20 transition-all duration-300`}>
        {/* Icon and title */}
        <div className="flex items-start space-x-4 mb-4">
          <div className={`text-4xl transform group-hover:scale-110 transition-transform duration-300 ${isSelected ? 'animate-bounce' : ''}`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className={`text-xl font-bold text-${color}-400 mb-2 group-hover:text-${color}-300 transition-colors`}>
              {role}
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-60"></div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 mb-4 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">
          A high-potential career path tailored to your skills and experience profile.
        </p>

        {/* Progress indicators */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Match Score</span>
            <span>{85 + Math.floor(Math.random() * 15)}%</span>
          </div>
          <div className={`w-full bg-slate-700/50 rounded-full h-2 overflow-hidden`}>
            <div 
              className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-400 rounded-full transition-all duration-1000 ease-out`}
              style={{ 
                width: `${85 + Math.floor(Math.random() * 15)}%`,
                animationDelay: `${index * 200}ms`
              }}
            ></div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2">
          <button className={`flex-1 bg-${color}-500/20 hover:bg-${color}-500/30 text-${color}-400 hover:text-${color}-300 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border border-${color}-500/30 hover:border-${color}-400/50`}>
            Explore Path
          </button>
          <button className="p-2 rounded-xl border border-slate-600/50 hover:border-slate-500/70 text-slate-500 hover:text-slate-400 transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        {/* Selected indicator */}
        {isSelected && (
          <div className={`absolute top-3 right-3 w-3 h-3 bg-${color}-400 rounded-full animate-ping`}></div>
        )}
      </div>
    </div>
  );
};

// Enhanced Skills Improvement Section
const SkillsImprovementSection = ({ skills }) => {
  const [expandedSkill, setExpandedSkill] = useState(null);

  const skillCategories = [
    { name: 'Technical', icon: '⚙️', color: 'emerald' },
    { name: 'Soft Skills', icon: '🤝', color: 'blue' },
    { name: 'Leadership', icon: '👑', color: 'violet' },
    { name: 'Creative', icon: '🎨', color: 'amber' }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800/60 via-slate-900/80 to-indigo-900/60 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8 shadow-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="text-3xl">📈</div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
          Skills Development Roadmap
        </h2>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {skillCategories.map((category, index) => (
          <div key={index} className={`group p-4 rounded-2xl bg-gradient-to-br from-${category.color}-500/10 to-${category.color}-600/5 border border-${category.color}-500/20 hover:border-${category.color}-400/40 transition-all duration-300 cursor-pointer`}>
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
              {category.icon}
            </div>
            <h3 className={`text-${category.color}-400 font-semibold text-sm`}>
              {category.name}
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              {Math.floor(Math.random() * 5) + 2} skills
            </p>
          </div>
        ))}
      </div>

      {/* Individual skills */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-300 mb-4">Priority Skills to Develop</h3>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              onClick={() => setExpandedSkill(expandedSkill === idx ? null : idx)}
              className="group relative cursor-pointer"
            >
              <div className="bg-gradient-to-r from-emerald-500/20 via-blue-500/15 to-violet-500/20 text-emerald-300 text-sm px-4 py-2 rounded-full border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 backdrop-blur-sm group-hover:scale-105">
                <span className="font-medium">{skill}</span>
                {expandedSkill === idx && (
                  <div className="absolute top-full left-0 mt-2 w-64 p-4 bg-slate-800/95 rounded-xl border border-emerald-500/30 shadow-xl z-10 backdrop-blur-xl">
                    <h4 className="text-emerald-400 font-semibold mb-2">{skill}</h4>
                    <p className="text-slate-400 text-xs mb-3">
                      Developing this skill will enhance your career prospects and open new opportunities.
                    </p>
                    <div className="flex space-x-2">
                      <button className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30">
                        Learn More
                      </button>
                      <button className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded border border-blue-500/30">
                        Find Courses
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main CareerPaths component
const CareerPaths = () => {
  const { analysisData } = useContext(AnalysisContext);
  const [selectedPath, setSelectedPath] = useState(0);
  const [selectedRole, setSelectedRole] = useState(0);

  // Guard clause for no analysis data
  if (!analysisData || !analysisData.careerRecommendations) {
    return (
      <main className="relative min-h-screen w-full flex items-center justify-center font-mono text-emerald-300 bg-gradient-to-br from-slate-900 via-black to-indigo-900">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse opacity-20"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                background: `radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center p-8 bg-gradient-to-br from-slate-800/80 via-slate-900/60 to-indigo-900/80 backdrop-blur-xl border border-emerald-500/30 rounded-3xl shadow-2xl max-w-md">
          <div className="text-6xl mb-6 animate-bounce">🎯</div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Unlock Your Career Journey
          </h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            Complete the skills assessment to discover personalized career paths powered by AI analysis.
          </p>
          <Link
            to="/dashboard/skills-assessment"
            className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
          >
            <span>Start Assessment</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </main>
    );
  }

  const { suitableRoles, skillsToImprove } = analysisData.careerRecommendations;

  return (
    <main className="relative min-h-screen w-full font-mono text-emerald-300 bg-gradient-to-br from-slate-900/50 via-transparent to-indigo-900/30">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse opacity-10"
            style={{
              width: `${Math.random() * 300 + 150}px`,
              height: `${Math.random() * 300 + 150}px`,
              background: i % 4 === 0 
                ? 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)'
                : i % 4 === 1
                ? 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)'
                : i % 4 === 2
                ? 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Your Career Universe
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Explore personalized career paths crafted from your unique skills and aspirations
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Career Path Visualization */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6 text-center">Interactive Career Pathways</h2>
          <CareerPathVisualization 
            roles={suitableRoles} 
            selectedPath={selectedPath}
            onPathSelect={setSelectedPath}
          />
        </div>

        {/* Career Roles Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">Recommended Career Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suitableRoles.map((role, index) => (
              <CareerRoleCard
                key={index}
                role={role}
                index={index}
                isSelected={selectedRole === index}
                onClick={() => setSelectedRole(index)}
                skills={skillsToImprove}
              />
            ))}
          </div>
        </div>

        {/* Skills Development Section */}
        <SkillsImprovementSection skills={skillsToImprove} />
      </div>
    </main>
  );
};

export default CareerPaths;