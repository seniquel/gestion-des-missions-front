import { Component, OnInit } from '@angular/core';
import { Nature } from '../nature.domain';
import { NatureService } from 'src/app/services/nature.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-modification',
  templateUrl: './modal-modification.component.html',
  styleUrls: ['./modal-modification.component.scss']
})
export class ModalModificationComponent implements OnInit {

  nature: Nature = new Nature();

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
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
