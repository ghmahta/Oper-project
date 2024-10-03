import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {defer, of} from 'rxjs';
import {ApiResultModel} from '../../../shared/apiResult.model';
import {TvShowsService} from './tv-shows.service';
import {getTvShowsFailure, getTvShowsIsLoading, getTvShowsSuccess} from './tv-shows.actions';

@Injectable()
export class TvShowsEffects {
  constructor(private actions$: Actions, private tvShowsService: TvShowsService) {}

  loadTvShows$ = createEffect(() => {
      return defer(() => {
        return this.actions$.pipe(
          ofType(getTvShowsIsLoading),
          mergeMap(({pageNumber}) => {
            return this.tvShowsService.getData(pageNumber).pipe(
              map((data:ApiResultModel) => getTvShowsSuccess({
                tvShows: data.results,
                totalPage:data.total_pages,
                page: data.page })),
              catchError((error) => of(getTvShowsFailure({ error })))
            );
          })
        )
      })
    }
  );
}
