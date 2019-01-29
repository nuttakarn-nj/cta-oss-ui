import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Scenario } from '../shared/scenario.model';

// Components
import { ScenarioDialogComponent } from '../scenario-dialog/scenario-dialog.component';

// Services
import { ScenarioService } from '../shared/scenario.service';

// config file
import { ScenarioConfig } from '../shared/scenario.config';

// Material modules
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';

// Lodash
import { cloneDeep, truncate } from 'lodash';

@Component({
  selector: 'cta-scenario-card',
  templateUrl: './scenario-card.component.html',
  styleUrls: ['./scenario-card.component.css']
})

export class ScenarioCardComponent {

  @Input() scenario: Scenario;
  @Output() onDeleted = new EventEmitter();

  constructor(
    private scenarioService: ScenarioService,
    public snackBarService: MatSnackBar,
    public dlogScenarioService: MatDialog) { }

  openDialogForEdit(scenario: any) {

    const dialogRef = this.dlogScenarioService.open(ScenarioDialogComponent, {
      data: { mode: 'edit', scenario: cloneDeep(scenario) }
    });

    dialogRef.afterClosed().toPromise().then(res => {
      if (res && res.scenario) {
        this.scenario = res.scenario;
      }
    }
    );
  }

  run(scenario: any) {
    this.scenarioService.runScenario(scenario.id)
      .then(() => {
        this.snackBarService.open('run scenario: ' + scenario.name, '', { duration: ScenarioConfig.snackBar.duration });
      })
      .catch(err => {
        this.snackBarService.open(err, '', { duration: ScenarioConfig.snackBar.duration });
      });
  }

  delete(scenario: any) {
    this.scenarioService.deleteScenario(scenario.id)
      .then(() => {
        this.onDeleted.emit(scenario);
        this.snackBarService.open('Delete scenario: ' + scenario.name, '', { duration: ScenarioConfig.snackBar.duration });
      })
      .catch(err => {
        this.snackBarService.open(err, '', { duration: ScenarioConfig.snackBar.duration });
      });
  }

  schedule(scenario: any) {

    if (scenario.scheduled === false) {
      scenario.scheduled = true;

      this.scenarioService.updateScenario(scenario)
        .then(() => {
          this.snackBarService.open('schedule on', '', { duration: ScenarioConfig.snackBar.duration });
        })
        .catch(err => {
          this.snackBarService.open(err, '', { duration: ScenarioConfig.snackBar.duration });
        });
    } else {
      scenario.scheduled = false;
      this.scenarioService.updateScenario(scenario)
        .then(() => {
          this.snackBarService.open('schedule off', '', { duration: ScenarioConfig.snackBar.duration });
        })
        .catch(err => {
          this.snackBarService.open(err, '', { duration: ScenarioConfig.snackBar.duration });
        });
    }

  }

  truncated(scenarioName: string) {
    // todo: will truncate name of scenario in 2 line
    return truncate(scenarioName, { 'length': 19 });
  }

}
