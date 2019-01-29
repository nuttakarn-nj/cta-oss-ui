import { Injectable } from '@angular/core';
import { AfterhandlerItem } from '../shared/afterhandler-item';
import { EmailAfterhandlerComponent } from '../shared/email-afterhandler.component';

@Injectable()
export class AfterhandlerService {
  constructor() { }

  getComponents() {
    return [
      new AfterhandlerItem(EmailAfterhandlerComponent, {})
    ];
  }
}
