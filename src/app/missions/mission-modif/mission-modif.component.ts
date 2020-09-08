import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Collegue } from 'src/app/auth/auth.domains';
import { Mission, MissionDto } from '../miss.domains';
import { AuthService } from 'src/app/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Nature } from 'src/app/nature-missions/nature.domain';

@Component({
  selector: 'app-mission-modif',
  templateUrl: './mission-modif.component.html',
  styleUrls: ['./mission-modif.component.scss']
})
export class MissionModifComponent implements OnInit {
  dateActuelle: Date = new Date(new Date().setHours(0, 0, 0, 0));
  missionCourante: Mission = new Mission();
  collegueConnecte: Observable<Collegue>;
  collegueConnecteData: Collegue;
  listeMissions: Mission[] = [new Mission()];
  listeNatures: Nature[] = [];

  natureSelectionee: Nature = new Nature();

  mission: MissionDto = new MissionDto();

  constructor(private authSrv: AuthService, private service: DataService) { }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    //Récupération des données du collègue courant
    this.service.recupererCollegueCourant().subscribe(
      value => {
        this.collegueConnecteData = value;
        this.mission.collegueId = value.uuid;
      },
      err => console.log(err)
    );
    //Récupération des natures existantes
    this.service.recupererNatures().subscribe(
      value => this.listeNatures = value,
      err => console.log(err)
    );
    //Récupération des missions du collègue courant
    this.service.recupererMissions().subscribe(
      value => this.listeMissions = value,
      err => console.log(err)
    );
    //Récupération de la mission courante
    this.service.sabonnerAMission().subscribe(
      mis => {
        this.missionCourante = mis;
        this.mission.dateDebut = mis.dateDebut;
        this.mission.dateFin = mis.dateFin;
        this.mission.villeDepart = mis.villeDepart;
        this.mission.villeArrivee = mis.villeArrivee;
        this.mission.prime = mis.prime;
        this.mission.transport = mis.transport;
        this.mission.statut = mis.statut;
        this.natureSelectionee = mis.nature;
      },
      err => console.log(err)
    );
  }

  selectionnerNature() {
    this.natureSelectionee = this.listeNatures[this.listeNatures.findIndex(
      val => val.uuid === this.natureSelectionee.uuid
    )];
  }

  validerMission(): void {
    console.log("Validation de la mission");
    this.mission.natureId = this.natureSelectionee.uuid;
    this.mission.collegueId = this.collegueConnecteData.uuid;
    this.service
      .modifierMission(this.mission, this.missionCourante.uuid)
      .subscribe(
        missionCreee => {
          this.listeMissions = this.listeMissions.filter(m => m.uuid !== this.missionCourante.uuid);
          this.listeMissions.push(missionCreee);
          this.service.modifListeMissions(this.listeMissions);
        },
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

  ajouteJours(date: Date, jours: number): Date {
    const res = new Date(new Date().setHours(0, 0, 0, 0));
    res.setDate(date.getDate() + jours);
    return res;
  }

  dateDebutMin(): Date {
    return (this.mission.transport === 'AVION') ? this.ajouteJours(this.dateActuelle, 7) : this.ajouteJours(this.dateActuelle, 1);
  }

  dateValide(): boolean {
    const debut: number = new Date(this.mission.dateDebut).getTime();
    const fin: number = new Date(this.mission.dateFin).getTime();
    return fin >= debut;
  }

  pasDeChevauchement(): boolean {
    const debut1: number = new Date(this.mission.dateDebut).getTime();
    const fin1: number = new Date(this.mission.dateFin).getTime();
    for (const mission of this.listeMissions) {
      const debut2 = new Date(mission.dateDebut).getTime();
      const fin2 = new Date(mission.dateFin).getTime();
      if (fin1 > debut2 && fin2 > debut1 && mission.uuid !== this.missionCourante.uuid) {
        return false;
      }
    }
    return true;
  }

  dateDebutValide(): boolean {
    const debut: number = new Date(this.mission.dateDebut).getTime();
    const debutMin: number = new Date(this.dateDebutMin()).getTime();
    const dateActuelle: number = new Date(this.dateActuelle).getTime();
    return debut >= debutMin;
  }

  dateJourOuvrable(date: Date): boolean {
    const d = new Date(date);
    const weekend = d.getDay() === 0 || d.getDay() === 6;
    return !weekend;
  }

  transportAvion(): boolean {
    return this.mission.transport === 'AVION';
  }

  formValide(): boolean {
    return this.dateValide()
      && this.pasDeChevauchement()
      && this.dateDebutValide()
      && this.dateJourOuvrable(this.mission.dateDebut) && this.dateJourOuvrable(this.mission.dateFin);
  }
}
