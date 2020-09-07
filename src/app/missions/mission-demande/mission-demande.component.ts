import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Collegue } from 'src/app/auth/auth.domains';
import { AuthService } from 'src/app/auth/auth.service';
import { Nature } from 'src/app/nature-missions/nature.domain';
import { DataService } from 'src/app/services/data.service';
import { Mission, MissionDto } from '../miss.domains';

@Component({
  selector: 'app-mission-demande',
  templateUrl: './mission-demande.component.html',
  styleUrls: ['./mission-demande.component.scss']
})
export class MissionDemandeComponent implements OnInit {

  dateActuelle: Date = new Date();
  mission: MissionDto = {
    dateDebut: this.dateActuelle,
    dateFin: this.dateActuelle,
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
  listeMissions: Mission[];

  constructor(private authSrv: AuthService, private service: DataService) { }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    //Récupération des données du collègue courant
    this.service.recupererCollegueCourant().subscribe(
      value => this.collegueConnecteData = value,
      err => console.log(err),
      () => { }
    );
    //Récupération des natures existantes
    this.service.recupererNatures().subscribe(
      value => {
        this.listeNatures = value;
        console.log(this.listeNatures);
      },
      err => console.log(err),
      () => { }
    );
    //Récupération des missions du collègue courant
    this.service.recupererMissions().subscribe(
      value => {
        this.listeMissions = value;
        console.log(this.listeMissions);
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
    const prime = diffJours * this.natureSelectionee.tjm * this.natureSelectionee.pourcentagePrime / 100;

    return prime;
  }

  dateValide(): boolean {
    const debut: number = new Date(this.mission.dateDebut).getTime();
    const fin: number = new Date(this.mission.dateFin).getTime();
    return fin > debut;
  }

  pasDeChevauchement(): boolean {
    const debut1: number = new Date(this.mission.dateDebut).getTime();
    const fin1: number = new Date(this.mission.dateFin).getTime();
    for (const mission of this.listeMissions) {
      let debut2 = new Date(mission.dateDebut).getTime();
      let fin2 = new Date(mission.dateFin).getTime();
      if (fin1 > debut2 && fin2 > debut1) {
        return false;
      }
    }
    return true;
  }

  formValide(): boolean {
    return this.dateValide() && this.pasDeChevauchement();
  }

  ajouteJours(date: Date, jours: number): Date {
    let res = new Date();
    res.setDate(date.getDate() + jours);
    return res;
  }

  dateDebutMin(): Date {
    return (this.mission.transport === 'AVION') ? this.ajouteJours(this.dateActuelle, 7) : this.ajouteJours(this.dateActuelle, 1);
  }


}
