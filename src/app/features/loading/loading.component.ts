import { Component } from '@angular/core';
import { trigger, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [
    trigger('spinner', [
      transition('* => *', [
        animate('1s infinite', keyframes([
          style({ transform: 'rotate(0deg)' }),
          style({ transform: 'rotate(360deg)' }),
        ]))
      ])
    ])
  ]
})
export class LoadingComponent {}
