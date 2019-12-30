import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Avancement} from '../../models/avancement';

@Injectable({
  providedIn: 'root'
})
export class AvancementService {

  constructor(private http: HttpClient) { }

  getAllAvancement(){
    return this.http.get<Avancement[]>("http://localhost:8080/avancement").pipe();
  }

  getAvancementById(id:number){
    return this.http.get<Avancement>("http://localhost:8080/avancement/"+id).pipe();
  }

  addAvancement(avancement : Avancement){
    return this.http.post("http://localhost:8080/avancement", avancement).pipe();
  }

  updateAvancement (id : number , avancement : Avancement){
    return this.http.put("http://localhost:8080/avancement/"+id,avancement).pipe();
  }

  deleteAvancement (id : number){
    return this.http.delete("http://localhost:8080/avancement/"+id).pipe();
  }

  count(){
    return this.http.get("http://localhost:8080/avancement/count").pipe();
  }
}
