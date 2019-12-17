import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tache } from '../../models/tache';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private http : HttpClient) { }

  getAllTache(){
    return this.http.get<Tache[]>("http://localhost:8080/tache").pipe();
  }

  getTacheById(id : number){
    return this.http.get<Tache>("http://localhost:8080/tache/"+id).pipe();
  }

  addTache(tache : Tache){
    return this.http.post("http://localhost:8080/tache",tache).pipe();
  }

  deleteTache(id : number){
    return this.http.delete("http://localhost:8080/tache/"+id).pipe();
  }

  updateTache(id : number , tache : Tache){
    return this.http.put("http://localhost:8080/tache/"+id,tache).pipe();
  }

  affecterAvancementTache(idTache : number, idAvancement : number){
    return this.http.put("http://localhost:8080/tache/avancement/"+idTache+"/"+idAvancement,"").pipe();
  }

  affecterPersonneTache(idTache : number, idPersonne : number){
    return this.http.put("http://localhost:8080/tache/personne/"+idTache+"/"+idPersonne,"").pipe();
  }

  affecterTache(idTache: number, idAvancement : number, idPersonne:number){
    return this.http.put("http://localhost:8080/tache/all/"+idTache+"/"+idAvancement+"/"+idPersonne,"").pipe();
  }
}
