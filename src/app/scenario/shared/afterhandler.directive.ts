import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ctaAfterhandlersHolder]',
})

export class AfterhandlerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
