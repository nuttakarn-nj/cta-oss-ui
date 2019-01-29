import { Component, OnInit, ElementRef, Renderer2, Input } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'cta-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})

export class PageHeaderComponent implements OnInit {
  @Input() sidenav;
  @Input() title: string;
  dark: boolean;
  darkThemeClass = 'unicorn-dark-theme';

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private overlayContainer: OverlayContainer) {
  }

  ngOnInit() {
    this.dark = false;
  }

  toggleTheme() {
    this.dark = !this.dark;
    if (this.dark) {
      this.renderer.addClass(this.element.nativeElement, this.darkThemeClass);
      this.overlayContainer.getContainerElement().classList.add(this.darkThemeClass);
    } else {
      this.renderer.removeClass(this.element.nativeElement, this.darkThemeClass);
      this.overlayContainer.getContainerElement().classList.remove(this.darkThemeClass);
    }
  }
}
