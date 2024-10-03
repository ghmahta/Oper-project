import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {searchIsLoading} from '../state/search.actions';
import {CommonModule, ViewportScroller} from '@angular/common';
import {getMoviesIsLoading} from '../../movies/state/movies.actions';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchForm: FormGroup;

  constructor(private store: Store,
              private fb: FormBuilder,
              private viewportScroller: ViewportScroller) {
    this.searchForm = this.fb.group({
      query: ['']
    });

    this.searchForm.get('query')?.valueChanges
      .pipe(
        debounceTime(300), // Wait for 300ms pause in events
        distinctUntilChanged() // Ignore if next search term is the same as previous
      )
      .subscribe(query => {
        if (query.length >= 3) {
          this.store.dispatch(searchIsLoading({param: query, pageNumber: 1, mode:"movie"}));
        }else if(query.length == 0){
          //start from first
          this.viewportScroller.scrollToPosition([0, 0])
          this.store.dispatch(getMoviesIsLoading({pageNumber:1}))
        }
      });
  }
}
