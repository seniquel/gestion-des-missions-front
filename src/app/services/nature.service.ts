import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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

  creerNature(nature: Nature): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // envoie de la requête
    this.http.post(`${this.URL_BACKEND}natures`,
      JSON.stringify(nature),
      httpOptions
    ).subscribe((data: any) => {
      alert("Félicitation ! Vous avez créé une nouvelle nature.");
    }, (error: HttpErrorResponse) => {
      console.log('error', error);
      if (error.status == 409) {
        alert("Cette nature existe déjà, veuillez modifier la nature dans le tableau !");
      }
      else if (error.status == 400) {
        alert("Veuillez remplir tous les champs !");
      }

    });

  }
}
