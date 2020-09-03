import { parseISO } from 'date-fns/fp';
import { DataService } from './../services/data.service';
import { Observable } from 'rxjs';
import { Mission } from './../missions/miss.domains';
import { DateFormatter } from './date-formatter.provider';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { subYears } from 'date-fns';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';
import { colors } from './colors-events';
import { title } from 'process';

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
  viewDate: Date = new Date();
  viewDateNextYear = subYears(new Date(), 1);
  locale = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  CalendarView = CalendarView;

  // Listes des missions du collègue
  collegueConnecte: Observable<Collegue>;
  listeMissions: Mission[] = [];

  // Missions dans le calendrier
  events: CalendarEvent[] = [
  ];

  setView(view: CalendarView) {
    this.view = view;
  }
  constructor(private authServ: AuthService, private dataServ: DataService) { }

  ngOnInit(): void {
    this.collegueConnecte = this.authServ.collegueConnecteObs;
    this.dataServ.recupererMissions().subscribe(
      missions => {
        this.listeMissions = missions,
          this.listeMissions.map(
            mission => {
              this.events.push(
                {
                  title: mission.nature.libelle,
                  color: colors.mission,
                  start: new Date(mission.dateDebut)
                }
              );
            }
          );
      },
      err => console.log(err)
    );
  }

}
