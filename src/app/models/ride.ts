import { Time } from '@angular/common';

export class Ride {
  addressFrom: string;
  addressTo: string;
  date: Date;
  time: Time;
  mobile: number;
  paymentMethod: string;
  cardNumber: number;
  cardMonth: number;
  cardYear: number;
  price: number;
  range: number;
  id: number;

  constructor(obj?: any) {
    this.addressFrom = (obj && obj.addressFrom) || '';
    this.addressTo = (obj && obj.addressTo) || '';
    this.date = (obj && obj.date) || new Date();
    this.time = (obj && obj.time) || new Date().getTime();
    this.mobile = (obj && obj.mobile) || 0;
    this.paymentMethod = (obj && obj.paymentMethod) || '';
    this.cardNumber = (obj && obj.cardNumber) || 0;
    this.cardMonth = (obj && obj.cardMonth) || 0;
    this.cardYear = (obj && obj.cardYear) || 0;
    this.price = (obj && obj.price) || 0;
    this.range = (obj && obj.range) || 0;
    this.id = (obj && obj.id) || 0;
  }
}
