import { LigneDeFraisDto } from './ligneDeFraisDto.domain';
import { LigneDeFrais } from './ligneFrais.domain';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
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
  lignesDeFrais: LigneDeFrais[] = [];

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
    this.form.get('montant').setValidators([Validators.required, Validators.min(0), Validators.max(this.montantMax)]);
    this.form.updateValueAndValidity();
    this.form.setValue(ligne);
  }

  ajouterLigne(date: Date, nature: string, montant: number): void {
    this.ligneDto.date = this.datepipe.transform(date, 'yyyy-MM-dd');
    this.ligneDto.nature = nature;
    this.ligneDto.montant = montant;
    this.dataService.ajouterLigne(this.ligneDto, this.noteDeFraisId).subscribe();
  }

  modifierLigne(date: Date, nature: string, montant: number, ligneId: string): void {
    this.ligneDto.date = this.datepipe.transform(date, 'yyyy-MM-dd');
    this.ligneDto.nature = nature;
    this.ligneDto.montant = montant;
    this.dataService.modifierLigne(this.ligneDto, ligneId).subscribe();
  }

  supprimerligne(ligneId: string): void {
    this.dataService.supprimerLigne(ligneId).subscribe();
  }


  testerDoublon() {
    this.form.controls.date.valueChanges.subscribe(date => {
      this.form.controls.nature.valueChanges.subscribe(nature => {
        console.log(`date`);
        const lignesDoublon: LigneDeFrais[] = this.lignesDeFrais.filter(element => element.nature === nature)
          .filter(element => element.date === date);
        if (lignesDoublon.toString() !== '') {
          this.form.controls.date.setErrors({ doublon: true });
          this.form.controls.nature.setErrors({ doublon: true });
          if (this.form.controls.nature.hasError('doublon')) {
            console.log(`DOUBLON`);
          } else {
            this.form.controls.date.setErrors({ doublon: false });
            this.form.controls.nature.setErrors({ doublon: false });
          }
        }
      });
    });
  }
}
