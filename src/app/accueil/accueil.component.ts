import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { Mission } from '../missions/miss.domains';
import { AuthService } from '../auth/auth.service';
import { MissService } from '../missions/miss.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  collegueConnecte: Observable<Collegue>;
  listeMissionsCurrent: Mission[];
  listeMissionsFutur: Mission[];
  today: Date = new Date();

  constructor(private authSrv: AuthService, private service: MissService) { }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.service.recupererMissionsCurrent().subscribe(
      mission => {
        this.listeMissionsCurrent = mission;
      },
      err => console.log(err)
    );
    this.service.recupererMissionsFutur().subscribe(
      mission => {
        this.listeMissionsFutur = mission;
      },
      err => console.log(err)
    );
  }

}
