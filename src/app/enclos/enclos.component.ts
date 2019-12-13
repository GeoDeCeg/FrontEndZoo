import { Component, OnInit } from '@angular/core';
import {Enclos} from '../models/enclos';
import {EnclosService} from '../service/enclos/enclos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enclos',
  templateUrl: './enclos.component.html',
  styleUrls: ['./enclos.component.scss']
})
export class EnclosComponent implements OnInit {

  listEnclos : Enclos[];

  constructor(private router : Router, private enclosService : EnclosService) { }

  ngOnInit() {
    this.enclosService.getAllEnclos().subscribe(data =>{
      this.listEnclos = data;
    })
  }

}
