import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HttpClient} from "@angular/common/http";
import { Properties } from '../properties';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private http: HttpClient,
    private properties : Properties,) { }

    user : any = {};
    healthForm: FormGroup;
    ngOnInit(): void {
      this.submitHealthDetails();
    }
  
    submitHealthDetails(){
  
      // let obj : any = {
      //   "weight": 66,
      //   "trackedDate": "2022-02-17"
      // }
  
      // this.http.post(this.properties.API_ENDPOINT + '/health-tracking/weight', obj).subscribe(data => {
      //     alert(JSON.stringify(data));
      // }, error => {
      //   console.log("health profile error");
      // });
  
      this.http.get(this.properties.API_ENDPOINT + '/users/profile', {}).subscribe(data => {
        alert(JSON.stringify(data));
    }, error => {
      console.log("health profile error");
    });
  }
}
