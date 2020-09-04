import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Mission, MissionDto } from '../missions/miss.domains';
import { Observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { Nature } from '../nature-missions/nature.domain';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL_BACKEND = environment.baseUrl;

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

  creerMission(missionCreee: MissionDto): Observable<MissionDto> {
    missionCreee.statut = 'INITIALE';
    return this.http.post<MissionDto>(`${this.URL_BACKEND}collegues/me/missions`, missionCreee);
  }
}
