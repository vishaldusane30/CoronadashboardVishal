
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { ContentComponent } from './components/admin/content/content.component';
import { ControlSidebarComponent } from './components/admin/control-sidebar/control-sidebar.component';
import { FooterComponent } from './components/admin/footer/footer.component';
import { HeaderComponent } from './components/admin/header/header.component';
import { LeftSideComponent } from './components/admin/left-side/left-side.component';
import { AdminHomeComponent } from './components/admin/pages/admin-home/admin-home.component';
import { AdminProgramsComponent } from './components/admin/pages/admin-programs/admin-programs.component';
import { LoginComponent } from './components/login/login.component';

import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from './service/auth.service';
import {UserService} from './service/user.service';


import { ModalModule } from 'ngx-bootstrap/modal';

import { OnlyNumber } from './components/admin/onlynumber.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';

import { AddReleaseComponent } from './components/admin/pages/add-release/add-release.component';

import { AddEffortsComponent } from './components/admin/pages/add-efforts/add-efforts.component';

import { CreateapplicationComponent } from './components/admin/pages/Createapplication/Createapplication.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { GanntchartComponent } from './components/admin/pages/Ganntchart/Ganntchart.component';
import { BarchartComponent } from './components/admin/pages/barchart/barchart.component';
import { MytestComponent } from './components/admin/mytest/mytest.component';



import { jqxSchedulerModule } from 'jqwidgets-ng/jqxscheduler';


import 'dhtmlx-gantt';
// import { ChartsModule } from 'ng2-charts';

import { Chart } from 'chart.js';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

import { InMemoryDataService } from './service/in-memory-data.service';

// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { jqxBarGaugeModule } from 'jqwidgets-ng/jqxbargauge';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import {DatePipe} from '@angular/common';





@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ContentComponent,
    ControlSidebarComponent,
    FooterComponent,
    HeaderComponent,
    LeftSideComponent,
    AdminHomeComponent,
    AdminProgramsComponent,
    LoginComponent,




    OnlyNumber,

    AddReleaseComponent,

    AddEffortsComponent,

    CreateapplicationComponent,
    GanntchartComponent,
    BarchartComponent,
    MytestComponent,





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
     ModalModule.forRoot(),
     BsDatepickerModule.forRoot(),
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
    jqxBarGaugeModule,
    jqxChartModule,
    jqxDropDownListModule,
    // NgMultiSelectDropDownModule.forRoot(),
    jqxSchedulerModule,

  ],
  // providers: [],
  providers: [AuthenticationService, UserService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
