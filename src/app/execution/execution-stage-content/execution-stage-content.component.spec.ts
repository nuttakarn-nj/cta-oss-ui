import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionStageContentComponent } from './execution-stage-content.component';
import { MaterialModule } from '../../shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ExecutionStageContentComponent', () => {
  let component: ExecutionStageContentComponent;
  let fixture: ComponentFixture<ExecutionStageContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ExecutionStageContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionStageContentComponent);
    component = fixture.componentInstance;
    component.result = {
      '_id': '5a43811aaf236a000fe761e4',
      'executionId': '5a438119af236a000fe761e0',
      'testId': '57e0e3ff7f256e3368cc4ecc',
      'testName': null,
      'testDescription': null,
      'status': 'ok',
      'index': 2,
      'timestamp': 1514373402183.0,
      'ip': '172.19.0.6',
      'hostname': 'agt-docker',
      'type': null,
      'name': null,
      'description': null,
      'screenshot': null,
      'attachment': null,
      'build': null,
      'custom': null
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
