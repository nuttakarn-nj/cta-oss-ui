import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

// component
import { ScenarioCardComponent } from '../scenario-card/scenario-card.component';
import { ScenarioDialogComponent } from '../scenario-dialog/scenario-dialog.component';
import { ScenarioMainComponent } from './scenario-main.component';

// service
import { ScenarioService } from '../shared/scenario.service';

// material module
import { MaterialModule } from '../../shared/material.module';
import { MatDialog } from '@angular/material';

// model
import { Scenario } from '../shared/scenario.model';

describe('ScenarioMainComponent', () => {
  let component: ScenarioMainComponent;
  let fixture: ComponentFixture<ScenarioMainComponent>;

  const scenario = Scenario.load({
    'id': '59e48a6c0a83e7000f30d58c',
    'name': 'testSCN1',
    'description': 'testSCN',
    'testSuiteId': '59e48a7ac6ad4b435cb0009e',
    'testSuite': {
      'id': '59e48a7ac6ad4b435cb0009e'
    },
    'configuration': {
      'properties': {}
    },
    'pendingTimeout': 30000,
    'runningTimeout': 30000,
    'schedule': '*/10 * * * *',
    'scheduled': false,
    'afterHandlers': []
  });

  // asynchronous beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        BrowserModule,
      ],
      declarations: [ScenarioMainComponent, ScenarioCardComponent],
      providers: [
        ScenarioService,
        MatDialog,
        // { provide: MatDialog, useValue: matDialogStub }
      ],
    })
      .compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should call getScenarios() after component.ngOnInit()', async(() => {
      // arranges
      const scenarioService = fixture.debugElement.injector.get(ScenarioService);
      const getScenarioSpy = spyOn(scenarioService, 'getScenarios').and.returnValue(Promise.resolve());

      // acts
      component.ngOnInit();

      // asserts
      expect(getScenarioSpy).toHaveBeenCalled();
    }));

  });

  describe('getScenarios()', () => {
    it('should call getScenarios() after component.getScenarios()', async(() => {
      // arranges
      const scenarioService = fixture.debugElement.injector.get(ScenarioService);
      const getScenarioSpy = spyOn(scenarioService, 'getScenarios').and.returnValue(Promise.resolve());

      // acts
      component.getScenarios();

      // asserts
      expect(getScenarioSpy).toHaveBeenCalled();

    }));

  });

  describe('onDeleted(scenario)', () => {
    it('should have undeleted scenario after component.onDeleted(scenario)', () => {
      // arranges

      const scenario1 = Scenario.load({
        'id': '59e48a890a83e7000f30d58e',
        'name': 'testSCN2',
        'description': 'testSCN',
        'testSuiteId': '59e48a9dc6ad4b435cb000a0',
        'testSuite': {
          'id': '59e48a9dc6ad4b435cb000a0'
        },
        'configuration': {
          'properties': {}
        },
        'pendingTimeout': 30000,
        'runningTimeout': 30000,
        'afterHandlers': []
      });

      component.scenarios = [
        scenario,
        scenario1
      ];

      // acts
      component.onDeleted(scenario);

      // asserts
      expect(component.scenarios).not.toContain(scenario);
      expect(component.scenarios).toContain(scenario1);

    });

  });

  describe('openDialogForCreate()', () => {
    it('scenarios should have scenario after component.openDialogForCreate()', fakeAsync(() => {
      // arranges
      const dlogScenarioService = fixture.debugElement.injector.get(MatDialog);
      const dlogScenarioServiceSpy = spyOn(dlogScenarioService, 'open').and.returnValue({ afterClosed: () => { } });

      const dialogRef = dlogScenarioService.open(ScenarioDialogComponent, {
        data: { mode: 'create', scenario: scenario }
      });

      const afterClosedSpy = spyOn(dialogRef, 'afterClosed').and.returnValue(Observable.of({ scenario }));

      // acts
      component.scenarios = [];
      component.openDialogForCreate();
      tick();

      // asserts
      expect(afterClosedSpy).toHaveBeenCalled();
      expect(dlogScenarioServiceSpy).toHaveBeenCalled();
      expect(component.scenarios).toContain(scenario);
    }));

  });

});
