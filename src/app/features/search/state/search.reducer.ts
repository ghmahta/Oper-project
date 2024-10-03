import {createReducer, on} from '@ngrx/store';
import {searchFailure, searchIsLoading, searchSuccess} from './search.actions';
import {SearchStateModel} from './search.model';

export const initialState: SearchStateModel = {
  data: [],
  error: null,
  loading: false,
  total_pages: 0,
  pageNumber: 1,
  searchParam: ''
};

export const SearchReducer = createReducer(
  initialState,
  on(searchIsLoading, (state, {param, pageNumber}) => ({
    ...state,
    loading: true,
    pageNumber,
    searchParam: param
  })),
  on(searchSuccess, (state, {items, totalPage, page}) => ({
    ...state,
    data: (page == 1 ? items : [...state.data, ...items]),
    total_pages: totalPage,
    loading: false,
    error: null,
  })),
  on(searchFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
    data: [],
  })),
);
