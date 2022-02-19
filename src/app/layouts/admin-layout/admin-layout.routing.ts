import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';

import { CalculatorComponent } from '../../calculator/calculator.component';
import { MapsComponent } from '../../maps/maps.component';
import { HealthProfileComponent } from '../../health-profile/health-profile.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { LogComponent } from '../../log/log.component';
import { GoalsComponent } from '../../goals/goals.component';
import { SleepComponent } from '../../sleep/sleep.component';
import { StepsComponent } from '../../steps/steps.component';
import { WaterComponent } from '../../water/water.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'home',           component: HomeComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserProfileComponent },
    { path: 'health',         component: HealthProfileComponent },
    { path: 'calculator',     component: CalculatorComponent },
    { path: 'log',            component: LogComponent },
    { path: 'water',            component: WaterComponent },
    { path: 'steps',            component: StepsComponent },
    { path: 'sleep',            component: SleepComponent },
    { path: 'maps',           component: MapsComponent },
  
];
