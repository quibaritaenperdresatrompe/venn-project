import { doc, deleteDoc } from "firebase/firestore";
import { useState, useCallback } from "react";

import { db } from "../firebase";

export default function useDeleteOne(name, id) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const deleteOne = useCallback(
    async (payload) => {
      try {
        setLoading(true);
        await deleteDoc(doc(db, name, id));
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [id, name]
  );
  return { loading, id, error, deleteOne };
}
