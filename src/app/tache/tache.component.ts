import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {Tache} from '../models/tache';
import {TacheService} from '../service/tache/tache.service';
import {DatePipe } from '@angular/common'

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent implements OnInit {

  listTache : Tache[];
  date : Date;

  constructor(private router : Router, private tacheService : TacheService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.tacheService.getAllTache().subscribe(data=>{
      this.listTache = data;
      
    })
  }

  deleteTache(index,id:number){
    this.tacheService.deleteTache(id).subscribe((res:Response)=>{
      console.log(res);
      if(res){
        this.listTache.splice(index,1)
      };
    })
  }
}
