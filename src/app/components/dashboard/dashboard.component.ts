import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/model/case';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  case: any;
  isLoading : boolean = false;

  constructor(private apiService : ApiService) { }
  
  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData() : void{
    this.isLoading = true;
    this.apiService.getDashboardData().subscribe((data : any)=>{
      this.case = data;
      this.isLoading = false;
    },error =>{
      this.isLoading = false;
    })
  }

}
