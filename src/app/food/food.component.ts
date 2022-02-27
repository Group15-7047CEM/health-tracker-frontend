import { Component, OnInit } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Properties } from '../properties';

import { FormBuilder, FormGroup, Validators , NgForm,ReactiveFormsModule} from '@angular/forms';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  foodForm : any = {};
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;

  chartOption: EChartsOption = {};
  readings: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private properties : Properties,
  ) { }
  
  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        firstname: ['', [Validators.required, Validators.minLength(6)]],
        mobile: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]]
    });

    // call water api
    this.getFoodReadings();

}

  async getFoodReadings () {
    this.http.get(this.properties.API_ENDPOINT + '/health-tracking/food?startDate=2022-01-01&endDate=2022-03-30')
      .subscribe((foodReadings: any) => {
        this.readings = foodReadings.data.foodReadings;
        const readings = [...this.readings].reverse();
        let chartOption = {};
        chartOption['xAxis'] = { type: 'category', data: readings.map(w => w.trackedDate) }
        chartOption['yAxis'] = {type: 'value'};
        chartOption['series'] = [{ data: readings.map(w => w.totalCalories), type: 'line' }]
        this.chartOption = chartOption;
    }, error => {
      console.log("health profile error");
    });

  }
// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }
onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      this.showModal = false;
    }
   
}


updateFood(food:NgForm){
  this.http.post(this.properties.API_ENDPOINT + '/health-tracking/food/', this.foodForm)
    .subscribe(data => {
        this.getFoodReadings();
    }, error => {
      console.log("health profile error");
    });
    this.foodForm = {};
    this.hide();
}

onSelect(data): void {
  console.log('Item clicked', JSON.parse(JSON.stringify(data)));
}

onActivate(data): void {
  console.log('Activate', JSON.parse(JSON.stringify(data)));
}

onDeactivate(data): void {
  console.log('Deactivate', JSON.parse(JSON.stringify(data)));
}

}