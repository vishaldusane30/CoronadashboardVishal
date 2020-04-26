import { Component, OnInit } from '@angular/core';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';
import { RestService } from 'src/app/rest.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare var AdminLTE: any;

@Component({
  selector: 'app-admin-programs',
  templateUrl: './admin-programs.component.html',
  styleUrls: ['./admin-programs.component.css']
})
export class AdminProgramsComponent implements OnInit {
  date: any = new jqx.date(2020, 11, 23);
  Confirmed: number = 0;
  Active: number = 0;
  Death: number = 0;
  Recovered: number = 0;
  source: any =
  {
      dataType: 'json',
      dataFields: [
          { name: 'id', type: 'string' },
          { name: 'status', type: 'string' },
          { name: 'about', type: 'string' },
          { name: 'address', type: 'string' },
          { name: 'company', type: 'string' },
          { name: 'name', type: 'string' },
          { name: 'style', type: 'string' },
          { name: 'calendar', type: 'string' },
          { name: 'start', type: 'date', format: 'yyyy-MM-dd HH:mm' },
          { name: 'end', type: 'date', format: 'yyyy-MM-dd HH:mm' }
      ],
      id: 'id',
      url: './../../../sampledata/appointments.txt'
  };
  dataAdapter: any = new jqx.dataAdapter(this.source);
	getWidth() : any {
		if (document.body.offsetWidth < 850) {
			return '90%';
		}

		return 850;
	}

    appointmentDataFields: any =
    {
        from: 'start',
        to: 'end',
        id: 'id',
        description: 'about',
        location: 'address',
        subject: 'name',
        style: 'style',
        status: 'status'
    };
    views: any[] =
    [
        'dayView',
        'weekView',
        'monthView'
    ];
  constructor(private _restservice: RestService, private _router: Router, private http: HttpClient) { }

  ngOnInit() {
    AdminLTE.init();
    this.GetReleaseReport();

  }

  GetReleaseReport() {

    this._restservice.GetCovidStateReport().subscribe((data: {}) => {

      let result = <any>data;
     // result = JSON.parse(data.toString());
      console.log(result);
      this.Confirmed = result.statewise[0].confirmed;
      this.Active = result.statewise[0].active;
      this.Death = result.statewise[0].deaths;
      this.Recovered = result.statewise[0].recovered;


     // this.arrDataTable = result;	 // FILL THE ARRAY WITH DATA.
      // this.keys = Object.keys(this.arrDataTable[0]);


    //   for (const Objdt of this.arrDataTable) {
    //       // tslint:disable-next-line:radix

    //       this.totalcount = this.totalcount + Objdt['Total Units'];
    //  }
    //  console.log(this.totalcount);
    });
  }


}
