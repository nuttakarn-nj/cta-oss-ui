import { Component, OnInit, Input } from '@angular/core';

// Lodash
import { cloneDeep } from 'lodash';

@Component({
  selector: 'cta-properties-configuration',
  templateUrl: './properties-configuration.html',
  styleUrls: ['./properties-configuration.css'],
})

export class PropertiesConfigurationComponent implements OnInit {
  @Input() props: any;
  addingProp: { key: string, value: string };
  editableProps: { key: string, value: any }[];

  originalEditableProps: { key: string, value: string }[];

  constructor() {
    this.addingProp = { key: '', value: '' };
  }

  ngOnInit() {
    this.editableProps = Object.keys(this.props).map(key => {
      return { key, value: this.props[key] };
    });

    this.originalEditableProps = cloneDeep(this.editableProps);
  }

  add() {
    if (this.editableProps.filter(each => each.key === this.addingProp.key).length === 0) {
      this.editableProps.push({ key: this.addingProp.key, value: this.addingProp.value });
      this.addingProp.key = '';
      this.addingProp.value = '';
    } else {
      alert('Duplicated Key');
    }
  }

  resolveProps() {
    return this.editableProps.reduce((result: any, item) => {
      result[item.key] = item.value;
      return result;
    }, {});
  }

  delete(prop) {
    this.editableProps = this.editableProps.filter(item => item !== prop);
    prop = null;
  }

  reset() {
    this.editableProps = cloneDeep(this.originalEditableProps);
  }

}
