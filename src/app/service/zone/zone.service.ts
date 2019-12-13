import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Zone } from '../../models/zone';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private http : HttpClient) { }

  getAllZone(){
    return this.http.get<Zone[]>("http://localhost:8080/zone").pipe();
  }

  getZoneById(id : number){
    return this.http.get<Zone>("http://localhost:8080/zone/"+id).pipe();
  }

  addZone(zone : Zone){
    return this.http.post("http://localhost:8080/zone",zone).pipe();
  }

  deleteZone(id : number){
    return this.http.delete("http://localhost:8080/zone/"+id).pipe();
  }

  updateZone(id : number , zone : Zone){
    return this.http.put("http://localhost:8080/zone/"+id,zone).pipe();
  }

}
