import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/envionment';
import {MovieModel} from '../movies/state/movies.model';
import {TvShowModel} from '../tv-shows/state/tv-shows.model';

@Component({
  selector: 'app-media-box',
  standalone: true,
  imports: [],
  templateUrl: './media-box.component.html',
  styleUrl: './media-box.component.scss'
})
export class MediaBoxComponent {
  @Input() mediaItem!: MovieModel | TvShowModel;
  @Input() mode: string = 'movie';

  constructor(private router: Router) {
  }

  getPosterUrl(path: string): string {
    return `${environment.imageBaseUrl}${path}`;
  }

  routeDetail() {
    return this.router.navigate([`/details/${this.mode}/${this.mediaItem.id}`]);
  }

  // Type guard to check if it's a MovieModel
  isMovie(mediaItem: MovieModel | TvShowModel): mediaItem is MovieModel {
    return (mediaItem as MovieModel).title !== undefined;
  }

  // Type guard to check if it's a TvShowModel
  isTvShow(mediaItem: MovieModel | TvShowModel): mediaItem is TvShowModel {
    return (mediaItem as TvShowModel).name !== undefined;
  }

  //Decide if we should use name or title
  decideForTitleAndName(): string {
    if (this.isMovie(this.mediaItem))
      return this.mediaItem.title;
    else if (this.isTvShow(this.mediaItem))
      return this.mediaItem.name;
    else
      return ''
  }

}
