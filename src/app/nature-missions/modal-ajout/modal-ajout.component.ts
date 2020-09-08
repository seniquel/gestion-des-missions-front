import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Nature } from '../nature.domain';
import { NatureService } from 'src/app/services/nature.service';

@Component({
  selector: 'app-modal-ajout',
  templateUrl: './modal-ajout.component.html',
  styleUrls: ['./modal-ajout.component.scss']
})
export class ModalAjoutComponent implements OnInit {

  nouvelNature: Nature = new Nature();

  constructor(private service: NatureService, config: NgbModalConfig, private modalService: NgbModal) {
    this.nouvelNature.tjm = 0;
    this.nouvelNature.pourcentagePrime = 0;
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
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
    window.location.reload();
  }

  valider(): void {
    if (!this.nouvelNature.payee) {
      this.nouvelNature.payee = false;
      this.nouvelNature.tjm = 0;
    }
    if (!this.nouvelNature.versementPrime) {
      this.nouvelNature.versementPrime = false;
      this.nouvelNature.pourcentagePrime = 0;
    }
    setTimeout(() => {
      this.service.creerNature(this.nouvelNature);
      window.location.reload();
    }, 1000);
  }


}
