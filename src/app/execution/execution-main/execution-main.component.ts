import { Component, OnInit } from '@angular/core';

// services
import { ExecutionService } from '../shared/execution.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cta-execution-main',
  templateUrl: './execution-main.component.html',
  styleUrls: ['./execution-main.component.css'],

})
export class ExecutionMainComponent implements OnInit {
  executions: any;

  constructor(private executionService: ExecutionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getExecutions();

    const executionId = this.route.snapshot.paramMap.get('executionId');

    if (executionId) {
      this.getExecution(executionId);
    } else {
      this.getExecutions();
    }

  }

  getExecutions() {
    this.executionService.getExecutions().then(executions => {
      this.executions = executions;
    });
  }

  getExecution(executionId) {
    this.executionService.getExecution(executionId).then(res => this.executions = [res]);
  }
}
