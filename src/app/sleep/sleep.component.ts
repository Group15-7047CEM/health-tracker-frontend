import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators, NgForm,ReactiveFormsModule} from '@angular/forms';
import { Properties } from '../properties';
import { DatePipe } from '@angular/common'
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
  user: any ={};
  updatedStartDate;
  updatedEndDate;
  updatedToday;
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


updateSleep(user:NgForm){
  this.http.post(this.properties.API_ENDPOINT + '/health-tracking/sleep/', this.user)
    .subscribe(data => {
    }, error => {
      console.log("health profile error");
    });
    this.user = {};
    this.hide();
}

}
