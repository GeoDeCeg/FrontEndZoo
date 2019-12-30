import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Animal } from '../models/animal';
import { AnimalService } from '../service/animal/animal.service';
import {Enclos} from '../models/enclos';
import {EnclosService} from '../service/enclos/enclos.service';
import {Nourriture} from '../models/nourriture';
import {NourritureService} from '../service/nourriture/nourriture.service';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss']
})
export class AddAnimalComponent implements OnInit {

  formulaireAnimal: FormGroup;
  nouvelAnimal: Animal = new Animal;
  submitted = false;

  listEnclos: Enclos[];
  listNourriture: Nourriture[];

  varEnclos : any;
  varNourriture : any;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private animalService: AnimalService,
    private enclosService : EnclosService, private nourritureService : NourritureService) { }

  ngOnInit() {
    this.formulaireAnimal = this.formBuilder.group({
      nom: ['', Validators.required],
      famille: ['', Validators.required],
      age: [''],
     
      enclos: ['', Validators.required],
      nourriture: ['', Validators.required],
    })

    this.enclosService.getAllEnclos().subscribe(data => {
      this.listEnclos = data;
      this.nourritureService.getAllNourriture().subscribe(data => {
        this.listNourriture = data;
      });
    });
    
  }

  onSubmit() {
    this.submitted = true;
    if (this.formulaireAnimal.invalid) {
      return;
    } else {
      this.addAnimal();
    }

  }

  onReset() {
    this.submitted = false;
    this.formulaireAnimal.reset();
  }

  get f() {
    return this.formulaireAnimal.controls
  }

  addAnimal() {
    console.log(this.nouvelAnimal)
    this.animalService.addAnimal(this.nouvelAnimal).subscribe((res: Response) => {
      console.log(res);

      if (res['idAnimal'] != null) {
        console.log(this.varEnclos);
        console.log(this.varNourriture);

        this.animalService.affecterAnimal(res['idAnimal'], this.varEnclos, this.varNourriture).subscribe((res => {
          console.log(res);
          if (res) {
            this.notif();
          }
        }))
      };
    })
  }

  notif() {

    Swal.fire({
      title: 'Animal ajouté !',
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


}
