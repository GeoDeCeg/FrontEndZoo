import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TableComponent } from './table/table.component';
import { HomeComponent } from './home/home.component';
import { PersonneComponent } from './personne/personne.component';
import { AnimalComponent } from './animal/animal.component';
import { RoleComponent } from './role/role.component';
import { TacheComponent } from './tache/tache.component';
import { ZoneComponent } from './zone/zone.component';
import { NourritureComponent } from './nourriture/nourriture.component';
import { EnclosComponent } from './enclos/enclos.component';
import { AvancementComponent } from './avancement/avancement.component';
import { GestionComponent } from './gestion/gestion.component';
import { AddPersonneComponent } from './add-personne/add-personne.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdatePersonneComponent } from './update-personne/update-personne.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { CalendrierComponent } from './calendrier/calendrier.component';
import { AddTacheComponent } from './add-tache/add-tache.component'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    TableComponent,
    HomeComponent,
    PersonneComponent,
    AnimalComponent,
    RoleComponent,
    TacheComponent,
    ZoneComponent,
    NourritureComponent,
    EnclosComponent,
    AvancementComponent,
    GestionComponent,
    AddPersonneComponent,
    UpdatePersonneComponent,
    CalendrierComponent,
    AddTacheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    FullCalendarModule ,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule

  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
