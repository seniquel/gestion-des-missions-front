import { DateFormatter } from './date-formatter.provider';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { subYears } from 'date-fns';

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

  view: CalendarView = CalendarView.Month;
  viewDate = new Date();
  viewDateNextYear = subYears(new Date(), 1);

  events: CalendarEvent[] = [];
  locale = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  CalendarView = CalendarView;

  setView(view: CalendarView) {
    this.view = view;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
