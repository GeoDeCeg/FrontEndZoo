import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Enclos} from '../../models/enclos';

@Injectable({
  providedIn: 'root'
})
export class EnclosService {

  constructor(private http : HttpClient) { }

  getAllEnclos(){
    return this.http.get<Enclos[]>("http://localhost:8080/enclos").pipe();
  }

  getEnclosById(id:number){
    return this.http.get<Enclos>("http://localhost:8080/enclos/"+id).pipe();
  }

  AddEnclos(enclos : Enclos){
    return this.http.post("http://localhost:8080/enclos", enclos).pipe();
  }

  updateEnclos (id : number , enclos : Enclos){
    return this.http.put("http://localhost:8080/enclos/"+id,enclos).pipe();
  }

  deleteEnclos (id : number){
    return this.http.delete("http://localhost:8080/enclos/"+id).pipe();
  }

  affecterZoneEnclos(idEnclos : number, idZone : number){
    return this.http.put("http://localhost:8080/enclos/zone/"+idEnclos+"/"+idZone,"").pipe();
  }
}
