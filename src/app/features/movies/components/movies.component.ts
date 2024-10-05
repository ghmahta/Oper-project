import {Component, OnInit, DoCheck} from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import {Store} from '@ngrx/store';
import {getMoviesIsLoading} from '../state/movies.actions';
import {CommonModule} from '@angular/common';
import {MediaBoxComponent} from '../../media-box/media-box.component';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {map} from 'rxjs/operators';
import {GetMoviesListStateModel, MovieModel} from '../state/movies.model';
import {SearchStateModel} from '../../search/state/search.model';
import {searchIsLoading} from '../../search/state/search.actions';
import {convertObservableToString} from '../../../shared/convertObservableToString';
import {MediaBoxContainerComponent} from '../../media-box-container/media-box-container.component';
import {LoadingComponent} from '../../loading/loading.component';
import {ApiErrorModel} from '../../../shared/apiError.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  standalone: true,
  imports: [CommonModule, MediaBoxComponent, InfiniteScrollDirective, MediaBoxContainerComponent, LoadingComponent],
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit, DoCheck {
  data$: Observable<MovieModel[]>;
  loading$: Observable<boolean>;
  error$: Observable<ApiErrorModel| null>;
  page: number = 1;

  constructor(private store: Store<{ movieState: GetMoviesListStateModel }>) {
    this.data$ = store.select(state => state.movieState.data);
    this.loading$ = store.select(state => state.movieState.loading);
    this.error$ = store.select(state => state.movieState.error);
  }

  ngOnInit(): void {
    this.store.dispatch(getMoviesIsLoading({pageNumber: this.page}));
  }

  ngDoCheck(): void {
    // Check for changes in the internal state
    if (this.error$) {
      this.error$.subscribe((data) => {
        console.log(data)
      })
    }
  }

}
