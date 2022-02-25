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


  constructor(private http: HttpClient,
              private properties : Properties,) { }

  user : any = {};
  healthForm: FormGroup;
  industries = [{id:"Male"},{id:"Female"},{id:"Others"}];          
  ngOnInit(): void {
    this.myDateValue = new Date();
    this.healthDetails();
  }

  
  onDateChange(newDate: Date) {
    console.log("new Date=============" + newDate);
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
    
  submitHealthDetails(healthForm:NgForm){
    const changedValues = this.getDirtyValues(healthForm);
    console.log({changedValues});
    // this.http.post(this.properties.API_ENDPOINT + '/users/'+this.user['id'], changedValues)
    //   .subscribe(data => {
    //       // alert(JSON.stringify(data));
    //       this.healthDetails();
    //   }, error => {
    //     console.log("health profile error");
    //   });

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
