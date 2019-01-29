import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

// component
import { InstanceDialogComponent } from './instance-dialog.component';

// service
import { InstanceService } from '../shared/instance.service';

// model
import { Instance } from '../shared/instance.model';

// material
import { MaterialModule } from '../../shared/material.module';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';

const matDialogRefStub = {
  close() {
    return {};
  }
};

describe('InstanceDialogComponent', () => {
  let component: InstanceDialogComponent;
  let fixture: ComponentFixture<InstanceDialogComponent>;
  const data = {
    instance: {
      id: '5a3a1fda53b3e6000ff417c1',
      hostname: 'agt - docker',
      ip: '172.19.0.5',
      properties: {
        'platform': 'linux',
        'hostname': 'agt - docker'
      },
      executionId: null,
      state: null
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstanceDialogComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,

      ],
      providers: [
        InstanceService,
        MatSnackBar,
        { provide: MatDialog, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: matDialogRefStub }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('delete(prop)', () => {
    it('should have prop2 after component.delete(prop1)', () => {
      // arranges

      const prop1 = { key: 'hostname', value: 'agt-docker' };
      const prop2 = { key: 'hostname1', value: 'agt-docker1' };

      component.props = [
        prop1,
        prop2
      ];

      // acts
      component.delete(prop1);

      // asserts
      expect(component.props).not.toContain(prop1);
      expect(component.props).toContain(prop2);

    });

  });

  describe('onSave()', () => {
    it('should call resolveProps() after component.onSave()', async(() => {
      // arranges
      const resolvePropsSpy = spyOn(component, 'resolveProps').and.returnValue({ hostname: 'agt-docker' });

      // acts
      component.onSave();

      // asserts
      expect(resolvePropsSpy).toHaveBeenCalled();
    }));

    it('should call updateInstance()', async(() => {
      // arranges
      const instanceService = fixture.debugElement.injector.get(InstanceService);
      const updateInstanceSpy = spyOn(instanceService, 'updateInstance').and.returnValue(Promise.resolve());

      // acts
      component.onSave();

      // asserts
      expect(updateInstanceSpy).toHaveBeenCalled();

    }));

    it('should call snackBarService.open() with error when invalid response', fakeAsync(() => {
      // arranges
      const instanceService = fixture.debugElement.injector.get(InstanceService);
      const updateInstanceSpy = spyOn(instanceService, 'updateInstance')
        .and.returnValue(Promise.reject('Invalid Response : expect an object as response'));

      const matSnackService = fixture.debugElement.injector.get(MatSnackBar);
      const matSnackBarSpy = spyOn(matSnackService, 'open');

      // acts
      component.onSave();
      tick();

      // asserts
      expect(updateInstanceSpy).toHaveBeenCalled();
      expect(matSnackBarSpy).toHaveBeenCalledWith('Invalid Response : expect an object as response', '', { duration: 1000 });

    }));

  });

  describe('onReset', () => {
    it('props should equal originalProps after component.onReset()', async(() => {
      // arranges
      component.props = [
        { key: 'hostname', value: 'agt-docker' }
      ];

      component.originalProps = [
        { key: 'hostname1', value: 'agt-docker1' }
      ];
      // acts
      component.onReset();

      // asserts
      expect(component.props).toEqual(component.originalProps);
      expect(component.props === component.originalProps).toBe(false);
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
