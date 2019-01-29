import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { fakeAsync } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

// component
import { InstanceCardComponent } from './instance-card.component';
import { InstanceDialogComponent } from '../instance-dialog/instance-dialog.component';

// material
import { MaterialModule } from '../../shared/material.module';

// model
import { Instance } from '../shared/instance.model';

// service
import { MatDialog } from '@angular/material';
import { tick } from '@angular/core/testing';

describe('InstanceCardComponent', () => {
  let component: InstanceCardComponent;
  let fixture: ComponentFixture<InstanceCardComponent>;

  const instance = {
    id: '5a3a1fda53b3e6000ff417c1',
    'hostname': 'agt-docker',
    'ip': '172.19.0.5',
    'properties': {
      'platform': 'linux',
      'hostname': 'agt-docker'
    },
    'executionId': null,
    'state': null
  };

  // asynchronous beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [InstanceCardComponent],
      providers: [
        MatDialog
      ]
    }).compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceCardComponent);
    component = fixture.componentInstance;
    component.instance = {
      id: '5a3a1fda53b3e6000ff417c1',
      'hostname': 'agt-docker',
      'ip': '172.19.0.5',
      'properties': {
        'platform': 'linux',
        'hostname': 'agt-docker'
      },
      'executionId': null,
      'state': null
    };

    fixture.detectChanges();
  });

  it('should create InstanceCardComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('openDialogForEdit(instance: any)', () => {
    it('component.instance should equal instance after component.openDialogForEdit(instance: any)', fakeAsync(() => {
      // arranges
      const dlogScenarioService = fixture.debugElement.injector.get(MatDialog);
      const dlogScenarioServiceSpy = spyOn(dlogScenarioService, 'open').and.returnValue({ afterClosed: () => { } });

      const dialogRef = dlogScenarioService.open(InstanceDialogComponent, {
        data: { mode: 'create', instance: instance }
      });

      const afterClosedSpy = spyOn(dialogRef, 'afterClosed').and.returnValue(Observable.of({ instance }));

      // acts
      component.openDialogForEdit(instance);
      tick();

      // asserts
      expect(afterClosedSpy).toHaveBeenCalled();
      expect(dlogScenarioServiceSpy).toHaveBeenCalled();
      expect(component.instance).toEqual(instance);
    }));

  });


});
