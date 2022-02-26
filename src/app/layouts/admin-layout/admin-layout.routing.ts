import { Routes } from '@angular/router';

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
import { FoodComponent } from '../../food/food.component';
import { WeightComponent } from '../../weight/weight.component';



export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',        component: DashboardComponent },
    { path: 'user',             component: UserProfileComponent },
    { path: 'health',           component: HealthProfileComponent },
    { path: 'calculator',       component: CalculatorComponent },
    { path: 'log',              component: LogComponent },
    { path: 'water',            component: WaterComponent },
    { path: 'steps',            component: StepsComponent },
    { path: 'sleep',            component: SleepComponent },
    { path: 'food',             component: FoodComponent },
    { path: 'weight',           component: WeightComponent },
];
