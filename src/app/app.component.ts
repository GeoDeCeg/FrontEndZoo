import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PersonneService } from './service/personne/personne.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    if (localStorage.getItem('currentPersonne') != null) {
      this.idPersonneT = this.helper.decodeToken(localStorage.getItem('currentPersonne'))['id'];
      console.log(this.idPersonneT);
      
    }
    
  }
  

  
  idPersonneT: number;
  

  title = 'ZooFrontEnd';
  isLogin: Boolean;

  


  helper = new JwtHelperService();

  constructor(private router: Router) {

    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        console.log(event['url'])
        if (event['url'] == '/') {
          this.isLogin = true;
          console.log(this.isLogin);
        } else {
          this.isLogin = false;
          console.log(this.isLogin);
        }
      }      
    })
  }

  

}
