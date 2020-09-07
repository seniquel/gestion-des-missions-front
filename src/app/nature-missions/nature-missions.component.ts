import { NatureService } from './../services/nature.service';
import { Component, OnInit } from '@angular/core';
import { Nature } from './nature.domain';

@Component({
  selector: 'app-nature-missions',
  templateUrl: './nature-missions.component.html',
  styleUrls: ['./nature-missions.component.scss']
})
export class NatureMissionsComponent implements OnInit {

  listeNatures: Nature[];

  constructor(private service: NatureService) { }

  ngOnInit(): void {
    this.service.recupererNatures().subscribe(
      value => {
        this.listeNatures = value;
      },
      err => console.log(err),
      () => { }
    );
  }

}
