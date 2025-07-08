export type CategoryType = "movies" | "series" | "docs" | "anime" | "horror";

export interface Category {
  id: CategoryType;
  label: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // in YYYY-MM-DD format
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Banner {
  id: string;
  title: string;
  images: string[];
}

export interface TopBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  tvId?: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string; // ISO date string, e.g. "2025-03-31"
  revenue: number;
  runtime: number; // in minutes
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  /** Defaults to true */
  adult: boolean;
  /** Defaults to 0 */
  gender: number;
  /** Defaults to 0 */
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  /** Defaults to 0 */
  popularity: number;
  profile_path: string;
  /** Defaults to 0 */
  cast_id: number;
  character: string;
  credit_id: string;
  /** Defaults to 0 */
  order: number;
}

export interface CrewMember {
  /** Defaults to true */
  adult: boolean;
  /** Defaults to 0 */
  gender: number;
  /** Defaults to 0 */
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  /** Defaults to 0 */
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface MovieProviders {
  /** e.g. "https://example.com/watch" */
  id: number;
  results: {
    [key: string]: MovieProvider;
  };
}

export interface MovieProvider {
  /** e.g. "https://example.com/watch" */
  link: string;
  flatrate: ProviderOption[];
  rent: ProviderOption[];
  buy: ProviderOption[];
}

export interface ProviderOption {
  logo_path: string;
  /** Defaults to 0 */
  provider_id: number;
  provider_name: string;
  /** Defaults to 0 */
  display_priority: number;
}

export interface MovieVideos {
  /** Defaults to 0 */
  id: number;
  results: MovieVideo[];
}

export interface MovieVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  /** Defaults to 0 */
  size: number;
  type: string;
  /** Defaults to true */
  official: boolean;
  published_at: string;
  id: string;
}

export interface MovieDetailSimilar {
  page: number;
  results: MovieSimilar[];
  total_pages: number;
  total_results: number;
}

export interface MovieSimilar {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface DetailsTabProps {
  movie?: MovieDetail;
  credits?: MovieCredits;
  directors?: MovieCredits["crew"];
  providers?: MovieProviders;
  videos?: MovieVideos;
  trailer?: MovieVideo;
  similar?: MovieDetailSimilar;
  reviews?: MovieDetailsReviews;
  images?: MovieDetailImages;
}

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string;
  rating: string;
}

export interface Review {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface MovieDetailsReviews {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export interface ImageData {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MovieDetailImages {
  id: number;
  backdrops: ImageData[];
  logos: ImageData[];
  posters: ImageData[];
}

export interface PaginatedList<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TvShow {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Media {
  /** Defaults to true */
  adult: boolean;
  backdrop_path: string;
  /** Defaults to 0 */
  id: number;
  title: string;
  name: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  /** Defaults to 0 */
  popularity: number;
  release_date: string;
  /** Defaults to true */
  video: boolean;
  /** Defaults to 0 */
  vote_average: number;
  /** Defaults to 0 */
  vote_count: number;
}
