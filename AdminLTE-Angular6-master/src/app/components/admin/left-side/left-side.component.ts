import { OnlyNumber } from './../onlynumber.directive';
import { Component, OnInit, Directive } from '@angular/core';
import { RestService } from './../../../rest.service';
// import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css']
})
export class LeftSideComponent implements OnInit {
  keys: string[] = [];
  Menu: any = [];
  SiteMenu: any = [];
  GlobalStoreID: number = 0;
  isDisabled = false;
  public now: Date = new Date();
  constructor(public rest: RestService) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  // showSuccess() {
  //   this.toastr.success('👍', 'Store Number Set');
  // }

  GetMenuList() {
    this.Menu = [];
    this.SiteMenu = [];
    this.rest.GetMenuList().subscribe((data: {}) => {
      let result = <any>data;
      result = JSON.parse(data.toString());
      console.log(result);
      this.Menu = result;
      this.SiteMenu = result;
      console.log(this.GlobalStoreID);
    });
  }


  SetStoreID(GlobalStoreID:string) {
    localStorage.setItem('GlobalStoreID', GlobalStoreID);
    this.isDisabled = true;
   // this.showSuccess();
  }


  RemoveStoreID(GlobalStoreID:string) {
    localStorage.removeItem('GlobalStoreID');
    this.isDisabled = false;
  }

  ngOnInit() {
   this.GetMenuList();


  }

}
