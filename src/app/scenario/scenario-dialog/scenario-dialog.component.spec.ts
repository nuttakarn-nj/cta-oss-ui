import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fakeAsync, tick } from '@angular/core/testing';

// component
import { ScenarioDialogComponent } from './scenario-dialog.component';
import { PropertiesConfigurationComponent } from '../properties-configuration/properties-configuration.component';
import { ScenarioTestsuiteComponent } from '../scenario-testsuite/scenario-testsuite.component';

// service
import { ScenarioService } from '../shared/scenario.service';
import { ScenarioPredefinedService } from '../shared/scenario-predefined.service';

// material module
import { MaterialModule } from '../../shared/material.module';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

// model
import { Scenario } from '../shared/scenario.model';

const matDialogRefStub = {
  close() {
    return {};
  }
};

describe('DialogScenarioComponent', () => {
  let component: ScenarioDialogComponent;
  let fixture: ComponentFixture<ScenarioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScenarioDialogComponent, PropertiesConfigurationComponent, ScenarioTestsuiteComponent],
      imports: [
        MaterialModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        ScenarioService,
        ScenarioPredefinedService,
        MatSnackBar,
        { provide: MatDialog, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: matDialogRefStub }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onReset', () => {
    it('scenario should equal originalScenari after component.onReset()', async(() => {
      // arranges
      component.scenario = Scenario.load({
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
        'afterHandlers': []
      });

      component.originalScenario = Scenario.load({
        'id': '59e48a6c0a83e7000f30d58d',
        'name': 'testSCN2',
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
        'afterHandlers': []
      });

      // acts
      component.onReset();

      // asserts
      expect(component.scenario).toEqual(component.originalScenario);
      expect(component.scenario === component.originalScenario).toBe(false);
    }));

  });

  describe('onSave(configProps)', () => {
    it('should call resolveProps() after component.onSave(propConf)', async(() => {
      // arranges
      const propConf = new PropertiesConfigurationComponent();
      const propConfSpy = spyOn(propConf, 'resolveProps').and.returnValue({ hostname: 'agt-docker' });

      // acts
      component.onSave(propConf);

      // asserts
      expect(propConfSpy).toHaveBeenCalled();
    }));

    it('should call createScenario() if mode is create ', async(() => {
      // arranges
      const scenarioService = fixture.debugElement.injector.get(ScenarioService);
      const createScenarioSpy = spyOn(scenarioService, 'createScenario').and.returnValue(Promise.resolve());

      const propConf = new PropertiesConfigurationComponent();
      propConf.editableProps = [{ key: 'hostname', value: 'agt-docker' }];
      component.data.mode = 'create';

      // acts
      component.onSave(propConf);

      // asserts
      expect(createScenarioSpy).toHaveBeenCalled();

    }));

    it('should call snackBarService.open() with error when invalid response (mode is create)', fakeAsync(() => {
      // arranges
      const scenarioService = fixture.debugElement.injector.get(ScenarioService);
      const createScenarioSpy = spyOn(scenarioService, 'createScenario')
        .and.returnValue(Promise.reject('Invalid Response : expect an object as response'));

      const matSnackService = fixture.debugElement.injector.get(MatSnackBar);
      const matSnackBarSpy = spyOn(matSnackService, 'open');

      const propConf = new PropertiesConfigurationComponent();
      propConf.editableProps = [{ key: 'hostname', value: 'agt-docker' }];
      component.data.mode = 'create';

      // acts
      component.onSave(propConf);
      tick();

      // asserts
      expect(createScenarioSpy).toHaveBeenCalled();
      expect(matSnackBarSpy).toHaveBeenCalledWith('Invalid Response : expect an object as response', '', { duration: 1000 });

    }));

    it('should call updateScenario() if mode is update ', async(() => {
      // arranges
      const scenarioService = fixture.debugElement.injector.get(ScenarioService);
      const updateScenarioSpy = spyOn(scenarioService, 'updateScenario').and.returnValue(Promise.resolve());

      const propConf = new PropertiesConfigurationComponent();
      propConf.editableProps = [{ key: 'hostname', value: 'agt-docker' }];
      component.data.mode = 'update';

      // acts
      component.onSave(propConf);

      // asserts
      expect(updateScenarioSpy).toHaveBeenCalled();

    }));

    it('should call snackBarService.open() with error when invalid response (mode is update)', fakeAsync(() => {
      // arranges
      const scenarioService = fixture.debugElement.injector.get(ScenarioService);
      const updateScenarioSpy = spyOn(scenarioService, 'updateScenario')
        .and.returnValue(Promise.reject('Invalid Response : expect an object as response'));

      const matSnackService = fixture.debugElement.injector.get(MatSnackBar);
      const matSnackBarSpy = spyOn(matSnackService, 'open');

      const propConf = new PropertiesConfigurationComponent();
      propConf.editableProps = [{ key: 'hostname', value: 'agt-docker' }];
      component.data.mode = 'update';

      // acts
      component.onSave(propConf);
      tick();

      // asserts
      expect(updateScenarioSpy).toHaveBeenCalled();
      expect(matSnackBarSpy).toHaveBeenCalledWith('Invalid Response : expect an object as response', '', { duration: 1000 });

    }));

  });

  describe('onClose()', () => {
    it('should call onClose() after component.onClose()', async(() => {
      // arranges
      const dialogRef = fixture.debugElement.injector.get(MatDialogRef);
      const closeSpy = spyOn(dialogRef, 'close');

      // acts
      component.onClose();

      // asserts
      expect(closeSpy).toHaveBeenCalled();
    }));

  });



});
