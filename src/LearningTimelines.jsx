import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LearningTimelines = () => {
  const [activeDesign, setActiveDesign] = useState(0);
  const navigate = useNavigate();

  const journeyData = {
    title: "Leadership Development Journey",
    sections: [
      {
        id: 1,
        title: "Self Awareness",
        status: "completed",
        items: [
          { name: "Personality Assessment", duration: "30 min", type: "assessment", completed: true },
          { name: "Strengths Finder", duration: "45 min", type: "exercise", completed: true },
          { name: "Reflection Journal", duration: "20 min", type: "activity", completed: true },
        ]
      },
      {
        id: 2,
        title: "Communication Skills",
        status: "in-progress",
        items: [
          { name: "Active Listening", duration: "25 min", type: "video", completed: true },
          { name: "Giving Feedback", duration: "30 min", type: "video", completed: false },
          { name: "Practice Session", duration: "40 min", type: "exercise", completed: false },
        ]
      },
      {
        id: 3,
        title: "Team Leadership",
        status: "locked",
        items: [
          { name: "Delegation Basics", duration: "35 min", type: "video", completed: false },
          { name: "Conflict Resolution", duration: "45 min", type: "video", completed: false },
          { name: "Team Exercise", duration: "60 min", type: "exercise", completed: false },
        ]
      },
      {
        id: 4,
        title: "Certification",
        status: "locked",
        items: [
          { name: "Final Assessment", duration: "45 min", type: "assessment", completed: false },
          { name: "Certificate", duration: "—", type: "certificate", completed: false },
        ]
      }
    ]
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-emerald-500';
      case 'in-progress': return 'bg-blue-500';
      case 'locked': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getStatusBorder = (status) => {
    switch(status) {
      case 'completed': return 'border-emerald-500';
      case 'in-progress': return 'border-blue-500';
      case 'locked': return 'border-gray-300';
      default: return 'border-gray-300';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'video': return '▶️';
      case 'assessment': return '📝';
      case 'exercise': return '💪';
      case 'activity': return '✏️';
      case 'certificate': return '🏆';
      default: return '📄';
    }
  };

  // Design 1: Simple Vertical Timeline
  const VerticalTimeline = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-6">{journeyData.title}</h2>
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {journeyData.sections.map((section, idx) => (
          <div key={section.id} className="relative pl-12 pb-8 last:pb-0">
            {/* Node */}
            <div className={`absolute left-0 w-8 h-8 rounded-full ${getStatusColor(section.status)} flex items-center justify-center text-white text-sm font-bold shadow-md`}>
              {section.status === 'completed' ? '✓' : idx + 1}
            </div>

            {/* Content */}
            <div className={`bg-white rounded-lg border-2 ${getStatusBorder(section.status)} p-4 shadow-sm`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">{section.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  section.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                  section.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {section.status === 'completed' ? 'Completed' :
                   section.status === 'in-progress' ? 'In Progress' : 'Locked'}
                </span>
              </div>

              <div className="space-y-2">
                {section.items.map((item, i) => (
                  <div key={i} className={`flex items-center justify-between py-2 px-3 rounded ${
                    item.completed ? 'bg-emerald-50' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span>{getTypeIcon(item.type)}</span>
                      <span className={item.completed ? 'text-gray-600' : 'text-gray-800'}>
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{item.duration}</span>
                      {item.completed && <span className="text-emerald-500">✓</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Design 2: Horizontal Step Progress
  const HorizontalSteps = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-8 text-center">{journeyData.title}</h2>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {journeyData.sections.map((section, idx) => (
          <React.Fragment key={section.id}>
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full ${getStatusColor(section.status)} flex items-center justify-center text-white font-bold shadow-lg`}>
                {section.status === 'completed' ? '✓' : idx + 1}
              </div>
              <span className={`mt-2 text-sm font-medium ${
                section.status === 'locked' ? 'text-gray-400' : 'text-gray-700'
              }`}>
                {section.title}
              </span>
            </div>
            {idx < journeyData.sections.length - 1 && (
              <div className={`flex-1 h-1 mx-2 rounded ${
                section.status === 'completed' ? 'bg-emerald-500' : 'bg-gray-200'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Current Section Details */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        {journeyData.sections.filter(s => s.status === 'in-progress').map(section => (
          <div key={section.id}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">📚 {section.title}</h3>
              <span className="text-sm text-blue-600 font-medium">
                {section.items.filter(i => i.completed).length}/{section.items.length} completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${(section.items.filter(i => i.completed).length / section.items.length) * 100}%` }}
              ></div>
            </div>
            <div className="grid gap-3">
              {section.items.map((item, i) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-lg border ${
                  item.completed ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-gray-200 hover:border-blue-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getTypeIcon(item.type)}</span>
                    <div>
                      <p className={`font-medium ${item.completed ? 'text-gray-500' : 'text-gray-800'}`}>
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">{item.duration}</p>
                    </div>
                  </div>
                  {item.completed ? (
                    <span className="text-emerald-500 text-xl">✓</span>
                  ) : (
                    <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600">
                      Start
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Design 3: Card Grid with Progress
  const CardGrid = () => (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">{journeyData.title}</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Overall Progress:</span>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '35%' }}></div>
          </div>
          <span className="text-sm font-medium text-emerald-600">35%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {journeyData.sections.map((section, idx) => (
          <div
            key={section.id}
            className={`rounded-xl p-5 border-2 transition-all ${
              section.status === 'completed' ? 'bg-emerald-50 border-emerald-300' :
              section.status === 'in-progress' ? 'bg-white border-blue-400 shadow-lg' :
              'bg-gray-50 border-gray-200 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${getStatusColor(section.status)} flex items-center justify-center text-white font-bold`}>
                  {section.status === 'completed' ? '✓' : idx + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{section.title}</h3>
                  <p className="text-xs text-gray-500">
                    {section.items.length} items • {section.items.reduce((acc, i) => {
                      const mins = parseInt(i.duration) || 0;
                      return acc + mins;
                    }, 0)} min
                  </p>
                </div>
              </div>
              {section.status === 'locked' && (
                <span className="text-gray-400">🔒</span>
              )}
            </div>

            {/* Mini progress */}
            <div className="flex gap-1 mb-3">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${
                    item.completed ? 'bg-emerald-500' : 'bg-gray-200'
                  }`}
                ></div>
              ))}
            </div>

            <div className="text-sm text-gray-600">
              {section.status === 'completed' ? (
                <span className="text-emerald-600">✓ All items completed</span>
              ) : section.status === 'in-progress' ? (
                <span className="text-blue-600">
                  {section.items.filter(i => i.completed).length} of {section.items.length} completed
                </span>
              ) : (
                <span className="text-gray-400">Complete previous section to unlock</span>
              )}
            </div>

            {section.status === 'in-progress' && (
              <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">
                Continue Learning
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Design 4: Minimal List View
  const MinimalList = () => (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{journeyData.title}</h2>
      <p className="text-gray-500 text-sm mb-6">4 sections • 11 items • ~5 hours</p>

      <div className="space-y-2">
        {journeyData.sections.map((section, idx) => (
          <details
            key={section.id}
            className="group"
            open={section.status === 'in-progress'}
          >
            <summary className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
              section.status === 'completed' ? 'bg-emerald-50' :
              section.status === 'in-progress' ? 'bg-blue-50' :
              'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full ${getStatusColor(section.status)} flex items-center justify-center text-white text-xs font-bold`}>
                  {section.status === 'completed' ? '✓' : idx + 1}
                </div>
                <span className={`font-medium ${section.status === 'locked' ? 'text-gray-400' : 'text-gray-800'}`}>
                  {section.title}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">
                  {section.items.filter(i => i.completed).length}/{section.items.length}
                </span>
                <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </summary>

            <div className="ml-9 mt-2 space-y-1">
              {section.items.map((item, i) => (
                <div key={i} className={`flex items-center justify-between py-2 px-3 rounded ${
                  item.completed ? 'text-gray-400' : 'text-gray-700'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span className={item.completed ? '' : ''}>{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{item.duration}</span>
                    {item.completed && <span className="text-emerald-500 text-sm">✓</span>}
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );

  // Design 5: Roadmap Style
  const RoadmapStyle = () => (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-8 text-center">{journeyData.title}</h2>

      <div className="relative">
        {journeyData.sections.map((section, idx) => (
          <div key={section.id} className={`flex ${idx % 2 === 0 ? '' : 'flex-row-reverse'} mb-8`}>
            {/* Content */}
            <div className="w-5/12">
              <div className={`p-5 rounded-xl ${
                section.status === 'completed' ? 'bg-emerald-500 text-white' :
                section.status === 'in-progress' ? 'bg-blue-500 text-white' :
                'bg-gray-100 text-gray-500'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold">{String(idx + 1).padStart(2, '0')}</span>
                  <h3 className="font-semibold">{section.title}</h3>
                </div>
                <p className={`text-sm ${section.status === 'locked' ? 'text-gray-400' : 'opacity-90'}`}>
                  {section.items.length} activities • {section.items.filter(i => i.completed).length} completed
                </p>
              </div>
            </div>

            {/* Center Line & Node */}
            <div className="w-2/12 flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full ${getStatusColor(section.status)} z-10`}></div>
              {idx < journeyData.sections.length - 1 && (
                <div className={`w-0.5 flex-1 ${
                  section.status === 'completed' ? 'bg-emerald-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>

            {/* Spacer */}
            <div className="w-5/12"></div>
          </div>
        ))}
      </div>
    </div>
  );

  // Design 6: Modern Stepper
  const ModernStepper = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-6">{journeyData.title}</h2>

      {journeyData.sections.map((section, idx) => (
        <div key={section.id} className="flex gap-4 pb-8 last:pb-0">
          {/* Left: Step indicator */}
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-2xl ${getStatusColor(section.status)} flex items-center justify-center text-white font-bold shadow-lg`}>
              {section.status === 'completed' ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span>{idx + 1}</span>
              )}
            </div>
            {idx < journeyData.sections.length - 1 && (
              <div className={`w-1 flex-1 mt-2 rounded-full ${
                section.status === 'completed' ? 'bg-emerald-300' : 'bg-gray-200'
              }`}></div>
            )}
          </div>

          {/* Right: Content */}
          <div className="flex-1 pb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`font-semibold text-lg ${section.status === 'locked' ? 'text-gray-400' : 'text-gray-800'}`}>
                {section.title}
              </h3>
              {section.status === 'completed' && (
                <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-full">
                  Completed
                </span>
              )}
              {section.status === 'in-progress' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                  Current
                </span>
              )}
              {section.status === 'locked' && (
                <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                  Locked
                </span>
              )}
            </div>

            {section.status !== 'locked' && (
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                {section.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        item.completed ? 'bg-emerald-100' : 'bg-white border border-gray-200'
                      }`}>
                        {item.completed ? (
                          <span className="text-emerald-500">✓</span>
                        ) : (
                          <span>{getTypeIcon(item.type)}</span>
                        )}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${item.completed ? 'text-gray-400' : 'text-gray-700'}`}>
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">{item.duration}</p>
                      </div>
                    </div>
                    {!item.completed && section.status === 'in-progress' && (
                      <button className="text-blue-500 text-sm font-medium hover:text-blue-600">
                        Start →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.status === 'locked' && (
              <p className="text-sm text-gray-400 flex items-center gap-2">
                🔒 Complete previous section to unlock
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // Design 7: Trail Map with Sidebar
  const trailCourseData = {
    title: 'Full-Stack Development Path',
    subtitle: 'From zero to hero — build real-world apps',
    totalHours: 48,
    completedHours: 18,
    streak: "Anwesh",
    level: 'Lorem ipsum..',
    xp: "Lorem..",
    modules: [
      {
        id: 1, title: 'HTML & CSS Foundations', emoji: '🏕️', tag: 'Base Camp',
        status: 'completed', xp: 300, earnedXP: 300, hours: 8, color: 'emerald',
        lessons: [
          { name: 'HTML Structure', type: 'video', done: true },
          { name: 'CSS Box Model', type: 'video', done: true },
          { name: 'Flexbox Deep Dive', type: 'exercise', done: true },
          { name: 'Responsive Layout Quiz', type: 'quiz', done: true },
        ],
      },
      {
        id: 2, title: 'JavaScript Essentials', emoji: '🌄', tag: 'Trail Head',
        status: 'in-progress', xp: 400, earnedXP: 160, hours: 12, color: 'blue',
        lessons: [
          { name: 'Variables & Functions', type: 'video', done: true },
          { name: 'DOM Manipulation', type: 'video', done: true },
          { name: 'Async & Promises', type: 'exercise', done: false },
          { name: 'JS Mini Project', type: 'project', done: false },
        ],
      },
      {
        id: 3, title: 'React Framework', emoji: '⛰️', tag: 'Mid Summit',
        status: 'locked', xp: 500, earnedXP: 0, hours: 16, color: 'violet',
        lessons: [
          { name: 'Components & Props', type: 'video', done: false },
          { name: 'State & Hooks', type: 'video', done: false },
          { name: 'Context & Routing', type: 'exercise', done: false },
          { name: 'React App Project', type: 'project', done: false },
        ],
      },
      {
        id: 4, title: 'Backend & APIs', emoji: '🏔️', tag: 'Peak Summit',
        status: 'locked', xp: 600, earnedXP: 0, hours: 12, color: 'rose',
        lessons: [
          { name: 'Node.js Intro', type: 'video', done: false },
          { name: 'REST API Design', type: 'video', done: false },
          { name: 'Full-Stack Project', type: 'project', done: false },
          { name: 'Final Certification', type: 'certificate', done: false },
        ],
      },
    ],
  };

  const trailColorMap = {
    emerald: { bg: 'bg-emerald-500', border: 'border-emerald-400', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700', ring: 'ring-emerald-400', progress: 'bg-emerald-500' },
    blue: { bg: 'bg-blue-500', border: 'border-blue-400', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700', ring: 'ring-blue-400', progress: 'bg-blue-500' },
    violet: { bg: 'bg-violet-500', border: 'border-violet-400', text: 'text-violet-700', badge: 'bg-violet-100 text-violet-700', ring: 'ring-violet-400', progress: 'bg-violet-500' },
    rose: { bg: 'bg-rose-500', border: 'border-rose-400', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-700', ring: 'ring-rose-400', progress: 'bg-rose-500' },
  };

  const trailTypeIcon = (type) => {
    const icons = { video: '▶️', exercise: '💪', quiz: '📝', project: '🛠️', certificate: '🏆' };
    return icons[type] || '📄';
  };

  const trailOverallPct = Math.round((trailCourseData.completedHours / trailCourseData.totalHours) * 100);

  const TrailMapSidebar = () => (
    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <div className="lg:w-64 flex-shrink-0 space-y-4">
        <div className="bg-gradient-to-br from-indigo-700 to-purple-800 rounded-2xl p-5 text-white">
          <div className="text-4xl mb-2">🗺️</div>
          <div className="font-bold text-lg leading-tight">{trailCourseData.title}</div>
          <div className="text-indigo-200 text-sm mt-1">{trailCourseData.subtitle}</div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-indigo-300">Progress</span><span className="font-bold">{trailOverallPct}%</span></div>
            <div className="h-2 bg-indigo-900/50 rounded-full"><div className="h-full bg-white rounded-full" style={{ width: `${trailOverallPct}%` }} /></div>
          </div>
        </div>
        {/*{[*/}
        {/*  { label: '🔥 Instructors', value: `${trailCourseData.streak} days` },*/}
        {/*  { label: '⚡ XP Earned', value: trailCourseData.xp },*/}
        {/*  { label: '⏱️ Course Duration', value: `${trailCourseData.completedHours}h` },*/}
        {/*  { label: '🎖️ What will you learn', value: trailCourseData.level },*/}
        {/*].map((s, i) => (*/}
        {/*  <div key={i} className="bg-white rounded-xl px-4 py-3 flex justify-between items-center shadow-sm border border-slate-100">*/}
        {/*    <span className="text-slate-500 text-sm">{s.label}</span>*/}
        {/*    <span className="font-bold text-slate-800 text-sm">{s.value}</span>*/}
        {/*  </div>*/}
        {/*))}*/}
      </div>

      {/* Trail map */}
      <div className="flex-1">
        <div className="space-y-0">
          {trailCourseData.modules.map((mod, idx) => {
            const c = trailColorMap[mod.color];
            const isLast = idx === trailCourseData.modules.length - 1;
            return (
              <div key={mod.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-4 z-10
                    ${mod.status === 'completed' ? `${c.bg} border-white shadow-lg` :
                      mod.status === 'in-progress' ? `bg-white ${c.border} shadow-lg ring-4 ${c.ring} ring-opacity-30` :
                      'bg-slate-100 border-slate-200'}`}>
                    {mod.status === 'completed' ? '✅' : mod.status === 'in-progress' ? mod.emoji : '🔒'}
                  </div>
                  {!isLast && (
                    <div className={`w-1 flex-1 min-h-12 rounded-full mt-1 mb-1
                      ${mod.status === 'completed' ? c.bg : 'bg-slate-200'}`} />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className={`rounded-2xl border overflow-hidden transition-all duration-300
                    ${mod.status === 'locked' ? 'border-slate-200 bg-slate-50' : `${c.border} bg-white shadow-md hover:shadow-lg`}`}>
                    <div className="p-4 flex items-start gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.badge}`}>{mod.tag}</span>
                          <span className={`text-xs font-semibold ${mod.status === 'locked' ? 'text-slate-400' : c.text}`}>
                            {mod.status === 'completed' ? '✅ Completed' : mod.status === 'in-progress' ? '🔵 Active' : '🔒 Locked'}
                          </span>
                        </div>
                        <h3 className={`font-bold text-base ${mod.status === 'locked' ? 'text-slate-400' : 'text-slate-800'}`}>{mod.title}</h3>
                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500">
                          <span>⏱️ {mod.hours}h total</span>
                          <span>⚡ {mod.xp} XP</span>
                          <span>📚 {mod.lessons.length} lessons</span>
                        </div>
                        <div className="flex gap-1.5 mt-3 flex-wrap">
                          {mod.lessons.map((l, li) => (
                            <div key={li} title={l.name}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs border
                                ${l.done ? `${c.bg} border-transparent text-white` : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                              {trailTypeIcon(l.type)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="h-1.5 bg-slate-100">
                      <div className={`h-full ${c.progress}`} style={{ width: `${Math.round((mod.earnedXP / mod.xp) * 100)}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Design 8: NewMap
  const NewMap = () => (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
      {/* Left: Sidebar */}
      <div className="lg:w-64 flex-shrink-0 space-y-4">
        <div className="bg-gradient-to-br from-indigo-700 to-purple-800 rounded-2xl p-5 text-white">
          <div className="text-4xl mb-2">🗺️</div>
          <div className="font-bold text-lg leading-tight">{trailCourseData.title}</div>
          <div className="text-indigo-200 text-sm mt-1">{trailCourseData.subtitle}</div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-indigo-300">Progress</span><span className="font-bold">{trailOverallPct}%</span></div>
            <div className="h-2 bg-indigo-900/50 rounded-full"><div className="h-full bg-white rounded-full" style={{ width: `${trailOverallPct}%` }} /></div>
          </div>
        </div>
        {[
          { label: '🔥 Instructors', value: `${trailCourseData.streak} ` },
          { label: '⚡ What will you learn', value: trailCourseData.xp },
          { label: '⏱️ Course Duration', value: `${trailCourseData.completedHours}h` },
          { label: '🎖️ Description', value: trailCourseData.level },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl px-4 py-3 flex justify-between items-center shadow-sm border border-slate-100">
            <span className="text-slate-500 text-sm">{s.label}</span>
            <span className="font-bold text-slate-800 text-sm">{s.value}</span>
          </div>
        ))}
      </div>


      {/* Right: Modern Stepper */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800 mb-6">{journeyData.title}</h2>
        {journeyData.sections.map((section, idx) => (
          <div key={section.id} className="flex gap-4 pb-8 last:pb-0">
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-2xl ${getStatusColor(section.status)} flex items-center justify-center text-white font-bold shadow-lg`}>
                {section.status === 'completed' ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              {idx < journeyData.sections.length - 1 && (
                <div className={`w-1 flex-1 mt-2 rounded-full ${
                  section.status === 'completed' ? 'bg-emerald-300' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-semibold text-lg ${section.status === 'locked' ? 'text-gray-400' : 'text-gray-800'}`}>
                  {section.title}
                </h3>
                {section.status === 'completed' && (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-full">
                    Completed
                  </span>
                )}
                {section.status === 'in-progress' && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                    Current
                  </span>
                )}
                {section.status === 'locked' && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                    Locked
                  </span>
                )}
              </div>
              {section.status !== 'locked' && (
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          item.completed ? 'bg-emerald-100' : 'bg-white border border-gray-200'
                        }`}>
                          {item.completed ? (
                            <span className="text-emerald-500">✓</span>
                          ) : (
                            <span>{getTypeIcon(item.type)}</span>
                          )}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${item.completed ? 'text-gray-400' : 'text-gray-700'}`}>
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400">{item.duration}</p>
                        </div>
                      </div>
                      {!item.completed && section.status === 'in-progress' && (
                        <button className="text-blue-500 text-sm font-medium hover:text-blue-600">
                          Start →
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {section.status === 'locked' && (
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  🔒 Complete previous section to unlock
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Design 9: Flow Builder Journey
  const FlowBuilder = () => {
    const [positions, setPositions] = useState([
      { x: 60, y: 40 },
      { x: 300, y: 30 },
      { x: 540, y: 60 },
      { x: 380, y: 220 },
    ]);
    const [stickyPos, setStickyPos] = useState({ x: 300, y: 370 });
    const [dragging, setDragging] = useState(null); // { type: 'node'|'sticky', idx, offsetX, offsetY }

    const handleMouseDown = (e, type, idx) => {
      e.preventDefault();
      const rect = e.currentTarget.closest('.flow-canvas').getBoundingClientRect();
      const pos = type === 'sticky' ? stickyPos : positions[idx];
      setDragging({
        type,
        idx,
        offsetX: e.clientX - rect.left - pos.x,
        offsetY: e.clientY - rect.top - pos.y,
      });
    };

    const handleMouseMove = (e) => {
      if (!dragging) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragging.offsetX;
      const newY = e.clientY - rect.top - dragging.offsetY;
      if (dragging.type === 'sticky') {
        setStickyPos({ x: Math.max(0, newX), y: Math.max(0, newY) });
      } else {
        setPositions(prev => prev.map((p, i) => i === dragging.idx ? { x: Math.max(0, newX), y: Math.max(0, newY) } : p));
      }
    };

    const handleMouseUp = () => setDragging(null);

    const getNodeBorder = (status) => {
      switch (status) {
        case 'completed': return 'border-emerald-400 shadow-emerald-200';
        case 'in-progress': return 'border-yellow-400 shadow-yellow-200';
        case 'locked': return 'border-gray-300 shadow-gray-100';
        default: return 'border-gray-300';
      }
    };

    const getNodeBg = (status) => {
      switch (status) {
        case 'completed': return 'bg-white';
        case 'in-progress': return 'bg-yellow-50';
        case 'locked': return 'bg-gray-50';
        default: return 'bg-gray-50';
      }
    };

    const getNodeIcon = (status) => {
      switch (status) {
        case 'completed': return '✅';
        case 'in-progress': return '💬';
        case 'locked': return '🔒';
        default: return '📄';
      }
    };

    const getTagColor = (status) => {
      switch (status) {
        case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        case 'in-progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        case 'locked': return 'bg-gray-100 text-gray-500 border-gray-200';
        default: return 'bg-gray-100 text-gray-500';
      }
    };

    const getStatusLabel = (status) => {
      switch (status) {
        case 'completed': return 'Completed';
        case 'in-progress': return 'Current';
        case 'locked': return 'Locked';
        default: return '';
      }
    };

    return (
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{journeyData.title}</h2>
        <p className="text-sm text-gray-500 mb-8">Visual flow of your learning path — drag nodes to rearrange</p>

        {/* Flow Canvas */}
        <div
          className="flow-canvas relative bg-white rounded-3xl border-2 border-dashed border-gray-200 p-6 min-h-[520px] overflow-hidden select-none"
          style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px', cursor: dragging ? 'grabbing' : 'default' }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >

          {/* SVG Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {journeyData.sections.slice(0, -1).map((_, idx) => {
              const from = positions[idx];
              const to = positions[idx + 1];
              const fromX = from.x + 130;
              const fromY = from.y + 60;
              const toX = to.x + 10;
              const toY = to.y + 60;
              const cpX1 = fromX + 60;
              const cpY1 = fromY;
              const cpX2 = toX - 60;
              const cpY2 = toY;
              const section = journeyData.sections[idx];
              return (
                <path
                  key={idx}
                  d={`M ${fromX} ${fromY} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${toX} ${toY}`}
                  fill="none"
                  stroke={section.status === 'completed' ? '#6366f1' : '#d1d5db'}
                  strokeWidth="3"
                  strokeDasharray={section.status === 'completed' ? '0' : '8 6'}
                  strokeLinecap="round"
                />
              );
            })}
            {journeyData.sections.slice(0, -1).map((section, idx) => {
              const from = positions[idx];
              return (
                <circle
                  key={`dot-${idx}`}
                  cx={from.x + 130}
                  cy={from.y + 60}
                  r="5"
                  fill={section.status === 'completed' ? '#6366f1' : '#9ca3af'}
                  stroke="white"
                  strokeWidth="2"
                />
              );
            })}
          </svg>

          {/* Flow Nodes */}
          {journeyData.sections.map((section, idx) => {
            const pos = positions[idx];
            return (
              <div
                key={section.id}
                className={`absolute rounded-2xl border-2 ${getNodeBorder(section.status)} ${getNodeBg(section.status)} shadow-lg hover:shadow-xl ${dragging?.type === 'node' && dragging?.idx === idx ? 'scale-105 shadow-2xl z-30' : ''}`}
                style={{ left: `${pos.x}px`, top: `${pos.y}px`, width: '240px', zIndex: dragging?.type === 'node' && dragging?.idx === idx ? 30 : 10, cursor: 'grab', transition: dragging?.type === 'node' && dragging?.idx === idx ? 'none' : 'box-shadow 0.2s, transform 0.2s' }}
                onMouseDown={(e) => handleMouseDown(e, 'node', idx)}
              >
                {/* Node Header */}
                <div className="flex items-center gap-2 px-4 pt-4 pb-2">
                  <span className="text-xl">{getNodeIcon(section.status)}</span>
                  <span className="font-bold text-gray-800 text-sm">{section.title}</span>
                </div>

                {/* Node Content */}
                <div className="px-4 pb-3">
                  {section.status !== 'locked' ? (
                    <div className="space-y-1.5">
                      {section.items.map((item, i) => (
                        <div key={i} className={`flex items-center gap-2 text-xs ${item.completed ? 'text-gray-500' : 'text-gray-700'}`}>
                          <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                            item.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {item.completed ? '✓' : getTypeIcon(item.type)}
                          </span>
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">Complete previous step to unlock</p>
                  )}
                </div>

                {/* Action Buttons */}
                {section.status === 'in-progress' && (
                  <div className="px-4 pb-3 flex gap-2">
                    <button className="flex-1 py-1.5 bg-indigo-500 text-white text-xs font-semibold rounded-lg hover:bg-indigo-600 transition-colors"
                      onMouseDown={(e) => e.stopPropagation()}>
                      Continue →
                    </button>
                    <button className="py-1.5 px-3 bg-gray-100 text-gray-500 text-xs rounded-lg hover:bg-gray-200 transition-colors"
                      onMouseDown={(e) => e.stopPropagation()}>
                      Skip
                    </button>
                  </div>
                )}

                {/* Status Tag */}
                <div className={`mx-4 mb-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold ${getTagColor(section.status)}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    section.status === 'completed' ? 'bg-emerald-500' :
                    section.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></span>
                  {getStatusLabel(section.status)}
                </div>

                {/* Connector Handle (right) */}
                {idx < journeyData.sections.length - 1 && (
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-indigo-400 z-20" />
                )}
                {/* Connector Handle (left) */}
                {idx > 0 && (
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-indigo-400 z-20" />
                )}
              </div>
            );
          })}

          {/* Draggable Sticky Note */}
          <div
            className={`absolute bg-yellow-300 rounded-xl p-4 shadow-md rotate-1 ${dragging?.type === 'sticky' ? 'scale-105 shadow-2xl z-30' : ''}`}
            style={{ left: `${stickyPos.x}px`, top: `${stickyPos.y}px`, width: '180px', zIndex: dragging?.type === 'sticky' ? 30 : 10, cursor: 'grab', transition: dragging?.type === 'sticky' ? 'none' : 'box-shadow 0.2s, transform 0.2s' }}
            onMouseDown={(e) => handleMouseDown(e, 'sticky', null)}
          >
            <p className="text-sm text-yellow-900 font-medium">📌 Tip: Complete all sections to earn your certificate!</p>
          </div>

          {/* Bottom Toolbar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-900 rounded-xl px-3 py-2 shadow-xl" style={{ zIndex: 20 }}>
            {['💬', '📌', '🏷️', '📋', '💡', '⚡', '👁️'].map((icon, i) => (
              <button key={i} className="w-8 h-8 rounded-lg hover:bg-slate-700 flex items-center justify-center text-sm transition-colors">
                {icon}
              </button>
            ))}
            <div className="w-6 h-6 rounded bg-yellow-400 ml-1" />
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs text-gray-400" style={{ zIndex: 20 }}>
            <button className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50">⟳</button>
            <button className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50">−</button>
            <span className="text-gray-500 font-medium">80%</span>
            <button className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50">+</button>
          </div>
        </div>
      </div>
    );
  };

  const designs = [
    { name: 'Vertical Timeline', component: <VerticalTimeline /> },
    { name: 'Horizontal Steps', component: <HorizontalSteps /> },
    { name: 'Card Grid', component: <CardGrid /> },
    { name: 'Minimal List', component: <MinimalList /> },
    { name: 'Roadmap', component: <RoadmapStyle /> },
    { name: 'Modern Stepper', component: <ModernStepper /> },
    { name: 'Trail Map', component: <TrailMapSidebar /> },
    { name: 'NewMap', component: <NewMap /> },
    { name: 'Flow Builder', component: <FlowBuilder /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Learning Journey Timeline Designs
        </h1>
        <p className="text-gray-500 text-center text-sm">
          9 clean timeline patterns + n8n flow builder for course/journey progress
        </p>
      </div>

      {/* Design Selector */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {designs.map((design, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDesign(idx)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeDesign === idx
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {design.name}
            </button>
          ))}
          <button
            onClick={() => navigate('/flow-builder')}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:from-purple-600 hover:to-pink-600"
          >
            🔀 NewFlow
          </button>
        </div>
      </div>

      {/* Display */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {designs[activeDesign].component}
      </div>

      {/* Legend */}
      <div className="max-w-4xl mx-auto mt-6 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-gray-600">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-gray-600">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <span className="text-gray-600">Locked</span>
        </div>
      </div>
    </div>
  );
};

export default LearningTimelines;
