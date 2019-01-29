import {Component, Input, OnInit} from '@angular/core';
import {TestSuite} from '../shared/test-suite.model';

@Component({
  selector: 'cta-scenario-testsuite',
  templateUrl: './scenario-testsuite.component.html',
  styleUrls: ['./scenario-testsuite.component.css']
})
export class ScenarioTestsuiteComponent implements OnInit {

  @Input() testSuite: TestSuite;

  constructor() {
  }

  ngOnInit() {
  }

}
