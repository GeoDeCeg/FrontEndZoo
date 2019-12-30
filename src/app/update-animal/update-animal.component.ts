import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Animal } from '../models/animal';
import { AnimalService } from '../service/animal/animal.service';
import { Enclos } from '../models/enclos';
import { EnclosService } from '../service/enclos/enclos.service';
import { Nourriture } from '../models/nourriture';
import { NourritureService } from '../service/nourriture/nourriture.service';

@Component({
  selector: 'app-update-animal',
  templateUrl: './update-animal.component.html',
  styleUrls: ['./update-animal.component.scss']
})
export class UpdateAnimalComponent implements OnInit {

  targetAnimal: Animal = new Animal;
  idAnimalTarget: number;

  formulaireUpdateAnimal: FormGroup;
  submitted = false;

  listEnclos: Enclos[];
  listNourriture: Nourriture[];
  listAnimal : Animal[];

  bool: false;

  constructor(private router: Router, private formBuilder: FormBuilder, private animalService: AnimalService, private enclosService: EnclosService, private nourritureService: NourritureService) { }

  ngOnInit() {
    this.bool = false;

    this.formulaireUpdateAnimal = this.formBuilder.group({
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
        this.animalService.getAllAnimal().subscribe(data=>{
          this.listAnimal = data;
        })
      });
    });

  }

  target() {
    this.animalService.getAnimalById(this.idAnimalTarget).subscribe(data => {
      this.targetAnimal = data;
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.formulaireUpdateAnimal.invalid) {
      return;
    } else {
      this.updateAnimal();
    }

  }

  onReset() {
    this.submitted = false;
    this.formulaireUpdateAnimal.reset();
  }

  get f() {
    return this.formulaireUpdateAnimal.controls
  }

  updateAnimal() {
    console.log(this.targetAnimal)
    this.animalService.updateAnimal(this.idAnimalTarget, this.targetAnimal).subscribe((res: Response) => {
      console.log(res);

      if (res) {
        this.notif();
      };
    })
  }

  notif() {

    Swal.fire({
      title: 'Animal modifié !',
      icon: 'success',
      showCloseButton: true,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Retour au menu',

    }).then(() => {
      this.refresh()
    });

  }

  byIdEnclos(enclos: Enclos, enclosModel: Enclos) {
    return enclos.idEnclos === enclosModel.idEnclos;
  }
  byIdNourriture(nourriture: Nourriture, nourritureModel: Nourriture) {
    return nourriture.idNourriture === nourritureModel.idNourriture;
  }

  refresh(): void {
    window.location.reload();
  }

}
