import { Component, OnInit } from '@angular/core';
import { Personne } from '../models/personne';
import { PersonneService } from '../service/personne/personne.service';
import { Avancement } from '../models/avancement';
import { AvancementService } from '../service/avancement/avancement.service';
import { Tache } from '../models/tache';
import { TacheService } from '../service/tache/tache.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-tache',
  templateUrl: './update-tache.component.html',
  styleUrls: ['./update-tache.component.scss']
})
export class UpdateTacheComponent implements OnInit {

  formulaireUpdateTache: FormGroup;
  targetTache: Tache = new Tache;
  submitted = false;

  listPersonne: Personne[];
  listAvancement: Avancement[];
  listTache : Tache[];

  idTacheUpdate: number;
  dateTarget = new Date();

  bool: false;
  pipe : DatePipe;

  constructor(private router: Router, private avancementService: AvancementService, private tacheService: TacheService,
    private personneService: PersonneService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bool = false;
    this.pipe = new DatePipe('fr-FR');

    this.avancementService.getAllAvancement().subscribe(data => {
      this.listAvancement = data;

      this.personneService.getAllPersonne().subscribe(data => {
        this.listPersonne = data;
        this.tacheService.getAllTache().subscribe(data=>{
          this.listTache =data;
          
        })
      })
    });

    this.formulaireUpdateTache = this.formBuilder.group({
      activite: ['', Validators.required],
      date: [''],
      duree: [''],
      avancement: ['', Validators.required],
      personne: ['', Validators.required]
    });

    
  }

  target() {
    this.tacheService.getTacheById(this.idTacheUpdate).subscribe(data => {
      this.targetTache = data;
      this.dateTarget = new Date(this.targetTache.date);
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

  get f() {
    return this.formulaireUpdateTache.controls
  }

  updateTache() {

    this.targetTache.date = this.dateTarget;
    this.tacheService.updateTache(this.targetTache.idTache,this.targetTache).subscribe((res: Response) => {
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

  refresh(): void {
    window.location.reload();
  }

  byIdPersonne(personne: Personne, personneModel: Personne) {
    return personne.idPersonne === personneModel.idPersonne;
  }
  byIdAvancement(avancement: Avancement, avancementModel: Avancement) {
    return avancement.idAvancement === avancementModel.idAvancement;
  }
  
  test(){
    
    console.log(this.dateTarget);
    this.dateTarget
  }


}
