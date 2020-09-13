import { DataService } from './../services/data.service';
import { Observable } from 'rxjs';
import { Mission } from './../missions/miss.domains';
import { DateFormatter } from './date-formatter.provider';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { subYears, addYears } from 'date-fns';
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
  viewDate: Date = new Date();
  locale = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  CalendarView = CalendarView;
  couleurMission: any = colors.mission;
  couleurJoursFeries: any = colors.joursFeries;

  collegueConnecte: Observable<Collegue>;
  listeMissions: Mission[] = [];

  events: CalendarEvent[] = [];

  viewDatePreviousYear(): void {
    this.viewDate = subYears(new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, this.viewDate.getDay()), 1);
  }

  viewDateNextYear(): void {
    this.viewDate = addYears(new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, this.viewDate.getDay()), 1);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  constructor(private authServ: AuthService, private dataServ: DataService) { }

  ngOnInit(): void {

    // Collègue authentifié
    this.collegueConnecte = this.authServ.collegueConnecteObs;

    // Récupération missions
    this.dataServ.recupererMissions().subscribe(
      missions => {
        this.listeMissions = missions,
          this.listeMissions.map(
            mission => {
              this.events.push(
                {
                  title: mission.nature.libelle,
                  color: this.couleurMission,
                  start: new Date(mission.dateDebut),
                  end: new Date(mission.dateFin)
                }
              );
            }
          );
      },
      err => console.log(err)
    );

    // Récupération jours feriés
    this.dataServ.recupererJoursFeries().subscribe(
      feries => {
        for (const [date, jour] of Object.entries(feries)) {
          this.events.push(
            {
              title: jour.toString(),
              color: this.couleurJoursFeries,
              start: new Date(date)
            },
          );
        }
      }
    );
  }
}
