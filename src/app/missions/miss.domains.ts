<<<<<<< HEAD
import { Nature } from './../nature-missions/nature.domain';
=======
import { NoteDeFrais } from './../note-de-frais/noteFrais.domain';
>>>>>>> début de la gestion des frais
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
<<<<<<< HEAD
  nature: Nature;
  transport: string;
  statut: string;
=======
  nature: string;
  transport: string;
  statut: string;
  collegue: Collegue;
  noteDeFrais: NoteDeFrais;
>>>>>>> début de la gestion des frais
}
