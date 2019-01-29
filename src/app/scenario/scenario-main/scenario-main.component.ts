import { Component, OnInit } from '@angular/core';

// Components
import { ScenarioDialogComponent } from '../scenario-dialog/scenario-dialog.component';
import { ScenarioService } from '../shared/scenario.service';
import { Scenario } from '../shared/scenario.model';

// Services
import { MatDialog } from '@angular/material';

@Component({
  selector: 'cta-scenario-main',
  templateUrl: './scenario-main.component.html',
  styleUrls: ['./scenario-main.component.css']
})
export class ScenarioMainComponent implements OnInit {
  scenarios: Scenario[];

  constructor(private dlogScenarioService: MatDialog, private scenarioService: ScenarioService) { }

  ngOnInit() {
    this.getScenarios();
  }

  getScenarios() {
    this.scenarioService.getScenarios().then(scenarios => {
      this.scenarios = scenarios;
    }
    );
  }

  openDialogForCreate() {
    const dialogRef = this.dlogScenarioService.open(ScenarioDialogComponent, {
      data: { mode: 'create', scenario: new Scenario },
    });

    dialogRef.afterClosed().toPromise().then(res => {
      if (res && res.scenario) {
        this.scenarios.push(res.scenario);
      }
    });
  }

  onDeleted(scenario) {
    this.scenarios = this.scenarios.filter(item => item !== scenario);
    scenario = null;

  }
}
