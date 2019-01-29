import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Service
import { InstanceService } from '../shared/instance.service';

// Model
import { Instance } from '../shared/instance.model';
import { ScenarioConfig } from '../../scenario/shared/scenario.config';

// material
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';

// Lodash
import { cloneDeep } from 'lodash';

@Component({
  selector: 'cta-instance-dialog',
  templateUrl: './instance-dialog.component.html',
  styleUrls: ['./instance-dialog.component.css']
})
export class InstanceDialogComponent implements OnInit {
  instance: Instance;
  originalInstance: Instance;
  originalProps: { key: string, value: string }[];

  addingProp: { key: string, value: string };
  props: { key: string, value: string }[];

  instanceFormGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InstanceDialogComponent>,
    public snackBarService: MatSnackBar,
    private instanceService: InstanceService
  ) { }

  ngOnInit() {
    this.instance = this.data.instance;
    this.originalInstance = cloneDeep(this.instance);

    this.addingProp = { key: '', value: '' };
    this.props = Object.keys(this.instance.properties).map(key => {
      return { key, value: this.instance.properties[key] };
    });

    this.originalProps = cloneDeep(this.props);

    // Todo: validate
    /*this.instanceFormGroup = new FormGroup({
      'key': new FormControl(this.propsArray[1].key, Validators.required),
    }); */

  }

  // get key() { return this.instanceFormGroup.get('key'); }

  addProps() {
    if (this.props.filter(each => each.key === this.addingProp.key).length === 0) {
      this.props.push({ key: this.addingProp.key, value: this.addingProp.value });

      this.addingProp.key = '';
      this.addingProp.value = '';
    } else {
      alert('Duplicated Key');
    }

  }

  resolveProps() {
    return this.props.reduce((result: any, item) => {
      result[item.key] = item.value;
      return result;
    }, {});
  }

  delete(prop) {
    this.props = this.props.filter(item => item !== prop);
    prop = null;
  }

  onSave() {
    this.instance.properties = this.resolveProps();

    this.instanceService.updateInstance(this.instance)
      .then(instanceRes => {
        this.snackBarService.open('Update instance: ' + this.instance.hostname, '', { duration: 1000 });

        this.dialogRef.close({ mode: this.data.mode, instance: this.instance });
      })
      .catch(err => {
        this.snackBarService.open(err, '', { duration: 1000 });
      });
  }

  onReset() {
    this.props = cloneDeep(this.originalProps);
  }

  onClose() {
    this.dialogRef.close();
  }

}
