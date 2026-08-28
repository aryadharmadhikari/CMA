import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";

// Load .env variables in Node if available
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

// Initial real / curated Google Reviews for Chinmay's Music Academy
const googleReviews = [
  {
    id: "review-1",
    name: "Snehal Patil",
    rating: 5,
    course: "Hindustani Classical Vocals",
    review: "Chinmay sir's guidance has helped me understand the fundamentals of classical vocal music thoroughly. The individualized feedback and voice training techniques are extraordinary."
  },
  {
    id: "review-2",
    name: "Rohan Malhotra",
    rating: 5,
    course: "Contemporary Vocals & Guitar",
    review: "The stage exposure here is unmatched! Within six months, I was performing live in front of hundreds. The contemporary program is practical, performance-driven, and extremely inspiring."
  },
  {
    id: "review-3",
    name: "Dr. Sunita Sharma",
    rating: 5,
    course: "Parent of Arjun (8 Yrs)",
    review: "I enrolled my son in the Kids program. The educators make complex musical theory fun and accessible. The personalized attention in small batches is a huge plus for early development."
  },
  {
    id: "review-4",
    name: "Aditya Joshi",
    rating: 5,
    course: "Voice Culture & Ergonomics",
    review: "The focus on vocal health and voice culture sets CMA apart. It has improved my pitch stability, breath support, and range tremendously."
  }
];

async function seedReviews() {
  console.log("🚀 Syncing reviews to Firebase Firestore...");
  for (const item of googleReviews) {
    await setDoc(doc(db, "reviews", item.id), item);
    console.log(`✓ Added review by: ${item.name}`);
  }
  console.log("✅ All reviews successfully synced to Firebase!");
  process.exit(0);
}

seedReviews().catch((err) => {
  console.error("Error updating Firebase:", err);
  process.exit(1);
});
