import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../auth/identity.service';
import {Router} from '@angular/router'; 
import {FormGroup} from '@angular/forms';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user : any = {};
  loginForm: FormGroup;
  constructor(private router:Router, private IdentityService : IdentityService) { }
  ngOnInit(): void {
   
  }
  submit(loginForm: NgForm){
    // alert("called==")
    // this.router.navigate(['/', 'health']);
    alert(JSON.stringify(this.user));
    var loginPromise = this.IdentityService.getAccessToken(this.user.email, this.user.password);

    //var loginPromise = this.IdentityService.getAccessToken("guyritchie.cc@yopmail.com", "Healthify@123");

    var scope = this;
    loginPromise.then(function(data) {
          scope.router.navigate(['/', 'dashboard']);
     }, error => {
      console.log("login error");
    });
    
  }
  
}

