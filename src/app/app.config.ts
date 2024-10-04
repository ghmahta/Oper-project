import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { MoviesEffects } from './features/movies/state/movies.effects';
import { MoviesReducer } from './features/movies/state/movies.reducer';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import {SearchReducer} from './features/search/state/search.reducer';
import {SearchEffects} from './features/search/state/search.effects';
import {TvShowsReducer} from './features/tv-shows/state/tv-shows.reducer';
import {TvShowsEffects} from './features/tv-shows/state/tv-shows.effects';
import {MediaDetailsReducer} from './features/media-details/state/media-details.reducer';
import {MediaDetailsEffects} from './features/media-details/state/media-details.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore({
      movieState: MoviesReducer ,
      tvShowsState: TvShowsReducer,
      searchState: SearchReducer,
      mediaDetailsState: MediaDetailsReducer
    }),
    provideEffects([
      MoviesEffects,
      TvShowsEffects,
      SearchEffects,
      MediaDetailsEffects
    ]),
    provideRouter(routes),
  ],
};
