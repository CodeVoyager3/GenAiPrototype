import pdfToText from "react-pdftotext";
import React, { useReducer, useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnalysisContext } from '../context/AnalysisContext';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SkillPieChart = ({ data, title }) => {
  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];

  return (
    <div>
      <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent text-center mb-4">
        {title}
      </h3>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`Proficiency: ${value}/10`, name]}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: '#10B981',
                borderRadius: '12px',
                color: '#E2E8F0',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const analyzeResumeWithGroq = async (resumeText) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("Groq API key is not configured. Please check your .env.local file.");
  }

  const prompt = `
  Analyze the following resume and provide a detailed skills assessment.
  Respond ONLY with a valid JSON object. Do not include any text before or after the JSON object.
  The JSON object should follow this exact structure:
  {
    "technicalSkills": {
      "programmingLanguages": [
        {"name": "JavaScript", "proficiency": 8},
        {"name": "Python", "proficiency": 7}
      ],
      "technologiesFrameworks": [
        {"name": "React", "proficiency": 9},
        {"name": "Node.js", "proficiency": 8}
      ]
    },
    "softSkills": [
      {"name": "Communication", "score": 8, "explanation": "Clear and concise in project descriptions."},
      {"name": "Leadership", "score": 7, "explanation": "Led a key project dashboard development."}
    ],
    "careerRecommendations": {
      "suitableRoles": ["Full-Stack Developer", "Frontend Engineer", "Backend Engineer"],
      "skillsToImprove": ["Advanced DevOps", "GraphQL", "System Design"]
    },
    "overallScore": 85
  }

  Resume Text:
  ---
  ${resumeText}
`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.3,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API error: ${response.status} ${response.statusText} - ${errorBody}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

const initialState = {
  status: 'idle',
  file: null,
  analysis: null,
  error: null,
};

function assessmentReducer(state, action) {
  switch (action.type) {
    case 'START_EXTRACTION':
      return { ...initialState, status: 'extracting', file: action.payload };
    case 'START_ANALYSIS':
      return { ...state, status: 'analyzing' };
    case 'SUCCESS':
      return { ...state, status: 'success', analysis: action.payload };
    case 'ERROR':
      return { ...state, status: 'error', error: action.payload };
    case 'RESET':
      return { ...initialState };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// --- Child Components ---

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const FileUpload = ({ onFileSelect, disabled, fileName }) => (
  <div className="border-2 border-dashed border-emerald-400/30 rounded-xl p-8 text-center hover:border-emerald-400/50 hover:bg-emerald-400/5 transition-all duration-300 mb-6 backdrop-blur-sm">
    <input
      type="file"
      accept=".pdf"
      onChange={onFileSelect}
      className="hidden"
      id="resume-upload"
      disabled={disabled}
    />
    <label htmlFor="resume-upload" className={`cursor-pointer flex flex-col items-center ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}>
      <div className="relative mb-4">
        <svg className="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full animate-pulse"></div>
      </div>
      <span className="text-slate-300 text-lg font-medium">
        {fileName || 'Click to upload your resume (PDF)'}
      </span>
      <span className="text-slate-500 text-sm mt-2">
        Upload your PDF resume for AI-powered analysis
      </span>
    </label>
  </div>
);

const StatusIndicator = ({ status, error }) => {
  const messages = {
    extracting: 'Extracting text from PDF...',
    analyzing: 'Analyzing resume with AI...',
    success: 'Analysis completed successfully!',
    error: error || 'An unknown error occurred.',
  };

  const getStatusColor = () => {
    switch (status) {
      case 'error': return 'text-red-400';
      case 'success': return 'text-emerald-400';
      default: return 'text-blue-400';
    }
  };

  const getStatusBg = () => {
    switch (status) {
      case 'error': return 'bg-red-400/10 border-red-400/30';
      case 'success': return 'bg-emerald-400/10 border-emerald-400/30';
      default: return 'bg-blue-400/10 border-blue-400/30';
    }
  };

  if (status === 'idle') return null;

  return (
    <div className={`text-sm text-center mb-6 flex items-center justify-center gap-3 p-4 rounded-xl border backdrop-blur-sm ${getStatusBg()}`}>
      {(status === 'extracting' || status === 'analyzing') && <Spinner />}
      <span className={getStatusColor()}>{messages[status]}</span>
    </div>
  );
};

const AnalysisResult = ({ analysis }) => {
  const parsedData = useMemo(() => {
    if (!analysis) return null;
    try {
      const jsonStart = analysis.indexOf('{');
      const jsonEnd = analysis.lastIndexOf('}') + 1;
      const jsonString = analysis.substring(jsonStart, jsonEnd);
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Failed to parse analysis JSON:", error);
      return { rawText: analysis };
    }
  }, [analysis]);

  if (!parsedData) return null;
  
  if (parsedData.rawText) {
    return (
      <div className="bg-slate-900/80 backdrop-blur-xl border border-red-400/30 p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-red-400 mb-2">Could Not Parse AI Response</h2>
        <p className="text-red-400/80 mb-4">Displaying raw text from the AI:</p>
        <pre className="text-sm whitespace-pre-wrap text-slate-300">{parsedData.rawText}</pre>
      </div>
    );
  }

  const techSkillsData = [
    ...(parsedData.technicalSkills?.programmingLanguages || []),
    ...(parsedData.technicalSkills?.technologiesFrameworks || []),
  ].map(skill => ({ name: skill.name, value: skill.proficiency }));

  const softSkillsData = (parsedData.softSkills || []).map(skill => ({ name: skill.name, value: skill.score }));

  return (
    <div className="space-y-8">
      {/* Overall Score Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-violet-500/20 rounded-2xl blur-xl"></div>
        <div className="relative bg-slate-900/80 backdrop-blur-xl border border-emerald-400/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Overall Assessment Score
          </h2>
          <div className="relative inline-block">
            <p className="text-7xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              {parsedData.overallScore || 'N/A'}
              <span className="text-3xl">%</span>
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-blue-400 to-violet-400 opacity-20 blur-2xl rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Skills Charts Section */}
      <div className="grid grid-cols-1 gap-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-emerald-400/30 rounded-2xl p-6">
            <SkillPieChart data={techSkillsData} title="Technical Skills Proficiency" />
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-blue-400/30 rounded-2xl p-6">
            <SkillPieChart data={softSkillsData} title="Soft Skills Score" />
          </div>
        </div>
      </div>
      
      {/* Career Recommendations Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-emerald-500/10 rounded-2xl blur-xl"></div>
        <div className="relative bg-slate-900/80 backdrop-blur-xl border border-violet-400/30 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            Career Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-400/20 rounded-xl p-4">
              <h3 className="text-lg font-bold text-emerald-400 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
                Suitable Roles
              </h3>
              <ul className="space-y-2">
                {(parsedData.careerRecommendations?.suitableRoles || []).map(role => 
                  <li key={role} className="text-slate-300 flex items-start">
                    <span className="text-emerald-400 mr-2">•</span>
                    {role}
                  </li>
                )}
              </ul>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-400/20 rounded-xl p-4">
              <h3 className="text-lg font-bold text-blue-400 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Skills to Improve
              </h3>
              <ul className="space-y-2">
                {(parsedData.careerRecommendations?.skillsToImprove || []).map(skill => 
                  <li key={skill} className="text-slate-300 flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    {skill}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const SkillsAssessment = () => {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);
  const { status, file, analysis, error } = state;
  const { setAnalysisData } = useContext(AnalysisContext); 
  const navigate = useNavigate(); 

  const handleFileSelect = useCallback(async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (selectedFile.type !== 'application/pdf') {
      dispatch({ type: 'ERROR', payload: 'Please upload a PDF file.' });
      return;
    }

    dispatch({ type: 'START_EXTRACTION', payload: selectedFile });

    try {
      const extractedText = await pdfToText(selectedFile);
      if (!extractedText.trim()) {
        throw new Error('Could not extract text from PDF. The file might be empty or image-based.');
      }

      dispatch({ type: 'START_ANALYSIS' });
      const analysisResult = await analyzeResumeWithGroq(extractedText);
      const jsonStart = analysisResult.indexOf('{');
      const jsonEnd = analysisResult.lastIndexOf('}') + 1;
      const jsonString = analysisResult.substring(jsonStart, jsonEnd);
      const parsedData = JSON.parse(jsonString);
      setAnalysisData(parsedData);
      dispatch({ type: 'SUCCESS', payload: analysisResult });

    } catch (err) {
      console.error(err);
      dispatch({ type: 'ERROR', payload: err.message });
    }
  }, [setAnalysisData]);

  const isProcessing = status === 'extracting' || status === 'analyzing';

  return (
    <main className="relative min-h-screen w-full font-mono text-slate-200 bg-gradient-to-br from-slate-900 via-black to-indigo-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                background: i % 3 === 0 ? '#10B981' : i % 3 === 1 ? '#3B82F6' : '#8B5CF6',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.3,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-40 h-40">
          <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-emerald-400/40 animate-pulse"></div>
          <div className="absolute top-12 left-12 w-2 h-2 bg-emerald-400/60 rounded-full animate-ping"></div>
        </div>
        <div className="absolute top-0 right-0 w-40 h-40">
          <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-blue-400/40 animate-pulse"></div>
          <div className="absolute top-12 right-12 w-2 h-2 bg-blue-400/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-emerald-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
          AI-Powered Skills Assessment
        </h1>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-violet-500/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-emerald-400/30 rounded-2xl p-6 sm:p-8 mb-8 shadow-2xl">
            {status !== 'success' && (
              <>
                <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Upload Your Resume
                </h2>
                <p className="text-slate-400 mb-6">
                  Get an AI-powered analysis of your skills, experience, and career recommendations in seconds.
                </p>
                <FileUpload onFileSelect={handleFileSelect} disabled={isProcessing} fileName={state.file?.name} />
              </>
            )}

            <StatusIndicator status={state.status} error={state.error} />

            {status === 'success' && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button
                  onClick={() => dispatch({ type: 'RESET' })}
                  className="relative w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:from-emerald-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                >
                  Analyze Another Resume
                </button>
              </div>
            )}
          </div>
        </div>

        <AnalysisResult analysis={analysis} />
      </div>
    </main>
  );
};

export default SkillsAssessment;