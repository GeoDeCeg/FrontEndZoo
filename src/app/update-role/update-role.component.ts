import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import {Role} from '../models/role';
import {RoleService} from '../service/role/role.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, private roleService : RoleService) { }

  listRole : Role[];
  formulaireUpdateRole: FormGroup;
  targetRole: Role = new Role();
  
  idRole : number;
  submitted = false;
  bool : false;

  ngOnInit() {
    this.roleService.getAllRole().subscribe(data => {
      this.listRole = data;
    })
    this.formulaireUpdateRole = this.formBuilder.group({
      libelle: ['', Validators.required]
    })
  }

  target() {
    this.roleService.getRoleById(this.idRole).subscribe(data => {
      this.targetRole = data;
    })
  }


  onSubmit() {
    this.submitted = true;
    console.log("dans le submit")
    if (this.formulaireUpdateRole.invalid) {
      return;
    } else {
      this.updateRole();
    }

  }

  onReset() {
    this.submitted = false;
    this.formulaireUpdateRole.reset();
  }

  get f() {
    return this.formulaireUpdateRole.controls
  }

  updateRole() {
    this.roleService.updateRole(this.idRole,this.targetRole).subscribe(res=>{
      console.log(res);
      if(res){
        this.notif();
      }
    })

  }
  

  notif() {

    Swal.fire({
      title: 'Rôle modifié !',
      icon: 'success',
      showCloseButton: true,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Retour au menu',

    }).then(() => {
      this.bool = false;
      this.refresh();
    });


  }

  refresh(): void {
    window.location.reload();
  }

}
