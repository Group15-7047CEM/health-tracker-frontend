import { Component } from '@angular/core';

@Component({
  selector: 'app-patients',
  template: `
    <div class="container">
      <app-form></app-form>
    </div>
    <div class="container">
      <app-table></app-table>
    </div>
  `,
  styles: ['.container { margin-top: 40px; width: 60%; }']
})
export class PatientsComponent {}
