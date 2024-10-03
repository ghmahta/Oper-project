export interface TvShowModel{
  id:number;
  name:string;
  overview:string;
  poster_path:string;
  vote_average:number;
}

export interface GetTvShowsListStateModel{
  data: any,
  error: any,
  loading: boolean,
  total_pages:number,
  pageNumber: number
}
