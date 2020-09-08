import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Nature } from '../nature.domain';
import { NatureService } from 'src/app/services/nature.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mission } from 'src/app/missions/miss.domains';

@Component({
  selector: 'app-modal-modification',
  templateUrl: './modal-modification.component.html',
  styleUrls: ['./modal-modification.component.scss']
})
export class ModalModificationComponent implements OnInit {

  nature: Nature = new Nature();
  listeMissions: Mission[];
  listeNatures: Nature[];

  constructor(private service: NatureService, config: NgbModalConfig, private modalService: NgbModal, private dataService: DataService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.service.sabonnerANatureSelect().subscribe(
      nat => this.nature = nat
    );
    this.service.recupererNatures().subscribe(
      liste => this.listeNatures = liste
    );

    this.dataService.listerMissions().subscribe(
      liste => this.listeMissions = liste
    );
  }

  close(): void {
    this.modalService.dismissAll();
  }

  valider(): void {

    let utilise: Boolean = false;
    for (let i = 0; i < this.listeMissions.length; i++) {
      if (this.listeMissions[i].nature.libelle.includes(this.nature.libelle)) {
        utilise == true;
      }
    }

    if (utilise == true) {
      this.service.updateDateFin(this.nature.uuid);
      this.service.creerNatureLibelleExistant(this.nature);
    }
    else {
      this.service.updateNature(this.nature);
    }
  }

  open(content): void {
    this.modalService.open(content);
  }

}
