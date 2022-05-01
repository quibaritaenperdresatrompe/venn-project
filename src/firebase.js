import { getApp, getApps, initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  getDocFromCache,
  addDoc,
  orderBy,
} from "firebase/firestore";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
};

export const app = getApps().length === 0 ? initializeApp(config) : getApp();

export const db = getFirestore(app);

function parseDocument(document) {
  return { id: document.id, ...document.data() };
}

export async function getAll(name, { fieldPath, orderByDirection } = {}) {
  const sort = fieldPath ? orderBy(fieldPath, orderByDirection) : null;
  const queryConstraints = [sort].filter(Boolean);
  const snapshot = await getDocs(
    query(collection(db, name), ...queryConstraints)
  );
  return snapshot.docs.map(parseDocument);
}

export async function getOne(name, id) {
  const snapshot = await getDocFromCache(doc(db, name, id));
  return parseDocument(snapshot);
}

export async function add(name, payload) {
  const snapshot = await addDoc(collection(db, name), {
    ...payload,
    createdAt: Date.now(),
  });
  return snapshot.id;
}
