import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Properties } from '../properties';

import { FormBuilder, FormGroup, Validators, NgForm, ReactiveFormsModule } from '@angular/forms';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {


  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  user : any = {};
  chartOption: EChartsOption = {};
  readings: any[] = [];
  stepsToday: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private properties: Properties,
  ) { }
  show() {
    this.showModal = true; // Show-Hide Modal Check

  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstname: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]]
    });
    this.getStepReadings();
  }

  async getStepReadings() {
    this.http.get(this.properties.API_ENDPOINT + '/health-tracking/steps?startDate=2022-01-01&endDate=2022-03-30')
      .subscribe((stepReadings: any) => {
        // alert(JSON.stringify(stepReadings));
        this.readings = stepReadings.data.stepReadings;
        this.stepsToday = this.getStepsFromMl(this.readings);
        const readings = [...this.readings].reverse();
        let chartOption = {};
        chartOption['xAxis'] = { type: 'category', data: readings.map(w => w.trackedDate) }
        chartOption['yAxis'] = { type: 'value' };
        chartOption['series'] = [{ data: readings.map(w => w.steps), type: 'line' }]
        this.chartOption = chartOption;
      }, error => {
        console.log("health profile error");
      });

  }

  getStepsFromMl(readings) {
    return readings.length ? Math.ceil(readings[0].steps) || 0 : 0;
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.showModal = false;
    }

  }


  updateSteps(user:NgForm){
    this.http.post(this.properties.API_ENDPOINT + '/health-tracking/steps/', this.user)
      .subscribe(data => {
        this.getStepReadings();
      }, error => {
        console.log("health profile error");
      });
      this.user = {};
      this.hide();
  }

}
