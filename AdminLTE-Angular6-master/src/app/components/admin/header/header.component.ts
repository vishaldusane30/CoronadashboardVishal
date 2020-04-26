import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  Username: string;
  constructor(private _restservice: RestService, private _router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.GetUserDetails();
  }


  GetUserDetails() {
    const seesionValue = this._restservice.getSession('JOBIDNO');
    this._restservice.GetUserDetails(seesionValue).subscribe((data: {}) => {
       this.Username = <any>data;
      // result = JSON.parse(data.toString());

    });
  }




}
