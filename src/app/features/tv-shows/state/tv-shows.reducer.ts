import {createReducer, on} from '@ngrx/store';
import {getTvShowsFailure, getTvShowsIsLoading, getTvShowsSuccess, updateTvShowsFromSearch} from './tv-shows.actions';
import {GetTvShowsListStateModel} from './tv-shows.model';

export const initialState: GetTvShowsListStateModel = {
  data: [],
  error: null,
  loading: false,
  total_pages: 0,
  pageNumber: 1
};

export const TvShowsReducer = createReducer(
  initialState,
  on(getTvShowsIsLoading, (state, {pageNumber}) => ({
    ...state,
    loading: true,
    pageNumber
  })),
  on(getTvShowsSuccess, (state, {tvShows, totalPage, page}) => ({
    ...state,
    data: (page == 1 ? tvShows : [...state.data, ...tvShows]),
    total_pages: totalPage,
    loading: false,
    error: null,
  })),
  on(getTvShowsFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
    data: [],
  })),

  on(updateTvShowsFromSearch, (state, {tvShows, page})=>({
    ...state,
    loading:false,
    data: (page == 1 ? tvShows : [...state.data, ...tvShows]),
  }))
);
