import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Nature } from '../nature-missions/nature.domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NatureService {

  URL_BACKEND = environment.baseUrl;

  constructor(private http: HttpClient) { }

  recupererNatures(): Observable<Nature[]> {
    return this.http.get<Nature[]>(`${this.URL_BACKEND}natures`);
  }
}
