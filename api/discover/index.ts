import { useQuery } from "react-query";
import { api } from "../config";

// -----------------------------------
// Movies by Genre
export const getMoviesByGenre = async (genre: string) => {
  const { data } = await api.get(`/discover/movie?with_genres=${genre}`);
  return data;
};

export const useMoviesByGenre = <T>(genre: string) =>
  useQuery(
    ["discover_movie_by_genre", genre],
    () => <T>getMoviesByGenre(genre),
    {
      enabled: !!genre,
    }
  );

// -----------------------------------
// Movies by Genre
export const getSeriesByGenre = async (genre: string) => {
  const { data } = await api.get(`/discover/tv?with_genres=${genre}`);
  return data;
};

export const useSeriesByGenre = <T>(genre: string) =>
  useQuery(
    ["discover_series_by_genre", genre],
    () => <T>getSeriesByGenre(genre),
    {
      enabled: !!genre,
    }
  );
