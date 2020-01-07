import { Component, OnInit } from '@angular/core';
import {Role} from '../models/role';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  roleT: Role;
  helper = new JwtHelperService();

  isSoigneur:Boolean;
  isAdmin: Boolean;
  isManager: Boolean;

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('currentPersonne') != null) {
      this.roleT = this.helper.decodeToken(localStorage.getItem('currentPersonne'))['role'];
      console.log(this.roleT);
      if(this.roleT.libelle=="Soigneur"){
        this.isSoigneur = true;
        console.log(this.isSoigneur);
      }
    }

  }

}
