import { LigneDeFraisDto } from './../note-de-frais/ligne-de-frais/ligneDeFraisDto.domain';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Mission, MissionDto } from '../missions/miss.domains';
import { Observable, Subject } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { Nature } from '../nature-missions/nature.domain';
import { tap } from 'rxjs/operators';
import { JoursFeries } from '../planning-missions/jours-feries.domain';


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
  subjectMissionCourante = new Subject<Mission>();
  subjectListeMissionCourante = new Subject<Mission[]>();
  subjectMission = new Subject<Mission>();
  URL_FRONTEND = environment.baseUrlFront;

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

  RecupererMissionCourante(uuid: string): Observable<Mission> {
    return this.http.get<Mission>(`${this.URL_BACKEND}missions/${uuid}`);
  }
  selectionnerMissionParUuid(uuid: string): Observable<Mission> {
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

  recupererJoursFeries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_FRONTEND}jours-feries`);
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
