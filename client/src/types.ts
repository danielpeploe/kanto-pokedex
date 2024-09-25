export interface Pokemon {
  number: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  sprite: string;
  abilities: string[];
  base_stats: {
    hp: number;
    attack: number;
    defense: number;
    'special-attack': number;
    'special-defense': number;
    speed: number;
  };
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  next_page: number | null;
  previous_page: number | null;
}

export interface PokemonResponse {
  data: Pokemon[];
  pagination: Pagination;
}