
// import { Component, OnInit, TemplateRef } from '@angular/core';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

// @Component({
//   selector: 'app-add-release',
//   templateUrl: './add-release.component.html',
//   styleUrls: ['./add-release.component.css']
// })
// export class AddReleaseComponent implements OnInit {

//    modalRef: BsModalRef;

//   constructor(private modalService: BsModalService) { }

//   openModal(template: TemplateRef<any>) {
//     this.modalRef = this.modalService.show(template);
//   }

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
import { Release } from './../../../../Modelclass/Release';
import { GanntchartComponent } from './../Ganntchart/Ganntchart.component';

import swal from 'sweetalert';



class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

declare var AdminLTE: any;

@Component({
  selector: 'app-add-release',
  templateUrl: './add-release.component.html',
  styleUrls: ['./add-release.component.css']
})
export class AddReleaseComponent implements OnInit {

  values: number[] = [102, 115, 130, 137];


  releaseForm: FormGroup;
  title = 'Create';
  submitted = false;
  modalRef: BsModalRef;

  dataSaved = false;
  ReleaseIdUpdate = null;
  massage = null;


  arrDataTable: string [];
  arrDataTable2: string [];
  keys: string[]=[];
  totalcount: number =0;
  dtOptions: any = {};
  dtLanguage: any = spanish;
  ddlappTypekeys: string[] = [];
  ddlStatusTypekeys: string[] = [];


  dtTrigger: Subject<any> = new Subject();




  constructor(private modalService: BsModalService ,private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _restservice: RestService, private _router: Router, private http: HttpClient) {

      this.releaseForm = this._fb.group({
        ReleaseID: 0,
        Releasename: ['', [Validators.required]],
        StartDate: ['', [Validators.required]],
        EndDate: ['', [Validators.required]],
        // Comments: ['', [Validators.required]],
        AddedBy: 0,
        ApplicationID: ['', [Validators.required]],
        Status: ['', [Validators.required]],
      });

     }

     openModal(template: TemplateRef<any>) {

      this.GetDDLAppType();
      this.GetDDLStatusType();
      this.ReleaseIdUpdate=null;
      // this.releaseForm.reset(this.releaseForm.value);

      this.modalRef = this.modalService.show(template);
      this.releaseForm.reset();
      // swal("Good job!", "You clicked the button!", "success");


    }




  ngOnInit() {
    AdminLTE.init();
    this.GetReleaseReport();

    this.GetDDLAppType();
    this.GetDDLStatusType();
    AdminLTE.init();

    this.GetTime();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: this.dtLanguage,
      // Declare the use of the extension in the dom parameter
      dom: 'lfBrtip',

      // Configure the buttons
      buttons: [
        { extend: 'print', text: 'Print' },
        { extend: 'excel', text: 'Export Excel' },
      ]
    };
    // https://angular-datatables-demo-server.herokuapp.com/'
    // 'http://localhost:65389/api/Timesheet/GetMenus'

      this.http
      .get<DataTablesResponse>(
        'https://angular-datatables-demo-server.herokuapp.com/'
      ).subscribe(resp => {
        this.arrDataTable2 = this.arrDataTable;
        this.dtTrigger.next();
      });
      // this.arrDataTable2 = this.arrDataTable;
      // this.dtTrigger.next();
  }


  get f() { return this.releaseForm.controls; }

  save() {

    this.submitted = true;
    if (!this.releaseForm.valid) {
      return;
    }

    if (this.ReleaseIdUpdate === null) {
      const seesionValue = this._restservice.getSession('JOBIDNO');
      this.releaseForm.controls['AddedBy'].setValue(seesionValue);
      this._restservice.createRelease(this.releaseForm.value)
        .subscribe(() => {
          this.releaseForm.reset(this.releaseForm.value);
          this.modalRef.hide();
          swal("Done!", "Data Saved Successfully!", "success");

          this._router.navigate(['/admin/admin-release']);
          this.GetReleaseReport();
        }, error => console.error(error));
    } else{
      this._restservice.updateRelease(this.releaseForm.value)
        .subscribe(() => {
          // this.releaseForm.reset();
          this.modalRef.hide();
          swal("Done!", "Data Updated Successfully!", "success");

          this._router.navigate(['/admin/admin-release']);
          this.GetReleaseReport();
        }, error => console.error(error));
    }
  }


  openModalEdit(template: TemplateRef<any>, ReleaseId: number) {
    this._restservice.getReleaseById(ReleaseId).subscribe(Release => {
      this.massage = null;
      this.dataSaved = false;
      this.ReleaseIdUpdate = Release[0].ReleaseID;

      this.releaseForm.controls['ReleaseID'].setValue(Release[0].ReleaseID);
      this.releaseForm.controls['Releasename'].setValue(Release[0].Releasename);
      this.releaseForm.controls['StartDate'].setValue(Release[0].StartDate);
      this.releaseForm.controls['EndDate'].setValue(Release[0].EndDate);
      // this.releaseForm.controls['Comments'].setValue(Release[0].Comments);
      this.releaseForm.controls['ApplicationID'].setValue(Release[0].ApplicationID);
      this.releaseForm.controls['Status'].setValue(Release[0].Status);
    });
    this.modalRef = this.modalService.show(template);
  }



  GetReleaseReport() {

    this._restservice.GetReleaseReport().subscribe((data: {}) => {

      let result = <any>data;
      result = JSON.parse(data.toString());
      console.log(result);
      this.arrDataTable = result;	 // FILL THE ARRAY WITH DATA.
      this.keys = Object.keys(this.arrDataTable[0]);


    //   for (const Objdt of this.arrDataTable) {
    //       // tslint:disable-next-line:radix

    //       this.totalcount = this.totalcount + Objdt['Total Units'];
    //  }
    //  console.log(this.totalcount);
    });
  }


  GetTime() {

  ;
    this._restservice.GetTimeentry().subscribe((data: {}) => {
      let result = <any>data;
      result = JSON.parse(data.toString());

    });
  }


  GetDDLAppType() {


    this._restservice.GetDDL(1, 'DDLAPPTYPE').subscribe((data: {}) => {
      this.ddlappTypekeys = <any>data;

    });
  }


  GetDDLStatusType() {
    this._restservice.GetDDL(2, 'DDLSTATUS').subscribe((data: {}) => {
      this.ddlStatusTypekeys = <any>data;
    });
  }


  // private _formatDate(value: Date): string {
  //   const [date, month, year] = value.toLocaleDateString().split('/');

  //   return `${year}-${month}-${date}`;
  // }



}

