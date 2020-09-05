import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Mission } from '../missions/miss.domains';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-note-de-frais',
  templateUrl: './note-de-frais.component.html',
  styleUrls: ['./note-de-frais.component.scss']
})
export class NoteDeFraisComponent implements OnInit {
  collegueConnecte: Observable<Collegue>;
  listeMissions: Mission[] = [];
  dateAujourdHui = new Date();
  constructor(private authSrv: AuthService, private service: DataService) { }

  /**
   * A l'initialisation, le composant s'abonne au flux du collègue courant connecté.
   *
   * Celui lui permet de rester à jour en fonction des connexions et déconnexions.
   */
  ngOnInit(): void {
    console.log(this.dateAujourdHui);
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.service.recupererMissions().subscribe(
      value => {
        this.listeMissions = value;
        console.log(value);
      },
      err => console.log(err),
      () => { }
    );
  }
}
