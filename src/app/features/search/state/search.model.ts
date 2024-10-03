export interface SearchStateModel {
  data: any,
  error: any | null
  loading: boolean;
  total_pages: number;
  pageNumber: number;
  searchParam: string
}

