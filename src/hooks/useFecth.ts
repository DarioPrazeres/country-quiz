import { useState, useEffect } from "react";

function useFetch<T = unknown>(url: string): [T | null, string | null] {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro HTTP: ${res.status}`);
        }
        return res.json() as Promise<T>;
      })
      .then((data) => setData(data))
      .catch((err: Error) => setError(err.message));
  }, [url]);

  return [data, error];
}

export default useFetch;
