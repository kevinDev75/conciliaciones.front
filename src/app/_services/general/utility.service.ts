import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  _kpPolicy(event: any, valPolicy: any) {
    const pattern = /[0-9]$/;
    const inputChar = String.fromCharCode(event.charCode);
    let longText = valPolicy.toString().length;
    console.log(longText);
    if (Number(inputChar) >= 0 && Number(inputChar) <= 9) {
      longText = longText + 1;
    }
    if (!pattern.test(inputChar) || longText > 10) {
      event.preventDefault();
    }
  }

}


