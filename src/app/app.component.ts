import { Component, OnInit } from '@angular/core';
import { AppService } from './service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'TaxiApp';

  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.service.saveData('arrayOfRides', JSON.stringify([]));
  }
}
