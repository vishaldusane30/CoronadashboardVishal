// import { CreatewsrComponent } from './components/admin/pages/WSR/createwsr/createwsr.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AdminHomeComponent } from './components/admin/pages/admin-home/admin-home.component';
import { AdminProgramsComponent } from './components/admin/pages/admin-programs/admin-programs.component';
import { LoginComponent } from './components/login/login.component';


// import { AddReleaseComponent } from './components/admin/pages/add-release/add-release.component';
// import { AddEffortsComponent } from './components/admin/pages/add-efforts/add-efforts.component';

// import { CreateapplicationComponent } from './components/admin/pages/Createapplication/Createapplication.component';
// import { GanntchartComponent } from './components/admin/pages/Ganntchart/Ganntchart.component';

// import { BarchartComponent } from './components/admin/pages/barchart/barchart.component';

// import { MytestComponent } from './components/admin/mytest/mytest.component';

// import { ActionitemComponent } from './components/admin/pages/Actionitem/Actionitem.Component';
// import { MinutemeetComponent } from './components/admin/pages/minutemeet/minutemeet.Component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin-programs',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin-programs',
        pathMatch: 'full'
      },
      {
        path: 'admin-home',
        component: AdminHomeComponent
      },
      {
        path: 'admin-programs',
        component: AdminProgramsComponent
      },


    ]
  },
  { path: 'login', component: LoginComponent },
  {
    path: '**',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
