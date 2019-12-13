import { Component, OnInit } from '@angular/core';
import {Personne} from '../models/personne';
import {PersonneService} from '../service/personne/personne.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.scss']
})
export class PersonneComponent implements OnInit {

  listPersonne : Personne[];

  constructor(private personneService : PersonneService, private router : Router) { }

  ngOnInit() {
    this.personneService.getAllPersonne().subscribe(data =>{
      this.listPersonne = data;
    })
  }

  deletePersonne(index, id:number) {
    this.personneService.deletePersonne(id).subscribe((res:Response)=>{
      console.log(res);
      if(res){
        this.listPersonne.splice(index,1)
      };
    })
    
  }

}
