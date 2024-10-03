import {createAction, props} from '@ngrx/store';

export const searchIsLoading = createAction(
  'search is Loading',
  props<{ param: string, pageNumber: number , mode: string}>()
);
export const searchSuccess = createAction(
  'search Success',
  props<{ items: any, totalPage: number, page: number }>()
);
export const searchFailure = createAction(
  'search Failure',
  props<{ error: any }>()
);
