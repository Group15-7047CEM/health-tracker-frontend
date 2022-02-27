import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/home', title: 'Home',  icon: 'pe-7s-graph', class: '' },
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/health', title: 'Health check',  icon:'pe-7s-note2', class: '' },
    { path: '/calculator', title: 'Calculator',  icon:'fa fa-calculator', class: '' },
    { path: '/user', title: 'User Profile',  icon:'pe-7s-user', class: '' },
    { path: '/water', title: 'Water',  icon:'fa fa-tint', class: '' },
    { path: '/steps', title: 'Steps',  icon:'fa fa-futbol-o', class: '' },
    { path: '/sleep', title: 'Sleep',  icon:'fa fa-bed', class: '' },
    { path: '/food', title: 'Food',  icon:'fa fa-cutlery', class: '' },
    { path: '/weight', title: 'Weight',  icon:'fa fa-child', class: '' },
    
    
    // { path: '/signup', title: 'Signup',  icon:'pe-7s-bell', class: '' },
    // { path: '/login', title: 'Login',  icon:'pe-7s-rocket', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
