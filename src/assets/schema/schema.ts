interface Info {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
}

interface Location {
  name: string;
  url: string;
}

export interface CustomError extends Error {
  status: number;
  message: string;
}

export interface Results {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: object;
  location: Location;
  image: string;
  episode: [];
  url: string;
  created: string;
}

export interface Response {
  info: Info;
  results: Results[];
}
