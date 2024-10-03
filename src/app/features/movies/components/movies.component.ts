import {Component, OnInit, DoCheck} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {GetListStateModel} from '../../../shared/models/getListState.model';
import {getMoviesIsLoading} from '../state/movies.actions';
import {CommonModule} from '@angular/common';
import {MediaBoxComponent} from '../../media-box/media-box.component';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {map} from 'rxjs/operators';

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
  page: number = 1;

  constructor(private store: Store<{ movieState: GetListStateModel }>) {
    this.data$ = store.select(state => state.movieState.data);
    this.loading$ = store.select(state => state.movieState.loading);
    this.error$ = store.select(state => state.movieState.error);
    this.totalPage$ = store.select(state => state.movieState.total_pages)
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    // Dispatch the action to load movies for the current page
    this.store.dispatch(getMoviesIsLoading({pageNumber: this.page}));
  }

  onScroll() {
    this.totalPage$
      .pipe(
        map(observableNumber => {
          console.log("haha", observableNumber);
          return(observableNumber > this.page)
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
