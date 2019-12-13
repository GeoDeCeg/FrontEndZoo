import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Role} from '../models/role';
import {RoleService} from '../service/role/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  listRole : Role[];

  constructor(private roleService : RoleService, private router : Router) { }

  ngOnInit() {
    this.roleService.getAllRole().subscribe(data =>{
      this.listRole = data;
    })
  }

  deleteRole(){
    
  }

}
