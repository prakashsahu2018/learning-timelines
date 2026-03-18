import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './Home';
import LearningTimelines from './LearningTimelines';
import N8nFlowBuilder from './N8nFlowBuilder';
import './index.css';

// Navigation component
const Navigation = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const isFlowBuilder = location.pathname === '/flow-builder';
  if (isHome || isFlowBuilder) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-white font-bold hover:text-purple-400 transition-colors"
        >
          ← Home
        </Link>
        
        <div className="flex gap-2">
          <Link
            to="/simple"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              location.pathname === '/simple'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            📋 Timeline Designs
          </Link>
          <Link
            to="/flow-builder"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              location.pathname === '/flow-builder'
                ? 'bg-purple-500 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🔀 Flow Builder
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Wrapper to add padding for nav
const PageWrapper = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isFullScreen = location.pathname === '/flow-builder';

  return (
    <div className={isHome || isFullScreen ? '' : 'pt-16'}>
      {children}
    </div>
  );
};

function App() {
  return (
    <>
      <Navigation />
      <PageWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simple" element={<LearningTimelines />} />
          <Route path="/flow-builder" element={<N8nFlowBuilder />} />
        </Routes>
      </PageWrapper>
    </>
  );
}

export default App;
