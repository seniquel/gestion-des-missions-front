import { LigneDeFrais } from './ligne-de-frais/ligneFrais.domain';
/*
* Note de frais d'une mission
*/
export class NoteDeFrais {
  uuid: string;
  dateDeSaisie: Date;
  fraisTotal: number;
  lignesDeFrais: LigneDeFrais[];
}
