
import { Component, OnInit } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { OptionsInput } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import timeGrigPlugin from '@fullcalendar/timegrid';
import { Tache } from '../models/tache';
import { TacheService } from '../service/tache/tache.service';
import * as moment from 'moment';

import { Personne } from '../models/personne';
import { PersonneService } from '../service/personne/personne.service';
import { Avancement } from '../models/avancement';
import { AvancementService } from '../service/avancement/avancement.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';







@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {

  listTache: Tache[];
  tache: Tache = new Tache();
  options: OptionsInput;
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarEvents: EventInput[];
  showModal: boolean;
  showModalUp: boolean;
  tableauDuree: number[];

  idTacheEvent: number;
  dateEvent: Date = new Date();

  formulaireUpdateTache: FormGroup;
  targetTache: Tache = new Tache;
  submitted = false;

  listPersonne: Personne[];
  listAvancement: Avancement[];

  dateTarget = new Date();


  constructor(private tacheService: TacheService, private personneService: PersonneService, private avancementService: AvancementService,
    private route: Router, private formBuilder: FormBuilder) { }

  // @ViewChild('calendar', { static: false }) fullcalendar: FullCalendarComponent;

  ngOnInit() {

    this.options = {
      locale: frLocale,
      eventColor: '#008000',
      eventTextColor: '#FFFFFF',
      eventDurationEditable: true,
      timeZone: 'Europe/Paris',
      minTime: "08:00:00",
      maxTime: "19:00:00"

    }

    this.formulaireUpdateTache = this.formBuilder.group({
      activite: ['', Validators.required],
      date: [''],
      duree: [''],
      avancement: ['', Validators.required],
      personne: ['', Validators.required]
    });

    this.tacheService.getAllTache().subscribe(data => {
      this.listTache = data;
      this.calendarEvents = data;

      this.personneService.getAllPersonne().subscribe(data => {
        this.listPersonne = data;
        this.avancementService.getAllAvancement().subscribe(data => {
          this.listAvancement = data;
        })
      })


      for (let index = 0; index < this.listTache.length; index++) {
        this.calendarEvents[index].title = this.listTache[index].activite.toString() + " - " +
          this.listTache[index].personne.nom.toString();

        this.calendarEvents[index].start = this.listTache[index].date;

        var date = new Date(this.listTache[index].date);
        // console.log("date-----------"+date);
        var date2 = moment(date).add(this.listTache[index].duree, 'h').toDate();
        // console.log(date2);

        this.calendarEvents[index].end = date2;

      }
    })
  }





  eventResize(model) {

    console.log(model);
    console.log(model.event._def.extendedProps.idTache);
    this.idTacheEvent = model.event._def.extendedProps.idTache;
    this.tacheService.getTacheById(this.idTacheEvent).subscribe(res => {
      this.tache = res;

      var start = model.event._instance.range.start;
      var end = model.event._instance.range.end;

      this.tache.duree = (end - start) / 3600000;

      this.tacheService.updateTache(this.idTacheEvent, this.tache).subscribe();


    })

  }

  handleDateClick() {

    this.showModal = true;
  }

  hide() {
    this.showModal = false;
    this.showModalUp = false;
  }


  // Methodes pour le modal d'update de tache

  eventClick(model) {

    this.showModalUp = true;
    
    console.log(model);
    this.tacheService.getTacheById(model.event._def.extendedProps.idTache).subscribe(res => {
      this.targetTache = res;
      this.dateTarget= new Date(this.targetTache.date);
      console.log(this.targetTache);
      console.log(this.targetTache.avancement);
      console.log(this.targetTache.personne);
    })

  }
  onSubmit() {
    this.submitted = true;
    if (this.formulaireUpdateTache.invalid) {
      return;
    } else {
      this.updateTache();
    }
  }

  onReset() {
    this.submitted = false;
    this.formulaireUpdateTache.reset();
  }

  updateTache() {

    this.targetTache.date = this.dateTarget;
    this.tacheService.updateTache(this.targetTache.idTache, this.targetTache).subscribe((res: Response) => {
      if (res) {
        this.notif();
      };
    })
  }

  notif() {

    Swal.fire({
      title: 'Tâche modifiée !',
      icon: 'success',
      showCloseButton: true,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Retour au menu',

    }).then(() => {
      this.refresh()
    });

  }

  byIdPersonne(personne: Personne, personneModel: Personne) {
    return personne.idPersonne === personneModel.idPersonne;
  }
  byIdAvancement(avancement: Avancement, avancementModel: Avancement) {
    return avancement.idAvancement === avancementModel.idAvancement;
  }

  get f() {
    return this.formulaireUpdateTache.controls
  }

  refresh(): void {
    window.location.reload();
  }


  supprimer(){
    console.log(this.targetTache.idTache);
    this.tacheService.deleteTache(this.targetTache.idTache).subscribe(res =>{
      console.log(res);
      this.refresh();
    });
    
  }
}
