import {ApiErrorModel} from '../../../shared/apiError.model';

export interface SearchStateModel {
  data: any,
  error: ApiErrorModel | null
  loading: boolean;
  total_pages: number;
  pageNumber: number;
  searchParam: string
}

