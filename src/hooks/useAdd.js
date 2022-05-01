import { useState, useCallback } from "react";

import { add } from "../firebase";

export default function useAdd(collection, payload) {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [error, setError] = useState(false);
  const addData = useCallback(async () => {
    try {
      setLoading(true);
      const json = await add(collection, payload);
      setId(json);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [collection, payload]);
  return { loading, id, error, add: addData };
}
