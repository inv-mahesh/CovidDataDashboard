import { Component, OnInit, ViewChild } from '@angular/core';
import { Country } from 'src/app/model/country';
import { ApiService } from 'src/app/service/api.service';
import {PageEvent} from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';


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

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    this.getCountryData();
  }

  getCountryData() {
    this.apiService.getCountryData().subscribe(countries =>{
      console.log("data",countries)
      this.countries = countries;
      this.length = countries.length
      console.log("this.countries",this.countries,this.length)
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

  

}
