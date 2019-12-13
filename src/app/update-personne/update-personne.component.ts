import { Component, OnInit } from '@angular/core';
import { Personne } from '../models/personne';
import { PersonneService } from '../service/personne/personne.service';
import { Role } from '../models/role';
import { RoleService } from '../service/role/role.service';
import { Tache } from '../models/tache';
import { TacheService } from '../service/tache/tache.service';
import { Zone } from '../models/zone';
import { ZoneService } from '../service/zone/zone.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-personne',
  templateUrl: './update-personne.component.html',
  styleUrls: ['./update-personne.component.scss']
})
export class UpdatePersonneComponent implements OnInit {

  formulaireUpdatePersonne: FormGroup;
  targetPersonne: Personne = new Personne;
  submitted = false;

  listPersonne: Personne[];
  listRole: Role[];
  listZone: Zone[];
  listTache: Tache[];

  idPersonneUpdate: number;

  bool: false;



  constructor(private formBuilder: FormBuilder, private router: Router, private personneService: PersonneService, private roleService: RoleService, private zoneService: ZoneService,
    private tacheService: TacheService) { }

  ngOnInit() {
    this.bool = false;
    this.formulaireUpdatePersonne = this.formBuilder.group({

      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.email],
      login: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      tache: ['', Validators.required],
      zone: ['', Validators.required]
    });

    this.personneService.getAllPersonne().subscribe(data => {
      this.listPersonne = data;
      this.roleService.getAllRole().subscribe(data => {
        this.listRole = data;
        this.zoneService.getAllZone().subscribe(data => {
          this.listZone = data;
          this.tacheService.getAllTache().subscribe(data => {
            this.listTache = data;
          })
        })
      })
    })
  }

  target() {
    this.personneService.getPersonneById(this.idPersonneUpdate).subscribe(data => {
      this.targetPersonne = data;
    })
  }


  onSubmit() {
    this.submitted = true;
    console.log("dans le submit")
    if (this.formulaireUpdatePersonne.invalid) {
      return;
    } else {
      this.updatePersone();
    }

  }

  onReset() {
    this.submitted = false;
    this.formulaireUpdatePersonne.reset();
  }

  get f() {
    return this.formulaireUpdatePersonne.controls
  }

  updatePersone() {
    this.personneService.updatePersonne(this.idPersonneUpdate,this.targetPersonne).subscribe(res=>{
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
  byIdTache(tache: Tache, tacheModel: Tache) {
    return tache.idTache === tacheModel.idTache
      ;
  }

  notif() {

    Swal.fire({
      title: 'Personne modifiée !',
      icon: 'success',
      showCloseButton: true,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Retour au menu',

    }).then(() => {
      this.bool = false;
    });


  }

}
