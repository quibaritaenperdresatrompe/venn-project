import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";

import { getAll } from "../firebase";

export default function useGetAll(collection, sort) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const isFocused = useIsFocused();
  const getData = useCallback(async () => {
    try {
      const json = await getAll(collection, sort);
      setData(json);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [collection, sort]);
  useEffect(() => {
    getData();
  }, [getData, isFocused]);
  return { loading, data, error };
}
