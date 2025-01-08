import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, } from './app.component';
import { AdminModule } from './admin/admin/admin.module';

import { LoanofficerModule } from './loanofficer/loanofficer.module';
import { LoginModule } from './login/login/login.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { ServicesModule } from './services/services.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageModule } from './landing-page/landing-page/landing-page.module';
import { RegisterModule } from './register/register/register.module';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { UserModule } from './user/user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './pipes/pipes/filter.pipe';
import { CalculatorComponent } from './admin/calculator/calculator.component';
import { SlideComponent } from './landing-page/slide/slide.component';

 


@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    CalculatorComponent,
    SlideComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,AdminModule,LoginModule,ServicesModule,ReactiveFormsModule,FormsModule,
    HttpClientModule,LandingPageModule,RegisterModule,RouterModule, NgbModule,LoanofficerModule,UserModule
    
  ],
  providers: [{ 
    provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor, 
    multi: true, 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
