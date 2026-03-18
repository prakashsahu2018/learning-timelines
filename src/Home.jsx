import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const designSets = [
    {
      path: '/simple',
      title: '📋 Timeline Designs',
      description: '9 clean timeline patterns for learning journeys including flow builder',
      designs: ['Vertical Timeline', 'Horizontal Steps', 'Card Grid', 'Minimal List', 'Roadmap', 'Modern Stepper', 'Trail Map', 'NewMap', 'Flow Builder'],
      gradient: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: '📊',
    },
  ];

  const totalDesigns = designSets.reduce((sum, set) => sum + set.designs.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            🎨 Learning Journey
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              UI Design System
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {totalDesigns} unique timeline designs for course progress, learning paths, and skill development journeys
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-slate-800/50 rounded-2xl p-5 text-center border border-slate-700">
            <div className="text-4xl font-bold text-white mb-1">{totalDesigns}</div>
            <div className="text-slate-400 text-sm">Design Patterns</div>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-5 text-center border border-slate-700">
            <div className="text-4xl font-bold text-white mb-1">{designSets.length}</div>
            <div className="text-slate-400 text-sm">Categories</div>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-5 text-center border border-slate-700">
            <div className="text-4xl font-bold text-white mb-1">100%</div>
            <div className="text-slate-400 text-sm">React + Tailwind</div>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-5 text-center border border-slate-700">
            <div className="text-4xl font-bold text-white mb-1">0</div>
            <div className="text-slate-400 text-sm">Dependencies</div>
          </div>
        </div>
      </div>

      {/* Design Sets */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {designSets.map((set) => (
            <Link
              key={set.path}
              to={set.path}
              className="group relative bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 hover:border-slate-500 transition-all hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1"
            >
              {/* Gradient Header */}
              <div className={`h-28 bg-gradient-to-r ${set.gradient} flex items-center justify-center`}>
                <span className="text-5xl opacity-80 group-hover:scale-110 transition-transform">
                  {set.icon}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                  {set.title}
                </h2>
                <p className="text-slate-400 text-sm mb-4">{set.description}</p>

                {/* Design Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {set.designs.slice(0, 3).map((design, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 ${set.bgColor} ${set.borderColor} border rounded-full text-xs text-slate-700`}
                    >
                      {design}
                    </span>
                  ))}
                  {set.designs.length > 3 && (
                    <span className="px-2 py-0.5 bg-slate-700 rounded-full text-xs text-slate-300">
                      +{set.designs.length - 3} more
                    </span>
                  )}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">{set.designs.length} designs</span>
                  <span className={`px-4 py-2 rounded-xl bg-gradient-to-r ${set.gradient} text-white text-sm font-medium group-hover:shadow-lg transition-all`}>
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* n8n Flow Builder — Featured Card */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <Link
          to="/flow-builder"
          className="group relative block rounded-3xl overflow-hidden border border-purple-500/30 hover:border-purple-400/60 transition-all hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1"
        >
          {/* Animated gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-slate-900 to-pink-900/80 opacity-90" />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #7c3aed 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative flex flex-col md:flex-row items-center gap-8 p-8">
            {/* Left — Visual preview */}
            <div className="flex-shrink-0 w-72 h-44 rounded-2xl bg-slate-950/60 border border-slate-700/50 overflow-hidden relative">
              {/* Mini flow preview */}
              <svg width="288" height="176" viewBox="0 0 288 176" className="absolute inset-0">
                {/* Grid dots */}
                <pattern id="dotgrid" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="8" cy="8" r="0.8" fill="#334155" />
                </pattern>
                <rect width="288" height="176" fill="url(#dotgrid)" />

                {/* Bezier edges */}
                <path d="M 72 58 C 105 58, 115 38, 148 38" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                <path d="M 188 38 C 210 38, 210 78, 232 78" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                <path d="M 188 38 C 210 38, 200 128, 232 128" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" opacity="0.5" />

                {/* Animated dot on first edge */}
                <circle r="3" fill="#818cf8">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 72 58 C 105 58, 115 38, 148 38" />
                </circle>

                {/* Trigger node */}
                <rect x="20" y="40" width="52" height="36" rx="8" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="1.5" />
                <rect x="20" y="40" width="4" height="36" rx="2" fill="#8b5cf6" />
                <text x="34" y="62" fontSize="14" textAnchor="middle">⚡</text>

                {/* Condition node */}
                <rect x="148" y="20" width="40" height="36" rx="8" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.5" />
                <rect x="148" y="20" width="4" height="36" rx="2" fill="#f59e0b" />
                <text x="174" y="42" fontSize="12" textAnchor="middle">🔀</text>

                {/* Module node (pass) */}
                <rect x="232" y="60" width="44" height="36" rx="8" fill="#1e1b4b" stroke="#10b981" strokeWidth="1.5" />
                <rect x="232" y="60" width="4" height="36" rx="2" fill="#10b981" />
                <text x="260" y="82" fontSize="12" textAnchor="middle">📚</text>

                {/* Action node (fail) */}
                <rect x="232" y="110" width="44" height="36" rx="8" fill="#1e1b4b" stroke="#ef4444" strokeWidth="1.5" />
                <rect x="232" y="110" width="4" height="36" rx="2" fill="#ef4444" />
                <text x="260" y="132" fontSize="12" textAnchor="middle">📧</text>

                {/* Sticky note */}
                <rect x="100" y="100" width="60" height="40" rx="6" fill="#fde68a" opacity="0.7" transform="rotate(2 130 120)" />
                <text x="118" y="122" fontSize="8" fill="#92400e" fontWeight="600">💡 Tip</text>

                {/* Connection handles */}
                <circle cx="72" cy="58" r="3" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
                <circle cx="148" cy="38" r="3" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
                <circle cx="188" cy="38" r="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Right — Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                NEW
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                🔀 n8n-Style Flow Builder
              </h2>
              <p className="text-slate-400 text-sm mb-5 max-w-md">
                Interactive node-based canvas to orchestrate learning journeys — drag nodes, draw connections, branch with conditions, and export your flow.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2 mb-5 justify-center md:justify-start">
                {[
                  { icon: '🖱️', label: 'Drag & Drop' },
                  { icon: '🔗', label: 'Bezier Connections' },
                  { icon: '🔀', label: 'Branching Logic' },
                  { icon: '🗺️', label: 'Minimap' },
                  { icon: '🔍', label: 'Pan & Zoom' },
                  { icon: '💾', label: 'JSON Export' },
                  { icon: '📋', label: 'Detail Panel' },
                  { icon: '🎨', label: '6 Node Types' },
                ].map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/50 text-xs text-slate-300">
                    <span className="text-[10px]">{f.icon}</span> {f.label}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all">
                Open Flow Builder →
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">✨ Features</h2>
        <div className="grid md:grid-cols-6 gap-4">
          {[
            { icon: '🎯', title: 'Progress Tracking' },
            { icon: '🔒', title: 'Status States' },
            { icon: '⚡', title: 'XP System' },
            { icon: '🎮', title: 'Gamification' },
            { icon: '📱', title: 'Responsive' },
            { icon: '🎬', title: 'Animations' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
              <div className="text-2xl mb-1">{feature.icon}</div>
              <h3 className="font-medium text-white text-sm">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 py-8">
        <p className="text-center text-slate-500 text-sm">
          Built with React + Tailwind CSS + React Router
        </p>
      </div>
    </div>
  );
};

export default Home;
