import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {Zone} from '../models/zone';
import {ZoneService} from '../service/zone/zone.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {

  listZone : Zone[];

  constructor(private router : Router, private zoneService : ZoneService) { }

  ngOnInit() {
    this.zoneService.getAllZone().subscribe(data=>{
      this.listZone = data;
    })
  }

  deleteZone(){
    
  }

}
