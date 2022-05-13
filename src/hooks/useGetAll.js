import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";

import { db } from "../firebase";

export default function useGetAll(name, sort) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const queryConstraints = [sort ? orderBy(...sort) : null].filter(Boolean);
    const unsubscribe = onSnapshot(
      query(collection(db, name), ...queryConstraints),
      (snapshot) => {
        setData(snapshot.docs.map(parse));
        setLoading(false);
      },
      () => setError(true)
    );
    return () => unsubscribe();
  }, [name, sort]);
  return { loading, data, error };
}

function parse(document) {
  return { id: document.id, ...document.data() };
}
