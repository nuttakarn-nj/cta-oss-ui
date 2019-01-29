import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cta-execution-stage-content',
  templateUrl: './execution-stage-content.component.html',
  styleUrls: ['./execution-stage-content.component.css']
})
export class ExecutionStageContentComponent implements OnInit {
  @Input() result: any;

  constructor() { }

  ngOnInit() {
  }

  convertTimestampToUTC(timestamp) {
    const date = new Date(timestamp);
    const hours = '0' + date.getHours();
    const minutes = '0' + date.getMinutes();
    const seconds = '0' + date.getSeconds();

    const timeUTC = hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' UTC';
    return timeUTC;
  }


}
