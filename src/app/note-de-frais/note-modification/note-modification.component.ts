import { NoteDeFrais } from './../noteFrais.domain';
import { Mission } from './../../missions/miss.domains';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Collegue } from 'src/app/auth/auth.domains';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-note-modification',
  templateUrl: './note-modification.component.html',
  styleUrls: ['./note-modification.component.scss']
})
export class NoteModificationComponent implements OnInit {
  collegueConnecte: Observable<Collegue>;
  mission: Mission;
  noteDeFrais: NoteDeFrais;

  constructor(private authSrv: AuthService,
              private service: DataService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;

    this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.service.selectionnerMission(params.get('uuid')).subscribe(
          miss => this.mission = miss,
          err => {},
          () => {}
        );
      }
    );
  }
}
