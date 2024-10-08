import {createAction, props} from '@ngrx/store';
import {ApiErrorModel} from '../../../shared/apiError.model';

export const getMediaDetailsIsLoading = createAction(
  'get Media Details is Loading',
  props<{ id: number, mediaType: string }>()
);
export const getMediaDetailsSuccess = createAction(
  'get Movie or Tv Shows Details Success',
  props<{ details: any }>()
);
export const getMediaDetailsFailure = createAction(
  'get Media Details Failure',
  props<{ error: ApiErrorModel }>()
);
