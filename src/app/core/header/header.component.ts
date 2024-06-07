import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  focus() {
    let el = document.getElementById('form') as HTMLElement;
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
