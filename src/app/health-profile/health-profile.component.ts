import { Component, OnInit } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Properties } from '../properties';
import {FormGroup} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-health-profile',
  templateUrl: './health-profile.component.html',
  styleUrls: ['./health-profile.component.css']
})
export class HealthProfileComponent implements OnInit {

  minDate;
  maxDate;
  num1;
  num2;
  height;
  weight;
  BMI;
  date;
  changedValues;
  bsDateDOB;
  constructor(private http: HttpClient,
              private properties : Properties,public datepipe: DatePipe) { }

  user : any = {};
  healthForm: FormGroup;
  updatedDate;
 
  industries = [{id:"Male"},{id:"Female"},{id:"Others"}];          
  ngOnInit(): void {
    this.healthDetails();
   
  }

  
  changeDateFormat(newDate: Date) {
    return this.datepipe.transform(newDate, 'yyyy-MM-dd');
  }


  healthDetails () {
    this.http.get(this.properties.API_ENDPOINT + '/users/profile')
      .subscribe((healthProfile: any) => {
        // alert(JSON.stringify(waterReadings));
        this.user  = healthProfile.data;      
        this.bsDateDOB = healthProfile.data.dob;
        this.sum();
        console.log("value===="+ this.user['id']);
    }, error => {
      console.log("health profile error");
    });

  }
    
  submitHealthDetails(healthForm:NgForm){
    const changedValues = this.getDirtyValues(healthForm);
    if (this.user.dob !== this.bsDateDOB) {
      changedValues['dob'] = this.changeDateFormat(this.bsDateDOB);
    }
    if (Object.keys(changedValues).length) {
      this.http.post(this.properties.API_ENDPOINT + '/users/'+this.user['id'], changedValues)
        .subscribe(data => {
          
            this.healthDetails();
        }, error => {
          console.log("health profile error");
        });
    }

  }
  
  sum() { 
  
    this.num1 = this.user.height;
    this.num2 = this.user.currentWeight;
         
          var  a= parseInt(this.num1,0);
          var b= parseInt(this.num2,0);
           var sum = (a/(b*b))*10000;
         // document.getElementById('result').value  = sum ;
          this.BMI= sum;
        
          //parseFloat(<HTMLInputElement>document.getElementById('result')).value = sum;
             
}
  

  updateUserProfile(user:NgForm){
    const changedValues = this.getDirtyValues(user);
    if (this.user.dob !== this.bsDateDOB) {
      changedValues['dob'] = this.changeDateFormat(this.bsDateDOB);
    }
    if (Object.keys(changedValues).length) {
      this.http.put(this.properties.API_ENDPOINT + '/users/'+this.user['id'], changedValues)
        .subscribe(data => {
          this.healthDetails();
        }, error => {
          console.log("health profile error");
        });
    }
  }

  getDirtyValues(form: any) {
    let dirtyValues = {};
    Object.keys(form.controls)
        .forEach(key => {
            let currentControl = form.controls[key];
            if (currentControl.dirty) {
                if (currentControl.controls)
                    dirtyValues[key] = this.getDirtyValues(currentControl);
                else
                    dirtyValues[key] = currentControl.value;
            }
        });
    return dirtyValues;
  }



}
