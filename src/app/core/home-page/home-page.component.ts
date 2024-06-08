import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import mapboxgl from 'mapbox-gl';
import { AppService } from '../../service/app.service';
import { Ride } from '../../models/ride';

declare let MapboxDirections: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  creditCard: boolean = false;
  range: number = 0;
  price!: number;

  constructor(private router: Router, private service: AppService) {}

  ngOnInit(): void {
    (mapboxgl as typeof mapboxgl).accessToken =
      'pk.eyJ1IjoibWF0cmljZTk5IiwiYSI6ImNseDMyMW0yaDAyMjIyanNjZ3FibHg0Mm0ifQ.jkz2w06NI6-ILfDnqXoHRw';

    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });

    function successLocation(position: any) {
      setupMap([position.coords.longitude, position.coords.latitude]);
    }

    function errorLocation() {
      setupMap([45.2396, 19.8227]);
    }

    const setupMap = (center: any) => {
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: center, // starting position [lng, lat]
        zoom: 1, // starting zoom
      });
      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav);

      map.addControl(
        new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: 'metric',
        }).on('route', (e: any) => {
          let range = e.route[0].distance;
          this.range = range.toFixed();
          this.calculatePrice(this.range);
        }),
        'top-left'
      );
      if (map.loaded() === false) {
        (
          document.getElementsByClassName(
            'mapbox-directions-clearfix'
          )[0] as HTMLDivElement
        ).style.display = 'none';
      }
    };

    if (this.router.navigated === true) {
      let hamburger = document.getElementById('hamburger');
      if ((hamburger as HTMLInputElement).checked === true) {
        (hamburger as HTMLInputElement).checked = false;
      }
    }
  }

  calculatePrice(e: any) {
    let price = (e / 1000) * 2;
    this.price = Number(price.toFixed());
  }

  form = new FormGroup({
    date: new FormControl<Date>(new Date(), Validators.required),
    time: new FormControl(Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
    kes: new FormControl(),
    card: new FormControl(),
    cardNumber: new FormControl<string>('', Validators.required),
    cardMonth: new FormControl([
      Validators.required,
      Validators.min(1),
      Validators.max(12),
    ]),
    cardYear: new FormControl([
      Validators.required,
      Validators.min(21),
      Validators.max(28),
    ]),
  });

  onSubmit() {
    let obj = {
      addressFrom: (
        (
          document.getElementById(
            'mapbox-directions-origin-input'
          ) as HTMLDivElement
        ).children[0].children[1] as HTMLInputElement
      ).value,
      addressTo: (
        (
          document.getElementById(
            'mapbox-directions-destination-input'
          ) as HTMLDivElement
        ).children[0].children[1] as HTMLInputElement
      ).value,
      date: this.form.controls.date.value,
      time: this.form.controls.time.value,
      mobile: this.form.controls.phoneNumber.value,
      paymentMethod: this.creditCard
        ? this.form.controls.card.value
        : this.form.controls.kes.value, //
      cardNumber: this.form.controls.cardNumber.value,
      cardMonth: this.form.controls.cardMonth.value,
      cardYear: this.form.controls.cardYear.value,
      price: this.price,
      range: this.range / 1000,
      id: Math.floor(Math.random() * 100000),
    };
    let temp = new Ride(obj);
    this.service.setRide(temp);
    let localStorage = JSON.parse(this.service.getData('arrayOfRides'));
    let tempArr = [...localStorage];
    tempArr.push(obj);
    this.service.saveData('arrayOfRides', JSON.stringify([...tempArr]));
    this.router.navigate(['list']);
  }

  focus(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  toggleCard(e: any) {
    if (e.target.value === 'cash') {
      this.creditCard = false;
      this.form.controls.cardNumber.clearValidators();
      this.form.controls.cardMonth.clearValidators();
      this.form.controls.cardYear.clearValidators();
      this.form.get('cardNumber')?.updateValueAndValidity();
      this.form.get('cardMonth')?.updateValueAndValidity();
      this.form.get('cardYear')?.updateValueAndValidity();
    } else {
      this.creditCard = true;
      this.form.get('cardNumber')?.setValidators([Validators.required]);
      this.form
        .get('cardMonth')
        ?.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(12),
        ]);
      this.form
        .get('cardYear')
        ?.setValidators([
          Validators.required,
          Validators.min(21),
          Validators.max(28),
        ]);
      this.form.get('cardNumber')?.updateValueAndValidity();
      this.form.get('cardMonth')?.updateValueAndValidity();
      this.form.get('cardYear')?.updateValueAndValidity();
    }
  }
}
