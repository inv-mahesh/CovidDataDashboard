import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss']
})
export class CountryEditComponent implements OnInit {

  country : any;
  case : any;
  countryInfo :any;
  state$: Observable<object> | undefined;
  editForm! : FormGroup

  constructor(private activatedRoute : ActivatedRoute,private router : Router,private sharedService : SharedService) { 
    // this.countryInfo = this.router.getCurrentNavigation().extras.state
  }

  ngOnInit(): void {
    this.country = this.activatedRoute.snapshot.paramMap.get('country');
    this.countryInfo = JSON.parse(this.sharedService.getCountryData())
    this.editForm = new FormGroup({
      cases  : new FormControl(this.countryInfo.cases,[Validators.required]),
      deaths  : new FormControl(this.countryInfo.deaths,[Validators.required]),
      recovered  : new FormControl(this.countryInfo.recovered,[Validators.required]),
      tests  : new FormControl(this.countryInfo.tests,[Validators.required])
    })
  }

  get cases() { return this.editForm.get('cases'); }
  get deaths() { return this.editForm.get('deaths'); }
  get recovered() { return this.editForm.get('recovered'); }
  get tests() { return this.editForm.get('tests'); }

  updateCountry() : void{
    console.log("valid form",this.editForm.value)
  }

  cancel() : void{
    this.router.navigateByUrl('/countries')
  }

}
