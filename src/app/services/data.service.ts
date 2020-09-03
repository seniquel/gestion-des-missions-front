import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../missions/miss.domains';
import { Observable, Subject } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { tap } from 'rxjs/operators';
import { NoteDeFrais } from '../note-de-frais/noteFrais.domain';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL_BACKEND = environment.baseUrl;
  subjectMission = new Subject<Mission>();

  constructor(private http: HttpClient) { }

  recupererMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.URL_BACKEND}collegues/me/missions`);
  }

  RecupererMissionCourante(uuid: string): Observable<Mission> {
    return this.http.get<Mission>(`${this.URL_BACKEND}missions/${uuid}`);
  }
  selectionnerMission(uuid: string): Observable<Mission> {
    return this.RecupererMissionCourante(uuid).pipe(
      tap(mission => this.subjectMission.next(mission))
    );
  }
}
