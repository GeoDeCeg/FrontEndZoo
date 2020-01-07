import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../service/authentification/authentification.service';
import { Router, NavigationStart } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  helper = new JwtHelperService();

  constructor(private authentificationService: AuthentificationService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('currentPersonne') != null) {
      this.prenomT = this.helper.decodeToken(localStorage.getItem('currentPersonne'))['prenom'];
      console.log(this.prenomT);
    }
  }
  deco() {
    this.authentificationService.logout();
    this.router.navigate(['']);
  }

  prenomT: String;
}
