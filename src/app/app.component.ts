import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  homePage:any;
  constructor(private tokenStorageService: TokenStorageService, public _router: Router) { }
  ngOnInit(): void {
    // this.isLoggedIn = !!this.tokenStorageService.getToken();
    // if (this.isLoggedIn) {
    //   const user = this.tokenStorageService.getUser();
    //   this.roles = user.roles;
    //   this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    //   this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
    //   this.username = user.username;
    // }
//     this.router.events.subscribe((event:any) => {
//       if(event.url == "/home" || event.url == "/login" || event.url == "/signup"){
//       this.homePage = true;
//       }else if(event.url == "/dashboard" ){
//        this.homePage = false;
//       }
    
//  });
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
