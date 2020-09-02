import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../missions/miss.domains';
import { Observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL_BACKEND = environment.baseUrl;

  constructor(private http: HttpClient) { }

  recupererMissions(uuid: string): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.URL_BACKEND}collegue/${uuid}/missions`);
  }
}
