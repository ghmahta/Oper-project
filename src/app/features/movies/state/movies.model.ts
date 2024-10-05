import {ApiErrorModel} from '../../../shared/apiError.model';

export interface MovieModel{
  id:number,
  original_title:string,
  overview:string,
  poster_path:string,
  title:string,
  vote_average:number
}

export interface GetMoviesListStateModel{
  data: MovieModel[],
  error: ApiErrorModel| null,
  loading: boolean,
  total_pages:number,
  pageNumber: number
}
