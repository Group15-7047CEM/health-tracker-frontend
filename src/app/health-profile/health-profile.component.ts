import { Component, OnInit } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Properties } from '../properties';
import {FormGroup} from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-health-profile',
  templateUrl: './health-profile.component.html',
  styleUrls: ['./health-profile.component.css']
})
export class HealthProfileComponent implements OnInit {

  myDateValue: Date;
  minDate;
  maxDate;
  num1;
  num2;
  height;
  weight;
  BMI;
  constructor(private http: HttpClient,
              private properties : Properties) { }

  user : any = {};
  healthForm: FormGroup;
  updatedDate;
  date;
  industries = [{id:"Male"},{id:"Female"},{id:"Others"}];          
  ngOnInit(): void {
    this.myDateValue = new Date();
    this.healthDetails();
  }

  
  onDateChange(newDate: Date) {
   // this.updatedDate = newDate.value;
   
    //let latest_date =this.datepipe.transform(newDate, 'yyyy-MM-dd');
    console.log("new Date=============" + this.myDateValue);
  }


  healthDetails () {
    this.http.get(this.properties.API_ENDPOINT + '/users/profile')
      .subscribe((healthProfile: any) => {
        // alert(JSON.stringify(waterReadings));
        this.user  = healthProfile.data;      
        console.log("value===="+ this.user['id']);
    }, error => {
      console.log("health profile error");
    });

  }
    
  // submitHealthDetails(healthForm:NgForm){
  //   console.log(JSON.stringify(this.user));
  //   this.http.post(this.properties.API_ENDPOINT + '/users/'+this.user['id'], this.user).subscribe(data => {
  //     alert(JSON.stringify(data));
  // }, error => {
  //   console.log("health profile error");
  // });

  // }
  sum() {    
    this.num1 = this.user.height;
    this.num2 = this.user.currentWeight;
    if (this.num1.value !== '')
    {
        if (this.num2.value !== '') {
          var  a= parseInt(this.num1.value,0);
          var b= parseInt(this.num2.value,0);
           var sum = (a/(b*b))*10000;
         // document.getElementById('result').value  = sum ;
          this.BMI= sum;
          //parseFloat(<HTMLInputElement>document.getElementById('result')).value = sum;
        } 
      }
}
  

  updateUserProfile(user:NgForm){
    user["dob"] = this.myDateValue;
    const changedValues = this.getDirtyValues(user);
    console.log("cahngedvalues============="+ JSON.stringify(changedValues));

    this.http.put(this.properties.API_ENDPOINT + '/users/'+this.user['id'], changedValues)
      .subscribe(data => {
        this.healthDetails();
      }, error => {
        console.log("health profile error");
      });
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
