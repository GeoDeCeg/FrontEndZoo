
import { Component, ViewChild, OnInit } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import { OptionsInput } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import timeGrigPlugin from '@fullcalendar/timegrid';
import { Tache } from '../models/tache';
import { TacheService } from '../service/tache/tache.service';




@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {

  tache: Tache = new Tache();
  options: OptionsInput;

  @ViewChild('calendar',{static: false}) fullcalendar: FullCalendarComponent;

  ngOnInit() {
    this.options ={
      locale: frLocale,
      eventColor : '#008000',
      eventTextColor : '#FFFFFF',
    }

  }

  constructor(private tacheService: TacheService) { }

  
 
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [
    { title: 'Tâche en cours', start: new Date() }
  ];


  handleDateClick(arg) {
    
    if (confirm('Ajouter une tâche en date du : ' + arg.date.toString() + ' ?')) {
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: 'nouvelle tâche',
        start: arg.date
      })
    }
  }



}
