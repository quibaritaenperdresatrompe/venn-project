import { addDoc, collection } from "firebase/firestore";
import { useState, useCallback } from "react";

import { db } from "../firebase";

export default function useAdd(name, payload) {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [error, setError] = useState(false);
  const add = useCallback(async () => {
    try {
      setLoading(true);
      const snapshot = await addDoc(collection(db, name), {
        ...payload,
        createdAt: Date.now(),
      });
      setId(snapshot.id);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [name, payload]);
  return { loading, id, error, add };
}
