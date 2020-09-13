import { LigneDeFraisDto } from './ligneDeFraisDto.domain';
import { LigneDeFrais } from './ligneFrais.domain';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LigneDeFraisService {

  constructor() { }

}
