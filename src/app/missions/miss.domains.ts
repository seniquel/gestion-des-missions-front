<<<<<<< HEAD
import { Nature } from './../nature-missions/nature.domain';
=======
>>>>>>> 30679736fc4423b05caa5bfbd59a17ddc889e9cc
import { NoteDeFrais } from './../note-de-frais/noteFrais.domain';
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
=======
  nature: string;
>>>>>>> 30679736fc4423b05caa5bfbd59a17ddc889e9cc
  transport: string;
  statut: string;
  collegue: Collegue;
  noteDeFrais: NoteDeFrais;
}
