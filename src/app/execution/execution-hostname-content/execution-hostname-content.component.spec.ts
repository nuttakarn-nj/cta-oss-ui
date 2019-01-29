import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ExecutionHostnameContentComponent } from './execution-hostname-content.component';

import { MaterialModule } from '../../shared/material.module';

describe('ExecutionHostnameContentComponent', () => {
  let component: ExecutionHostnameContentComponent;
  let fixture: ComponentFixture<ExecutionHostnameContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ExecutionHostnameContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionHostnameContentComponent);
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
