import {createAction, props} from '@ngrx/store';
import {TvShowModel} from './tv-shows.model';
import {ApiErrorModel} from '../../../shared/apiError.model';

export const getTvShowsIsLoading = createAction(
  'get Tv Shows is Loading',
  props<{ pageNumber: number }>()
);
export const getTvShowsSuccess = createAction(
  'get Tv Shows Success',
  props<{ tvShows: TvShowModel[], totalPage: number, page: number }>()
);
export const getTvShowsFailure = createAction(
  'get Tv Shows Failure',
  props<{ error: ApiErrorModel | null }>()
);

export const updateTvShowsFromSearch = createAction(
  'update Tv Shows from Search',
  props<{tvShows:TvShowModel[], page: number}>()
)
