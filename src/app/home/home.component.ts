import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {PersonneService} from '../service/personne/personne.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  personne : String;
  helper = new JwtHelperService();

  constructor(private personneService : PersonneService) { }

  ngOnInit() {
    
    }  
   
  }


