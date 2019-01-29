import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cta-execution-hostname-content',
  templateUrl: './execution-hostname-content.component.html',
  styleUrls: ['./execution-hostname-content.component.css']
})
export class ExecutionHostnameContentComponent implements OnInit {
  @Input() instance: any;

  constructor() { }

  ngOnInit() {
  }

}
