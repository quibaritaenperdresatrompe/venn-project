import { getApp, getApps, initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  getDocFromCache,
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

export async function getAll(name) {
  const snapshot = await getDocs(query(collection(db, name)));
  return snapshot.docs.map(parseDocument);
}

export async function getOne(name, id) {
  const snapshot = await getDocFromCache(doc(db, name, id));
  return parseDocument(snapshot);
}

export async function getAllProjects() {
  const members = await getAll("members");
  const projects = await getAll("projects");

  function parseProject(project) {
    return {
      ...project,
      participants: project.participants.map(parseParticipant).filter(Boolean),
    };
  }

  function parseParticipant(id) {
    const participant = members.find((member) => member.id === id);
    if (participant) {
      return {
        id: participant.id,
        initial: participant.firstname[0],
        color: participant.favoriteColor,
      };
    }
    return null;
  }

  return projects.map(parseProject);
}
