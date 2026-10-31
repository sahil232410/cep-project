import { db, isFirebaseConfigured } from '../firebase';
import { collection, onSnapshot, doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'reports';

// Initial fallback mock data
export const INITIAL_REPORTS = [
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

// Seed initial sample mock reports to Firestore if they are missing
export async function seedInitialReportsIfMissing() {
  if (!isFirebaseConfigured || !db) return;
  for (const report of INITIAL_REPORTS) {
    try {
      const docRef = doc(db, COLLECTION_NAME, report.id);
      const snap = await getDoc(docRef);
      if (!snap.exists()) {
        await setDoc(docRef, report);
        console.log("Seeded mock report to Firestore:", report.id);
      }
    } catch (err) {
      console.warn("Could not seed mock report:", report.id, err);
    }
  }
}

// Subscribe to real-time reports updates (Firebase or LocalStorage fallback)
export function subscribeToReports(onUpdate) {
  if (isFirebaseConfigured && db) {
    try {
      // Ensure initial sample data exists in Cloud Firestore
      seedInitialReportsIfMissing();

      console.log("Connecting to Firebase Firestore 'reports' collection...");
      const unsub = onSnapshot(collection(db, COLLECTION_NAME), (snapshot) => {
        console.log("Firestore snapshot received! Docs count:", snapshot.size);
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => ({ ...d.data(), id: d.id }));
          list.sort((a, b) => (b.id || '').localeCompare(a.id || ''));
          onUpdate(list);
          try {
            localStorage.setItem('ecoTrackReports', JSON.stringify(list));
          } catch (e) {
            console.error(e);
          }
        }
      }, (err) => {
        console.error("Firestore real-time listener error:", err);
      });
      return unsub;
    } catch (e) {
      console.warn("Failed to attach Firestore snapshot listener", e);
    }
  }

  // Fallback to window storage events if Firebase is not active
  const handleStorage = (e) => {
    if (e.key === 'ecoTrackReports' && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        if (Array.isArray(parsed)) onUpdate(parsed);
      } catch (err) {
        console.error(err);
      }
    }
  };
  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
}

// Add a new report (Syncs to Firestore and LocalStorage)
export async function createReport(newReport, currentReports, setReports) {
  const updated = [newReport, ...currentReports.filter(r => r.id !== newReport.id)];
  setReports(updated);
  try {
    localStorage.setItem('ecoTrackReports', JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }

  // Push to Firebase Cloud Firestore
  if (isFirebaseConfigured && db) {
    try {
      console.log("Writing report to Firestore:", newReport.id);
      await setDoc(doc(db, COLLECTION_NAME, newReport.id), newReport);
      console.log("Successfully written to Firestore:", newReport.id);
    } catch (err) {
      console.error("Failed to save report to Firestore:", err);
      if (err.code === 'permission-denied') {
        alert("Firestore Permission Denied: Please check Firebase Console > Firestore Database > Rules tab, and set 'allow read, write: if true;' then click Publish.");
      }
    }
  }
}

// Update report status (e.g. Reported -> In Progress -> Resolved)
export async function updateReport(reportId, newStatus, currentReports, setReports) {
  const updated = currentReports.map(r => r.id === reportId ? { ...r, status: newStatus } : r);
  setReports(updated);
  try {
    localStorage.setItem('ecoTrackReports', JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }

  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, COLLECTION_NAME, reportId), { status: newStatus });
    } catch (err) {
      console.error("Failed to update status in Firestore", err);
    }
  }
}

// Delete report
export async function deleteReportById(reportId, currentReports, setReports) {
  const updated = currentReports.filter(r => r.id !== reportId);
  setReports(updated);
  try {
    localStorage.setItem('ecoTrackReports', JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, reportId));
    } catch (err) {
      console.error("Failed to delete report from Firestore", err);
    }
  }
}

// Batch import multiple reports (e.g. from Google Form CSV)
export async function batchImportReports(newReportsList, currentReports, setReports) {
  const updated = [...newReportsList, ...currentReports];
  setReports(updated);
  try {
    localStorage.setItem('ecoTrackReports', JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }

  if (isFirebaseConfigured && db) {
    for (const r of newReportsList) {
      try {
        await setDoc(doc(db, COLLECTION_NAME, r.id), r);
      } catch (e) {
        console.error("Batch save error", e);
      }
    }
  }
}

// Clear all reports
export async function clearAllReports(setReports) {
  setReports([]);
  try {
    localStorage.setItem('ecoTrackReports', JSON.stringify([]));
  } catch (e) {
    console.error(e);
  }
}
