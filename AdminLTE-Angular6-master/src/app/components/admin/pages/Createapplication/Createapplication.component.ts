// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-Createapplication',
//   templateUrl: './Createapplication.component.html',
//   styleUrls: ['./Createapplication.component.css']
// })
// export class CreateapplicationComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }








import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/rest.service';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { spanish } from './../../../../../interfaces/datatables.es';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Users } from './../../../../Modelclass/Users';
import { d } from '@angular/core/src/render3';

import swal from 'sweetalert';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

declare var AdminLTE: any;

@Component({
  selector: 'app-Createapplication',
  templateUrl: './Createapplication.component.html',
  styleUrls: ['./Createapplication.component.css']
})
export class CreateapplicationComponent implements OnInit {

  Applicationform: FormGroup;
  title = 'Create';
  submitted = false;
  modalRef: BsModalRef;

  dataSaved = false;
  IDUpdate = null;
  massage = null;
  myFiles:string [] = [];

  arrDataTable: string [];
  arrDataTable2: string [];
  ddlStatusTypekeys: string[] = [];
  keys: string[]=[];
  totalcount: number =0;
  dtOptions: any = {};
  dtLanguage: any = spanish;

  dtTrigger: Subject<any> = new Subject();




  constructor(private modalService: BsModalService ,private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _restservice: RestService, private _router: Router, private http: HttpClient) {

      this.Applicationform = this._fb.group({
        ID: 0,
        ApplicationName:  ['', [Validators.required]],
        ApplicationStatus: ['', [Validators.required]],
        LUSR: 0,
        AddedBy: 0,
      });

     }

     openModal(template: TemplateRef<any>) {
      this.GetDDLStatusType();
      this.IDUpdate = null;
      this.modalRef = this.modalService.show(template);
      this.Applicationform.reset();

    }




  ngOnInit() {
    AdminLTE.init();
    this.GetApplicationReport();
    this.GetDDLStatusType();
    AdminLTE.init();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: this.dtLanguage,
      dom: 'lfBrtip',
      buttons: [
        { extend: 'print', text: 'Print' },
        { extend: 'excel', text: 'Export Excel' },
      ]
    };

      this.http
      .get<DataTablesResponse>(
        'http://localhost:65389/api/Timesheet/GetMenus'
      ).subscribe(resp => {
        this.arrDataTable2 = this.arrDataTable;
        this.dtTrigger.next();
      });
      // this.arrDataTable2 = this.arrDataTable;
      // this.dtTrigger.next();
  }


  get f() { return this.Applicationform.controls; }


  save() {

    this.submitted = true;
    if (!this.Applicationform.valid) {
      return;
    }

    if (this.IDUpdate === null) {
      const seesionValue = this._restservice.getSession('JOBIDNO');
      this.Applicationform.controls['AddedBy'].setValue(seesionValue);
      this._restservice.createApplication(this.Applicationform.value)
        .subscribe(() => {
          this.Applicationform.reset(this.Applicationform.value);
          this.modalRef.hide();
          swal("Done!", "Data Saved Successfully!", "success");

          this._router.navigate(['/admin/admin-app']);
          this.GetApplicationReport();
        }, error => console.error(error));
    } else{
      this._restservice.updateApplication(this.Applicationform.value)
        .subscribe(() => {
          this.Applicationform.reset();
          this.modalRef.hide();
          swal("Done!", "Data Updated Successfully!", "success");

          this._router.navigate(['/admin/admin-app']);
          this.GetApplicationReport();
        }, error => console.error(error));
    }
  }


  openModalEdit(template: TemplateRef<any>, ID: number) {

    this.GetDDLStatusType();
    this._restservice.getApplicationById(ID).subscribe(Application => {
      this.massage = null;
      this.dataSaved = false;
      this.IDUpdate = Application[0].ID;
      this.Applicationform.controls['ID'].setValue(Application[0].ID);
      this.Applicationform.controls['ApplicationName'].setValue(Application[0].ApplicationName);
      this.Applicationform.controls['ApplicationStatus'].setValue(Application[0].ApplicationStatus);
    });
    this.modalRef = this.modalService.show(template);
  }



  GetApplicationReport() {

    this._restservice.GetApplicationReport().subscribe((data: {}) => {

      let result = <any>data;
      result = JSON.parse(data.toString());
      console.log(result);
      this.arrDataTable = result;	 // FILL THE ARRAY WITH DATA.
      this.keys = Object.keys(this.arrDataTable[0]);


      for (const Objdt of this.arrDataTable) {
          // tslint:disable-next-line:radix

          this.totalcount = this.totalcount + Objdt['Total Units'];
     }
     console.log(this.totalcount);
    });
  }


  GetDDLStatusType() {
    this._restservice.GetDDL(2, 'DDLSTATUS').subscribe((data: {}) => {
      this.ddlStatusTypekeys = <any>data;
    });
  }



}

