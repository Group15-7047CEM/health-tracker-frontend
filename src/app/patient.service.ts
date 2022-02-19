import { dataPatient } from './dataPatient';
import { Patient } from './Model/patient';
import { EventEmitter } from '@angular/core';

export class PatientService {
  private patients: Patient[] = dataPatient;
  patientChanged = new EventEmitter<Patient[]>();

  getPatients() {
    return this.patients.slice();
  }

  addPatient(patient: Patient) {
    this.patients.push(patient);
    this.patientChanged.emit(this.getPatients());
  }
}
