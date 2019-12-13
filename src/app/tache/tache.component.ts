import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {Tache} from '../models/tache';
import {TacheService} from '../service/tache/tache.service';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent implements OnInit {

  listTache : Tache[];

  constructor(private router : Router, private tacheService : TacheService) { }

  ngOnInit() {
    this.tacheService.getAllTache().subscribe(data=>{
      this.listTache = data;
    })
  }

  deleteTache(){
    
  }
}
