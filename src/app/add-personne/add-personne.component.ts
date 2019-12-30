import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Personne } from '../models/personne';
import { PersonneService } from '../service/personne/personne.service';
import { Role } from '../models/role';
import { RoleService } from '../service/role/role.service';
import { Tache } from '../models/tache';
import { TacheService } from '../service/tache/tache.service';
import { Zone } from '../models/zone';
import { ZoneService } from '../service/zone/zone.service';

@Component({
  selector: 'app-add-personne',
  templateUrl: './add-personne.component.html',
  styleUrls: ['./add-personne.component.scss']
})
export class AddPersonneComponent implements OnInit {

  formulairePersonne: FormGroup;
  nouvellePersonne: Personne = new Personne;
  submitted = false;

  listRole: Role[];
  // listTache: Tache[];
  listZone: Zone[];
  varRole: any;
  
  varZone: any;

  constructor(private formBuilder: FormBuilder, private personneService: PersonneService,
    private roleService: RoleService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.formulairePersonne = this.formBuilder.group({

      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.email],
      login: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      zone: ['', Validators.required],
    });
    this.roleService.getAllRole().subscribe(data => {
      this.listRole = data;
    });
    // this.tacheService.getAllTache().subscribe(data => {
    //   this.listTache = data;
    // });
    this.zoneService.getAllZone().subscribe(data => {
      this.listZone = data;
    });
  }


  onSubmit() {
    this.submitted = true;
    console.log("dans le submit")
    if (this.formulairePersonne.invalid) {
      return;
    } else {
      this.addPersonne();
    }

  }

  onReset() {
    this.submitted = false;
    this.formulairePersonne.reset();
  }

  get f() {
    return this.formulairePersonne.controls
  }

  addPersonne() {
    console.log(this.nouvellePersonne)
    this.personneService.addPersonne(this.nouvellePersonne).subscribe((res: Response) => {
      console.log(res);

      if (res['idPersonne'] != null) {
        console.log(this.varRole);
        console.log(this.varZone);

        this.personneService.affecterPersonne(res['idPersonne'], this.varRole, this.varZone).subscribe((res => {
          console.log(res);
          if (res) {
            this.notif();
          }
        }))
      };
    })
  }

  notif() {

    Swal.fire({
      title: 'Personne ajoutée !',
      icon: 'success',
      showCloseButton: true,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Retour au menu',

    }).then(() => {
      this.refresh()
    });

  }

  refresh(): void {
    window.location.reload();
  }



}
