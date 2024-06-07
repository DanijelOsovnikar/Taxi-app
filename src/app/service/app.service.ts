import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ride } from '../models/ride';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  obj = {
    addressFrom: 'Novi Sad, South Bačka District, Serbia',
    addressTo: 'Sombor, West Bačka District, Serbia',
    date: '2024-06-18',
    time: '12:05',
    mobile: '+38162134567',
    paymentMethod: 'cash', //
    cardNumber: '',
    cardMonth: '',
    cardYear: '',
    price: 100,
    range: 116789 / 1000,
    id: 1,
  };

  private ride = new BehaviorSubject(new Ride(this.obj));
  getRide = this.ride.asObservable();

  constructor() {}

  setRide(ride: Ride) {
    this.ride.next(ride);
  }

  key = '123';

  public saveData(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }

  public getData(key: string) {
    let data = localStorage.getItem(key) || '';
    return this.decrypt(data);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(
      CryptoJS.enc.Utf8
    );
  }
}
