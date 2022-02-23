import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Properties } from '../properties';

@Component({
  selector: 'app-health-profile',
  templateUrl: './health-profile.component.html',
  styleUrls: ['./health-profile.component.css']
})
export class HealthProfileComponent implements OnInit {
  selectedDate : any;

  ngOnInit(): void {
    // this.submitHealthDetails(); // todo: change logic
  }

  submitHealthDetails(){

    let obj : any = {
      "weight": 66,
      "trackedDate": "2022-02-17"
    }

    // this.http.post(this.properties.API_ENDPOINT + '/health-tracking/weight', obj).subscribe(data => {
    //     alert(JSON.stringify(data));
    // }, error => {
    //   console.log("health profile error");
    // });
    
  }







}
