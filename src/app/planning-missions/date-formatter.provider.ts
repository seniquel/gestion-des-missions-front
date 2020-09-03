import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class DateFormatter extends CalendarDateFormatter {

  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'HH:mm', locale);
  }

  public weekViewHour({ date, locale }: DateFormatterParams): string {
    return this.dayViewHour({ date, locale });
  }

  public monthViewTitle({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'MMMM y', locale);
  }

}
