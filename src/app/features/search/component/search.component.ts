import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import {debounceTime, distinctUntilChanged, filter} from 'rxjs';
import {searchIsLoading} from '../state/search.actions';
import {CommonModule, ViewportScroller} from '@angular/common';
import {getMoviesIsLoading} from '../../movies/state/movies.actions';
import {NavigationEnd, Router} from '@angular/router';

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
export class SearchComponent implements OnInit{
  searchForm: FormGroup;
  queryMinLength: number = 3; //minimum length of query to call search
  searchDelay: number = 100; //the time after last character to call search - milliseconds
  currentTab:string ='';

  constructor(private store: Store,
              private router: Router,
              private fb: FormBuilder,
              private viewportScroller: ViewportScroller) {
    this.searchForm = this.fb.group({
      query: ['']
    });

    this.getData();

  }
  getData(){
    this.searchForm.get('query')?.valueChanges
      .pipe(
        debounceTime(this.searchDelay), // Wait for 300ms pause in events
        distinctUntilChanged() // Ignore if next search term is the same as previous
      )
      .subscribe(query => {
        if (query.length >= this.queryMinLength) {
          console.log('this.currentTabbbb',this.currentTab)
          this.store.dispatch(searchIsLoading({param: query, pageNumber: 1,
            mode:`${this.currentTab=='/movies'?'movie':'tv'}`}));
        }else if(query.length == 0){
          //start from first
          this.viewportScroller.scrollToPosition([0, 0])
          this.store.dispatch(getMoviesIsLoading({pageNumber:1}))
        }
      });
  }

  ngOnInit(): void {
    // Subscribe to router events to detect route changes
    this.router.events.subscribe(() => {
      this.currentTab = this.router.url;

      // Disable or enable the input based on the route
      if (this.currentTab.includes('/details')) {
        this.searchForm.get('query')?.disable();
      } else {
        this.searchForm.get('query')?.enable();
      }
    });
    //recall apis when route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  // Only act on route change
    ).subscribe(() => {
      // Trigger your API calls here
      this.getData()
    });
  }
}
