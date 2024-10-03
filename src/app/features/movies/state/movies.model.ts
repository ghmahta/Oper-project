export interface MovieInterface{
  id:number,
  original_title:string,
  overview:string,
  poster_path:string,
  title:string,
  vote_average:number
}

export interface GetMoviesListStateModel{
  data: any,
  error: any,
  loading: boolean,
  total_pages:number,
  pageNumber: number
}
