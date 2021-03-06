import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {Routes, RouterModule } from '@angular/router';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http'; 
import { IdentityService } from './auth/identity.service';
import { Properties } from './properties';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {RequestInterceptor} from './auth/requestInteceptor';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { WaterComponent } from './water/water.component';
import { SleepComponent } from './sleep/sleep.component';
import { StepsComponent } from './steps/steps.component';
import { FoodComponent } from './food/food.component';
import { HomeComponent } from './home/home.component';
import { HealthProfileComponent } from './health-profile/health-profile.component';
import { DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeightComponent } from './weight/weight.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(), 
    PopoverModule.forRoot(),
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,    
    NgxEchartsModule.forRoot({echarts: () => import('echarts'), 
    }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SignupComponent,
    LoginComponent,
    WaterComponent,
    SleepComponent,
    StepsComponent,
    FoodComponent,
    HomeComponent,
    HealthProfileComponent,
    DashboardComponent,
    WeightComponent
  ],
  exports: [
    BsDatepickerModule,
   ],
  providers: [
    Properties,
    IdentityService,DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
