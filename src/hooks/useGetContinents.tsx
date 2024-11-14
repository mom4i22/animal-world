import axios from "axios";
import { useEffect, useState } from "react";
import { Continent } from "../models";

const useGetContinents = (
  apiUrl: string = "https://json-server-continents.vercel.app/continents"
) => {
  const [continents, setContinents] = useState<Continent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContinents = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Continent[]>(apiUrl);
        setContinents(response.data);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch continents");
        setLoading(false);
      }
    };

    fetchContinents();
  }, [apiUrl]);

  return { continents, loading, error };
};

export default useGetContinents;
