import {ApiErrorModel} from '../../../shared/apiError.model';

export interface GetMediaDetailsStateModel{
  data: any;
  error: ApiErrorModel| null,
  loading: boolean,
}
interface GenreModel{
  id: number;
  name: string;
}
interface ProductionCountriesModel{
  name: string;
}
interface SpokenLanguageModel{
  english_name: string;
  name: string;
}

export interface MovieDetailModel{
  id: number;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  status: string;
  genres: GenreModel[];
  release_date: string;
  runtime: number;
  production_countries: ProductionCountriesModel[];
  spoken_languages: SpokenLanguageModel[];
}

export interface TvShowsModel{
  genres: GenreModel[];
  name: string;
  overview: string;
  poster_path: string;
  number_of_episodes: number;
  number_of_seasons: number;
  spoken_languages: SpokenLanguageModel[];
  production_countries: ProductionCountriesModel[];
  status: string;
  vote_average: number;
}
