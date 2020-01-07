import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableComponent} from './table/table.component';
import {HomeComponent} from './home/home.component';
import {GestionComponent} from './gestion/gestion.component';
import {CalendrierComponent} from './calendrier/calendrier.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './service/auth-guard/auth-guard.service';




const routes: Routes = [

  {
    path:"home",    
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:"table",
    component: TableComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:"gestion",
    component: GestionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:"calendrier",
    component:CalendrierComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:"monprofil",
    component:ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:"",
    component: LoginComponent
  }








];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
