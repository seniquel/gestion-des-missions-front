import { Component, OnInit } from '@angular/core';
import { Mission, MissionDto } from '../miss.domains';
import { DataService } from 'src/app/services/data.service';
import { Nature } from 'src/app/nature-missions/nature.domain';
import { Observable } from 'rxjs';
import { Collegue } from 'src/app/auth/auth.domains';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-mission-demande',
  templateUrl: './mission-demande.component.html',
  styleUrls: ['./mission-demande.component.scss']
})
export class MissionDemandeComponent implements OnInit {

  mission: MissionDto = {
    dateDebut: new Date(),
    dateFin: new Date(),
    villeDepart: '',
    villeArrivee: '',
    prime: 0.00,
    collegueId: '',
    natureId: '',
    transport: '',
    statut: ''
  };
  listeNatures: Nature[] = [];
  natureSelectionee: Nature = {
    uuid: '',
    libelle: '',
    payee: false,
    versementPrime: false,
    tjm: 0,
    pourcentagePrime: 0,
    debutValidite: null,
    finValidite: null,
    plafondFrais: 0,
    depassementFrais: false
  };
  collegueConnecte: Observable<Collegue>;
  collegueConnecteData: Collegue;

  constructor(private authSrv: AuthService, private service: DataService) { }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.service.recupererCollegueCourant().subscribe(
      value => this.collegueConnecteData = value,
      err => console.log(err),
      () => { }
    );
    this.service.recupererNatures().subscribe(
      value => {
        this.listeNatures = value;
        console.log(this.listeNatures);
      },
      err => console.log(err),
      () => { }
    );
  }

  validerMission(): void {
    this.mission.natureId = this.natureSelectionee.uuid;
    this.mission.collegueId = this.collegueConnecteData.uuid;
    console.log(this.mission);
    this.service
      .creerMission(this.mission)
      .subscribe(
        err => console.log(err));
  }

  estimationPrime(): number {
    //(nombre de jours travaillés)* TJM * %Prime/100 - déduction
    const msParJour: number = 1000 * 60 * 60 * 24;
    const debut: number = new Date(this.mission.dateDebut).getTime();
    const fin: number = new Date(this.mission.dateFin).getTime();
    const diffJours: number = Math.ceil((fin - debut) / msParJour);
    const prime = diffJours * this.natureSelectionee.tjm * this.natureSelectionee.pourcentagePrime/100;

    return prime;
  }
}
