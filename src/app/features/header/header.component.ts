import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {SearchComponent} from '../search/component/search.component';
import {filter} from 'rxjs';

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
export class HeaderComponent implements OnInit{
  currentUrl: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to router events to get the current URL
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Only trigger on navigation end
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
      console.log('Current URL:', this.currentUrl); // This will log the current URL in the console
    });
  }
}
