import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Mission } from '../missions/miss.domains';

@Component({
  selector: 'app-note-de-frais',
  templateUrl: './note-de-frais.component.html',
  styleUrls: ['./note-de-frais.component.scss']
})
export class NoteDeFraisComponent implements OnInit {
  collegueConnecte: Observable<Collegue>;
  listeMissions: Mission[] = [];
  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.collegueConnecte.subscribe(
      value => this.listeMissions = value.missions);
  }
}
