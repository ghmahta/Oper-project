import { Routes } from '@angular/router';
import {TvShowsComponent} from './features/tv-shows/components/tv-shows.component';
import {MoviesComponent} from './features/movies/components/movies.component';
import {MediaDetailsComponent} from './features/media-details/components/media-details.component';

export const routes: Routes = [
  {path: "movies", component: MoviesComponent},
  {path: "tv-shows", component: TvShowsComponent},
  {path:"details/:mode/:id", component: MediaDetailsComponent}
];
