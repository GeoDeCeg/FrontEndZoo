import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableComponent} from './table/table.component';
import {HomeComponent} from './home/home.component';
import {PersonneComponent} from './personne/personne.component';
import {AnimalComponent} from './animal/animal.component';
import {RoleComponent} from './role/role.component';
import {TacheComponent} from './tache/tache.component';
import {ZoneComponent} from './zone/zone.component';
import {NourritureComponent} from './nourriture/nourriture.component';
import {EnclosComponent} from './enclos/enclos.component';
import {AvancementComponent} from './avancement/avancement.component';
import {GestionComponent} from './gestion/gestion.component';
import {CalendrierComponent} from './calendrier/calendrier.component';



const routes: Routes = [

  {
    path:"",
    component: HomeComponent
  },
  {
    path:"table",
    component: TableComponent
  },
  {
    path:"gestion",
    component: GestionComponent
  },
  {
    path:"calendrier",
    component:CalendrierComponent
  }








];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
