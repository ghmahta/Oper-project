import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {defer, of} from 'rxjs';
import {SearchService} from './search.service';
import {searchFailure, searchIsLoading, searchSuccess} from './search.actions';
import {ApiResultModel} from '../../../shared/apiResult.model';
import {updateMoviesFromSearch} from '../../movies/state/movies.actions';

@Injectable()
export class SearchEffects {
  constructor(private actions$: Actions, private searchService: SearchService) {
    console.log("thi", this.actions$)
  }

  loadData$ = createEffect(() => {
      return defer(() => {
        return this.actions$.pipe(
          ofType(searchIsLoading),
          mergeMap(({pageNumber, param, mode}) => {
            return this.searchService.getData(pageNumber, param, mode).pipe(
              mergeMap((data: ApiResultModel) => {
                return [
                  searchSuccess({
                    items: data.results,
                    totalPage: data.total_pages,
                    page: data.page
                  }),
                  updateMoviesFromSearch({movies: data.results, page: data.page})
                ]
              }),
              catchError((error) => of(searchFailure({error})))
            );
          })
        )
      })
    }
  );
}
