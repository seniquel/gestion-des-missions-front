import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Mission, MissionDto } from '../missions/miss.domains';
import { Observable, Subject } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { Nature } from '../nature-missions/nature.domain';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL_BACKEND = environment.baseUrl;
  subjectMissionCourante = new Subject<Mission>();
  subjectListeMissionCourante = new Subject<Mission[]>();

  constructor(private http: HttpClient) { }

  recupererCollegueCourant(): Observable<Collegue> {
    return this.http.get<Collegue>(`${this.URL_BACKEND}collegues/me`);
  }

  recupererMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.URL_BACKEND}collegues/me/missions`);
  }

  recupererNatures(): Observable<Nature[]> {
    return this.http.get<Nature[]>(`${this.URL_BACKEND}natures`);
  }

  creerMission(missionCreee: MissionDto): Observable<Mission> {
    missionCreee.statut = 'INITIALE';
    return this.http.post<Mission>(`${this.URL_BACKEND}collegues/me/missions`, missionCreee);
  }

  modifierMission(missionModifiee: MissionDto, uuid: string): Observable<Mission> {
    missionModifiee.statut = 'INITIALE';
    return this.http.put<Mission>(`${this.URL_BACKEND}collegues/me/missions/${uuid}`, missionModifiee);
  }

  suppprimerMission(uuid: string): Observable<string> {
    return this.http.delete<string>(`${this.URL_BACKEND}collegues/me/missions/${uuid}`);
  }

  recupererMissionParUuid(uuid: string): Observable<Mission> {
    return this.http.get<Mission>(`${this.URL_BACKEND}missions/${uuid}`);
  }

  selectionnerMission(mission: Mission): void {
    this.subjectMissionCourante.next(mission);
  }

  sabonnerAMission(): Observable<Mission> {
    return this.subjectMissionCourante.asObservable();
  }

  modifListeMissions(listeMissions: Mission[]): void {
    this.subjectListeMissionCourante.next(listeMissions);
  }

  sabonnerAListeMission(): Observable<Mission[]> {
    return this.subjectListeMissionCourante.asObservable();
  }
}
