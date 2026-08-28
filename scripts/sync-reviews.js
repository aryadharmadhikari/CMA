import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";

// 1. Load .env variables
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, ...rest] = line.split("=");
    if (key && rest.length > 0) {
      process.env[key.trim()] = rest.join("=").trim();
    }
  });
}

// 2. Firebase Initialization
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Actual reviews extracted directly from Chinmay's Music Academy Google Maps Profile
const realGoogleReviews = [
  {
    id: "g_review_1",
    name: "Sanjeevani Chandurkar",
    rating: 5,
    course: "Google Verified Review",
    review: "Chinmay Music Academy consistently undertakes a variety of creative projects and always encourages its students to explore, learn, and perform. Chinmay Sir is deeply committed to this vision and firmly believes in providing every student with opportunities to grow, showcase their talent, and build confidence through such initiatives."
  },
  {
    id: "g_review_2",
    name: "Adwait Kavathekar",
    rating: 5,
    course: "Google Verified Review",
    review: "Well structured curriculum and focused attention. The betterment in candidates is really visible. Worth joining for all age group interested in learning music."
  },
  {
    id: "g_review_3",
    name: "Janhavi Joshi",
    rating: 5,
    course: "Google Verified Review",
    review: "This is one of the best singing classes I've come across. Chinmay Sir is extremely patient and encouraging."
  },
  {
    id: "g_review_4",
    name: "Neelima Dharmadhikari",
    rating: 5,
    course: "Google Verified Review",
    review: "I am a student of Chinmay's Music Academy, and it is a fantastic experience. Chinmay sir demonstrates a high level of expertise and enthusiasm. His teaching style is engaging and well-structured, making complex concepts easier to understand. The class environment is supportive and encouraging."
  },
  {
    id: "g_review_5",
    name: "Pundlik Kolhatkar",
    rating: 5,
    course: "Google Verified Review",
    review: "This academy is reliable for getting good classical singing education. Chinmay sir prepares the student with personal attention."
  }
];

async function syncToFirebase() {
  try {
    console.log("🚀 Syncing real Google Maps reviews to Firebase Firestore...");
    for (const item of realGoogleReviews) {
      await setDoc(doc(db, "reviews", item.id), item);
      console.log(`✓ Synced Google review by: ${item.name} (${item.rating}★)`);
    }
    console.log("✅ All Google Maps reviews successfully synced to Firebase Firestore!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Sync failed:", error.message || error);
    process.exit(1);
  }
}

syncToFirebase();
