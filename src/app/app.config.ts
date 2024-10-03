import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { MoviesEffects } from './features/movies/state/movies.effects';
import { MoviesReducer } from './features/movies/state/movies.reducer';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore({ movieState: MoviesReducer }),
    provideEffects([MoviesEffects]),
    provideRouter(routes),
  ],
};
