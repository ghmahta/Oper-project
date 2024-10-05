import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {getMediaDetailsIsLoading} from '../state/media-details.actions';
import {Observable} from 'rxjs';
import {GetMediaDetailsStateModel, MovieDetailModel} from '../state/media-details.model';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from "../../loading/loading.component";

@Component({
  selector: 'app-media-details',
  standalone: true,
    imports: [CommonModule, LoadingComponent],
  templateUrl: './media-details.component.html',
  styleUrl: './media-details.component.scss'
})
export class MediaDetailsComponent implements OnInit, DoCheck {
  mediaDetail$: Observable<any>;
  loading$:Observable<boolean>;
  error$: Observable<any>;
  mediaDetails: any;

  constructor(private route: ActivatedRoute, private store: Store<{ mediaDetailsState: GetMediaDetailsStateModel }>) {
    this.mediaDetail$ = store.select(state=>state.mediaDetailsState.data)
    this.loading$ = store.select(state=>state.mediaDetailsState.loading)
    this.error$ = store.select(state=>state.mediaDetailsState.error)
  }

  ngOnInit(): void {
    // Extract media type (movie or tv-show) and ID from the route
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const mediaType = params.get('mode');
      if (id && mediaType)
        this.loadDetails(Number(id), mediaType);
    });
  }

  ngDoCheck(): void {
    // Check for changes in the internal state
    if (this.mediaDetail$) {
      this.mediaDetail$.subscribe((data) => {
        console.log('mediaDetail$',data);
        this.mediaDetails = data;

      })
    }
  }

  loadDetails(id: number, type: string): void {
    this.store.dispatch(getMediaDetailsIsLoading({id: id, mediaType: type}))
  }

  getGenres(): string {
    return this.mediaDetails.genres.map((genre: { name: string }) => genre.name).join(', ');
  }

  getLanguages(): string {
    return this.mediaDetails.spoken_languages.map((lang: { english_name: string }) => lang.english_name).join(', ');
  }

  getCountries(): string {
    return this.mediaDetails.production_countries.map((country: { name: string }) => country.name).join(', ');
  }
}
