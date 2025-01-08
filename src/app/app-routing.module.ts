import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login/login.component';
import { LandingViewComponent } from './landing-page/landing-page/landing-view/landing-view.component';
import { RegistrationComponent } from './register/register/registration/registration.component';
import { UserdashboardComponent } from './user/userdashboard/userdashboard.component';
import { LoanschemesComponent } from './user/loanschemes/loanschemes.component';
import { PaymentComponent } from './user/payment/payment.component';
import { QueriesComponent } from './user/queries/queries.component';
import { ApplyloanComponent } from './user/applyloan/applyloan.component';
import { AllappliedloanComponent } from './user/allappliedloan/allappliedloan.component';
import { UpdateprofileComponent } from './user/updateprofile/updateprofile.component';
import { ViewemiComponent } from './user/viewemi/viewemi.component';
import { LoanofficerdashboardComponent } from './loanofficer/loanofficerdashboard/loanofficerdashboard.component';
import { ViewloanrequestComponent } from './loanofficer/viewloanrequest/viewloanrequest.component';
import { PendingloanrequestComponent } from './loanofficer/pendingloanrequest/pendingloanrequest.component';
import { ProfileComponent } from './loanofficer/profile/profile.component';
import { WelcomePageComponent } from './landing-page/landing-page/welcome-page/welcome-page.component';
import { AdminViewComponent } from './admin/admin/admin-view/admin-view/admin-view.component';
import { AdminDashboardComponent } from './admin/admin/admin-dashboard/admin-dashboard/admin-dashboard.component';
import { AddLoanSchemeComponent } from './admin/admin/add-loan-scheme/add-loan-scheme/add-loan-scheme.component';
import { UpdateLoanSchemeComponent } from './admin/admin/admin-update-loanScheme/update-loan-scheme/update-loan-scheme.component';
import { ViewLoanSchemeComponent } from './admin/admin/admin-view-loanScheme/view-loan-scheme/view-loan-scheme.component';
import { ViewLoanofficerReportComponent } from './admin/admin/view-loanOfficer-report/view-loanofficer-report/view-loanofficer-report.component';
import { ViewNpaComponent } from './admin/admin/view-npa/view-npa/view-npa.component';
import { ViewCustomerComponent } from './admin/admin/view-customer/view-customer/view-customer.component';
import { AddLoanOfficerComponent } from './admin/admin/admin-loanOfficer/add-loan-officer/add-loan-officer.component';
import { ViewLoanOfficerComponent } from './admin/admin/admin-view-loanOfficer/view-loan-officer/view-loan-officer.component';
import { ViewLoanRequestComponent } from './admin/admin/view-loan-request/view-loan-request/view-loan-request.component';
import { ReplytoenquiryComponent } from './loanofficer/replytoenquiry/replytoenquiry.component';
import { ViewactiveloansComponent } from './user/viewactiveloans/viewactiveloans.component';
import { CalculatorComponent } from './admin/calculator/calculator.component';


const routes: Routes = [
  {
    path: "",
    component: LandingViewComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegistrationComponent
      },
      {
        path: "calculator",
        component: CalculatorComponent
      },
      {
        path:"welcome-page",
        component:WelcomePageComponent

      }

    ]
  },
  {
    path:"admin",
    component:AdminViewComponent,
    children:[
      {
        path:"admindashboard",
        component:AdminDashboardComponent
      },
      {
        path:"addloanscheme",
        component: AddLoanSchemeComponent
      },
      {
        path:"updateloanscheme",
        component:UpdateLoanSchemeComponent
      },
      {
        path:"viewloanscheme",
        component: ViewLoanSchemeComponent
      },
      {
        path:"report",
        component:ViewLoanofficerReportComponent

      },{
        path:"npa",
        component:ViewNpaComponent
      },{
        path:"customers",
        component:ViewCustomerComponent
      },
      {
        path:"addloanofficer",
        component:AddLoanOfficerComponent
      },
      {
        path:"manageloanofficer",
        component:ViewLoanOfficerComponent
      },
      {
        path:"viewloanRequest",
        component:ViewLoanRequestComponent

      }
     
    ]
  },
  {
    path: "userdashboard",
    component: UserdashboardComponent,
    children: [
      {
        path: "loanschemes",
        component: LoanschemesComponent,
        children: [
          {
            path: "applyloan",
            component: ApplyloanComponent
          }
        ]
      },
      {
        path: "payment",
        component: PaymentComponent
      },
      {
        path: "viewEmi",
        component: ViewemiComponent
      },
      {
        path: "queries",
        component: QueriesComponent
      },
      {
        path: "appliedloans",
        component: AllappliedloanComponent
      },
      {
        path: "updateprofile",
        component: UpdateprofileComponent
      },
      {path:"viewapprovedloans",
        component:ViewactiveloansComponent
      }
      
      
    ]
  },
  {
    path:"loanofficerdashboard",
    component:LoanofficerdashboardComponent,
    children:[
      {
        path:"loanrequest",
        component:ViewloanrequestComponent
      },
      {
        path:"pendingloanrequest",
        component:PendingloanrequestComponent
      },
      {
        path:"profile",
        component:ProfileComponent
      },
      {
        path:"replytoenquiry",
        component:ReplytoenquiryComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
