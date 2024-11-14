export interface Continent {
  id: number;
  name: string;
  funFact: string;
  imageUrl: string;
}

export interface ContinentsListProps {
  continents: Continent[];
  onSelectContinent?: (continentName: string) => void;
}

export interface Animal {
  id: number;
  type: string;
  name: string;
  description: string;
  imageUrl: string;
}

export function formatToSmallCaps(input: string) {
  return input.replace(/\s+/g, "_").toLowerCase();
}
