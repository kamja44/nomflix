const API_KEY = "17cd240cd563008f446fafd5726a0ebb";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  popularity: number;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimun: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
