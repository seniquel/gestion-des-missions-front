import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Service de gestion des missions
 */
@Injectable({
  providedIn: 'root'
})
export class MissService {

  constructor(private http: HttpClient) {
  }
}
