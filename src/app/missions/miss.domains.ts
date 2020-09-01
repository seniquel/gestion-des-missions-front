import { Collegue } from './../auth/auth.domains';
/**
 * Mission d'un utilisateur
 */
export class Mission {
  dateDebut: Date;
  dateFin: Date;
  villeDepart: string;
  villeArrivee: string;
  prime: number;
  nature: string;
  trasport: string;
  statut: string;
  collegue: Collegue;
}
