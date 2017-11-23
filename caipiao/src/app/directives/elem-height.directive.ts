import {Directive, ElementRef, Renderer2, Input, Inject, AfterViewInit} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[appElemHeight]'
})
export class ElemHeightDirective implements AfterViewInit {
  @Input('appElemHeight') elemHeight: number | number[] | HTMLElement | HTMLElement[];
  winHeight: number;
  constructor(private renderer: Renderer2,
              private el: ElementRef,
              @Inject (DOCUMENT) private document) {
    this.winHeight = this.document.documentElement.clientHeight;
  }

  ngAfterViewInit() {
    setTimeout(() => this.setElemHeight(), 0);
  }

  setElemHeight() {
    if (!this.elemHeight) return;
    let height = 0;
    if (Array.isArray(this.elemHeight)) {
      if (typeof this.elemHeight[0] === 'number') {
        height = (this.elemHeight as number[]).reduce((prev, curr) => prev + curr, 0);
      } else {
        for (const elem of this.elemHeight as HTMLElement[]) {
          height += elem.offsetHeight
        }
      }
    } else {
      if (typeof this.elemHeight === 'number') {
        height = this.elemHeight;
      } else {
        height = (this.elemHeight as HTMLElement).offsetHeight;
      }
    }
    this.renderer.setStyle(this.el.nativeElement, 'height', `${this.winHeight - height}px`)
  }
}
