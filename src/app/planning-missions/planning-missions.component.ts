import { Observable, from } from 'rxjs';
import { Mission } from './../missions/miss.domains';
import { DateFormatter } from './date-formatter.provider';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { subYears } from 'date-fns';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';
import { colors } from './colors-events';

@Component({
  selector: 'app-planning-missions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './planning-missions.component.html',
  styleUrls: ['./planning-missions.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: DateFormatter,
    },
  ],
})
export class PlanningMissionsComponent implements OnInit {

  // Module calendrier
  view: CalendarView = CalendarView.Month;
  viewDate = new Date();
  viewDateNextYear = subYears(new Date(), 1);
  locale = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  CalendarView = CalendarView;

  // Missions dans le calendriers
  events: CalendarEvent[] = [
    {
      title: 'Coucou',
      color: colors.mission,
      start: new Date(2020, 8, 4),
    }
  ];

  // Listes des missions du collègue
  collegueConnecte: Observable<Collegue>;
  listeMissions: Mission[] = [];

  setView(view: CalendarView) {
    this.view = view;
  }
  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.collegueConnecte.subscribe(
      value => this.listeMissions = value.missions
    );
  }

}
