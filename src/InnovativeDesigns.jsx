import React, { useState } from 'react';

const InnovativeJourneyDesigns = () => {
  const [activeDesign, setActiveDesign] = useState(0);

  const journeyData = {
    title: "Leadership Development",
    totalXP: 700,
    earnedXP: 245,
    sections: [
      {
        id: 1,
        title: "Self Awareness",
        status: "completed",
        xp: 100,
        items: [
          { name: "Personality Assessment", completed: true },
          { name: "Strengths Finder", completed: true },
          { name: "Reflection Journal", completed: true },
        ]
      },
      {
        id: 2,
        title: "Communication",
        status: "in-progress",
        xp: 150,
        items: [
          { name: "Active Listening", completed: true },
          { name: "Giving Feedback", completed: false },
          { name: "Practice Session", completed: false },
        ]
      },
      {
        id: 3,
        title: "Team Leadership",
        status: "locked",
        xp: 200,
        items: [
          { name: "Delegation Basics", completed: false },
          { name: "Conflict Resolution", completed: false },
          { name: "Team Exercise", completed: false },
        ]
      },
      {
        id: 4,
        title: "Certification",
        status: "locked",
        xp: 250,
        items: [
          { name: "Final Assessment", completed: false },
          { name: "Certificate", completed: false },
        ]
      }
    ]
  };

  // Design 1: Duolingo-style Path
  const DuolingoPath = () => (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">{journeyData.title}</h2>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full">
            <span className="text-2xl">🔥</span>
            <span className="font-bold text-amber-600">7 Day Streak</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
            <span className="text-2xl">⚡</span>
            <span className="font-bold text-purple-600">{journeyData.earnedXP} XP</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Winding Path */}
        <svg className="absolute inset-0 w-full h-full" style={{ height: '600px' }}>
          <path
            d="M 200 50 Q 280 100 200 150 Q 120 200 200 250 Q 280 300 200 350 Q 120 400 200 450 Q 280 500 200 550"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 200 50 Q 280 100 200 150 Q 120 200 200 250"
            fill="none"
            stroke="#10b981"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative" style={{ height: '600px' }}>
          {journeyData.sections.map((section, idx) => {
            const positions = [
              { left: '50%', top: '30px' },
              { left: '50%', top: '170px' },
              { left: '50%', top: '310px' },
              { left: '50%', top: '450px' },
            ];
            const offsets = [0, 60, 0, 60];
            
            return (
              <div
                key={section.id}
                className="absolute transform -translate-x-1/2"
                style={{ 
                  left: `calc(${positions[idx].left} + ${offsets[idx]}px)`,
                  top: positions[idx].top 
                }}
              >
                <div className={`relative group cursor-pointer`}>
                  {/* Main Node */}
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 transition-transform hover:scale-110 ${
                    section.status === 'completed' ? 'bg-emerald-500 border-emerald-300' :
                    section.status === 'in-progress' ? 'bg-blue-500 border-blue-300 animate-pulse' :
                    'bg-gray-300 border-gray-200'
                  }`}>
                    {section.status === 'completed' ? (
                      <span className="text-3xl">⭐</span>
                    ) : section.status === 'in-progress' ? (
                      <span className="text-white text-2xl font-bold">{idx + 1}</span>
                    ) : (
                      <span className="text-2xl">🔒</span>
                    )}
                  </div>
                  
                  {/* Crown for completed */}
                  {section.status === 'completed' && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-2xl">
                      👑
                    </div>
                  )}

                  {/* Label */}
                  <div className={`absolute top-24 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-center ${
                    section.status === 'locked' ? 'opacity-50' : ''
                  }`}>
                    <p className="font-bold text-gray-800">{section.title}</p>
                    <p className="text-xs text-gray-500">{section.xp} XP</p>
                  </div>

                  {/* Progress dots */}
                  {section.status !== 'locked' && (
                    <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 flex gap-1">
                      {section.items.map((item, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${
                            item.completed ? 'bg-emerald-500' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Design 2: Metro/Subway Map Style
  const MetroMap = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">{journeyData.title}</h2>
      
      <div className="relative bg-slate-900 rounded-2xl p-8 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute w-full h-px bg-white" style={{ top: `${i * 5}%` }} />
          ))}
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute h-full w-px bg-white" style={{ left: `${i * 5}%` }} />
          ))}
        </div>

        <svg className="w-full" viewBox="0 0 800 200">
          {/* Main Line */}
          <path
            d="M 50 100 L 200 100 L 250 50 L 400 50 L 450 100 L 600 100 L 650 150 L 750 150"
            fill="none"
            stroke="#64748b"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Completed portion */}
          <path
            d="M 50 100 L 200 100 L 250 50 L 400 50"
            fill="none"
            stroke="#10b981"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Stations */}
          {[
            { x: 50, y: 100, status: 'completed', label: 'Self Awareness', line: 'green' },
            { x: 250, y: 50, status: 'completed', label: 'Communication', line: 'green' },
            { x: 450, y: 100, status: 'in-progress', label: 'Team Leadership', line: 'blue' },
            { x: 650, y: 150, status: 'locked', label: 'Certification', line: 'gray' },
          ].map((station, idx) => (
            <g key={idx}>
              {/* Station outer ring */}
              <circle
                cx={station.x}
                cy={station.y}
                r="20"
                fill={station.status === 'completed' ? '#10b981' : station.status === 'in-progress' ? '#3b82f6' : '#64748b'}
                stroke="white"
                strokeWidth="4"
              />
              {/* Station inner */}
              <circle
                cx={station.x}
                cy={station.y}
                r="8"
                fill="white"
              />
              {/* Station label */}
              <text
                x={station.x}
                y={station.y + 40}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                {station.label}
              </text>
              {/* Status icon */}
              {station.status === 'completed' && (
                <text x={station.x} y={station.y + 5} textAnchor="middle" fontSize="14">✓</text>
              )}
            </g>
          ))}

          {/* Line labels */}
          <g>
            <rect x="680" y="20" width="100" height="24" rx="12" fill="#10b981" />
            <text x="730" y="36" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">GREEN LINE</text>
          </g>
        </svg>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
            <span className="text-white text-sm">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
            <span className="text-white text-sm">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-slate-500 border-2 border-white"></div>
            <span className="text-white text-sm">Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Design 3: Skill Tree / RPG Style
  const SkillTree = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">⚔️ {journeyData.title}</h2>
          <div className="flex justify-center gap-4">
            <div className="bg-yellow-500/20 border border-yellow-500 px-4 py-2 rounded-lg">
              <span className="text-yellow-400 font-bold">Level 2</span>
            </div>
            <div className="bg-purple-500/20 border border-purple-500 px-4 py-2 rounded-lg">
              <span className="text-purple-400 font-bold">{journeyData.earnedXP} / {journeyData.totalXP} XP</span>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
              style={{ width: `${(journeyData.earnedXP / journeyData.totalXP) * 100}%` }}
            />
          </div>
        </div>

        {/* Skill Tree */}
        <div className="relative">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ height: '400px' }}>
            {/* Connection lines */}
            <line x1="50%" y1="60" x2="30%" y2="160" stroke="#6366f1" strokeWidth="3" strokeDasharray="8 4" />
            <line x1="50%" y1="60" x2="70%" y2="160" stroke="#6366f1" strokeWidth="3" strokeDasharray="8 4" />
            <line x1="30%" y1="220" x2="50%" y2="320" stroke="#374151" strokeWidth="3" strokeDasharray="8 4" />
            <line x1="70%" y1="220" x2="50%" y2="320" stroke="#374151" strokeWidth="3" strokeDasharray="8 4" />
          </svg>

          <div className="relative" style={{ height: '400px' }}>
            {/* Top node - Completed */}
            <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
              <div className="relative">
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/50 border-2 border-emerald-300">
                  <span className="text-4xl">🧠</span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-yellow-300">
                  <span className="text-sm">✓</span>
                </div>
                <p className="text-center text-white font-bold mt-3">Self Awareness</p>
                <p className="text-center text-emerald-400 text-sm">+100 XP</p>
              </div>
            </div>

            {/* Middle row */}
            <div className="absolute left-[30%] top-[140px] transform -translate-x-1/2">
              <div className="relative">
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50 border-2 border-blue-300 animate-pulse">
                  <span className="text-4xl">💬</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">
                  !
                </div>
                <p className="text-center text-white font-bold mt-3">Communication</p>
                <p className="text-center text-blue-400 text-sm">In Progress</p>
              </div>
            </div>

            <div className="absolute left-[70%] top-[140px] transform -translate-x-1/2">
              <div className="relative opacity-50">
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center border-2 border-slate-500">
                  <span className="text-4xl grayscale">👥</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl">🔒</span>
                </div>
                <p className="text-center text-slate-400 font-bold mt-3">Team Leadership</p>
                <p className="text-center text-slate-500 text-sm">Locked</p>
              </div>
            </div>

            {/* Bottom node */}
            <div className="absolute left-1/2 top-[280px] transform -translate-x-1/2">
              <div className="relative opacity-40">
                <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center border-2 border-amber-400">
                  <span className="text-5xl grayscale">🏆</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">🔒</span>
                </div>
                <p className="text-center text-slate-400 font-bold mt-3">Certification</p>
                <p className="text-center text-slate-500 text-sm">Master Level</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Design 4: Circular Progress Rings
  const ProgressRings = () => {
    const completedSections = journeyData.sections.filter(s => s.status === 'completed').length;
    const progress = (completedSections / journeyData.sections.length) * 100;

    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">{journeyData.title}</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Main Ring */}
          <div className="relative w-64 h-64">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background rings */}
              {journeyData.sections.map((_, idx) => (
                <circle
                  key={idx}
                  cx="128"
                  cy="128"
                  r={100 - idx * 20}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                />
              ))}
              {/* Progress rings */}
              {journeyData.sections.map((section, idx) => {
                const radius = 100 - idx * 20;
                const circumference = 2 * Math.PI * radius;
                const sectionProgress = section.status === 'completed' ? 100 :
                  section.status === 'in-progress' ? 
                  (section.items.filter(i => i.completed).length / section.items.length) * 100 : 0;
                
                return (
                  <circle
                    key={idx}
                    cx="128"
                    cy="128"
                    r={radius}
                    fill="none"
                    stroke={section.status === 'completed' ? '#10b981' : 
                           section.status === 'in-progress' ? '#3b82f6' : '#d1d5db'}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (sectionProgress / 100) * circumference}
                    className="transition-all duration-1000"
                  />
                );
              })}
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-gray-800">{Math.round(progress)}%</span>
              <span className="text-gray-500">Complete</span>
            </div>
          </div>

          {/* Section List */}
          <div className="flex-1 space-y-4">
            {journeyData.sections.map((section, idx) => {
              const sectionProgress = section.status === 'completed' ? 100 :
                section.status === 'in-progress' ? 
                Math.round((section.items.filter(i => i.completed).length / section.items.length) * 100) : 0;
              
              const colors = ['emerald', 'blue', 'purple', 'amber'];
              
              return (
                <div key={section.id} className={`p-4 rounded-xl border-2 ${
                  section.status === 'completed' ? 'bg-emerald-50 border-emerald-200' :
                  section.status === 'in-progress' ? 'bg-blue-50 border-blue-200' :
                  'bg-gray-50 border-gray-200 opacity-60'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full bg-${colors[idx]}-500`}></div>
                      <span className="font-semibold text-gray-800">{section.title}</span>
                    </div>
                    <span className={`font-bold ${
                      section.status === 'completed' ? 'text-emerald-600' :
                      section.status === 'in-progress' ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {sectionProgress}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        section.status === 'completed' ? 'bg-emerald-500' :
                        section.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                      style={{ width: `${sectionProgress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Design 5: Kanban Board Style
  const KanbanBoard = () => (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">{journeyData.title}</h2>
      
      <div className="grid grid-cols-3 gap-6">
        {/* To Do Column */}
        <div className="bg-slate-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-slate-400"></div>
            <h3 className="font-bold text-slate-700">To Do</h3>
            <span className="ml-auto bg-slate-300 text-slate-600 text-xs px-2 py-1 rounded-full">
              {journeyData.sections.filter(s => s.status === 'locked').length}
            </span>
          </div>
          <div className="space-y-3">
            {journeyData.sections.filter(s => s.status === 'locked').map(section => (
              <div key={section.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🔒</span>
                  <h4 className="font-semibold text-gray-700">{section.title}</h4>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>📚 {section.items.length} items</span>
                  <span>•</span>
                  <span>⚡ {section.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <h3 className="font-bold text-blue-700">In Progress</h3>
            <span className="ml-auto bg-blue-200 text-blue-700 text-xs px-2 py-1 rounded-full">
              {journeyData.sections.filter(s => s.status === 'in-progress').length}
            </span>
          </div>
          <div className="space-y-3">
            {journeyData.sections.filter(s => s.status === 'in-progress').map(section => (
              <div key={section.id} className="bg-white p-4 rounded-lg shadow-sm border-2 border-blue-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🎯</span>
                  <h4 className="font-semibold text-gray-800">{section.title}</h4>
                </div>
                <div className="space-y-2 mb-3">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={item.completed} 
                        readOnly
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className={item.completed ? 'line-through text-gray-400' : 'text-gray-700'}>
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(section.items.filter(i => i.completed).length / section.items.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Done Column */}
        <div className="bg-emerald-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <h3 className="font-bold text-emerald-700">Done</h3>
            <span className="ml-auto bg-emerald-200 text-emerald-700 text-xs px-2 py-1 rounded-full">
              {journeyData.sections.filter(s => s.status === 'completed').length}
            </span>
          </div>
          <div className="space-y-3">
            {journeyData.sections.filter(s => s.status === 'completed').map(section => (
              <div key={section.id} className="bg-white p-4 rounded-lg shadow-sm border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">✅</span>
                  <h4 className="font-semibold text-gray-700">{section.title}</h4>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-600">All {section.items.length} items complete</span>
                  <span className="text-amber-600 font-bold">+{section.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Design 6: Netflix/Streaming Style
  const StreamingStyle = () => (
    <div className="bg-slate-950 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">{journeyData.title}</h2>
          <p className="text-slate-400 mt-1">Continue your learning journey</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-slate-400 text-sm">Overall Progress</p>
            <p className="text-white font-bold text-xl">35%</p>
          </div>
          <div className="w-24 h-24 relative">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="40" fill="none" stroke="#334155" strokeWidth="8" />
              <circle 
                cx="48" cy="48" r="40" fill="none" 
                stroke="#ef4444" strokeWidth="8"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * 0.65}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Continue Watching */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">📺 Continue Learning</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {journeyData.sections.filter(s => s.status === 'in-progress').flatMap(section => 
            section.items.filter(item => !item.completed).map((item, idx) => (
              <div key={idx} className="flex-shrink-0 w-72 group cursor-pointer">
                <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl h-40 flex items-center justify-center overflow-hidden">
                  <span className="text-6xl opacity-50">💬</span>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                      <span className="text-3xl">▶️</span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700">
                    <div className="h-full bg-red-500" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-white font-semibold">{item.name}</p>
                  <p className="text-slate-400 text-sm">{section.title}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* All Sections */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">📚 All Sections</h3>
        <div className="grid grid-cols-4 gap-4">
          {journeyData.sections.map((section, idx) => (
            <div key={section.id} className={`group cursor-pointer ${section.status === 'locked' ? 'opacity-50' : ''}`}>
              <div className={`relative rounded-xl h-32 flex items-center justify-center overflow-hidden ${
                section.status === 'completed' ? 'bg-gradient-to-br from-emerald-600 to-teal-700' :
                section.status === 'in-progress' ? 'bg-gradient-to-br from-blue-600 to-indigo-700' :
                'bg-gradient-to-br from-slate-700 to-slate-800'
              }`}>
                <span className="text-5xl">{['🧠', '💬', '👥', '🏆'][idx]}</span>
                {section.status === 'completed' && (
                  <div className="absolute top-2 right-2 bg-emerald-500 rounded-full p-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
                {section.status === 'locked' && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-4xl">🔒</span>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <p className="text-white font-semibold text-sm">{section.title}</p>
                <p className="text-slate-400 text-xs">{section.items.length} lessons • {section.xp} XP</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const designs = [
    { name: '🎮 Duolingo Path', component: <DuolingoPath /> },
    { name: '🚇 Metro Map', component: <MetroMap /> },
    { name: '⚔️ Skill Tree', component: <SkillTree /> },
    { name: '⭕ Progress Rings', component: <ProgressRings /> },
    { name: '📋 Kanban Board', component: <KanbanBoard /> },
    { name: '📺 Streaming Style', component: <StreamingStyle /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          ✨ Innovative Journey Designs
        </h1>
        <p className="text-gray-500 text-center">
          6 creative, modern patterns for learning progress
        </p>
      </div>

      {/* Design Selector */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {designs.map((design, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDesign(idx)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeDesign === idx
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {design.name}
            </button>
          ))}
        </div>
      </div>

      {/* Display */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {designs[activeDesign].component}
      </div>
    </div>
  );
};

export default InnovativeJourneyDesigns;
