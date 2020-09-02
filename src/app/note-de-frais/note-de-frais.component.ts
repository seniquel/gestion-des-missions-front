import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-note-de-frais',
  templateUrl: './note-de-frais.component.html',
  styleUrls: ['./note-de-frais.component.scss']
})
export class NoteDeFraisComponent implements OnInit {
  collegueConnecte: Observable<Collegue>;
  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
  }

}
