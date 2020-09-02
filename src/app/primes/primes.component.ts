import { missionMock } from './mock.mission';
import { Mission } from './../missions/miss.domains';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-primes',
  templateUrl: './primes.component.html',
  styleUrls: ['./primes.component.scss']
})
export class PrimesComponent implements OnInit {

  listeMissions: Mission[];
  listeDate: Date[];
  collegueConnecte: Observable<Collegue>;

  constructor(private authSrv: AuthService) {
    this.listeMissions = missionMock;
  }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.listeDate = this.recupererDate();
  }

  recupererDate(): Date[] {
    const datesFin: Date[] = [];
    for (let i = 0; i < this.listeMissions.length; i++) {
      datesFin.push(this.listeMissions[i].dateFin);
    }
    return datesFin;
  }

}
