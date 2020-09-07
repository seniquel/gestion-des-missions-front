import { NatureService } from './../services/nature.service';
import { Component, OnInit } from '@angular/core';
import { Nature } from './nature.domain';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nature-missions',
  templateUrl: './nature-missions.component.html',
  styleUrls: ['./nature-missions.component.scss']
})
export class NatureMissionsComponent implements OnInit {

  listeNatures: Nature[];
  nouvelNature: Nature = new Nature();

  constructor(private service: NatureService, config: NgbModalConfig, private modalService: NgbModal) {
    this.nouvelNature.tjm = 0;
    this.nouvelNature.pourcentagePrime = 0;
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.service.recupererNatures().subscribe(
      value => {
        this.listeNatures = value;
      },
      err => console.log(err),
      () => { }
    );
  }

  // modal
  open(content): void {
    this.modalService.open(content);
  }

  close(): void {
    this.modalService.dismissAll();
    this.nouvelNature = new Nature();
    this.nouvelNature.tjm = 0;
    this.nouvelNature.pourcentagePrime = 0;
  }

  valider(): void {
    if (!this.nouvelNature.payee) {
      this.nouvelNature.payee = false;
    }
    if (!this.nouvelNature.versementPrime) {
      this.nouvelNature.versementPrime = false;
    }
    setTimeout(() => {
      this.service.creerNature(this.nouvelNature);
    }, 1000);
  }

}
