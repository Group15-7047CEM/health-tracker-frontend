import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
// import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
// import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CalculatorComponent } from '../../calculator/calculator.component';
import { HealthProfileComponent } from '../../health-profile/health-profile.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { LogComponent } from '../../log/log.component';
import { GoalsComponent } from '../../goals/goals.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    LbdModule,  
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  declarations: [
    UserComponent,
    TablesComponent,
    CalculatorComponent,
    IconsComponent,
    MapsComponent,
    DashboardComponent,
    UpgradeComponent,
    HealthProfileComponent,
    UserProfileComponent,
    GoalsComponent,
    LogComponent
  ]
})

export class AdminLayoutModule {}
