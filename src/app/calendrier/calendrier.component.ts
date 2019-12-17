
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
  tableauDuree: number[];


  idTacheEvent: number;
  dateEvent: Date = new Date();




  constructor(private tacheService: TacheService) { }

  // @ViewChild('calendar', { static: false }) fullcalendar: FullCalendarComponent;

  ngOnInit() {
    
    this.options = {
      locale: frLocale,
      eventColor: '#008000',
      eventTextColor: '#FFFFFF',
      eventDurationEditable: true,
      timeZone: 'Europe/Paris',
      minTime: "08:00:00",
      maxTime:"19:00:00"

    }

    this.tacheService.getAllTache().subscribe(data => {
      this.listTache = data;
      this.calendarEvents = data;


      for (let index = 0; index < this.listTache.length; index++) {
        this.calendarEvents[index].title = this.listTache[index].activite.toString() + " - " +
          this.listTache[index].personne.nom.toString();

        this.calendarEvents[index].start = this.listTache[index].date;
       
        var date = new Date(this.listTache[index].date);
        // console.log("date-----------"+date);
        var date2 = moment(date).add(this.listTache[index].duree,'h').toDate();
        // console.log(date2);
        
        this.calendarEvents[index].end = date2;

      }
    })
  }



  eventClick(model: any) {

    

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
  }

  

}
