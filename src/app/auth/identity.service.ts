import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Properties } from '../properties';
import {Router} from '@angular/router';

@Injectable()
export class IdentityService {
  
  constructor(private http: HttpClient, private router:Router, private properties : Properties) { }

    // To get the accesstoken of the user
    getAccessToken(email , password){
        var scope = this;
        let promise = new Promise(function(resolve, reject) {
            var obj: any = {};
            obj.email = email;
            obj.password = password;
            let headers = new HttpHeaders({"Content-Type": "application/json"});
            scope.http.post(scope.properties.API_ENDPOINT + '/auth/login', obj, {headers})
            .subscribe((response : any) => {
                scope.setAuthTokens(response.data.token);
                resolve(response);
            }, error => {
                reject();
              });
        });
        return promise;
    }

    //Set authentication tokens
    setAuthTokens(authTokens){
        localStorage.setItem('token', authTokens);
    }

    // deletes authorization tokens
    deleteAuthTokens(){
        localStorage.removeItem('token');
    }





}
