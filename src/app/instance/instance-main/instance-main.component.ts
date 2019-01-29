import { Component, OnInit } from '@angular/core';

// Services
import { InstanceService } from '../shared/instance.service';

@Component({
  selector: 'cta-instance-main',
  templateUrl: './instance-main.component.html',
  styleUrls: ['./instance-main.component.css']
})
export class InstanceMainComponent implements OnInit {
  instances: any;

  constructor(private instanceService: InstanceService) { }

  ngOnInit() {
    this.getInstances();
  }

  getInstances() {
    this.instanceService.getInstances().then(instances => {
      this.instances = instances;
    }
    );
  }

}
