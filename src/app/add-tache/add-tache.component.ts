import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Tache } from '../models/tache';
import { TacheService } from '../service/tache/tache.service';
import { Avancement } from '../models/avancement';
import { AvancementService } from '../service/avancement/avancement.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

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
  defaultValue: number;

  varAvancement: any;

  constructor(private router: Router, private tacheService: TacheService, private avancementService: AvancementService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.avancementService.getAllAvancement().subscribe(data => {
      this.listAvancement = data;

      this.defaultValue = this.listAvancement[1].idAvancement;
      this.varAvancement = this.defaultValue;
      
      this.formulaireTache.get('avancement').setValue(this.varAvancement);
    });

    this.formulaireTache = this.formBuilder.group({
      activite: ['', Validators.required],
      date: [''],
      duree: [''],
      avancement: ['', Validators.required]
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
    console.log(this.nouvelleTache)
    this.tacheService.addTache(this.nouvelleTache).subscribe((res: Response) => {
      console.log(res);

      if (res['idTache'] != null) {
        console.log(this.varAvancement);
        if (this.varAvancement != null) {
          this.tacheService.affecterAvancementTache(res['idTache'], this.varAvancement).subscribe((res => {
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
