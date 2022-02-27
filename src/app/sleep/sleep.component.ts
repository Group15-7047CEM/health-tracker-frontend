import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators, NgForm,ReactiveFormsModule} from '@angular/forms';
import { Properties } from '../properties';
import { DatePipe } from '@angular/common';
import { EChartsOption } from 'echarts';
@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.component.html',
  styleUrls: ['./sleep.component.css']
})
export class SleepComponent implements OnInit {

  endDateValue: Date;
  startDateValue: Date;
  trackedDate: Date;
  minDate;
  maxDate;
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  chartOption: EChartsOption = {};
  readings: any[] = [];
  user: any ={};
  sleepToday:any;
  updatedStartDate;
  updatedEndDate;
  updatedToday;
  startTime: Date = new Date();
  endTime: Date = new Date();

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private properties: Properties,public datepipe: DatePipe) { }
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
    this.startDateValue = new Date();
    this.endDateValue = new Date();
    this.trackedDate = new Date();
    this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        firstname: ['', [Validators.required, Validators.minLength(6)]],
        mobile: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]]
    });
    this.getSleepReadings();
}


async getSleepReadings() {
   
  this.http.get(this.properties.API_ENDPOINT + '/health-tracking/sleep?startDate=2022-01-01&endDate=2022-03-30')
    .subscribe((sleepReadings: any) => {
      this.readings = sleepReadings.data.sleepReadings;
      this.sleepToday = this.getSleepFromMl(this.readings);
      const readings = [...this.readings].reverse();
      let chartOption = {};
      chartOption['xAxis'] = { type: 'category', data: readings.map(w => w.trackedDate) }
      chartOption['yAxis'] = { type: 'value' };
      chartOption['series'] = [{ data: readings.map(w => w.sleepMins), type: 'line' }]
      this.chartOption = chartOption;
    }, error => {
      console.log("health profile error");
    });

}

getSleepFromMl(readings) {
  return readings.length ? Math.ceil(readings[0].sleepMins) || 0 : 0;
}

onStartDateChange(newDate: Date) {
  // this.date=new Date();
   this.updatedStartDate =this.datepipe.transform(newDate, 'yyyy-MM-dd');
   console.log("called====="+ this.updatedStartDate);
 }

 onEndDateChanges(newDate: Date) {
  // this.date=new Date();
   this.updatedEndDate =this.datepipe.transform(newDate, 'yyyy-MM-dd'); 
   console.log("called====="+ this.updatedEndDate);
 }


 trackedChange(newDate: Date) {
  // this.date=new Date();
   this.updatedToday =this.datepipe.transform(newDate, 'yyyy-MM-dd');  
   console.log("called====="+ this.updatedToday);
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


updateSleep(sleepData:NgForm){
  let {sleepStartTime, sleepEndTime, trackedDate} = sleepData.value;
  if (trackedDate) {
    trackedDate = this.changeDateFormat(trackedDate);
  }
  const updatedStart = this.combineDateWithTime(sleepStartTime, this.startTime);
  const updatedEnd = this.combineDateWithTime(sleepEndTime, this.endTime);

  const trackedSleepData = {
    sleepStartTime: updatedStart,
    sleepEndTime: updatedEnd,
    trackedDate
  }
  this.http.post(this.properties.API_ENDPOINT + '/health-tracking/sleep/', trackedSleepData)
    .subscribe(data => {
      this.getSleepReadings();
    }, error => {
      console.log("health profile error");
    });
    
    this.hide();
}

  changeDateFormat(newDate: Date) {
    return this.datepipe.transform(newDate, 'yyyy-MM-dd');
  }


  combineDateWithTime(date, time){
    date.setHours(time.getHours(), time.getMinutes(), time.getSeconds());
    return date;
  }
}
