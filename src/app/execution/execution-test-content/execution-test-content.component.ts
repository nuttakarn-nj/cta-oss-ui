import { Component, OnInit, Input } from '@angular/core';

// Services
import { ExecutionService } from '../shared/execution.service';

@Component({
  selector: 'cta-execution-test-content',
  templateUrl: './execution-test-content.component.html',
  styleUrls: ['./execution-test-content.component.css']
})
export class ExecutionTestContentComponent implements OnInit {
  @Input() stage: { testId: string; executionId: string };
  results: any[];

  constructor(private executionService: ExecutionService) { }

  ngOnInit() {
  }

  getResultsByTestId(stage) {
    this.executionService.getResultsByTestId(stage)
      .then(results => {
        this.results = results;
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

}
