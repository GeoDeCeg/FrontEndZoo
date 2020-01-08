import { Component, OnInit } from '@angular/core';
import {TacheService} from '../service/tache/tache.service';
import {Tache} from '../models/tache';



@Component({
  selector: 'app-avancement-mes-taches',
  templateUrl: './avancement-mes-taches.component.html',
  styleUrls: ['./avancement-mes-taches.component.scss']
})
export class AvancementMesTachesComponent implements OnInit {

  idTacheUpdate: number;
  targetTache: Tache = new Tache;
  dateTarget = new Date();
  bool: false;

  constructor(private tacheService : TacheService) { }

  ngOnInit() {
  }

  target() {
    this.tacheService.getTacheById(this.idTacheUpdate).subscribe(data => {
      this.targetTache = data;
      this.dateTarget = new Date(this.targetTache.date);
    })
  }

}
