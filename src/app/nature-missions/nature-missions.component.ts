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

  constructor(private service: NatureService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;

  }

  ngOnInit(): void {
    this.service.recupererNaturesValides().subscribe(
      value => {
        this.listeNatures = value;
      },
      err => console.log(err),
      () => { }
    );
  }
  close(): void {
    this.modalService.dismissAll();
  }

  select(nature: Nature): void {
    this.service.selectionner(nature);
  }

  delete(uuid: string): void {
    this.service.deleteNature(uuid).subscribe(() => { },
      err => console.log(err));
  }

  supprimer(nature): void {
    this.service.deleteNature(nature.uuid).subscribe(
      () => { },
      err => console.log(err)
    );
    console.log(this.listeNatures.indexOf(nature));
  }



}
