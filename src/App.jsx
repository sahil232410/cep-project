import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import FindWaste from './components/FindWaste';
import Categories from './components/Categories';
import EcoTips from './components/EcoTips';
import Quiz from './components/Quiz';
import About from './components/About';
import Scanner from './components/Scanner';
import Gallery from './components/Gallery';
import ReportWaste from './components/ReportWaste';
import TrackReport from './components/TrackReport';
import AdminDashboard from './components/AdminDashboard';
import { subscribeToReports, INITIAL_REPORTS } from './services/reportService';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [trackId, setTrackId] = useState('');

  // Lifted state for waste reports
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem('ecoTrackReports');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to parse reports from localStorage", e);
    }
    return INITIAL_REPORTS;
  });

  // Real-time synchronization via Firebase Cloud Firestore (and LocalStorage fallback)
  useEffect(() => {
    const unsubscribe = subscribeToReports((updatedReports) => {
      setReports(updatedReports);
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'report-waste':
        return <ReportWaste reports={reports} setReports={setReports} setTrackId={setTrackId} setCurrentPage={setCurrentPage} />;
      case 'track-report':
        return <TrackReport reports={reports} trackId={trackId} setTrackId={setTrackId} />;
      case 'admin-dashboard':
        return <AdminDashboard reports={reports} setReports={setReports} setTrackId={setTrackId} setCurrentPage={setCurrentPage} />;
      case 'find-waste':
        return <FindWaste />;
      case 'categories':
        return <Categories />;
      case 'eco-tips':
        return <EcoTips />;
      case 'quiz':
        return <Quiz />;
      case 'about':
        return <About />;
      case 'scanner':
        return <Scanner />;
      case 'gallery':
        return <Gallery />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  const isAdminPage = currentPage === 'admin-dashboard';

  return (
    <div className="app-wrapper">
      {!isAdminPage && <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      <main className="main-content" style={isAdminPage ? { padding: 0 } : {}}>
        <div key={currentPage} className="fade-in">
          {renderPage()}
        </div>
      </main>
      {!isAdminPage && <Footer setCurrentPage={setCurrentPage} />}
    </div>
  );
}

export default App;
