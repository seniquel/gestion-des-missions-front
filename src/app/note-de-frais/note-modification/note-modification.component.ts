import { LigneDeFraisDto } from './../ligne-de-frais/ligneDeFraisDto.domain';
import { Nature } from './../../nature-missions/nature.domain';
import { LigneDeFrais } from './../ligne-de-frais/ligneFrais.domain';
import { LigneDeFraisService } from './../ligne-de-frais/ligne-de-frais.service';
import { NoteDeFrais } from './../noteFrais.domain';
import { Mission } from './../../missions/miss.domains';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Collegue } from 'src/app/auth/auth.domains';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LigneDeFraisComponent } from '../ligne-de-frais/ligne-de-frais.component';

@Component({
  selector: 'app-note-modification',
  templateUrl: './note-modification.component.html',
  styleUrls: ['./note-modification.component.scss']
})
export class NoteModificationComponent implements OnInit {
  collegueConnecte: Observable<Collegue>;
  mission: Mission = new Mission();
  noteDeFrais: NoteDeFrais = new NoteDeFrais();

  constructor(private authSrv: AuthService,
    private service: DataService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private ligneService: LigneDeFraisService) { }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;

    this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.service.selectionnerMission(params.get('uuid')).subscribe(
          miss => this.mission = miss,
          err => { },
          () => { }
        );
      }
    );
  }

  calculerMaxFrais(plafondFrais: number, depassementPlafond: boolean, prime: number, fraisTotal: number): number {
    // calcule le maximum possible de la note qu'on va ajouter
    if (depassementPlafond) {
      // si dépassement, le max est le plafond + la prime - les frais déjà rentrés
      return plafondFrais + prime - fraisTotal;
    } else {
      // si pas de dépassement, max est le plafond - les frais deja rentrés
      return plafondFrais - fraisTotal;
    }
  }

  ajouterLigne(mission: Mission) {
    this.ligneService.noteDeFraisId = mission.noteDeFrais.uuid;
    this.ligneService.dateDebut = new Date(mission.dateDebut);
    this.ligneService.dateFin = new Date(mission.dateFin);
    this.ligneService.lignesDeFrais = mission.noteDeFrais.lignesDeFrais;
    this.ligneService.montantMax = this.calculerMaxFrais(mission.nature.plafondFrais,
      mission.nature.depassementFrais,
      mission.prime,
      mission.noteDeFrais.fraisTotal);
    this.ligneService.initialiserFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(LigneDeFraisComponent, dialogConfig);
  }

  modifierLigne(mission: Mission, ligne: LigneDeFrais) {
    this.ligneService.noteDeFraisId = mission.noteDeFrais.uuid;
    this.ligneService.dateDebut = new Date(mission.dateDebut);
    this.ligneService.dateFin = new Date(mission.dateFin);
    this.ligneService.lignesDeFrais = mission.noteDeFrais.lignesDeFrais;
    // calcul du max possible, en enlevant le montant de cette ligne
    this.ligneService.montantMax = this.calculerMaxFrais(mission.nature.plafondFrais,
      mission.nature.depassementFrais,
      mission.prime,
      (mission.noteDeFrais.fraisTotal - ligne.montant));
    this.ligneService.ajouterInfos(ligne);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(LigneDeFraisComponent, dialogConfig);
  }

  supprimerLigne(ligne: LigneDeFrais) {
    if (confirm(`Voulez vous vraiment supprimer cette note :
              ${ligne.date}
              ${ligne.nature}
              ${ligne.montant} ?`)) {
      this.ligneService.supprimerligne(ligne.uuid);
    }
  }
}
