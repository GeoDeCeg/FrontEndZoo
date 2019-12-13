import { Component, OnInit } from '@angular/core';
import {Nourriture} from '../models/nourriture';
import {NourritureService} from '../service/nourriture/nourriture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nourriture',
  templateUrl: './nourriture.component.html',
  styleUrls: ['./nourriture.component.scss']
})
export class NourritureComponent implements OnInit {

  listNourriture : Nourriture[];

  constructor(private nourritureService : NourritureService, private router : Router) { }

  ngOnInit() {
    this.nourritureService.getAllNourriture().subscribe(data =>{
      this.listNourriture = data;
    })
  }

  deleteNourriture(){
    
  }

}
