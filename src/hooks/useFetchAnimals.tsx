import axios from "axios";
import { useEffect, useState } from "react";
import { Animal } from "../models";

export const useFetchAnimals = (continent: string) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Animal[]>(
          `https://json-server-continents.vercel.app/${continent}`
        );
        setAnimals(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch animals");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (continent) {
      fetchAnimals();
    }
  }, [continent]);

  return { animals, isLoading, error };
};
