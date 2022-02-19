import { Component, OnInit } from '@angular/core';

import { PatientService } from '../../patient.service';
import { Patient } from '../../Model/patient';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  patients: Patient[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.patients = this.patientService.getPatients();
    this.patientService.patientChanged.subscribe(
      (newPatients: Patient[]) => (this.patients = newPatients)
    );
  }

  calculateBmi(weight: number, height: number) {
    return (weight / (height * height)).toFixed(2);
  }
}
