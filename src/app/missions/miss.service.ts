import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Mission } from './miss.domains';

/**
 * Service de gestion des missions
 */
@Injectable({
  providedIn: 'root'
})
export class MissService {

  URL_BACKEND = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  recupererMissionsCurrent(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.URL_BACKEND}missions/current`);
  }

  recupererMissionsFutur(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.URL_BACKEND}missions/futur`);
  }
}
