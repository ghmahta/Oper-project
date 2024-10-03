import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-media-box',
  standalone: true,
  imports: [],
  templateUrl: './media-box.component.html',
  styleUrl: './media-box.component.scss'
})
export class MediaBoxComponent {
  @Input() mediaItem: any;

  getPosterUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}
