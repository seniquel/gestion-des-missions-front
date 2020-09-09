import { Component, OnInit } from '@angular/core';
import { Nature } from '../nature.domain';
import { NatureService } from 'src/app/services/nature.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-suppression',
  templateUrl: './modal-suppression.component.html',
  styleUrls: ['./modal-suppression.component.scss']
})
export class ModalSuppressionComponent implements OnInit {

  nature: Nature = new Nature();

  constructor(private service: NatureService, config: NgbModalConfig, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.service.sabonnerANatureSelect().subscribe(
      nat => this.nature = nat
    );
  }

  close(): void {
    this.modalService.dismissAll();
  }

  valider(): void {
  }

  open(content): void {
    this.modalService.open(content);
  }

}
