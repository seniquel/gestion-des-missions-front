import { Mission } from './../missions/miss.domains';
/**
 * Collègue utilisateur de l'application.
 */
export class Collegue {
  uuid: string;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  missions: Mission[];
  role: string;

  constructor(params: any) {
    Object.assign(this, params);
  }

  estAnonyme(): boolean {
    return this.email === undefined;
  }

}
