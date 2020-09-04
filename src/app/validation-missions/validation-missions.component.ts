import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';
import { Mission } from '../missions/miss.domains';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-validation-missions',
  templateUrl: './validation-missions.component.html',
  styleUrls: ['./validation-missions.component.scss']
})
export class ValidationMissionsComponent implements OnInit {

  collegueConnecte: Observable<Collegue>;
  listeMissions: Mission[];

  constructor(private authSrv: AuthService, private service: DataService) { }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.service.recupererMissionsEnAttente().subscribe(
      value => {
        this.listeMissions = value;
      },
      err => console.log(err),
      () => { }
    );
  }

}
