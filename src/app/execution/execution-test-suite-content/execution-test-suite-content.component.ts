import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// services
import { ExecutionService } from '../shared/execution.service';

// Moment
declare function require(name: string);
const moment = require('moment');

@Component({
  selector: 'cta-execution-test-suite-content',
  templateUrl: './execution-test-suite-content.component.html',
  styleUrls: ['./execution-test-suite-content.component.css']
})

export class ExecutionTestSuiteContentComponent implements OnInit {
  @Input() execution: { id: string; };
  stages: { testId: string; executionId: string; }[] = [];

  constructor(private executionService: ExecutionService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  getDistinctTestId() {
    return this.executionService.getResults(this.execution.id)
      .then((result: { executionId: string; testId: string; }[]) => {
        this.stages = result
          .map(each => each.testId)
          .filter((val, index, self) => self.indexOf(val) === index)
          .map(testId => ({ testId, executionId: this.execution.id }));
        return this.stages;
      });
  }

  convertTimestampToUTC(timestamp) {
    const date = new Date(timestamp);
    const hours = '0' + date.getHours();
    const minutes = '0' + date.getMinutes();
    const seconds = '0' + date.getSeconds();

    const timeUTC = hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' UTC';
    return timeUTC;
  }

  duration(durationTimestamp) {
    const duration = moment.duration(durationTimestamp);
    const hours = '0' + duration._data.hours;
    const minutes = '0' + duration._data.minutes;
    const seconds = '0' + duration._data.seconds;
    const milliseconds = '00' + duration._data.milliseconds;

    const formattedDuration = hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ':' + milliseconds.substr(-3);
    if (durationTimestamp < 0) {
      return 'not complete';
    }
    return formattedDuration;
  }
}
