import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {defer, of} from 'rxjs';
import {ApiResultModel} from '../../../shared/apiResult.model';
import {MediaDetailsService} from './media-details.service';
import {
  getMediaDetailsFailure,
  getMediaDetailsIsLoading,
  getMediaDetailsSuccess
} from './media-details.actions';

@Injectable()
export class MediaDetailsEffects {
  constructor(private actions$: Actions, private mediaDetailsService: MediaDetailsService) {}

  mediaDetails$ = createEffect(() => {
      return defer(() => {
        return this.actions$.pipe(
          ofType(getMediaDetailsIsLoading),
          mergeMap(({id, mediaType}) => {
            return this.mediaDetailsService.getData(id, mediaType).pipe(
              map((data:ApiResultModel) => getMediaDetailsSuccess({
                details: data })),
              catchError((error) => of(getMediaDetailsFailure({ error })))
            );
          })
        )
      })
    }
  );
}
