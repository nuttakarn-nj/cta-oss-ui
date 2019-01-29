import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OVERLAY_PROVIDERS } from '@angular/cdk/overlay';

// component
import { ScenarioCardComponent } from './scenario-card.component';
import { ScenarioDialogComponent } from '../index';

// service
import { ScenarioService } from '../shared/scenario.service';

// Model
import { Scenario } from '../shared/scenario.model';

// material module
import {
  MatDialog,
  MatSnackBar,
} from '@angular/material';

import { MaterialModule } from '../../shared/material.module';

class MatDialogMock {
  open() {
    return {
      afterClosed: () => {
        return Promise.resolve({ scenario: {} });
      }
    };
  }
}

class MatSnackBarMock {
  open() {
    return Promise.resolve();
  }
}

describe('ScenarioCardComponent', () => {
  let component: ScenarioCardComponent;
  let fixture: ComponentFixture<ScenarioCardComponent>;
  let scenarioNameDebugElement: DebugElement;
  let scenarioNameElement: HTMLElement;

  const scenario = {};

  // asynchronous beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ScenarioCardComponent],
      providers: [
        ScenarioService,
        MatDialog,
        MatSnackBar,
        OVERLAY_PROVIDERS,
        // { provide: MatDialog, useClass: MatDialogMock },
        // { provide: MatSnackBar, useClass: MatSnackBarMock },
      ],

    }).compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioCardComponent);
    component = fixture.componentInstance;

    scenarioNameDebugElement = fixture.debugElement.query(By.css('.mat-card-header .mat-card-title'));
    scenarioNameElement = scenarioNameDebugElement.nativeElement;

  });

  it('should create ScenarioCardComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('@Input() scenario: Scenario', () => {
    it('should update name of scenario in template', () => {
      // arrange
      const scenarioInput = {
        'id': '59e48a6c0a83e7000f30d58c',
        'name': 'edit-scenario14',
        'description': 'edit-scenario1',
        'testSuiteId': '59e48a7ac6ad4b435cb0009e',
        'testSuite': {
          'tests': [],
          'id': '59e48a7ac6ad4b435cb0009e'
        },
        'configuration': {
          'properties': {},
          'runMode': 'mono',
          'targetMode': 'normal',
          'type': 'physical',
          'name': 'edit-scenario1'
        },
        'pendingTimeout': 30000,
        'runningTimeout': 30000,
        'afterHandlers': []
      };

      const input = Scenario.load(scenarioInput);

      // act1
      component.scenario = input;
      fixture.detectChanges();

      // assert1
      expect(scenarioNameElement.textContent).toContain('edit-scenario14');

      // act2
      input.name = 'changed name';
      fixture.detectChanges();

      // assert2
      expect(scenarioNameElement.textContent).toContain('changed name');

    });
  });

  describe('run(scenario: any)', () => {
    it('should call runScenario() after component.run(scenario) ', async(() => {
      // arranges
      const scenarioService = fixture.debugElement.injector.get(ScenarioService);
      const runScenarioSpy = spyOn(scenarioService, 'runScenario').and.returnValue(Promise.resolve());

      // acts
      component.run(scenario);

      // asserts
      expect(runScenarioSpy).toHaveBeenCalled();

    }));

    it('should call snackBarService.open() with error when invalid response', fakeAsync(() => {
      // arranges
      const scenarioService = fixture.debugElement.injector.get(ScenarioService);
      const runScenarioSpy = spyOn(scenarioService, 'runScenario')
        .and.returnValue(Promise.reject('Invalid Response : expect data as response'));

      const matSnackService = fixture.debugElement.injector.get(MatSnackBar);
      const matSnackBarSpy = spyOn(matSnackService, 'open');

      // acts
      component.run(scenario);
      tick(); // wait for async runScenario

      // asserts
      expect(runScenarioSpy).toHaveBeenCalled();
      expect(matSnackBarSpy).toHaveBeenCalledWith('Invalid Response : expect data as response', '', { duration: 1000 });

    }));

  });

  describe('delete(scenario: any)', () => {
    it('should call deleteScenario() after component.delete(scenario)', async(() => {
      // arrange
      const scenarioService = fixture.debugElement.injector.get(ScenarioService);
      const deleteScenarioSpy = spyOn(scenarioService, 'deleteScenario').and.returnValue(Promise.resolve());

      // acts
      component.delete(scenario);

      // asserts
      expect(deleteScenarioSpy).toHaveBeenCalled();

    }));

    it('should call snackBarService.open() with error when invalid response', fakeAsync(() => {
      // arranges
      const scenarioService = fixture.debugElement.injector.get(ScenarioService);
      const deleteScenarioSpy = spyOn(scenarioService, 'deleteScenario')
        .and.returnValue(Promise.reject('Invalid Response'));

      const matSnackService = fixture.debugElement.injector.get(MatSnackBar);
      const matSnackBarSpy = spyOn(matSnackService, 'open');

      // acts
      component.delete(scenario);
      tick();

      // asserts
      expect(deleteScenarioSpy).toHaveBeenCalled();
      expect(matSnackBarSpy).toHaveBeenCalledWith('Invalid Response', '', { duration: 1000 });

    }));

  });

  describe('schedule(scenario: any)', () => {

    it('should call schedule() after component.schedule(scenario) (scheduled = false)', async(() => {
      // arrange
      const scenarioService = fixture.debugElement.injector.get(ScenarioService);
      const scheduleScenarioSpy = spyOn(scenarioService, 'updateScenario').and.returnValue(Promise.resolve());

      const scenario1 = { scheduled: false };

      // acts
      component.schedule(scenario1);

      // asserts
      expect(scenario1.scheduled).toEqual(true);
      expect(scheduleScenarioSpy).toHaveBeenCalled();

    }));

    it('should call snackBarService.open() with error when invalid response (scheduled = false)', fakeAsync(() => {
      // arranges
      const scenarioService = fixture.debugElement.injector.get(ScenarioService);
      const scheduleScenarioSpy = spyOn(scenarioService, 'updateScenario')
        .and.returnValue(Promise.reject('Invalid Response : expect object as response'));

      const matSnackService = fixture.debugElement.injector.get(MatSnackBar);
      const matSnackBarSpy = spyOn(matSnackService, 'open');

      // acts
      component.schedule(scenario);
      tick();

      // asserts
      expect(scheduleScenarioSpy).toHaveBeenCalled();
      expect(matSnackBarSpy).toHaveBeenCalledWith('Invalid Response : expect object as response', '', { duration: 1000 });

    }));

    it('should call schedule() with after component.schedule(scenario) (scheduled = true) ', async(() => {
      // arrange
      const scenarioService = fixture.debugElement.injector.get(ScenarioService);
      const scheduleScenarioSpy = spyOn(scenarioService, 'updateScenario').and.returnValue(Promise.resolve());

      const scenario1 = { scheduled: true };

      // acts
      component.schedule(scenario1);

      // asserts
      expect(scenario1.scheduled).toEqual(false);
      expect(scheduleScenarioSpy).toHaveBeenCalled();

    }));

    it('should call snackBarService.open() with error when invalid response (scheduled = true)', fakeAsync(() => {
      // arranges
      const scenarioService = fixture.debugElement.injector.get(ScenarioService);
      const scheduleScenarioSpy = spyOn(scenarioService, 'updateScenario')
        .and.returnValue(Promise.reject('Invalid Response : expect object as response'));

      const matSnackService = fixture.debugElement.injector.get(MatSnackBar);
      const matSnackBarSpy = spyOn(matSnackService, 'open');

      // acts
      component.schedule(scenario);
      tick(); // wait for async runScenario

      // asserts
      expect(scheduleScenarioSpy).toHaveBeenCalled();
      expect(matSnackBarSpy).toHaveBeenCalledWith('Invalid Response : expect object as response', '', { duration: 1000 });

    }));

  });


});
