import { Component, OnInit} from '@angular/core';
import {PersonneService} from '../service/personne/personne.service';
import{TacheService} from '../service/tache/tache.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {

  count : any;
  countTache : any;


  constructor(private personneService : PersonneService, private tacheService : TacheService) { }

  ngOnInit() {
    this.personneService.count().subscribe((res:Response)=>{
      this.count = res;
      console.log(this.count);
      this.tacheService.count().subscribe((res:Response)=>{
        this.countTache = res;
        console.log(this.countTache);
      })
    })
    
  }


}
