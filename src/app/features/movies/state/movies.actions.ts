import {createAction, props} from '@ngrx/store';

export const getMoviesIsLoading = createAction(
  'get Movies is Loading',
  props<{ pageNumber: number }>()
);
export const getMoviesSuccess = createAction(
  'get Movies Success',
  props<{ movies: any, totalPage: number, page: number }>()
);
export const getMoviesFailure = createAction(
  'get Movies Failure',
  props<{ error: any }>()
);
