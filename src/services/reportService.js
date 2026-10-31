import { db, isFirebaseConfigured } from '../firebase';
import { collection, onSnapshot, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'reports';

// Initial fallback mock data (ET-1001 to ET-1003) - ALWAYS PRESERVED
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

// Add a new report (Syncs to Firestore and LocalStorage with guaranteed unique sequential ID >= ET-1004)
export async function createReport(newReport, currentReports, setReports) {
  // 1. Calculate highest numeric ID from current local reports (baseline: 1003)
  const localNumericIds = (currentReports || []).map(r => {
    if (!r || !r.id || typeof r.id !== 'string') return 1000;
    const match = r.id.match(/ET-(\d+)/);
    return match ? parseInt(match[1]) : 1000;
  });
  let maxId = Math.max(1003, ...localNumericIds);

  // 2. Query live Firestore collection to check highest existing ID across all clients
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, COLLECTION_NAME));
      const firestoreIds = snap.docs.map(d => {
        const match = d.id.match(/ET-(\d+)/);
        return match ? parseInt(match[1]) : 1000;
      });
      maxId = Math.max(maxId, ...firestoreIds);
    } catch (e) {
      console.warn("Could not query Firestore for max ID:", e);
    }
  }

  // 3. Assign next guaranteed sequential ID
  const finalId = `ET-${maxId + 1}`;
  const finalizedReport = { ...newReport, id: finalId };

  // 4. Update local state & localStorage immediately
  const updated = [finalizedReport, ...(currentReports || []).filter(r => r.id !== finalId)];
  setReports(updated);
  try {
    localStorage.setItem('ecoTrackReports', JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }

  // 5. Push to Firebase Cloud Firestore
  if (isFirebaseConfigured && db) {
    try {
      console.log("Writing report to Firestore:", finalId);
      await setDoc(doc(db, COLLECTION_NAME, finalId), finalizedReport);
      console.log("Successfully written to Firestore:", finalId);
    } catch (err) {
      console.error("Failed to save report to Firestore:", err);
      if (err.code === 'permission-denied') {
        console.error("Firestore Permission Denied: Please check Firestore Security Rules.");
      }
    }
  }

  return finalizedReport;
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

// Clear all submitted user reports from Firestore and LocalStorage (preserves mock data ET-1001 to ET-1003)
export async function clearAllReports(currentReports, setReports) {
  const mockIds = INITIAL_REPORTS.map(r => r.id);

  // Keep mock data in local state and localStorage
  setReports(INITIAL_REPORTS);
  try {
    localStorage.setItem('ecoTrackReports', JSON.stringify(INITIAL_REPORTS));
  } catch (e) {
    console.error(e);
  }

  // Delete all non-mock documents from Cloud Firestore
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, COLLECTION_NAME));
      for (const d of snap.docs) {
        if (!mockIds.includes(d.id)) {
          console.log("Deleting submitted report from Firestore:", d.id);
          await deleteDoc(doc(db, COLLECTION_NAME, d.id));
        }
      }
      console.log("Firestore successfully cleaned: mock data preserved.");
    } catch (err) {
      console.error("Failed to clear submitted reports from Firestore:", err);
    }
  }
}
