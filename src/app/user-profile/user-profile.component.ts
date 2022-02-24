import { Component, OnInit } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Properties } from '../properties';
import {FormGroup} from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent  implements OnInit {

  constructor(private http: HttpClient,
    private properties : Properties,) { }
    userDeatils;
    user : any = {};
    userValue: any = {};
    userForm: FormGroup;
    ngOnInit(): void {
      this.UserDetails();
    }
  
  


   UserDetails () {
    this.http.get(this.properties.API_ENDPOINT + '/users/profile')
      .subscribe((userProfile: any) => {
        // alert(JSON.stringify(waterReadings));
        this.user  = userProfile.data;      
        console.log("value===="+ this.user['id']);
    }, error => {
      console.log("health profile error");
    });

  }

  updateUserProfile(user:NgForm){
    const changedValues = this.getDirtyValues(user);
    this.http.put(this.properties.API_ENDPOINT + '/users/'+this.user['id'], changedValues)
      .subscribe(data => {
        this.UserDetails();
      }, error => {
        console.log("health profile error");
      });
  }

  change(value){
    
    let keyName = value.name;
    let valueObj = value.value;
   
   // userValue.
  //  Object.assign(this.userValue, {value.name : valueObj});
    this.userValue=  Object.assign(this.userValue, {keyName: valueObj});
   console.log(JSON.stringify(this.userValue))
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
