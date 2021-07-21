import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { IndexComponent } from '../index/index.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CountryComponent } from '../country/country.component';
import { CountryEditComponent } from '../country-edit/country-edit.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
const routes: Routes = [
  {path:'', component:IndexComponent, canActivate : [AuthGuard],
    children:[
        {path:'dashboard',component : DashboardComponent },
        {path:'countries',component : CountryComponent},
        {path:'country-edit/:country',component : CountryEditComponent}
    ]},
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }