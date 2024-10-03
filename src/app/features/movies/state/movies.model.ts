export interface MovieInterface{
  id:number,
  original_title:string,
  overview:string,
  poster_path:string,
  title:string,
  vote_average:number
}
export interface MoviesApiModel{
  results:MovieInterface[],
  total_pages: number,
  page: number
}
