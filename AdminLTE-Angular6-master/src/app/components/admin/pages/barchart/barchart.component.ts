import { debug } from 'util';
import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})

export class BarchartComponent implements OnInit {

  arrDataTable: string [];
  constructor(private _restservice: RestService) { }
  sampleData: any;
  ddlStatusTypekeys: string[] = [];

  ngOnInit() {
    this.GetReleaseBarChartReport(0);
    this.GetDDLStatusType();


  }


  // tslint:disable-next-line:member-ordering

    padding: any = { left: 20, top: 5, right: 20, bottom: 5 };
    titlePadding: any = { left: 90, top: 0, right: 0, bottom: 10 };
    xAxis: any =
    {
        dataField: 'Application',
        gridLines: { visible: true },
        flip: false
    };
getWidth() : any {
if (document.body.offsetWidth < 850) {
  return '90%';
}

return 850;
}

valueAxis: any =
{
    flip: true,
    labels: {
        visible: true,
        formatFunction: (value: string) => {
            return parseInt(value);
        }
    }
};

seriesGroups: any[] =
[
    {
        type: 'column',
        orientation: 'horizontal',
        columnsGapPercent: 50,
        toolTipFormatSettings: { thousandsSeparator: ',' },
        series: [
            { dataField: 'Hours', displayText: 'Time (Hours)' }
        ]
    }
];



  GetReleaseBarChartReport(GlobalStatusID:number) {

    this._restservice.GetReleaseBarChartReport(GlobalStatusID).subscribe((data: {}) => {
      let result = <any>data;
       result = JSON.parse(data.toString());
      // this.arrDataTable = result;	 // FILL THE ARRAY WITH DATA.
      // data = <any>data;
      setTimeout (() => {
        this.sampleData = result;

     }, 2000);

    //   this.sampleData = [
    //     {result}
    // ];


    });
  }

  GetDDLStatusType() {
    this._restservice.GetDDL(2, 'DDLSTATUS').subscribe((data: {}) => {
      this.ddlStatusTypekeys = <any>data;
    });
  }


  RefreshBarchart(GlobalStatusID:number) {

    this.GetReleaseBarChartReport(GlobalStatusID);
   // this.showSuccess();
  }




}
