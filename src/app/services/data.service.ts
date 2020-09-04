import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Mission } from '../missions/miss.domains';
import { Observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL_BACKEND = environment.baseUrl;

  constructor(private http: HttpClient) { }

  recupererMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.URL_BACKEND}collegues/me/missions`);
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
}
