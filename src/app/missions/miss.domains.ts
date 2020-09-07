import { Nature } from './../nature-missions/nature.domain';
import { NoteDeFrais } from './../note-de-frais/noteFrais.domain';
import { Collegue } from './../auth/auth.domains';

/**
 * Mission d'un utilisateur
 */
export class Mission {
  uuid: string;
  dateDebut: Date;
  dateFin: Date;
  villeDepart: string;
  villeArrivee: string;
  prime: number;
  nature: Nature;
  transport: string;
  statut: string;
  collegue: Collegue;
  noteDeFrais: NoteDeFrais;
  libelle: string;
}

export class MissionDto {
  dateDebut: Date;
  dateFin: Date;
  villeDepart: string;
  villeArrivee: string;
  prime: number;
  collegueId: string;
  natureId: string;
  transport: string;
  statut: string;
}
