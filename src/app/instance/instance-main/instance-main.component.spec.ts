import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// component
import { InstanceMainComponent } from './instance-main.component';
import { InstanceCardComponent } from '../instance-card/instance-card.component';

// service
import { InstanceService } from '../shared/instance.service';

// material
import { MaterialModule } from '../../shared/material.module';

describe('InstanceMainComponent', () => {
  let component: InstanceMainComponent;
  let fixture: ComponentFixture<InstanceMainComponent>;

  // asynchronous beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
      ],
      declarations: [InstanceMainComponent, InstanceCardComponent],
      providers: [
        InstanceService
      ]
    })
      .compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should call getInstances() after component.ngOnInit()', async(() => {
      // arranges
      const instanceService = fixture.debugElement.injector.get(InstanceService);
      const getInstancesSpy = spyOn(instanceService, 'getInstances').and.returnValue(Promise.resolve());

      // acts
      component.ngOnInit();

      // asserts
      expect(getInstancesSpy).toHaveBeenCalled();
    }));

  });

  describe('getInstances()', () => {
    it('should call getInstances() after component.getScenarios()', async(() => {
      // arranges
      const instanceService = fixture.debugElement.injector.get(InstanceService);
      const getInstancesSpy = spyOn(instanceService, 'getInstances').and.returnValue(Promise.resolve());

      // acts
      component.getInstances();

      // asserts
      expect(getInstancesSpy).toHaveBeenCalled();

    }));

  });


});
