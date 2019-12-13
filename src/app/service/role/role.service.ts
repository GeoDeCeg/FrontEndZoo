import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http : HttpClient) { }


  getAllRole(){
    return this.http.get<Role[]>("http://localhost:8080/role").pipe();
  }

  getRoleById(id : number){
    return this.http.get<Role>("http://localhost:8080/role/"+id).pipe();
  }

  addRole(role : Role){
    return this.http.post("http://localhost:8080/role",role).pipe();
  }

  deleteRole(id : number){
    return this.http.delete("http://localhost:8080/role/"+id).pipe();
  }

  updateRole(id : number , role : Role){
    return this.http.put("http://localhost:8080/role/"+id,role).pipe();
  }
}
