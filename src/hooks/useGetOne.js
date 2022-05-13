import { getDoc, doc } from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";

import { db } from "../firebase";

export default function useGetOne(name, id) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const getOne = useCallback(async () => {
    try {
      setLoading(true);
      const snapshot = await getDoc(doc(db, name, id));
      setData(parse(snapshot));
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [id, name]);
  useEffect(() => {
    getOne();
  }, [getOne]);
  return { loading, data, error };
}

function parse(document) {
  return { id: document.id, ...document.data() };
}
