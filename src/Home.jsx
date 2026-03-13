import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const designSets = [
    {
      path: '/simple',
      title: '📋 Simple Timeline Designs',
      description: '6 clean, minimal timeline patterns for learning journeys',
      designs: ['Vertical Timeline', 'Horizontal Steps', 'Card Grid', 'Minimal List', 'Roadmap', 'Modern Stepper'],
      gradient: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      path: '/innovative',
      title: '✨ Innovative Designs',
      description: '6 creative, gamified patterns inspired by popular apps',
      designs: ['Duolingo Path', 'Metro Map', 'Skill Tree', 'Progress Rings', 'Kanban Board', 'Streaming Style'],
      gradient: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            🎨 Learning Journey
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              UI Design System
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            12 unique timeline designs for course progress, learning paths, and skill development journeys
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-slate-800/50 rounded-2xl p-6 text-center border border-slate-700">
            <div className="text-4xl font-bold text-white mb-1">12</div>
            <div className="text-slate-400">Design Patterns</div>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-6 text-center border border-slate-700">
            <div className="text-4xl font-bold text-white mb-1">2</div>
            <div className="text-slate-400">Design Categories</div>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-6 text-center border border-slate-700">
            <div className="text-4xl font-bold text-white mb-1">100%</div>
            <div className="text-slate-400">React + Tailwind</div>
          </div>
        </div>
      </div>

      {/* Design Sets */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {designSets.map((set) => (
            <Link
              key={set.path}
              to={set.path}
              className="group relative bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 hover:border-slate-500 transition-all hover:shadow-2xl hover:shadow-purple-500/10"
            >
              {/* Gradient Header */}
              <div className={`h-32 bg-gradient-to-r ${set.gradient} flex items-center justify-center`}>
                <span className="text-6xl opacity-80">
                  {set.path === '/simple' ? '📊' : '🎮'}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                  {set.title}
                </h2>
                <p className="text-slate-400 mb-6">{set.description}</p>

                {/* Design Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {set.designs.map((design, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 ${set.bgColor} ${set.borderColor} border rounded-full text-sm text-slate-700`}
                    >
                      {design}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">6 designs included</span>
                  <span className={`px-4 py-2 rounded-xl bg-gradient-to-r ${set.gradient} text-white font-medium group-hover:shadow-lg transition-all`}>
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">✨ Features</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { icon: '🎯', title: 'Progress Tracking', desc: 'Visual progress indicators' },
            { icon: '🔒', title: 'Status States', desc: 'Completed, In Progress, Locked' },
            { icon: '⚡', title: 'XP & Gamification', desc: 'Points, levels, achievements' },
            { icon: '📱', title: 'Responsive', desc: 'Works on all devices' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 text-center">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
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
