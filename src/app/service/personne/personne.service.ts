import { Injectable } from '@angular/core';
import { Personne } from '../../models/personne';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {

  constructor(private http : HttpClient) { }

  getAllPersonne(){
    return this.http.get<Personne[]>("http://localhost:8080/personne").pipe();
  }

  getPersonneById(id : number){
    return this.http.get<Personne>("http://localhost:8080/personne/"+id).pipe();
  }

  addPersonne(personne : Personne){
    return this.http.post("http://localhost:8080/personne",personne).pipe();
  }

  deletePersonne(id : number){
    return this.http.delete("http://localhost:8080/personne/"+id).pipe();
  }

  updatePersonne(id : number , personne : Personne){
    return this.http.put("http://localhost:8080/personne/"+id,personne).pipe();
  }

  affecterTachePersonne(idPersonne: number, idTache : number){

    return this.http.put("http://localhost:8080/personne/tache/"+idPersonne+"/"+idTache,"").pipe();
  }

  affecterRolePersonne(idPersonne: number, idRole : number){

    return this.http.put("http://localhost:8080/personne/role/"+idPersonne+"/"+idRole,"").pipe();
  }

  affecterZonePersonne(idPersonne: number, idZone : number){

    return this.http.put("http://localhost:8080/personne/zone/"+idPersonne+"/"+idZone,"").pipe();
  }

  affecterPersonne (idPersonne : number, idRole : number, idZone : number, idTache : number){
    return this.http.put("http://localhost:8080/personne/all/"+idPersonne+"/"+idRole+"/"+idZone+"/"+idTache,"")
  }

  count (){
    return this.http.get("http://localhost:8080/personne/count").pipe();
  }

}
