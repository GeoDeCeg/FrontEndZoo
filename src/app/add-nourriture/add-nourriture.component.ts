import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {Nourriture} from '../models/nourriture';
import {NourritureService} from '../service/nourriture/nourriture.service';

@Component({
  selector: 'app-add-nourriture',
  templateUrl: './add-nourriture.component.html',
  styleUrls: ['./add-nourriture.component.scss']
})
export class AddNourritureComponent implements OnInit {

  formulaireNourriture: FormGroup;
  nouvelleNourriture: Nourriture = new Nourriture();
  submitted = false;

  listNourriture: Nourriture[];


  constructor(private nourritureService : NourritureService, private router : Router, private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.formulaireNourriture = this.formBuilder.group({
      stock : ['',Validators.required],
      produit : ['', [Validators.required,Validators.pattern("^[0-9]*$")]]
    })
    this.nourritureService.getAllNourriture().subscribe(data =>{
      this.listNourriture = data;
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.formulaireNourriture.invalid) {
      return;
    } else {
      this.addNourriture();
    }

  }

  onReset() {
    this.submitted = false;
    this.formulaireNourriture.reset();
  }

  get f() {
    return this.formulaireNourriture.controls
  }

  addNourriture() {
    console.log(this.nouvelleNourriture)
    this.nourritureService.addNourriture(this.nouvelleNourriture).subscribe((res: Response) => {
      console.log(res);

      if (res['idNourriture'] != null) {
        
        this.notif();
      };
    })
  }

  notif() {

    Swal.fire({
      title: 'Nourriture ajoutée !',
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
