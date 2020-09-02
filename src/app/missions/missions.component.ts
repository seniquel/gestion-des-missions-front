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

  collegueConnecte: Observable<Collegue>;
  listeMissions: Mission[] = [];

  constructor(private authSrv: AuthService, private service: DataService) {
  }

  /**
   * A l'initialisation, le composant s'abonne au flux du collègue courant connecté.
   *
   * Celui lui permet de rester à jour en fonction des connexions et déconnexions.
   */
  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.collegueConnecte.subscribe(
      value => console.log(value)
    )
    this.collegueConnecte.subscribe(
      value =>
        this.listeMissions.concat(value.missions)
    );
  }

}
