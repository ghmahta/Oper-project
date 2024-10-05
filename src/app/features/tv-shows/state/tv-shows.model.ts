import {ApiErrorModel} from '../../../shared/apiError.model';

export interface TvShowModel{
  id:number;
  name:string;
  overview:string;
  poster_path:string;
  vote_average:number;
}

export interface GetTvShowsListStateModel{
  data: TvShowModel[],
  error: ApiErrorModel |null,
  loading: boolean,
  total_pages:number,
  pageNumber: number
}
