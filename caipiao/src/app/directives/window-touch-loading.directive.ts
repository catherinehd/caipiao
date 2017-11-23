import { Directive, HostListener, Output, EventEmitter, Input, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[appWindowTouchLoading]'
})
export class WindowTouchLoadingDirective {
  @Output() canLoad = new EventEmitter();
  @Input('appWindowTouchLoading') scrollListening: boolean;
  documentEle: HTMLElement;

  constructor(@Inject(DOCUMENT) private document) {
    this.documentEle = this.document.documentElement;
  }

  @HostListener('window:scroll') onScroll() {
    if (!this.scrollListening) return;
    if (window.scrollY + this.documentEle.clientHeight >= this.documentEle.scrollHeight) {
      this.canLoad.emit();
    }
  }
}

