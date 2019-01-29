import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef, Renderer2 } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';


import { PageHeaderComponent } from './page-header.component';

import { MatIconModule, MatToolbarModule } from '@angular/material';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;
  let toggleButton;
  let titleHeader;
  let expectedTitle;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageHeaderComponent ],
      imports: [
        MatIconModule,
        MatToolbarModule,
      ],
      providers: [
        { provide: ElementRef },
        { provide: Renderer2 },
        { provide: OverlayContainer },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
    toggleButton = fixture.debugElement.query(By.css('.button-toggleTheme'));
    titleHeader = fixture.debugElement.query(By.css('.page-header-title'));
    expectedTitle = 'cta-oss';
    component.title = expectedTitle;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('title', () => {
    it('should display original title', () => {
      fixture.detectChanges();
      expect(titleHeader.nativeElement.textContent).toContain(expectedTitle);
    });

    it('should display a different test title', () => {
      const expected = 'Test Title';
      component.title = expected;
      fixture.detectChanges();
      expect(titleHeader.nativeElement.textContent).toContain(expected);
    });
  });

  describe('toggleTheme()', () => {
    it('should be called with click the button', () => {
      fixture.detectChanges();
      const toggleThemeFn = spyOn(component, 'toggleTheme');
      toggleButton.triggerEventHandler('click');
      expect(toggleThemeFn).toHaveBeenCalled();
    });
    it('default theme should be light', () => {
      fixture.detectChanges();
      expect(component.dark).toBe(false);
    });
    it('dark = false, change theme to dark', () => {
      fixture.detectChanges();
      toggleButton.triggerEventHandler('click');
      expect(component.dark).toBe(true);
    });
    it('dark = true, change theme to light', () => {
      fixture.detectChanges();
      component.dark = true;
      fixture.detectChanges();
      toggleButton.triggerEventHandler('click');
      expect(component.dark).toBe(false);
    });
  });
});
