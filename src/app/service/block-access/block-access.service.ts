import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BlockAccessService implements CanActivate {

  constructor(private router:Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentPersonne')) {
      this.router.navigate(['home'])
      return false;
    }else{
      return true;
    }
  }
}
