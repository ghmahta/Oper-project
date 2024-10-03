import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {getMoviesFailure, getMoviesIsLoading, getMoviesSuccess} from './movies.actions';
import {defer, of} from 'rxjs';
import {MoviesService} from './movies.service';
import {ApiResultModel} from '../../../shared/apiResult.model';

@Injectable()
export class MoviesEffects {
  constructor(private actions$: Actions, private movieService: MoviesService) {
    console.log("thi", this.actions$)
  }

  loadMovies$ = createEffect(() => {
      return defer(() => {
        return this.actions$.pipe(
          ofType(getMoviesIsLoading),
          mergeMap(({pageNumber}) => {
            return this.movieService.getData(pageNumber).pipe(
              map((data:ApiResultModel) => getMoviesSuccess({
                movies: data.results,
                totalPage:data.total_pages,
                page: data.page })),
              catchError((error) => of(getMoviesFailure({ error })))
            );
          })
        )
      })
    }
  );
}
