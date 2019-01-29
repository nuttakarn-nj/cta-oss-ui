import { Component, DoCheck, Input, SimpleChanges } from '@angular/core';

// components
import { InstanceDialogComponent } from '../instance-dialog/instance-dialog.component';

// Model
import { Instance } from '../shared/instance.model';

// Lodash
import { truncate, cloneDeep } from 'lodash';

// Material modules
import { MatDialog } from '@angular/material';

@Component({
  selector: 'cta-instance-card',
  templateUrl: './instance-card.component.html',
  styleUrls: ['./instance-card.component.css']
})
export class InstanceCardComponent implements DoCheck {
  @Input() instance: Instance;
  propsArray: { key: string, value: string }[];
  oldInstanceProps = {};

  constructor(public dlogInstanceService: MatDialog) { }

  ngDoCheck() {
    if (this.instance.properties !== this.oldInstanceProps) {
      this.propsArray = this.parseProperties(this.instance.properties);
      this.oldInstanceProps = this.instance.properties;
    }
  }

  parseProperties(properties) {
    return Object.keys(properties).map(key => {
      return { key, value: properties[key] };
    });
  }

  openDialogForEdit(instance: any) {
    const dialogRef = this.dlogInstanceService.open(InstanceDialogComponent, {
      data: { mode: 'edit', instance: cloneDeep(instance) }
    });

    dialogRef.afterClosed().toPromise().then(res => {
      if (res && res.instance) {
        this.instance = res.instance;
      }
    }
    );
  }

  truncated(hostname: string) {
    // todo: will truncate name of scenario in 2 line
    return truncate(hostname, { 'length': 19 });
  }

}
