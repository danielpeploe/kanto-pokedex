export interface Pokemon {
  number: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  sprite: string;
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