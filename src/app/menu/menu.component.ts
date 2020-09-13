import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  roleCollegue: Observable<Collegue>;
  isMenuCollapsed = true;

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.roleCollegue = this.authSrv.collegueConnecteObs;
  }
}
