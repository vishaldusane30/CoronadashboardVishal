// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-Ganntchart',
//   templateUrl: './Ganntchart.component.html',
//   styleUrls: ['./Ganntchart.component.css']
// })
// export class GanntchartComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TaskService } from './../../../../service/task.service';
import { LinkService } from './../../../../service/link.service';
import { Task } from './../../../../Modelclass/task';
import { Link } from './../../../../Modelclass/link';
import { RestService } from 'src/app/rest.service';



import 'dhtmlx-gantt';

@Component({
	encapsulation: ViewEncapsulation.None,
 selector: 'gantt',
	styleUrls: ['./Ganntchart.component.css'],
  providers: [TaskService, LinkService],
  templateUrl:'./Ganntchart.component.html',
	// template: `<div #gantt_here class='gantt-chart'></div>`,
})
export class GanntchartComponent implements OnInit {
	@ViewChild('gantt_here') ganttContainer: ElementRef;

  constructor(private taskService: TaskService, private linkService: LinkService,private _restservice: RestService) { }

  arrDataTable: string [];

	ngOnInit() {

		gantt.config.xml_date = '%Y-%m-%d %H:%i';
    gantt.config.min_column_width = 100;
    gantt.config.readonly = true;


		gantt.init(this.ganttContainer.nativeElement);

		const dp = gantt.createDataProcessor({
			task: {
				update: (data: Task) => this.taskService.update(data),
				create: (data: Task) => this.taskService.insert(data),
				delete: (id) => this.taskService.remove(id)
			},
			link: {
				update: (data: Link) => this.linkService.update(data),
				create: (data: Link) => this.linkService.insert(data),
				delete: (id) => this.linkService.remove(id)
			}
		});

		// Promise.all([this.taskService.get(), this.linkService.get()])
		// 	.then(([data, links]) => {
		// 		gantt.parse({ data, links });
    //   });


  //   var data = {
  //     data: [
  //         {id: 1, text: 'Task #1', start_date: '2018-10-03 00:00', duration: 3, progress: 0.6},
  //         {id: 2, text: 'Task #2', start_date: '2018-10-01 00:00', duration: 3, progress: 0.4},

  //     ]
  //     // ,
  //     // links: [
  //     // {id: 1, source: 1, target: 2, type: '0'}
  //     // ]
  //  };
  // gantt.parse(data);

  this.GetReleaseChartReport();

  }


  GetReleaseChartReport() {
    this._restservice.GetReleaseChartReport().subscribe((data: {}) => {

      let result = <any>data;
      result = JSON.parse(data.toString());
      this.arrDataTable = result;	 // FILL THE ARRAY WITH DATA.
      data = <any>data;
      for (const Objdt of this.arrDataTable) {
        data = {
          data: [
    {id: Objdt['id'], text: Objdt['text'], start_date: Objdt['StartDate'], duration: Objdt['duration'], progress: Objdt['progress']},
          ]
          };
          gantt.parse(data);
      }
    });
  }


}
