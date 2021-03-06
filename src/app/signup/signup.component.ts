import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormGroup} from '@angular/forms';
import { Properties } from '../properties';
import { HttpClient} from "@angular/common/http";
import { IdentityService } from '../auth/identity.service';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user : any = {};
  signupForm: FormGroup;

  constructor(private http: HttpClient,
              private properties : Properties,
              private IdentityService : IdentityService,private router:Router) { }

  ngOnInit(): void {
  }


  create(signupForm: NgForm){

    alert(JSON.stringify(this.user));
    this.user.role = "participant";

    this.http.post(this.properties.API_ENDPOINT + '/auth/signup', this.user).subscribe(data => {
     // var loginPromise = this.IdentityService.getAccessToken("guyritchie.cc@yopmail.com", "Healthify@123");

     var loginPromise = this.IdentityService.getAccessToken(this.user.email, this.user.password);
      var scope = this;
      loginPromise.then(function(data) {
        scope.router.navigate(['/', 'dashboard']);
      });
    }, error => {
      console.log("signup error");
    });



  }

}
