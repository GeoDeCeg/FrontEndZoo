import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import {Role} from '../models/role';
import {RoleService} from '../service/role/role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  constructor(private router : Router, private roleService : RoleService, private formBuilder : FormBuilder) { }

  formulaireRole : FormGroup;
  nouveauRole : Role = new Role();
  submitted = false;

  ngOnInit() {
    this.formulaireRole = this.formBuilder.group({
      libelle: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.formulaireRole.invalid) {
      return;
    } else {
      this.addRole();
    }

  }

  onReset() {
    this.submitted = false;
    this.formulaireRole.reset();
  }

  get f() {
    return this.formulaireRole.controls
  }

  addRole() {
    console.log(this.nouveauRole)
    this.roleService.addRole(this.nouveauRole).subscribe((res: Response) => {
      console.log(res);

      if (res['idRole'] != null) {
        this.notif();
      };
    })
  }

  notif() {

    Swal.fire({
      title: 'Rôle ajouté !',
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
