
export interface Cheese {
  id: string;
  name: string;
  type: string;
  intensity: 'Suave' | 'Médio' | 'Forte';
  description: string;
  imageUrl: string;
}

export interface PairingSuggestion {
  cheeseName: string;
  pairing: string;
  description: string;
  wineSuggestion: string;
}
