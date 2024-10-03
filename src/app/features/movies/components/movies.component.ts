import {Component, OnInit, DoCheck} from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import {Store} from '@ngrx/store';
import {getMoviesIsLoading} from '../state/movies.actions';
import {CommonModule} from '@angular/common';
import {MediaBoxComponent} from '../../media-box/media-box.component';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {map} from 'rxjs/operators';
import {GetMoviesListStateModel} from '../state/movies.model';
import {SearchStateModel} from '../../search/state/search.model';
import {query} from '@angular/animations';
import {searchIsLoading} from '../../search/state/search.actions';
import {convertObservableToString} from '../../../shared/convertObservableToString';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  standalone: true,
  imports: [CommonModule, MediaBoxComponent, InfiniteScrollDirective],
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit, DoCheck {
  data$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  totalPage$: Observable<number>;
  searchQuery$: Observable<string>;
  page: number = 1;

  constructor(private store: Store<{ movieState: GetMoviesListStateModel, searchState: SearchStateModel }>) {
    this.data$ = store.select(state => state.movieState.data);
    this.loading$ = store.select(state => state.movieState.loading);
    this.error$ = store.select(state => state.movieState.error);
    this.searchQuery$ = store.select(state => state.searchState.searchParam);
    this.totalPage$ = this.searchQuery$.pipe(
      switchMap(query => {
        if (query.length >= 3) {
          // If search is on, select from searchState
          return this.store.select(state => state.searchState.total_pages);
        } else {
          // Otherwise, select from movieState
          return this.store.select(state => state.movieState.total_pages);
        }
      })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(getMoviesIsLoading({pageNumber: this.page}));
  }

  loadMovies() {
    console.log("this.searchQuery$", this.searchQuery$)
    this.searchQuery$.pipe(
      map(query => {
        console.log('ge', query)
        return query&&query.length >= 3
      })).subscribe(isInSearch =>
      isInSearch ? // If search is on, call search
        this.store.dispatch(searchIsLoading({
          param: convertObservableToString(this.searchQuery$),
          pageNumber: this.page,
          mode: 'movie'
        }))
        :
        // Otherwise, call get movies
        this.store.dispatch(getMoviesIsLoading({pageNumber: this.page}))
    )
  }

  onScroll() {
    this.totalPage$
      .pipe(
        map(observableNumber => {
          console.log('observableNumber',observableNumber)
          return (observableNumber > this.page)
        }),
      ).subscribe(isGreaterThan => {
      if (isGreaterThan) {
        this.page++;
        this.loadMovies();
      } else {
        console.log('end of page');
      }
    });
  }

  ngDoCheck(): void {
    // Check for changes in the internal state
    if (this.data$) {
      this.data$.subscribe((data) => {
        console.log(data)
      })
    }
  }

}
