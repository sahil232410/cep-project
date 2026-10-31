import { useState, useEffect } from 'react';
import AdminDashboard from './components/AdminDashboard';
import { subscribeToReports, INITIAL_REPORTS } from './services/reportService';

export default function AdminApp() {
  // Lifted state for waste reports, real-time synced via Firebase Cloud Firestore
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

  // Handle redirection to public citizen portal (index.html)
  const handleRedirectToPublic = () => {
    window.location.href = '/';
  };

  // Stub function for tracking ID (unused in standalone admin app)
  const handleTrackIdStub = () => {};

  return (
    <div className="app-wrapper">
      <main className="main-content" style={{ padding: 0 }}>
        <AdminDashboard 
          reports={reports} 
          setReports={setReports} 
          setTrackId={handleTrackIdStub} 
          setCurrentPage={handleRedirectToPublic} 
        />
      </main>
    </div>
  );
}
