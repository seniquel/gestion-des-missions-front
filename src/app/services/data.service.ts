import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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

  recupererMissionsParAnnee(annee: number): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.URL_BACKEND}missions/${annee}/prime`);
  }

  recupererMissionsEnAttente(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.URL_BACKEND}missions/validation`);
  }

  recupererMissionsCurrent(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.URL_BACKEND}missions/current`);
  }

  recupererMissionsFutur(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.URL_BACKEND}missions/futur`);
  }

  creerFichierExcel(annee: number): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // envoie de la requête
    this.http.post(`${this.URL_BACKEND}missions/missions-par-annee`,
      JSON.stringify(annee),
      httpOptions
    ).subscribe((data: any) => {
      console.log(data);
      alert(`Fichier créé dans le dossier : "C:/Users/[UTILISATEUR]/primes"`);
    }, (error: HttpErrorResponse) => {
      console.log('error', error);
      alert('Le fichier n\'a pas pu être créé !');
    });

  }

  validationMission(mission: Mission, str: string): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.patch(`${this.URL_BACKEND}missions/validation?uuid=${mission.uuid}&str=${str}`,
      httpOptions
    ).subscribe((data: any) => {
      if (str.includes('valid')) {
        alert('Mission validée :');
      }
      else if (str.includes('rejet')) {
        alert('Mission rejetée !');
      }
    }, (error: HttpErrorResponse) => {
      console.log('error', error);
      alert('Erreur !');
    });
  }
}
