import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Patient } from '../../Model/patient';
import { PatientService } from '../../patient.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @ViewChild('name', { static: true }) nameRef: ElementRef;
  @ViewChild('weight', { static: true }) weightRef: ElementRef;
  @ViewChild('height', { static: true }) heightRef: ElementRef;

  validationResult: { error: boolean; message: string } = { error: false, message: '' };

  constructor(private patientService: PatientService) {}

  ngOnInit() {}

  addPatient() {
    const name = this.nameRef.nativeElement.value;
    const weight = this.weightRef.nativeElement.value;
    const height = this.heightRef.nativeElement.value;
    const newPatient = new Patient(0, name, weight, height);

    this.validationResult = this.validatePatient(newPatient);

    if (this.validationResult.error) {
      return;
    }
    this.patientService.addPatient(newPatient);
    this.cleanForm();
  }

  validatePatient(patient: Patient) {
    const validationResult = {
      error: false,
      message: ''
    };

    if (patient.weight <= 0 || patient.weight >= 300) {
      validationResult.error = true;
      validationResult.message = 'Invalid weight';
    } else if (patient.height <= 0 || patient.height >= 3) {
      validationResult.error = true;
      validationResult.message = 'Invalid height';
    }
    return validationResult;
  }

  cleanForm() {
    this.nameRef.nativeElement.value = '';
    this.weightRef.nativeElement.value = '';
    this.heightRef.nativeElement.value = '';
    this.nameRef.nativeElement.focus();
  }
}
