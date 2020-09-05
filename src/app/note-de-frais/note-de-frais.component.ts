import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Mission } from '../missions/miss.domains';
import { DataService } from '../services/data.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfMake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
import { LigneDeFrais } from './ligne-de-frais/ligneFrais.domain';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-note-de-frais',
  templateUrl: './note-de-frais.component.html',
  styleUrls: ['./note-de-frais.component.scss']
})
export class NoteDeFraisComponent implements OnInit {

  collegueConnecte: Observable<Collegue>;
  collegue: Collegue;
  listeMissions: Mission[] = [];
  dateAujourdHui = new Date();
  constructor(private authSrv: AuthService,
    private service: DataService,
    public datepipe: DatePipe) { }

  /**
   * A l'initialisation, le composant s'abonne au flux du collègue courant connecté.
   *
   * Celui lui permet de rester à jour en fonction des connexions et déconnexions.
   */
  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.service.recupererMissions().subscribe(
      value => {
        value.forEach((v) => {
          // forEach pour avoir les bons types pour les dates
          this.listeMissions.push(Object.assign(v, Mission, {
            dateDebut: new Date(v.dateDebut),
            dateFin: new Date(v.dateFin)
          }));
        });
      },
      err => console.log(err),
      () => { }
    );
  }

  genererPdf(mission: Mission) {
    const DocumentDefinition = {
      content: [
        {
          text: 'Mission',
          bold: true,
          fontSize: 30,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            this.recupererInfosCollegue()
          ]
        },
        {
          text: 'Résumé de la mission',
          style: 'header'
        },
        {
          columns: [
            {
              ul: [
                `Date de début : ${this.datepipe.transform(mission.dateDebut, 'dd-MM-yyyy')}`,
                `Date de fin : ${this.datepipe.transform(mission.dateFin, 'dd-MM-yyyy')}`,
                `Nature : ${mission.nature.libelle}`
              ]
            },
            {
              ul: this.genererPrimeEtDepassement(mission)
            },
            {
              ul: [
                `Ville de départ : ${mission.villeDepart}`,
                `Ville de départ : ${mission.villeArrivee}`,
                `Transport : ${mission.transport}`,
              ]
            }
          ]
        },
        {
          text: 'Lignes de frais',
          style: 'header'
        },
        this.recupererLignesDeFrais(mission.noteDeFrais.lignesDeFrais),
      ],
      info: {
        title: `Mission_${mission.uuid}`,
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 16,
          bold: true
        },
        tableHeader: {
          bold: true,
        }
      }
    };
    pdfMake.createPdf(DocumentDefinition).download(`mission_${mission.uuid}`);
  }


  genererPrimeEtDepassement(mission: Mission) {
    if (mission.nature.payee) {
      // TODO : ajout TJM
      return [`La mission est payée.`,
        `Si le montant de la prime est plus faible que prévu, c'est que vous avez dépassé le plafond des frais`,
        `Prime : ${mission.prime} €`,
        `Plafon de frais : ${mission.nature.plafondFrais} €`,
        `Frais totaux: ${mission.noteDeFrais.fraisTotal} €`];
    } else {
      return [`Mission non payée`];
    }
  }

  recupererInfosCollegue() {
    let col: Collegue;
    this.collegueConnecte.subscribe(
      value => {
        col = new Collegue(value);
      },
      err => console.log(err),
      () => { }
    );
    return [{
      text: `${col.nom} ${col.prenom}`,
      style: 'name'
    },
    {
      text: col.email
    }
    ];
  }

  recupererLignesDeFrais(lignes: LigneDeFrais[]) {
    return {
      table: {
        widths: ['*', '*', '*'],
        body: [
          [{
            text: 'Date',
            style: 'tableHeader'
          },
          {
            text: 'Nature',
            style: 'tableHeader'
          },
          {
            text: 'Montant (€)',
            style: 'tableHeader'
          }
          ],
          ...lignes.map(l => {
            return [this.datepipe.transform(l.date, 'dd-MM-yyyy'), l.nature, l.montant];
          })
        ]
      }
    };
  }
}
