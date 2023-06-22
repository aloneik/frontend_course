import { useState, useEffect } from "react";

export function useData(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const jsonResponse = await response.json();

        setIsLoaded(true);
        setData(jsonResponse);
      }
      catch (error) {
        setIsLoaded(true);
        setError(error);
      }
    }
    fetchData();
  }, [url]);

  return [data, isLoaded, error];
}
