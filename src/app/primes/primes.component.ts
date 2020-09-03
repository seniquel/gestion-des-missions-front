
import { Mission } from './../missions/miss.domains';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-primes',
  templateUrl: './primes.component.html',
  styleUrls: ['./primes.component.scss']
})
export class PrimesComponent implements OnInit {

  constructor(private authSrv: AuthService) {

  }

  listeMissions: Mission[];
  listeAnnee: number[];
  anneeSelect: number;
  missionsSelect: Mission[];
  collegueConnecte: Observable<Collegue>;

  // diagramme
  barChartOptions: ChartOptions;
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];
  barChartData: ChartDataSets[];
  barColors: Color[] = [
    { // dark grey
      backgroundColor: ['rgba(77,83,96,0.2)'],
    },
  ];

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    this.listeAnnee = this.recupererAnnee();
  }

  recupererAnnee(): number[] {
    const annees: number[] = [];
    for (let i = 0; i < this.listeMissions.length; i++) {
      if (!annees.includes(this.listeMissions[i].dateFin.getFullYear(), 0)) {
        annees.push(this.listeMissions[i].dateFin.getFullYear());
      }
    }
    return annees;
  }

  onChange(): void {
    this.selectionMissionParAnnee();
    this.changeTitre();
    this.changeData();
    this.changeLabel();
  }

  selectionMissionParAnnee(): void {
    this.missionsSelect = []
    const currentTime: Date = new Date();
    for (let i = 0; i < this.listeMissions.length; i++) {
      if (this.listeMissions[i].dateFin.getFullYear() == this.anneeSelect && this.anneeSelect == currentTime.getFullYear()) {
        if (this.listeMissions[i].dateFin.getMonth() < currentTime.getMonth()) {
          this.missionsSelect.push(this.listeMissions[i]);
        }
        else if (this.listeMissions[i].dateFin.getMonth() == currentTime.getMonth() && this.listeMissions[i].dateFin.getDate() < currentTime.getDate()) {
          this.missionsSelect.push(this.listeMissions[i]);
        }
      }
      else if (this.listeMissions[i].dateFin.getFullYear() == this.anneeSelect && this.anneeSelect < currentTime.getFullYear()) {
        this.missionsSelect.push(this.listeMissions[i]);
      }
    }
  }

  changeTitre(): void {
    this.barChartOptions = {
      title: {
        display: true,
        text: `Primes année ${this.anneeSelect}`,
      },
      responsive: true,
      scales: { xAxes: [{}], yAxes: [{}] },
    };
  }

  changeData(): void {
    const sommeList: number[] = [];
    for (let i = 0; i < 12; i++) {
      let somme = 0;
      for (let j = 0; j < this.missionsSelect.length; j++) {
        if (this.missionsSelect[j].dateFin.getMonth() == i) {
          somme += this.missionsSelect[j].prime;
        }
      }
      sommeList.push(somme);
    }
    this.barChartData = [
      { data: sommeList },
    ];
  }

  changeLabel() {
    this.barChartLabels = [];
    const mois: string[] = ['janv', 'fév', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'];
    for (let i = 0; i < 12; i++) {
      const ajout: number = this.anneeSelect - 2000;
      this.barChartLabels.push(mois[i].concat('-').concat(ajout.toString()));
    }
  }

}
