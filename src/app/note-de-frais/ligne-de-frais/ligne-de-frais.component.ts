import { LigneDeFraisDto } from './ligneDeFraisDto.domain';
import { LigneDeFrais } from './ligneFrais.domain';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from './../../services/data.service';
import { LigneDeFraisService } from './ligne-de-frais.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

export function verifierDoublon(lignes: LigneDeFrais[]) {
  return (group: FormGroup): { [key: string]: any } => {
    const dateToCheck = group.get('date').value;
    const natureToCheck = group.get('nature').value;
    const lignesDoublon: LigneDeFrais[] = lignes
      .filter(element => element.nature === natureToCheck)
      .filter(element => new Date(element.date).getDate() === new Date(dateToCheck).getDate());
    if (lignesDoublon.toString() !== '' ) {
      console.log('doublon');
      return {
        'doublon': true
      };
    }
  };
}


@Component({
  selector: 'app-ligne-de-frais',
  templateUrl: './ligne-de-frais.component.html',
  styleUrls: ['./ligne-de-frais.component.scss']
})
export class LigneDeFraisComponent implements OnInit {
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


  constructor(public ligneService: LigneDeFraisService,
    private dataService: DataService,
    public dialogRef: MatDialogRef<LigneDeFraisComponent>,
    public datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) data) {
    this.noteDeFraisId = data.missionRef.noteDeFrais.uuid;
    this.dateDebut = new Date(data.missionRef.dateDebut);
    this.dateFin = new Date(data.missionRef.dateFin);
    this.montantMax = data.montantMax;
    this.lignesDeFrais = data.missionRef.noteDeFrais.lignesDeFrais;
    if (data.ligneRef) {
      // modification de ligne
      this.ajouterInfos(data.ligneRef);
    } else {
      // ajout de ligne
      this.initialiserFormGroup();
    }
  }

  ngOnInit(): void {
  }

  initialiserFormGroup() {
    this.form.get('montant').setValidators([Validators.required, Validators.min(0), Validators.max(this.montantMax)]);
    this.form.setValidators(verifierDoublon(this.lignesDeFrais));
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
    this.form.setValidators(verifierDoublon(this.lignesDeFrais));
    this.form.updateValueAndValidity();
    this.form.setValue(ligne);
  }

  envoyerDonnees() {
    if (this.form.valid) {
      if (!this.form.get('uuid').value) {
        this.ajouterLigne(this.form.get('date').value,
          this.form.get('nature').value,
          this.form.get('montant').value);
        this.fermer();
      } else {
        this.modifierLigne(this.form.get('date').value,
          this.form.get('nature').value,
          this.form.get('montant').value,
          this.form.get('uuid').value);
        this.fermer();
      }
    }
  }

  fermer() {
    this.form.reset();
    this.initialiserFormGroup();
    this.dialogRef.close();
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
}
