import { useState, useEffect, useCallback } from "react";

import { getAll } from "../firebase";

export default function useGetAll(collection) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    try {
      setData(await getAll(collection));
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [collection]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, loading, error };
}
