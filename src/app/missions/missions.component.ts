import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';
import { Mission } from './miss.domains';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

  dateActuelle: Date = new Date(new Date());
  collegueConnecte: Observable<Collegue>;
  listeMissions: Mission[];

  constructor(private authSrv: AuthService, private service: DataService) {
  }

  /**
   * A l'initialisation, le composant s'abonne au flux du collègue courant connecté.
   *
   * Celui lui permet de rester à jour en fonction des connexions et déconnexions.
   */
  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.service.recupererMissions().subscribe(
      value => {
        this.listeMissions = value;
        this.service.modifListeMissions(this.listeMissions);
      },
      err => console.log(err)
    );
    this.service.sabonnerAListeMission().subscribe(
      value => {
        this.listeMissions = value;
      },
      err => console.log(err)
    );
  }

  supprimer(mission): void {
    this.service.suppprimerMission(mission.uuid).subscribe(
      () => { },
      err => console.log(err)
    );
    console.log(this.listeMissions.indexOf(mission));
    this.listeMissions = this.listeMissions.filter(m => m.uuid !== mission.uuid)
    this.service.modifListeMissions(this.listeMissions);
  }

  selectionner(idMission: string): void {
    this.service.recupererMissionParUuid(idMission).subscribe(
      mission => this.service.selectionnerMission(mission),
      err => console.log(err)
    );
  }

  transportToString(transport: string): string {
    switch (transport) {
      case 'AVION':
        return 'Avion';
      case 'TRAIN':
        return 'Train';
      case 'COVOITURAGE':
        return 'Covoiturage';
      case 'VOITURE_DE_SERVICE':
        return 'Voiture de service';
      default:
        return transport;

    }
  }

  missionEnCours(mission: Mission): boolean {
    const debut: number = new Date(mission.dateDebut).getTime();
    const fin: number = new Date(mission.dateFin).getTime();
    const dateActuelle: number = new Date(this.dateActuelle).getTime();
    return dateActuelle > debut && dateActuelle < fin;
  }

  missionTerminee(mission: Mission): boolean {
    const fin: number = new Date(mission.dateFin).getTime();
    const dateActuelle: number = new Date(this.dateActuelle).getTime();
    return dateActuelle > fin;
  }

}
