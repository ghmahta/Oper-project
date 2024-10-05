import {createReducer, on} from '@ngrx/store';
import {GetMediaDetailsStateModel} from './media-details.model';
import {
  getMediaDetailsFailure,
  getMediaDetailsIsLoading,
  getMediaDetailsSuccess
} from './media-details.actions';

export const initialState: GetMediaDetailsStateModel = {
  data: [],
  error: null,
  loading: false,
};

export const MediaDetailsReducer = createReducer(
  initialState,
  on(getMediaDetailsIsLoading, (state, {id, mediaType}) => ({
    ...state,
    loading: true,
    id,
    mediaType
  })),
  on(getMediaDetailsSuccess, (state, {details}) => ({
    ...state,
    data: details,
    loading: false
  })),
  on(getMediaDetailsFailure, (state, {error}) => ({
    ...state,
    loading: false,
    data: null,
    error,
  }))
);
