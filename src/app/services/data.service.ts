import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../missions/miss.domains';
import { Observable } from 'rxjs';
import { JoursFeries } from '../planning-missions/jours-feries.domain';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL_BACKEND = environment.baseUrl;
  URL_FRONTEND = environment.baseUrlFront;

  constructor(private http: HttpClient) { }

  recupererMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.URL_BACKEND}collegues/me/missions`);
  }

  recupererJoursFeries(): Observable<JoursFeries[]> {
    return this.http.get<JoursFeries[]>(`${this.URL_FRONTEND}jours-feries`);
  }
}
