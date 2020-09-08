import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Nature } from '../nature-missions/nature.domain';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NatureService {

  URL_BACKEND = environment.baseUrl;
  subjectNatureSelectionne = new Subject<Nature>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  recupererNatures(): Observable<Nature[]> {
    return this.http.get<Nature[]>(`${this.URL_BACKEND}natures`);
  }

  recupererNatureUuid(uuid: string): Observable<Nature> {
    return this.http.get<Nature>(`${this.URL_BACKEND}natures/${uuid}`);
  }

  creerNature(nature: Nature): void {
    // envoie de la requête
    this.http.post(`${this.URL_BACKEND}natures`,
      JSON.stringify(nature),
      this.httpOptions
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

  creerNatureLibelleExistant(nature: Nature): void {

    // envoie de la requête
    this.http.post(`${this.URL_BACKEND}natures/post`,
      JSON.stringify(nature),
      this.httpOptions
    ).subscribe((data: any) => {
      alert(`Une nouvelle nature ${nature.libelle} a bien été créé !`);
    }, (error: HttpErrorResponse) => {
      console.log('error', error);
      if (error.status == 400) {
        alert("Veuillez remplir tous les champs !");
      }

    });
  }

  updateDateFin(uuid: string): void {

    // envoie de la requête
    this.http.patch(`${this.URL_BACKEND}natures/updateDateFin/${uuid}`,
      JSON.stringify(uuid),
      this.httpOptions
    ).subscribe((data: any) => {
      alert(`La date de fin à été fixé à aujourd'hui !`);
    }, (error: HttpErrorResponse) => {
      console.log('error', error);
      if (error.status == 400) {
        alert("Veuillez remplir tous les champs !");
      }

    });
  }

  updateNature(nature: Nature): void {

    // envoie de la requête
    this.http.patch(`${this.URL_BACKEND}natures/modifier/${nature.uuid}`,
      JSON.stringify(nature),
      this.httpOptions
    ).subscribe((data: any) => {
      alert(`La nature existante à été modifiée !`);
    }, (error: HttpErrorResponse) => {
      console.log('error', error);
      if (error.status == 400) {
        alert("Veuillez remplir tous les champs !");
      }

    });
  }

  selectionner(natureselect: Nature): void {
    this.subjectNatureSelectionne.next(natureselect);
  }

  sabonnerANatureSelect(): Observable<Nature> {
    return this.subjectNatureSelectionne.asObservable();
  }

}
