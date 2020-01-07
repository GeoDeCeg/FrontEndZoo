import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {HttpClient} from '@angular/common/http';
import {Personne} from '../../models/personne';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  personne : Personne = new Personne();

  constructor(private http : HttpClient, private router : Router) { }

  login(login,password){
    this.loginWebService(login, password).subscribe(res =>{
      if (res != null){
        console.log(res)
        localStorage.setItem('currentPersonne',res['token']);
        console.log(localStorage.getItem('currentPersonne'));
        if(localStorage.getItem('currentPersonne') != null){
          this.notif();
        }
      }else{
        Swal.fire({
          title: 'Login ou Password incorrect !',
          icon: 'error',
          showCloseButton: true,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Cancel',
        }).then(() => this.router.navigate(['']))

      }
    })
  }


  logout(){
    localStorage.removeItem('currentPersonne')
  }

  loginWebService(login,password){

     // autre possibilité plutôt que déclaration d'un user dans la classe et this.user.
    this.personne.login = login;
    this.personne.password = password;

    return this.http.post("http://localhost:8080/personne/login",this.personne).pipe()
  }

  notif() {
    Swal.fire({
      title: 'Bienvenue !',
      icon: 'success',
      showCloseButton: true,
      confirmButtonText:
        '<a href="home" style="color : white">Entrer</a>',
    });
  }

  
}
