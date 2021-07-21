import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  countryData : any;

  constructor() { }

    setCountryData(countryData : any) : void{
        this.countryData = countryData;
        localStorage.setItem('countryInfo',JSON.stringify(countryData))
    }  
    
    getCountryData() : any{
      return localStorage.getItem('countryInfo')
    }
}
