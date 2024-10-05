import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-media-box',
  standalone: true,
  imports: [],
  templateUrl: './media-box.component.html',
  styleUrl: './media-box.component.scss'
})
export class MediaBoxComponent {
  @Input() mediaItem: any;
  @Input() mode: string = 'movie';

  constructor(private router: Router) {
  }

  getPosterUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  routeDetail(){
    return this.router.navigate([`/details/${this.mode}/${this.mediaItem.id}`]);
  }

}
