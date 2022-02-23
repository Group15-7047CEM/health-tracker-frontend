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

  updateUserProfile(user:NgForm, event){
    //alert(JSON.stringify(this.user));
    
     this.http.post(this.properties.API_ENDPOINT + '/users/'+this.user['id'], this.user).subscribe(data => {
       alert(JSON.stringify(data));
   }, error => {
     console.log("health profile error");
   });
  
  
  }
}
