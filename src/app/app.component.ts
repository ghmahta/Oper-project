import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd, RouterEvent} from '@angular/router';
import {CommonModule, ViewportScroller} from '@angular/common';
import {HeaderComponent} from './features/header/header.component';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Media App-Oper Interview';
  constructor(private router: Router, private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd) // Ensure type is NavigationEnd
      ).subscribe(() => {
        this.viewportScroller.scrollToPosition([0, 0]); // Scroll to top of the page
      });
  }
}
