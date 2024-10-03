import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {SearchComponent} from '../search/component/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    SearchComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
