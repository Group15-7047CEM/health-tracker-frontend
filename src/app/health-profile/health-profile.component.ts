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

  constructor(private http: HttpClient,
              private properties : Properties,) { }

  user : any = {};
  healthForm: FormGroup;
  industries = [{id:"Male"},{id:"Female"},{id:"Others"}];          
  ngOnInit(): void {
    this.healthDetails();
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
    this.http.post(this.properties.API_ENDPOINT + '/users/'+this.user['id'], this.user).subscribe(data => {
      alert(JSON.stringify(data));
  }, error => {
    console.log("health profile error");
  });

  }

  





}
