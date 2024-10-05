import {Component, DoCheck, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {MediaBoxComponent} from '../../media-box/media-box.component';
import {MediaBoxContainerComponent} from '../../media-box-container/media-box-container.component';
import {Observable, switchMap} from 'rxjs';
import {Store} from '@ngrx/store';
import {SearchStateModel} from '../../search/state/search.model';
import {map} from 'rxjs/operators';
import {searchIsLoading} from '../../search/state/search.actions';
import {convertObservableToString} from '../../../shared/convertObservableToString';
import {GetTvShowsListStateModel} from '../state/tv-shows.model';
import {getTvShowsIsLoading} from '../state/tv-shows.actions';
import {LoadingComponent} from "../../loading/loading.component";

@Component({
  selector: 'app-tv-shows',
  standalone: true,
    imports: [
        AsyncPipe,
        InfiniteScrollDirective,
        MediaBoxComponent,
        NgForOf,
        NgIf,
        MediaBoxContainerComponent,
        LoadingComponent
    ],
  templateUrl: './tv-shows.component.html',
  styleUrl: './tv-shows.component.scss'
})
export class TvShowsComponent implements OnInit{
  data$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  page: number = 1;

  constructor(private store: Store<{ tvShowsState: GetTvShowsListStateModel, searchState: SearchStateModel }>) {
    this.data$ = store.select(state => state.tvShowsState.data);
    this.loading$ = store.select(state => state.tvShowsState.loading);
    this.error$ = store.select(state => state.tvShowsState.error);
  }

  ngOnInit(): void {
    this.store.dispatch(getTvShowsIsLoading({pageNumber: this.page}));
  }

}
