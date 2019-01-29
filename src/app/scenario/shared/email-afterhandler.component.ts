import { Component, Input } from '@angular/core';
import { AfterhandlerBase } from './afterhandlerbase';

@Component({
  selector: 'cta-email-afterhandler',
  template: `
  <div>
  <mat-form-field>
    <input matInput placeholder="After Handler Name">
  </mat-form-field>
  <br>

  After Handler Type :
  <br>

  <mat-form-field>
    <input matInput placeholder="After Handler Type">
  </mat-form-field>
  <br>

  <mat-checkbox>Disabled</mat-checkbox>
  <br>
  <br>

  Properties:
  <br>

  <mat-form-field>
    <input matInput placeholder="Input email">
  </mat-form-field>
  <br>

  Emails list:
  <br>
  aaaaa@hotmail.com

</div>`

})

export class EmailAfterhandlerComponent implements AfterhandlerBase {
  @Input() data: any;

  constructor() { }
}
