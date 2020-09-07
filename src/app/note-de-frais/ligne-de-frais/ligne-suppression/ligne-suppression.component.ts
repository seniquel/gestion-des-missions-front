import { LigneDeFrais } from './../ligneFrais.domain';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ligne-suppression',
  templateUrl: './ligne-suppression.component.html',
  styleUrls: ['./ligne-suppression.component.scss']
})
export class LigneSuppressionComponent implements OnInit {
  ligneASupprimer: LigneDeFrais;
  constructor(public dialogRef: MatDialogRef<LigneSuppressionComponent>,
    private dataService: DataService,
    public datepipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) data) {
    this.ligneASupprimer = data.ligneRef;
  }

  ngOnInit(): void {
  }

  fermer() {
    this.dialogRef.close();
  }

  supprimerLigne(ligneId: string): void {
    this.dataService.supprimerLigne(ligneId).subscribe();
    this.fermer();
  }
}
