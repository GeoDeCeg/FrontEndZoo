import { Component, OnInit } from '@angular/core';
import {Personne} from '../models/personne';
import {AuthentificationService} from '../service/authentification/authentification.service';
import {AuthGuardService} from '../service/auth-guard/auth-guard.service';
import {Router} from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  submitted = false;
  formulaireConnexion: FormGroup;
  personneP: Personne = new Personne();
  hide = true;

  constructor(private router : Router,private authService:AuthentificationService, private guard : AuthGuardService, private formBuilder: FormBuilder ) { }
 

  ngOnInit() {
    this.formulaireConnexion = this.formBuilder.group({
      password: ['', Validators.required],
      login: ['', Validators.required]
    })
  }

  get c() {
    return this.formulaireConnexion.controls
  }


  onSubmit() {
    this.submitted = true;
    
    if (this.formulaireConnexion.invalid) {
      return;
    } else {
      this.connexion();
    };


  }


  connexion() {

    this.authService.login(this.personneP.login,this.personneP.password);
  }

}
