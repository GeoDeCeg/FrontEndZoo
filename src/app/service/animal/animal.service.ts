import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Animal} from '../../models/animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http : HttpClient) { }

  getAllAnimal(){
    return this.http.get<Animal[]>("http://localhost:8080/animal").pipe();
  }

  getAnimalById(id:number){
    return this.http.get<Animal>("http://localhost:8080/animal/"+id).pipe();
  }

  addAnimal(animal : Animal){
    return this.http.post("http://localhost:8080/animal", animal).pipe();
  }

  updateAnimal (id : number , animal : Animal){
    return this.http.put("http://localhost:8080/animal/"+id,animal).pipe();
  }

  deleteAnimal (id : number){
    return this.http.delete("http://localhost:8080/animal/"+id).pipe();
  }

  affecterEnclosAnimal(idAnimal : number, idEnclos : number){
    return this.http.put("http://localhost:8080/animal/enclos/"+idAnimal+"/"+idEnclos,"").pipe();
  }

  affecterNourritureAnimal(idAnimal:number, idNourriture : number){
    return this.http.put("http://localhost:8080/animal/enclos/"+idAnimal+"/"+idNourriture,"").pipe();
  }
}
