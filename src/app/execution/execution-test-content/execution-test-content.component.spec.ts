import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ExecutionTestContentComponent } from './execution-test-content.component';
import { ExecutionStageContentComponent } from '../execution-stage-content/execution-stage-content.component';

import { MaterialModule } from '../../shared/material.module';

import { ExecutionService } from '../shared/execution.service';

describe('ExecutionTestContentComponent', () => {
  let component: ExecutionTestContentComponent;
  let fixture: ComponentFixture<ExecutionTestContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ExecutionTestContentComponent, ExecutionStageContentComponent],
      providers: [
        ExecutionService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionTestContentComponent);
    component = fixture.componentInstance;
    component.stage = { testId: '57e0e3ff7f256e3368cc4ecb', executionId: '5a39f04daa0cd1000fa2b411' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getResultsByTestId(stage)', () => {
    it('should call getResultsByTestId(stage) after component.getResultsByTestId(stage)', async(() => {
      // arranges
      const executionService = fixture.debugElement.injector.get(ExecutionService);
      const getResultsByTestIdSpy = spyOn(executionService, 'getResultsByTestId').and.returnValue(Promise.resolve());

      const stage = { testId: '57e0e3ff7f256e3368cc4ecb', executionId: '5a39f04daa0cd1000fa2b411' };

      // acts
      component.getResultsByTestId(stage);

      // asserts
      expect(getResultsByTestIdSpy).toHaveBeenCalled();

    }));

  });
});
