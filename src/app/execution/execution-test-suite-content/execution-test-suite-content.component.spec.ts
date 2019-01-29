import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionTestSuiteContentComponent } from './execution-test-suite-content.component';

describe('ExecutionTestSuiteContentComponent', () => {
  let component: ExecutionTestSuiteContentComponent;
  let fixture: ComponentFixture<ExecutionTestSuiteContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionTestSuiteContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionTestSuiteContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
