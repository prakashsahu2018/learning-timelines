import React from 'react';

const JourneyCourseMix = () => {
  const courseData = {
    title: 'Full-Stack Development Path',
    subtitle: 'From zero to hero — build real-world apps',
    totalHours: 48,
    completedHours: 18,
    streak: 9,
    level: 'Intermediate Explorer',
    xp: 1240,
    nextLevelXP: 2000,
    badge: '🧭',
    modules: [
      {
        id: 1,
        title: 'HTML & CSS Foundations',
        emoji: '🏕️',
        tag: 'Base Camp',
        status: 'completed',
        xp: 300,
        earnedXP: 300,
        hours: 8,
        color: 'emerald',
        lessons: [
          { name: 'HTML Structure', type: 'video', duration: '20 min', done: true },
          { name: 'CSS Box Model', type: 'video', duration: '25 min', done: true },
          { name: 'Flexbox Deep Dive', type: 'exercise', duration: '30 min', done: true },
          { name: 'Responsive Layout Quiz', type: 'quiz', duration: '15 min', done: true },
        ],
      },
      {
        id: 2,
        title: 'JavaScript Essentials',
        emoji: '🌄',
        tag: 'Trail Head',
        status: 'in-progress',
        xp: 400,
        earnedXP: 160,
        hours: 12,
        color: 'blue',
        lessons: [
          { name: 'Variables & Functions', type: 'video', duration: '30 min', done: true },
          { name: 'DOM Manipulation', type: 'video', duration: '35 min', done: true },
          { name: 'Async & Promises', type: 'exercise', duration: '40 min', done: false },
          { name: 'JS Mini Project', type: 'project', duration: '90 min', done: false },
        ],
      },
      {
        id: 3,
        title: 'React Framework',
        emoji: '⛰️',
        tag: 'Mid Summit',
        status: 'locked',
        xp: 500,
        earnedXP: 0,
        hours: 16,
        color: 'violet',
        lessons: [
          { name: 'Components & Props', type: 'video', duration: '25 min', done: false },
          { name: 'State & Hooks', type: 'video', duration: '40 min', done: false },
          { name: 'Context & Routing', type: 'exercise', duration: '45 min', done: false },
          { name: 'React App Project', type: 'project', duration: '120 min', done: false },
        ],
      },
      {
        id: 4,
        title: 'Backend & APIs',
        emoji: '🏔️',
        tag: 'Peak Summit',
        status: 'locked',
        xp: 600,
        earnedXP: 0,
        hours: 12,
        color: 'rose',
        lessons: [
          { name: 'Node.js Intro', type: 'video', duration: '30 min', done: false },
          { name: 'REST API Design', type: 'video', duration: '35 min', done: false },
          { name: 'Full-Stack Project', type: 'project', duration: '180 min', done: false },
          { name: 'Final Certification', type: 'certificate', duration: '60 min', done: false },
        ],
      },
    ],
  };

  const colorMap = {
    emerald: {
      bg: 'bg-emerald-500', border: 'border-emerald-400',
      text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700',
      ring: 'ring-emerald-400', progress: 'bg-emerald-500',
    },
    blue: {
      bg: 'bg-blue-500', border: 'border-blue-400',
      text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700',
      ring: 'ring-blue-400', progress: 'bg-blue-500',
    },
    violet: {
      bg: 'bg-violet-500', border: 'border-violet-400',
      text: 'text-violet-700', badge: 'bg-violet-100 text-violet-700',
      ring: 'ring-violet-400', progress: 'bg-violet-500',
    },
    rose: {
      bg: 'bg-rose-500', border: 'border-rose-400',
      text: 'text-rose-700', badge: 'bg-rose-100 text-rose-700',
      ring: 'ring-rose-400', progress: 'bg-rose-500',
    },
  };

  const typeIcon = (type) => {
    const icons = { video: '▶️', exercise: '💪', quiz: '📝', project: '🛠️', certificate: '🏆' };
    return icons[type] || '📄';
  };

  const overallPct = Math.round((courseData.completedHours / courseData.totalHours) * 100);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0 space-y-4">
            <div className="bg-gradient-to-br from-indigo-700 to-purple-800 rounded-2xl p-5 text-white">
              <div className="text-4xl mb-2">🗺️</div>
              <div className="font-bold text-lg leading-tight">{courseData.title}</div>
              <div className="text-indigo-200 text-sm mt-1">{courseData.subtitle}</div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-indigo-300">Progress</span><span className="font-bold">{overallPct}%</span></div>
                <div className="h-2 bg-indigo-900/50 rounded-full"><div className="h-full bg-white rounded-full" style={{ width: `${overallPct}%` }} /></div>
              </div>
            </div>
            {/* Stats */}
            {[
              { label: '🔥 Streak', value: `${courseData.streak} days` },
              { label: '⚡ XP Earned', value: courseData.xp },
              { label: '⏱️ Hours Done', value: `${courseData.completedHours}h` },
              { label: '🎖️ Level', value: courseData.level },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl px-4 py-3 flex justify-between items-center shadow-sm border border-slate-100">
                <span className="text-slate-500 text-sm">{s.label}</span>
                <span className="font-bold text-slate-800 text-sm">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Trail map */}
          <div className="flex-1">
            <div className="space-y-0">
              {courseData.modules.map((mod, idx) => {
                const c = colorMap[mod.color];
                const isLast = idx === courseData.modules.length - 1;
                return (
                  <div key={mod.id} className="flex gap-4">
                    {/* Connector column */}
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
                    {/* Content */}
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
                            {/* Lesson dots */}
                            <div className="flex gap-1.5 mt-3 flex-wrap">
                              {mod.lessons.map((l, li) => (
                                <div key={li} title={l.name}
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs border
                                    ${l.done ? `${c.bg} border-transparent text-white` : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                                  {typeIcon(l.type)}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Progress bar */}
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
      </div>
    </div>
  );
};

export default JourneyCourseMix;

