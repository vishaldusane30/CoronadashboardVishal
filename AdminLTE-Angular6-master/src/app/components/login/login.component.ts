import { debug } from 'util';
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { } from 'jquery';
// import { } from 'icheck';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit, OnDestroy {

//   bodyClasses = 'skin-blue sidebar-mini';
//   body: HTMLBodyElement = document.getElementsByTagName('body')[0];
//   checkbox_icheck: HTMLElement = document.getElementById('checkbox_icheck');

//   constructor() { }

//   ngOnInit() {
//     // add the the body classes
//     this.body.classList.add('hold-transition');
//     this.body.classList.add('login-page');

//     // jQuery(this.checkbox_icheck).iCheck({
//     //   checkboxClass: 'icheckbox_square-blue',
//     //   radioClass: 'iradio_square-blue',
//     //   increaseArea: '20%' /* optional */
//     // });
//   }

//    ngOnDestroy() {
//     // remove the the body classes
//     this.body.classList.remove('hold-transition');
//     this.body.classList.remove('login-page');
//   }

// }





import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthenticationService } from '../../service/auth.service';
import { RestService } from 'src/app/rest.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;


  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;

  submitClick = false;

  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    public rest: RestService) { }

  onSubmit() {


    localStorage.setItem('currentUser', 'LOC786');
    this.router.navigate(['admin/admin-programs']);
    // this.submitted = true;
    // if (this.loginForm.invalid) {
    //   return;
    // }
    // if(this.loginForm.controls.email.value == 'dhiraj@gmail.com' && this.loginForm.controls.password.value == 'password') {
    //     this.router.navigate(['list-user']);
    // }else {
    //   this.invalidLogin = true;
    // }
  }

  onSubmit2() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {


    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;


    this.submitClick = true;
    this.rest.Login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {

          if (data === 0) {


            // this.submitClick = false;
             this.loading = false;
            alert('Username or password is incorrect')
          } else{
          this.rest.setSession('JOBIDNO', data);
          const seesionValue = this.rest.getSession('JOBIDNO');
          console.log(seesionValue);
          this.router.navigate(['admin/admin-programs']);
        }
        // },
        // error => {
        //   this.error = error;
        //   this.submitClick = false;
        //   this.loading = false;
        // });
  });
}}
