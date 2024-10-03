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

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore({
      movieState: MoviesReducer ,
      searchState: SearchReducer,
    }),
    provideEffects([
      MoviesEffects,
      SearchEffects
    ]),
    provideRouter(routes),
  ],
};
