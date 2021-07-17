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

  constructor(private apiService : ApiService) { }
  
  ngOnInit(): void {
    console.log("dashboard component initialized")
    this.getDashboardData();
  }

  getDashboardData() : void{
    this.apiService.getDashboardData().subscribe((data : any)=>{
      console.log("data",data)
      this.case = data;
      console.log("cases",this.case)
    },error =>{

    })
  }

}
