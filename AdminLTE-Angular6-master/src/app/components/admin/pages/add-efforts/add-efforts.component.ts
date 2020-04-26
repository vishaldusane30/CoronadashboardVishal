

import { Component, OnInit, TemplateRef,ViewChild } from '@angular/core';
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
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';

// import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { OnlyNumber } from './../../onlynumber.directive';
import swal from 'sweetalert';


class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

declare var AdminLTE: any;

@Component({
  selector: 'app-add-efforts',
  templateUrl: './add-efforts.component.html',
  styleUrls: ['./add-efforts.component.css']
})
export class AddEffortsComponent implements OnInit {
  @ViewChild('myDropDownList') myDropDownList: jqxDropDownListComponent;


  effortForm: FormGroup;
  title = 'Create';
  submitted = false;
  modalRef: BsModalRef;

  dataSaved = false;
  ReleaseEstID = null;
  massage = null;


  arrDataTable: string [];
  arrDataTable2: string [];
  arrDataTabletask: string [];
  keys: string[]=[];
  totalcount: number =0;
  dtOptions: any = {};
  dtLanguage: any = spanish;
  ddlReleseTypekeys: string[] = [];
  ddlEmpTypekeys: string[] = [];


  dtTrigger: Subject<any> = new Subject();
  dropdownListforEmp = [];
  EmpMultilstType: string[] = [];
  dropdownList = [];

  dropdownSettings = {};
  selectedItems = [];




  constructor(private modalService: BsModalService ,private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _restservice: RestService, private _router: Router, private http: HttpClient) {

      this.effortForm = this._fb.group({
        ReleaseEstID: 0,
        Releasename:'asdf',
        ReleaseFkID:['', [Validators.required]],
        // WorkDate: ['', [Validators.required]],
        TaskDetails: ['', [Validators.required]],
        TaskTime: ['', [Validators.required]],
        Description: ['', [Validators.required]],
        AddedBy: 0,
        EmpIDS: [1],

      });

     }

     openModal(template: TemplateRef<any>) {
      this.GetEffortsReport();
      this.effortForm.reset();
      this.effortForm.reset(this.effortForm.value);

      this.modalRef = this.modalService.show(template);
    }




  ngOnInit() {
    AdminLTE.init();
    this.GetEffortsReport();
    this.GetReleaseType();
    this.GetAllEmployee();

    AdminLTE.init();

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
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    // this.selectedItems = [
    //   { item_id: 1, item_text: 'Pune' },
    //   { item_id: 2, item_text: 'Navsari' }
    // ];

    // this.effortForm.controls['EmpIDS'].setValue(this.selectedItems);


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


  get f() { return this.effortForm.controls; }

  save() {


    // this.selectedItems;
    this.submitted = true;
    if (!this.effortForm.valid) {
      return;
    }

    if (this.ReleaseEstID === null) {
      const seesionValue = this._restservice.getSession('JOBIDNO');
      this.effortForm.controls['AddedBy'].setValue(seesionValue);
      for (const Objdt of this.selectedItems) {
        this.EmpMultilstType.push(Objdt['item_id']);
      }
       this.effortForm.controls['EmpIDS'].setValue(this.EmpMultilstType.toString());
     // this.effortForm.controls['EmpIDS'].setValue(this.selectedItems.values());

      this._restservice.createEfforts(this.effortForm.value)
        .subscribe(() => {
          this.effortForm.reset();
          this.effortForm.reset(this.effortForm.value);
          this.modalRef.hide();
          swal("Done!", "Data Saved Successfully!", "success");
          this._router.navigate(['/admin/admin-Efforts']);
          this.GetEffortsReport();
        }, error => console.error(error));
    } else{
      this.EmpMultilstType = [];
      for (const Objdt of this.selectedItems) {
        this.EmpMultilstType.push(Objdt['item_id']);
      }
       this.effortForm.controls['EmpIDS'].setValue(this.EmpMultilstType.toString());

      this._restservice.updateEfforts(this.effortForm.value)
        .subscribe(() => {
          this.effortForm.reset();
          this.modalRef.hide();
          swal("Done!", "Data Updated Successfully!", "success");
          this._router.navigate(['/admin/admin-Efforts']);
          this.GetEffortsReport();
        }, error => console.error(error));
    }
  }


  openModalEdit(template: TemplateRef<any>, ReleaseId: number) {


    this._restservice.getEffortsById(ReleaseId).subscribe(Efforts => {

      this.GetTaskEmp(Efforts[0].ReleaseEstID);
      this.massage = null;
      this.dataSaved = false;
      this.ReleaseEstID = Efforts[0].ReleaseEstID;

      this.effortForm.controls['ReleaseEstID'].setValue(Efforts[0].ReleaseEstID);
      this.effortForm.controls['ReleaseFkID'].setValue(Efforts[0].ReleaseFkID);
      // this.effortForm.controls['WorkDate'].setValue(Efforts[0].WorkDate);
      this.effortForm.controls['TaskDetails'].setValue(Efforts[0].TaskDetails);
      this.effortForm.controls['TaskTime'].setValue(Efforts[0].TaskTime);
      this.effortForm.controls['Description'].setValue(Efforts[0].Description);
    });
    this.modalRef = this.modalService.show(template);


  }



  GetEffortsReport() {

    this._restservice.GetEffortsReport().subscribe((data: {}) => {

      let result = <any>data;
     // result = JSON.parse(data.toString());


      this.arrDataTable = result.statewise;	 // FILL THE ARRAY WITH DATA.
      console.log(this.arrDataTable );
     // this.keys = Object.keys(this.arrDataTable[0]);


    //   for (const Objdt of this.arrDataTable) {
    //       // tslint:disable-next-line:radix

    //       this.totalcount = this.totalcount + Objdt['Total Units'];
    //  }
    //  console.log(this.totalcount);
    });
  }


  GetReleaseType() {
    this._restservice.GetDDL(1, 'DDLRELESETYPE').subscribe((data: {}) => {
      this.ddlReleseTypekeys = <any>data;
    });
  }


  GetTaskEmp(ID:number) {

    this._restservice.GetTaskDDL(ID).subscribe((data: {}) => {
      this.ddlEmpTypekeys = <any>data;
       this.selectedItems = null;
      let result = <any>data;
      this.selectedItems = result;
    });
  }



    // GetAllEmployee(): any {
    //   // this._restservice.GetDDL(1, 'DDLRELESETYPE').subscribe((data: {}) => {

    //   this._restservice.GetDDL(1, 'DDLEMP').subscribe(res => {
    //     // this.dropdownListforEmp.push({ item_id: 0, item_text: 'Select' })
    //     for (let i = 0; i < res.length; ++i) {
    //       this.dropdownListforEmp.push({ item_id: res[i].value, item_text: res[i].Name,selectedIndex:2 });

    //     }

    //   })
    // }
    GetAllEmployee(): any {
      // this._restservice.GetDDL(1, 'DDLRELESETYPE').subscribe((data: {}) => {

      this._restservice.GetDDL(1, 'DDLEMP').subscribe(res => {
        // this.dropdownListforEmp.push({ item_id: 0, item_text: 'Select' })
        for (let i = 0; i < res.length; ++i) {
          this.dropdownListforEmp.push({ item_id: res[i].value, item_text: res[i].Name,selectedIndex:2 });

        }

      });
    }


    onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  //   listOnSelect(event: any): void {
  //
  //     if (event.args) {
  //         let item = event.args.item;
  //         if (item) {
  //             if(item.checked==true)
  //             {
  //                  this.EmpMultilstType.push(item.index);
  //             }
  //             else
  //             {
  //                 const index: number = this.EmpMultilstType.indexOf(item.index);
  //                 this.EmpMultilstType.splice(index, 1);
  //             }


  //         }
  //     }
  // };


}

