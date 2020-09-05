import { LigneDeFraisDto } from './../note-de-frais/ligne-de-frais/ligneDeFraisDto.domain';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mission } from '../missions/miss.domains';
import { Observable, Subject } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { tap } from 'rxjs/operators';
import { NoteDeFrais } from '../note-de-frais/noteFrais.domain';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

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

  ajouterLigne(ligne: LigneDeFraisDto, noteDeFraisId: string): Observable<any>{
    return this.http.post(`${this.URL_BACKEND}noteDeFrais/${noteDeFraisId}/ligneDeFrais`, JSON.stringify(ligne), httpOptions);
  }

  modifierLigne(ligne: LigneDeFraisDto, ligneId: string): Observable<any> {
    console.log(ligneId);
    return this.http.put(`${this.URL_BACKEND}lignesDeFrais/${ligneId}`, JSON.stringify(ligne), httpOptions);
  }

  supprimerLigne(ligneId: string): Observable<any> {
    return this.http.delete(`${this.URL_BACKEND}lignesDeFrais/${ligneId}`, httpOptions);
  }
}
