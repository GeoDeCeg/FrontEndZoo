import { Component, OnInit } from '@angular/core';
import {Avancement} from '../models/avancement';
import {AvancementService} from '../service/avancement/avancement.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-avancement',
  templateUrl: './avancement.component.html',
  styleUrls: ['./avancement.component.scss']
})
export class AvancementComponent implements OnInit {

  listAvancement : Avancement[];

  constructor(private avancementService : AvancementService, private router : Router) { }

  ngOnInit() {
    this.avancementService.getAllAvancement().subscribe(data => {
      this.listAvancement=data;
    })
  }

  deleteAvancement(){

  }

}
