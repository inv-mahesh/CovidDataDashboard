import { Component, OnInit, ViewChild } from '@angular/core';
import { Country } from 'src/app/model/country';
import { ApiService } from 'src/app/service/api.service';
import {PageEvent} from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  data : any = [];
  countries!: any[];
  length : number = 0;
  page = 0;
  pageSize : number = 30;
  pageSizeOptions : number =30;

  pageEvent!: PageEvent;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  searchText : string = ''

  constructor(private apiService : ApiService,private router : Router, private sharedService : SharedService) { }

  ngOnInit(): void {
    this.getCountryData();
  }

  getCountryData() {
    this.apiService.getCountryData().subscribe(countries =>{
      this.countries = countries;
      this.length = countries.length;
      this.getData({pageIndex: this.page, pageSize: this.pageSize});
    },error =>{

    })
  }

  getData(obj: { pageIndex: number; pageSize: number; }) {
    let index=0,
        startingIndex=obj.pageIndex * obj.pageSize,
        endingIndex=startingIndex + obj.pageSize;

    this.data = this.countries.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
  }

  gotoEdit(country :any) : void{
    let countryData = {cases : country.cases,deaths : country.deaths,recovered : country.recovered,
      tests : country.tests}
    this.sharedService.setCountryData(countryData)
    this.router.navigateByUrl("/country-edit/" + country.country);
  }

  onSortChange(event : any) : void{
    let param = event.value;
    if(event.value){
      this.countries.sort((country1, country2) => {
        return this.compareObjects(country1, country2, param)
      })
      this.getData({pageIndex: this.page, pageSize: this.pageSize});
    }else{
      this.getCountryData();
    }
  }

  compareObjects(object1 :any, object2 : any, key :any) {
    const obj1 = object1[key]
    const obj2 = object2[key]
  
    if (obj1 < obj2) {
      return -1
    }
    if (obj1 > obj2) {
      return 1
    }
    return 0
  }

  openSearch() : void{
    let obj = this.countries.find(o => o.country == this.searchText);
    if(obj){
      this.countries = [obj];
      this.getData({pageIndex: this.page, pageSize: this.pageSize});
    }
        
  }

  

}

