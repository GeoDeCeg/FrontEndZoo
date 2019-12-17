import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Tache } from '../models/tache';
import { TacheService } from '../service/tache/tache.service';
import { Avancement } from '../models/avancement';
import { AvancementService } from '../service/avancement/avancement.service';
import {Personne} from '../models/personne';
import {PersonneService} from '../service/personne/personne.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrls: ['./add-tache.component.scss']
})
export class AddTacheComponent implements OnInit {

  events: string[] = [];

  formulaireTache: FormGroup;
  nouvelleTache: Tache = new Tache();

  submitted = false;

  listAvancement: Avancement[];
  listPersonne : Personne[];
  defaultValue: number;

  varAvancement: any;
  varPersonne : any;

  currentDate = new Date();
  

  constructor(private router: Router,private personneService : PersonneService, private tacheService: TacheService, private avancementService: AvancementService,
    private formBuilder: FormBuilder,private datePipe: DatePipe) { }

  ngOnInit() {
    this.avancementService.getAllAvancement().subscribe(data => {
      this.listAvancement = data;

      console.log(this.currentDate);

      this.defaultValue = this.listAvancement[0].idAvancement;
      this.varAvancement = this.defaultValue;
      
      this.formulaireTache.get('avancement').setValue(this.varAvancement);
      this.personneService.getAllPersonne().subscribe(data => {
        this.listPersonne = data;
      })
    });

    this.formulaireTache = this.formBuilder.group({
      activite: ['', Validators.required],
      date: [''],
      duree: [''],
      avancement: ['', Validators.required],
      personne: ['',Validators.required]
    });    

  }

  onSubmit() {
    this.submitted = true;
    console.log("dans le submit")
    if (this.formulaireTache.invalid) {
      return;
    } else {
      this.addTache();
    }

  }

  onReset() {
    this.submitted = false;
    this.formulaireTache.reset();
  }

  get f() {
    return this.formulaireTache.controls
  }

  addTache() {
       
    this.tacheService.addTache(this.nouvelleTache).subscribe((res: Response) => {
      console.log(res);

      if (res['idTache'] != null) {
        console.log(this.varAvancement);
        if (this.varAvancement != null) {
          this.tacheService.affecterTache(res['idTache'], this.varAvancement, this.varPersonne).subscribe((res => {
            console.log(res);
            if (res) {
              this.notif();
            }
          }))
        }
      };
    })
  }

  notif() {

    Swal.fire({
      title: 'Tâche ajoutée !',
      icon: 'success',
      showCloseButton: true,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Retour au menu',

    }).then(() => {
      this.refresh()
    });

  }

  refresh(): void {
    window.location.reload();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

}
