import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { Case } from '../model/case'
import { map, catchError } from 'rxjs/operators';
import { Country } from '../country';
// import { Country } from '../model/country';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api_baseUrl  = 'https://corona.lmao.ninja/v2/';
  case = new Case();
  // country = new Country();

  constructor(private httpClient : HttpClient) { }

  public getDashboardData() : Observable<any>{
    return this.httpClient.get(this.api_baseUrl+'all').pipe(map((response : any)=>{
        this.case.cases = response.cases
        this.case.deaths = response.deaths
        this.case.recovered = response.recovered
        this.case.todayCases = response.todayCases
        this.case.todayDeaths = response.todayDeaths
        this.case.todayRecovered = response.todayRecovered
        return this.case;
    }),
    (error) =>{
        return error;
    });
  }


  public getCountryData() : Observable<any>{
    return this.httpClient.get(this.api_baseUrl+'countries');
  }
}
