import { Component, OnInit } from '@angular/core';
import {Animal} from '../models/animal';
import {AnimalService} from '../service/animal/animal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit {

  listAnimal : Animal[];

  constructor(private animalService: AnimalService, private router : Router) { }

  ngOnInit() {
    this.animalService.getAllAnimal().subscribe(data => {
      this.listAnimal=data;
    })
  }

  deleteAnimal(index, id:number){
    this.animalService.deleteAnimal(id).subscribe((res:Response)=>{
      console.log(res);
      if(res){
        this.listAnimal.splice(index,1)
      };
    })
  }

}
