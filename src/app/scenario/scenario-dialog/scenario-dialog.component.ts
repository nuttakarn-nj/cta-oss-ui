import { Component, OnInit, Inject, ViewChild } from '@angular/core';

// material
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { FormControl, Validators, FormGroup, NgForm, AbstractControl, ValidatorFn } from '@angular/forms';

// services
import { ScenarioService } from '../shared/scenario.service';
import { ScenarioPredefinedService } from '../shared/scenario-predefined.service';

// components
import { PropertiesConfigurationComponent } from '../properties-configuration/properties-configuration.component';

// Models
import { Scenario } from '../shared/scenario.model';

// config file
import { ScenarioConfig } from '../shared/scenario.config';
import { TestSuite } from '../shared/test-suite.model';

import { cloneDeep, truncate } from 'lodash';

declare function require(name: string);
const ObjectID = require('bson-objectid');

declare function require(name: string);
const cron = require('node-cron');

@Component({
  selector: 'cta-scenario-dialog',
  templateUrl: './scenario-dialog.component.html',
  styleUrls: ['./scenario-dialog.component.css'],
})

export class ScenarioDialogComponent implements OnInit {
  predefined: any;
  scenario: Scenario;
  originalScenario: Scenario;
  testSuite: TestSuite;

  assistant: boolean;
  minutes: { value: string, display: number }[] = [];

  @ViewChild(PropertiesConfigurationComponent) propertiesConfig: PropertiesConfigurationComponent;

  scenarioFormGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ScenarioDialogComponent>,
    private scenarioService: ScenarioService,
    private predefinedService: ScenarioPredefinedService,
    public snackBarService: MatSnackBar,
  ) {
    this.predefined = {
      Configuration: {},
      TestSuite: {},
      AfterHandler: {},
    };

  }

  ngOnInit() {
    this.scenario = this.data.scenario || new Scenario();
    this.testSuite = this.scenario.getTestSuite();
    this.originalScenario = cloneDeep(this.scenario);
    this.predefinedService.load().then(predefined => {
      this.predefined = predefined;
    });

    const afterHandlersId = ObjectID().str;

    this.scenario.afterHandlers[0] = this.scenario.afterHandlers[0] || {
      id: afterHandlersId,
      name: '',
      type: 'email',
      enabled: false,
      properties: { emails: '' }
    };

    this.scenarioFormGroup = new FormGroup({
      'scenarioName': new FormControl(this.scenario.name, Validators.required),
      'scenarioDescription': new FormControl(this.scenario.description, Validators.required),
      'pendingTimeout': new FormControl(this.scenario.pendingTimeout, Validators.required),
      'runningTimeout': new FormControl(this.scenario.runningTimeout, Validators.required),
      'afterhandlerName': new FormControl(this.scenario.afterHandlers[0].name, Validators.required),
      'afterhandlerEmails': new FormControl(this.scenario.afterHandlers[0].properties.emails, Validators.required),
      'schedule': new FormControl(this.scenario.schedule, this.cronValidator())
    });

    this.printMinutes();
  }

  get scenarioName() { return this.scenarioFormGroup.get('scenarioName'); }
  get scenarioDescription() { return this.scenarioFormGroup.get('scenarioDescription'); }
  get pendingTimeout() { return this.scenarioFormGroup.get('pendingTimeout'); }
  get runningTimeout() { return this.scenarioFormGroup.get('runningTimeout'); }
  get afterhandlerName() { return this.scenarioFormGroup.get('afterhandlerName'); }
  get afterhandlerEmails() { return this.scenarioFormGroup.get('afterhandlerEmails'); }
  get schedule() { return this.scenarioFormGroup.get('schedule'); }

  onSave(configProps: PropertiesConfigurationComponent ) {
    this.scenario.configuration.properties = configProps.resolveProps();
    this.scenario.setTestSuite(this.testSuite);

    if (this.data.mode === 'create') {
      this.scenarioService.createScenario(this.scenario)
        .then(scenarioRes => {
          this.snackBarService.open('Save scenario: ' + this.scenario.name, '', { duration: ScenarioConfig.snackBar.duration });
          this.dialogRef.close({ mode: this.data.mode, scenario: scenarioRes });
        })
        .catch(err => {
          this.snackBarService.open(err, '', { duration: ScenarioConfig.snackBar.duration });
        });
    } else {
      this.scenarioService.updateScenario(this.scenario)
        .then(scenarioRes => {
          this.snackBarService.open('Update scenario: ' + this.scenario.name, '', { duration: ScenarioConfig.snackBar.duration });
          this.dialogRef.close({ mode: this.data.mode, scenario: this.scenario });
        })
        .catch(err => {
          this.snackBarService.open(err, '', { duration: ScenarioConfig.snackBar.duration });
        });
    }
  }

  onReset() {
    this.scenario = cloneDeep(this.originalScenario);

    // reset properties
    this.propertiesConfig.reset();
  }

  onClose() {
    this.dialogRef.close();
  }

  truncated(scenarioName: string) {
    // todo: will truncate name of scenario in 2 line
    return truncate(scenarioName, { 'length': 30 });
  }

  printMinutes() {
    for (let i = 1; i <= 60; i++) {
      this.minutes.push({ value: `*1/${i}****`, display: i });
    }
  }

  /* Todo
  onAssistant() {
    this.assistant = true;
    console.log(this.assistant);
  }

  onCustom() {
    this.assistant = false;
    console.log(this.assistant);
  } */

  cronValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const cronValue = control.value;
      const isCronValid = cron.validate(cronValue);
      return isCronValid ? null : { 'invalidCron': { value: control.value } };
    };
  }


}
