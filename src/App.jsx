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

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [trackId, setTrackId] = useState('');

  // Lifted state for waste reports
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem('ecoTrackReports');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Failed to parse reports from localStorage", e);
    }
    
    // Initial mock data as requested
    const initialReports = [
      {
        id: 'ET-1001',
        reporterName: 'Rahul Verma',
        location: 'XYZ Garden',
        wasteType: 'Plastic Waste',
        description: 'Large pile of single-use plastic cups and beverage bottles dumped behind the public playground.',
        date: '2026-08-25',
        status: 'Reported',
        imageUrl: ''
      },
      {
        id: 'ET-1002',
        reporterName: 'Priya Sharma',
        location: 'ABC Road',
        wasteType: 'Wet Waste',
        description: 'Organic kitchen waste and vegetable scraps dumped on the sidewalk, attracting stray animals.',
        date: '2026-08-25',
        status: 'In Progress',
        imageUrl: ''
      },
      {
        id: 'ET-1003',
        reporterName: 'Aniket Kamble',
        location: 'Main Market',
        wasteType: 'E-Waste',
        description: 'Old electronic parts, broken charging adapters, and copper wires discarded in the open corner.',
        date: '2026-08-24',
        status: 'Resolved',
        imageUrl: ''
      }
    ];
    try {
      localStorage.setItem('ecoTrackReports', JSON.stringify(initialReports));
    } catch (e) {
      console.error(e);
    }
    return initialReports;
  });

  // Sync state to local storage safely
  useEffect(() => {
    try {
      localStorage.setItem('ecoTrackReports', JSON.stringify(reports));
    } catch (e) {
      console.error("Failed to save reports to localStorage", e);
    }
  }, [reports]);

  // Real-time synchronization across browser tabs and on window focus
  useEffect(() => {
    const reloadFromStorage = () => {
      try {
        const saved = localStorage.getItem('ecoTrackReports');
        if (saved !== null) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setReports(parsed);
          }
        }
      } catch (err) {
        console.error("Error syncing reports from localStorage", err);
      }
    };

    const handleStorageEvent = (e) => {
      if (e.key === 'ecoTrackReports' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setReports(parsed);
          }
        } catch (err) {
          console.error("Error parsing storage change", err);
        }
      }
    };

    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener('focus', reloadFromStorage);
    window.addEventListener('visibilitychange', reloadFromStorage);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('focus', reloadFromStorage);
      window.removeEventListener('visibilitychange', reloadFromStorage);
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
