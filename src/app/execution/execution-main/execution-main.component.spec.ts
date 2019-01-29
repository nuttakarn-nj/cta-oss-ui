import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// component
import { ExecutionMainComponent } from './execution-main.component';
import { ExecutionTestSuiteContentComponent } from '../execution-test-suite-content/execution-test-suite-content.component';
import { ExecutionHostnameContentComponent } from '../execution-hostname-content/execution-hostname-content.component';
import { ExecutionTestContentComponent } from '../execution-test-content/execution-test-content.component';
import { ExecutionStageContentComponent } from '../execution-stage-content/execution-stage-content.component';

// Material
import { MaterialModule } from '../../shared/material.module';

// service
import { ExecutionService } from '../shared/execution.service';

describe('ExecutionMainComponent', () => {
  const asyncSetup = (activatedRouteStub) => async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterModule,
        BrowserAnimationsModule
      ],
      declarations: [
        ExecutionMainComponent,
        ExecutionTestSuiteContentComponent,
        ExecutionHostnameContentComponent,
        ExecutionTestContentComponent,
        ExecutionStageContentComponent
      ],
      providers: [
        ExecutionService,
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
    })
      .compileComponents();
  });

  describe('Component Construction with ExecutionID on ActivatedRoute', () => {
    let component: ExecutionMainComponent;
    let fixture: ComponentFixture<ExecutionMainComponent>;

    const ActivatedRouteStub = {
      snapshot: {
        paramMap: { get: () => 'testExecutionId' }
      }
    };

    beforeEach(asyncSetup(ActivatedRouteStub));

    beforeEach(() => {
      fixture = TestBed.createComponent(ExecutionMainComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
      it('should call getExecution() after component.ngOnInit()', async(() => {
        // arranges
        const executionService = fixture.debugElement.injector.get(ExecutionService);
        const getExecutionSpy = spyOn(executionService, 'getExecution').and.returnValue(Promise.resolve());

        // acts
        component.ngOnInit();

        // asserts
        expect(getExecutionSpy).toHaveBeenCalled();
      }));

    });

    describe('getExecution()', () => {
      it('should call getExecution() after component.getExecution()', async(() => {
        // arranges
        const executionService = fixture.debugElement.injector.get(ExecutionService);
        const getExecutionSpy = spyOn(executionService, 'getExecution').and.returnValue(Promise.resolve());

        const executionId = '5a43285432b4ed000f8de0d3';

        // acts
        component.getExecution(executionId);

        // asserts
        expect(getExecutionSpy).toHaveBeenCalled();

      }));

    });

  });

  describe('Component Construction without ExecutionID on ActivatedRoute', () => {
    let component: ExecutionMainComponent;
    let fixture: ComponentFixture<ExecutionMainComponent>;

    const ActivatedRouteStub = {
      snapshot: {
        paramMap: { get: () => null }
      }
    };

    beforeEach(asyncSetup(ActivatedRouteStub));

    beforeEach(() => {
      fixture = TestBed.createComponent(ExecutionMainComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
      it('should call getExecutions() after component.ngOnInit()', async(() => {
        // arranges
        const executionService = fixture.debugElement.injector.get(ExecutionService);
        const getExecutionsSpy = spyOn(executionService, 'getExecutions').and.returnValue(Promise.resolve());

        // acts
        component.ngOnInit();

        // asserts
        expect(getExecutionsSpy).toHaveBeenCalled();
      }));

    });

    describe('getExecutions()', () => {
      it('should call getExecutions() after component.getExecutions()', async(() => {
        // arranges
        const executionService = fixture.debugElement.injector.get(ExecutionService);
        const getExecutionsSpy = spyOn(executionService, 'getExecutions').and.returnValue(Promise.resolve());

        // acts
        component.getExecutions();

        // asserts
        expect(getExecutionsSpy).toHaveBeenCalled();

      }));

    });
  });
});
