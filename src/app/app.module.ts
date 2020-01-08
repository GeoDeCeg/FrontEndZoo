import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import {MatIconModule} from '@angular/material/icon';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter'
import { LOCALE_ID } from '@angular/core';
import { UpdateTacheComponent } from './update-tache/update-tache.component';
import { AddAnimalComponent } from './add-animal/add-animal.component';
import { UpdateAnimalComponent } from './update-animal/update-animal.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { ProfileComponent } from './profile/profile.component';
import { AddNourritureComponent } from './add-nourriture/add-nourriture.component';
import { LoginComponent } from './login/login.component';
import {JwtModule} from '@auth0/angular-jwt';
import { RegisterComponent } from './register/register.component';
import { BlockAccessComponent } from './block-access/block-access.component';
import { AvancementMesTachesComponent } from './avancement-mes-taches/avancement-mes-taches.component';


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
    AddTacheComponent,
    UpdateTacheComponent,
    AddAnimalComponent,
    UpdateAnimalComponent,
    AddRoleComponent,
    UpdateRoleComponent,
    ProfileComponent,
    AddNourritureComponent,
    LoginComponent,
    RegisterComponent,
    BlockAccessComponent,
    AvancementMesTachesComponent,
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
    FullCalendarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    AmazingTimePickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    JwtModule,
    MatIconModule,


  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
              {provide: OWL_DATE_TIME_LOCALE, useValue: 'fr-FR'},
              {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: 'fr'},
              {provide: LOCALE_ID,useValue: "fr-FR"},
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
