import {Component, Input} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {MediaBoxComponent} from "../media-box/media-box.component";
import {GetMoviesListStateModel, MovieInterface} from '../movies/state/movies.model';
import {Observable, of, switchMap} from 'rxjs';
import {GetTvShowsListStateModel, TvShowModel} from '../tv-shows/state/tv-shows.model';
import {map} from 'rxjs/operators';
import {searchIsLoading} from '../search/state/search.actions';
import {convertObservableToString} from '../../shared/convertObservableToString';
import {getMoviesIsLoading} from '../movies/state/movies.actions';
import {SearchStateModel} from '../search/state/search.model';
import {Store} from '@ngrx/store';
import {getTvShowsIsLoading} from '../tv-shows/state/tv-shows.actions';

@Component({
  selector: 'app-media-box-container',
  standalone: true,
  imports: [
    AsyncPipe,
    InfiniteScrollDirective,
    MediaBoxComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './media-box-container.component.html',
  styleUrl: './media-box-container.component.scss'
})
export class MediaBoxContainerComponent {
  @Input() mediaItems: Observable<any>;
  @Input() mode: string;
  totalPage$: Observable<number>;
  searchQuery$: Observable<string>;
  page: number = 1;

  constructor(private store: Store<{
    searchState: SearchStateModel,
    movieState: GetMoviesListStateModel,
    tvShowsState: GetTvShowsListStateModel
  }>) {
    this.mediaItems = of([]);
    this.mode = 'movies';
    this.searchQuery$ = store.select(state => state.searchState.searchParam);
    this.totalPage$ = this.searchQuery$.pipe(
      switchMap(query => {
        if (query.length >= 3) {
          // If search is on, select from searchState
          return this.store.select(state => state.searchState.total_pages);
        } else {
          // Otherwise, select from movieState or tvState
          if (this.mode == 'tv')
            return this.store.select(state => state.tvShowsState.total_pages)
          else
            return this.store.select(state => state.movieState.total_pages);
        }
      })
    );
  }

  loadMedia() {
    console.log("this.searchQuery$", this.searchQuery$)
    this.searchQuery$.pipe(
      map(query => {
        console.log('ge', query)
        return query && query.length >= 3
      })).subscribe(isInSearch =>
      isInSearch ? // If search is on, call search
        this.store.dispatch(searchIsLoading({
          param: convertObservableToString(this.searchQuery$),
          pageNumber: this.page,
          mode: 'movie'
        }))
        :
        // Otherwise, call get movies or tv shows
        (this.mode == 'tv') ?
          this.store.dispatch(getTvShowsIsLoading({pageNumber: this.page}))
          :
          this.store.dispatch(getMoviesIsLoading({pageNumber: this.page}))
    )
  }

  onScroll() {
    this.totalPage$
      .pipe(
        map(observableNumber => {
          console.log('observableNumber', observableNumber)
          return (observableNumber > this.page)
        }),
      ).subscribe(isGreaterThan => {
      if (isGreaterThan) {
        this.page++;
        this.loadMedia();
      } else {
        console.log('end of page');
      }
    });
  }
}
