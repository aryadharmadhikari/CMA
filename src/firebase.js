import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore & Realtime Database
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

/**
 * Fetch reviews from Firestore (or fallback to Realtime DB / Local fallback)
 */
export async function fetchReviewsFromFirebase() {
  try {
    // 1. Try Firestore 'reviews' collection
    const querySnapshot = await getDocs(collection(db, "reviews"));
    if (!querySnapshot.empty) {
      const reviewsList = [];
      querySnapshot.forEach((docSnap) => {
        reviewsList.push({ id: docSnap.id, ...docSnap.data() });
      });
      return reviewsList;
    }
  } catch (firestoreError) {
    // If Firestore is not yet configured with rules, try Realtime Database
    try {
      const snapshot = await get(ref(rtdb, "reviews"));
      if (snapshot.exists()) {
        const val = snapshot.val();
        return Array.isArray(val) ? val : Object.values(val);
      }
    } catch (rtdbError) {
      console.warn("Could not load from Firebase databases:", firestoreError.message || firestoreError);
    }
  }
  return null;
}

export default app;
