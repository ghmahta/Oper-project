import {createReducer, on} from '@ngrx/store';
import {getMoviesFailure, getMoviesIsLoading, getMoviesSuccess} from './movies.actions';
import {MovieInterface} from './movies.model';

export interface GetListStateModel {
  data: MovieInterface[] ;
  error: any | null;
  loading: boolean;
  total_pages: number,
  pageNumber: number
}

export const initialState: GetListStateModel = {
  data: [],
  error: null,
  loading: false,
  total_pages: 0,
  pageNumber: 1
};

export const MoviesReducer = createReducer(
  initialState,
  on(getMoviesIsLoading, (state, {pageNumber}) => ({
    ...state,
    loading: true,
    pageNumber
  })),
  on(getMoviesSuccess, (state, {movies, totalPage, page}) => ({
    ...state,
    data: (page == 1 ? movies : [...state.data, ...movies]),
    total_pages: totalPage,
    loading: false,
    error: null,
  })),
  on(getMoviesFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
    data: [],
  })),
);
