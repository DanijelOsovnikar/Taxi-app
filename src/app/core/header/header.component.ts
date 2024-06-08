import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  focus() {
    if (this.router.routerState.snapshot.url === '/list') {
      this.router.navigate(['/']);
      this.router.events.subscribe((event) => {
        if (
          this.router.routerState.snapshot.url === '/' &&
          event instanceof NavigationEnd
        ) {
          let el = document.getElementById('form') as HTMLElement;
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    } else {
      let el = document.getElementById('form') as HTMLElement;
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
