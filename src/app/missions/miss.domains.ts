import { Nature } from './../nature-missions/nature.domain';
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
  nature: Nature;
  transport: string;
  statut: string;
}
