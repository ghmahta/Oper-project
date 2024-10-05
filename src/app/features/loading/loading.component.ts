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
        animate('1s linear', keyframes([
          style({ transform: 'rotate(0deg)', offset: 0 }),
          style({ transform: 'rotate(360deg)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class LoadingComponent {}
