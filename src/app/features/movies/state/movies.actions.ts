import {createAction, props} from '@ngrx/store';
import {MovieInterface} from './movies.model';

export const getMoviesIsLoading = createAction(
  'get Movies is Loading',
  props<{ pageNumber: number }>()
);
export const getMoviesSuccess = createAction(
  'get Movies Success',
  props<{ movies: MovieInterface[], totalPage: number, page: number }>()
);
export const getMoviesFailure = createAction(
  'get Movies Failure',
  props<{ error: any }>()
);

export const updateMoviesFromSearch = createAction(
  'update Movies from Search',
  props<{movies:MovieInterface[], page: number}>()
)
