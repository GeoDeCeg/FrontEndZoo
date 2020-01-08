import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthentificationService } from '../service/authentification/authentification.service';
import { Router } from '@angular/router';
import {Personne} from '../models/personne';
import {PersonneService} from '../service/personne/personne.service';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Role } from '../models/role';
import Swal from 'sweetalert2';
import { Zone } from '../models/zone';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  helper = new JwtHelperService();
  id:number;
  personne : Personne = new Personne();
  formulaireProfile : FormGroup;
  submitted = false;
  prenom : String;
  role : String;


  constructor(private formBuilder : FormBuilder,private authentificationService: AuthentificationService, private router: Router, private personneService:PersonneService) { }

  ngOnInit() {
    this.formulaireProfile = this.formBuilder.group({

      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.email],
      login: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      zone: ['', Validators.required]
    });
    if (localStorage.getItem('currentPersonne') != null) {
      this.id = this.helper.decodeToken(localStorage.getItem('currentPersonne'))['id'];
      this.personneService.getPersonneById(this.id).subscribe(data =>{
        this.personne=data;
        this.prenom = this.personne.prenom;
        this.role = this.personne.role.libelle;
      })
    }
  }

  onSubmit() {
    this.submitted = true;
    console.log("dans le submit")
    if (this.formulaireProfile.invalid) {
      return;
    } else {
      this.updatePersonne();
    }

  }

  onReset() {
    this.submitted = false;
    window.location.reload();
  }

  get f() {
    return this.formulaireProfile.controls
  }

  updatePersonne() {
    this.personneService.updatePersonne(this.id,this.personne).subscribe(res=>{
      console.log(res);
      if(res){
        this.notif();
      }
    })

  }

  byIdRole(role: Role, roleModel: Role) {
    return role.idRole === roleModel.idRole;
  }
  byIdZone(zone: Zone, zoneModel: Zone) {
    return zone.idZone === zoneModel.idZone;
  }
  

  notif() {

    Swal.fire({
      title: 'profil modifié !',
      icon: 'success',
      showCloseButton: true,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i>',

    }).then(() => {
      window.location.reload();
    });


  }

}
