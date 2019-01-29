import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioTestsuiteComponent } from './scenario-testsuite.component';
import { TestSuite } from '../shared/test-suite.model';
import {MaterialModule} from '../../shared/material.module';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ScenarioTestsuiteComponent', () => {
  let component: ScenarioTestsuiteComponent;
  let fixture: ComponentFixture<ScenarioTestsuiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioTestsuiteComponent ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioTestsuiteComponent);
    component = fixture.componentInstance;
    component.testSuite = new TestSuite();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
