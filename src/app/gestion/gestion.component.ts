import { Component, OnInit} from '@angular/core';
import {PersonneService} from '../service/personne/personne.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {

  count : any;


  constructor(private personneService : PersonneService) { }

  ngOnInit() {
    this.personneService.count().subscribe((res:Response)=>{
      this.count = res;
      console.log(this.count);
    })
    
  }


}
