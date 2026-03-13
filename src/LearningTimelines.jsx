import React, { useState } from 'react';

const LearningTimelines = () => {
  const [activeDesign, setActiveDesign] = useState(0);

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
                      <span className={item.completed ? 'text-gray-600 line-through' : 'text-gray-800'}>
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
                    <span className={item.completed ? 'line-through' : ''}>{item.name}</span>
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
              {section.status === 'in-progress' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                  Current
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
                        <p className={`text-sm font-medium ${item.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
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

  const designs = [
    { name: 'Vertical Timeline', component: <VerticalTimeline /> },
    { name: 'Horizontal Steps', component: <HorizontalSteps /> },
    { name: 'Card Grid', component: <CardGrid /> },
    { name: 'Minimal List', component: <MinimalList /> },
    { name: 'Roadmap', component: <RoadmapStyle /> },
    { name: 'Modern Stepper', component: <ModernStepper /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Learning Journey Timeline Designs
        </h1>
        <p className="text-gray-500 text-center text-sm">
          6 simple, clean timeline patterns for course/journey progress
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
