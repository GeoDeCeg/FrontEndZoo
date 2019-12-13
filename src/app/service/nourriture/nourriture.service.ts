import { Injectable } from '@angular/core';
import { Nourriture } from '../../models/nourriture';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NourritureService {

  constructor(private http : HttpClient) { }

  getAllNourriture(){
    return this.http.get<Nourriture[]>("http://localhost:8080/nourriture").pipe();
  }

  getNourritureById(id : number){
    return this.http.get<Nourriture>("http://localhost:8080/nourriture/"+id).pipe();
  }

  addNourriture(nourriture : Nourriture){
    return this.http.post("http://localhost:8080/nourriture",nourriture).pipe();
  }

  deleteNourriture(id : number){
    return this.http.delete("http://localhost:8080/nourriture/"+id).pipe();
  }

  updateNourrture(id : number , nourriture : Nourriture){
    return this.http.put("http://localhost:8080/nourriture/"+id,nourriture).pipe();
  }

}
