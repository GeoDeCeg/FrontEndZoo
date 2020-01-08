import { Component, OnInit} from '@angular/core';
import {PersonneService} from '../service/personne/personne.service';
import{TacheService} from '../service/tache/tache.service';
import {AnimalService} from '../service/animal/animal.service';
import {AvancementService} from '../service/avancement/avancement.service';
import {EnclosService} from '../service/enclos/enclos.service';
import {NourritureService} from '../service/nourriture/nourriture.service';
import {RoleService} from '../service/role/role.service';
import {ZoneService} from '../service/zone/zone.service';

import {Tache} from '../models/tache';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from '../models/role';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {

  count : any;
  countTache : any;
  countAnimal: any;
  countAvancement : any;
  countEnclos : any;
  countNourriture : any;
  countRole : any;
  countZone : any;


  helper = new JwtHelperService();
  mesTaches : Tache[];
  monRole : Role;
  isSoigneur : Boolean;
  voirMesTaches : Boolean;
  countMesTaches =0;




  


  constructor(private personneService : PersonneService, private tacheService : TacheService, private animalService : AnimalService,
    private avancementService : AvancementService,  private enclosService : EnclosService, private nourritureService : NourritureService,
    private roleService : RoleService, private zoneService : ZoneService) { }

  ngOnInit() {
    this.personneService.count().subscribe((res:Response)=>{
      this.count = res;
      console.log(this.count);
      this.tacheService.count().subscribe((res:Response)=>{
        this.countTache = res;
        console.log(this.countTache);
        this.animalService.count().subscribe((res:Response)=>{
          this.countAnimal = res;
          this.avancementService.count().subscribe((res:Response)=>{
            this.countAvancement = res;
            this.enclosService.count().subscribe((res: Response)=>{
              this.countEnclos = res;
              this.nourritureService.count().subscribe((res:Response)=>{
                this.countNourriture = res;
                this.roleService.count().subscribe((res:Response)=>{
                  this.countRole = res;
                  this.zoneService.count().subscribe((res:Response)=>{
                    this.countZone = res;
                  })
                })
              })
            })
          })
        })
      })
    })

    if (localStorage.getItem('currentPersonne') != null) {
      this.monRole = this.helper.decodeToken(localStorage.getItem('currentPersonne'))['role'];
      console.log(this.monRole);
      if (this.monRole.libelle =="Soigneur" || this.monRole.libelle =="Admin"){
        this.voirMesTaches = true;
      }
      if (this.monRole.libelle == "Soigneur") {
        this.isSoigneur = true;
        
        this.tacheService.getTacheByIdPersonne(this.helper.decodeToken(localStorage.getItem('currentPersonne'))['id']).subscribe(data => {
          this.mesTaches = data;
          this.mesTaches.forEach(element => {
            this.countMesTaches = this.countMesTaches +1;
            console.log(this.countMesTaches);
          });
        })
      }
    }
  
    
  }


}
