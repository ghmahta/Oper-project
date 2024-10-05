import {createAction, props} from '@ngrx/store';
import {MovieModel} from './movies.model';
import {ApiErrorModel} from '../../../shared/apiError.model';

export const getMoviesIsLoading = createAction(
  'get Movies is Loading',
  props<{ pageNumber: number }>()
);
export const getMoviesSuccess = createAction(
  'get Movies Success',
  props<{ movies: MovieModel[], totalPage: number, page: number }>()
);
export const getMoviesFailure = createAction(
  'get Movies Failure',
  props<{ error: ApiErrorModel }>()
);

export const updateMoviesFromSearch = createAction(
  'update Movies from Search',
  props<{movies:MovieModel[], page: number}>()
)
