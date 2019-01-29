import { Component, Input, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';

// dinamic component
import { AfterhandlerDirective } from '../shared/afterhandler.directive';
import { AfterhandlerItem } from '../shared/afterhandler-item';
import { AfterhandlerBase } from '../shared/afterhandlerbase';

// service
import { ScenarioPredefinedService } from '../shared/scenario-predefined.service';

import { Scenario } from '../shared/scenario.model';

@Component({
  selector: 'cta-selected-afterhandler',
  templateUrl: './selected-afterhandler.component.html',
  styleUrls: ['./selected-afterhandler.component.css']
})

export class SelectedAfterhandlerComponent implements OnInit {

  scenario: Scenario;
  Predefined: any;

  afterhandlerTypes: string[];

  // @Input() ads: AdItem[];
  // currentAddIndex: number = -1;
  @ViewChild(AfterhandlerDirective) adHost: AfterhandlerDirective;
  // subscription: any;
  // interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private predefinedService: ScenarioPredefinedService) {

    this.scenario = new Scenario();

    this.Predefined = {
      Configuration: {},
      TestSuite: {},
      AfterHandler: {},
    };

    this.afterhandlerTypes = [];
  }

  ngOnInit() {
    this.predefinedService.load().then(predefined => {
      this.Predefined = predefined;
      console.log(this.Predefined.AfterHandler.types);
    });
  }

  addAfterhandlerType(afterhandlerType: string) {
    console.log(afterhandlerType);

    this.afterhandlerTypes.push(afterhandlerType);
    console.log(this.afterhandlerTypes);

  }

  loadComponent() {
    // this.currentAddIndex = (this.currentAddIndex + 1) % this.ads.length;
    // let adItem = this.ads[this.currentAddIndex];

    // let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    // let viewContainerRef = this.adHost.viewContainerRef;
    // viewContainerRef.clear();

    // let componentRef = viewContainerRef.createComponent(componentFactory);
    // (<AdComponent>componentRef.instance).data = adItem.data;
  }
}
