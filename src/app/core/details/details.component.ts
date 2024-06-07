import { Component, OnInit } from '@angular/core';
import { AppService } from '../../service/app.service';
import { Ride } from '../../models/ride';
import { Router } from '@angular/router';
import mapboxgl from 'mapbox-gl';

declare let MapboxDirections: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  ride: Ride = new Ride();

  constructor(private service: AppService, private router: Router) {}

  ngOnInit(): void {
    let rideId = this.router.routerState.snapshot.url.substring(6);

    let arr = JSON.parse(this.service.getData('arrayOfRides'));
    for (let i of arr) {
      if (i.id == rideId) {
        this.ride = i;
      }
    }

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
        zoom: 8, // starting zoom
      });
      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav);

      map.addControl(
        new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: 'metric',
        }),
        'top-left'
      );

      if (map.loaded() === false) {
        (
          document.getElementsByClassName(
            'mapbox-directions-clearfix'
          )[0] as HTMLDivElement
        ).style.display = 'none';
        (
          (
            document.getElementById(
              'mapbox-directions-origin-input'
            ) as HTMLDivElement
          ).children[0].children[1] as HTMLInputElement
        ).value = this.ride.addressFrom;

        (
          (
            document.getElementById(
              'mapbox-directions-destination-input'
            ) as HTMLDivElement
          ).children[0].children[1] as HTMLInputElement
        ).value = this.ride.addressTo;
      }
    };
  }
}
