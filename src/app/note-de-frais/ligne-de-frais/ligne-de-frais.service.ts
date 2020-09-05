import { Observable } from 'rxjs';
import { LigneDeFraisDto } from './ligneDeFraisDto.domain';
import { LigneDeFrais } from './ligneFrais.domain';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LigneDeFraisService {

  constructor(private dataService: DataService,
    public datepipe: DatePipe) { }
  noteDeFraisId: string;
  dateDebut: Date = new Date();
  dateFin: Date = new Date();
  montantMax: number;

  ligneDto: LigneDeFraisDto = {};

  form: FormGroup = new FormGroup({
    // uuid, null si ajout, rempli si modif
    uuid: new FormControl(null),
    date: new FormControl('', Validators.required),
    nature: new FormControl('', Validators.required),
    montant: new FormControl('')
  });


  initialiserFormGroup() {
    this.form.get('montant').setValidators([Validators.required, Validators.min(0), Validators.max(this.montantMax)]);
    this.form.updateValueAndValidity();
    this.form.setValue({
      uuid: null,
      date: '',
      nature: '',
      montant: 0
    });
  }

  ajouterInfos(ligne: LigneDeFrais) {
    this.form.setValue(ligne);
  }

  ajouterLigne(date: Date, nature: string, montant: number): void{
    this.ligneDto.date = this.datepipe.transform(date, 'yyyy-MM-dd');
    this.ligneDto.nature = nature;
    this.ligneDto.montant = montant;
    this.dataService.ajouterLigne(this.ligneDto, this.noteDeFraisId).subscribe();
  }

  modifierLigne(date: Date, nature: string, montant: number, ligneId: string): void{
    this.ligneDto.date = this.datepipe.transform(date, 'yyyy-MM-dd');
    this.ligneDto.nature = nature;
    this.ligneDto.montant = montant;
    this.dataService.modifierLigne(this.ligneDto, ligneId).subscribe();
  }

  supprimerligne(ligneId: string): void {
    this.dataService.supprimerLigne(ligneId).subscribe();
  }
}
