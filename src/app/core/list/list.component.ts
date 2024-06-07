import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../service/app.service';
import { Ride } from '../../models/ride';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  ride: Ride = new Ride();
  booked: Ride[] = [];
  creditCard: boolean = false;
  allRides: Ride[] = [];

  constructor(private router: Router, private service: AppService) {
    this.service.getRide.subscribe((ride) => {
      this.booked.push(ride);
      if (ride.paymentMethod === 'cash') {
        this.creditCard = false;
      } else {
        this.creditCard = true;
      }
    });
  }

  ngOnInit(): void {
    this.allRides = JSON.parse(this.service.getData('arrayOfRides'));
    if (this.router.navigated === true) {
      let hamburger = document.getElementById('hamburger');
      if ((hamburger as HTMLInputElement).checked === true) {
        (hamburger as HTMLInputElement).checked = false;
      }
    }
  }
}
