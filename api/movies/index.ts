import { useQuery } from "react-query";
import { api } from "../config";
import { MovieDetail } from "~/types";

// -----------------------------------
// Upcoming Movies
export const getUpcomingMovies = async () => {
  const { data } = await api.get("/movie/upcoming?language=en-US&page=1");
  return data;
};

export const useUpcomingMovies = () =>
  useQuery(["upcoming_movies"], () => getUpcomingMovies());

// -----------------------------------
// Now Playing Movies
export const getNowPlayingMovies = async () => {
  const { data } = await api.get("/movie/now_playing?language=en-US&page=1");
  return data;
};

export const useNowPlayingMovies = () =>
  useQuery(["now_playing_movies"], () => getNowPlayingMovies());

// -----------------------------------
// Popular Movies
export const getPopularMovies = async () => {
  const { data } = await api.get("/movie/popular?language=en-US&page=1");
  return data;
};

export const usePopularMovies = () =>
  useQuery(["popular_movies"], () => getPopularMovies());

// -----------------------------------
// TopRated Movies
export const getTopRatedMovies = async () => {
  const { data } = await api.get("/movie/top_rated?language=en-US&page=1");
  return data;
};

export const useTopRatedMovies = () =>
  useQuery(["top_rated_movies"], () => getTopRatedMovies());

// -----------------------------------
// Single Movie Details
export const getSingleMovie = async (
  id: number,
  path?: string
): Promise<MovieDetail> => {
  const apiPath = path ? `/movie/${id}/${path}` : `/movie/${id}`;
  const { data } = await api.get(`${apiPath}`);
  return data;
};

export const useSingleMovies = <T>(id: number, path?: string) => {
  const baseArrayPath = ["single_movie", id];
  const arrayPath = path ? [...baseArrayPath, path] : baseArrayPath;
  return useQuery([...arrayPath], () => <T>getSingleMovie(id, path), {
    enabled: !!id, // Only run query if id is defined
  });
};
