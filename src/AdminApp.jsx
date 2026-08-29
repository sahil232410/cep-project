import { useState, useEffect } from 'react';
import AdminDashboard from './components/AdminDashboard';

export default function AdminApp() {
  // Lifted state for waste reports, shared with main App via localStorage
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem('ecoTrackReports');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Failed to parse reports from localStorage", e);
    }
    
    // Initial mock data as fallback
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
    localStorage.setItem('ecoTrackReports', JSON.stringify(initialReports));
    return initialReports;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ecoTrackReports', JSON.stringify(reports));
  }, [reports]);

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
