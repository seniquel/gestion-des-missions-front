import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from './../../services/data.service';
import { LigneDeFraisService } from './ligne-de-frais.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ligne-de-frais',
  templateUrl: './ligne-de-frais.component.html',
  styleUrls: ['./ligne-de-frais.component.scss']
})
export class LigneDeFraisComponent implements OnInit {
  constructor(public ligneService: LigneDeFraisService,
    private dataService: DataService,
    public dialogRef: MatDialogRef<LigneDeFraisComponent>) { }

  ngOnInit(): void {
  }

  envoyerDonnees() {
    if (this.ligneService.form.valid) {
      console.log(this.ligneService.form.get('uuid').value);
      if (!this.ligneService.form.get('uuid').value) {
        console.log("ajout");
        this.ligneService.ajouterLigne(this.ligneService.form.get('date').value,
          this.ligneService.form.get('nature').value,
          this.ligneService.form.get('montant').value);
        this.fermer();
      } else {
        console.log("modif");
        this.ligneService.modifierLigne(this.ligneService.form.get('date').value,
          this.ligneService.form.get('nature').value,
          this.ligneService.form.get('montant').value,
          this.ligneService.form.get('uuid').value);
        this.fermer();
      }
    }
  }

  fermer() {
    this.ligneService.form.reset();
    this.ligneService.initialiserFormGroup();
    this.dialogRef.close();
  }

}
