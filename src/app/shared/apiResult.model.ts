import {MovieInterface} from '../features/movies/state/movies.model';

export interface ApiResultModel{
  results:MovieInterface[],
  total_pages: number,
  page: number
}
