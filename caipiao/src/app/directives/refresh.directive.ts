import {Directive, HostListener, Input, Renderer2, ElementRef, AfterViewInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Directive({
  selector: '[appRefresh]',
})
export class RefreshDirective implements AfterViewInit, OnChanges {
  @Input('appRefresh') refreshChild: any;
  @Input() isRefreshed: boolean;
  @Output() onRefresh = new EventEmitter();
  @Input() cantRefresh: boolean;
  nativeElem: HTMLElement;
  refreshElem: HTMLElement;
  containerElem: HTMLElement;
  proPointX: number;
  proPointY: number;
  navHeight: number;
  maxHeight = 80;
  minHeight = 60;
  transform: string;
  transition: string;
  originHeight: number;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.nativeElem = this.elementRef.nativeElement;
    this.containerElem = this.renderer.parentNode(this.nativeElem);
    [this.transform, this.transition] = [this.supportStyleProp('transform'), this.supportStyleProp('transition')];
  }

  supportStyleProp(property) {
    return (property in this.nativeElem.style) ? property : `webkit${property.substring(0, 1).toUpperCase()}${property.substring(1)}`;
  }

  ngOnChanges(changes) {
    if (changes && changes.isRefreshed && changes.isRefreshed.currentValue) {
      setTimeout(() => this.transitionElem(), 500);
    }
  }

  getTop() {
    return this.nativeElem.getBoundingClientRect();
  }

  getHeight() {
    return this.refreshElem.getBoundingClientRect();
  }

  ngAfterViewInit() {
    this.refreshElem = this.refreshChild.refreshElem.nativeElement;
  }

  @HostListener('touchstart', ['$event']) onTouchstart(e) {
    const top = this.getTop().top;
    if (!this.navHeight) this.navHeight = top;
    if (top < this.navHeight) return;
    const touch = e.touches[0];
    [this.proPointX, this.proPointY] = [touch.clientX, touch.clientY];
  }

  @HostListener('touchmove', ['$event']) onTouchmove(e) {
    if (this.cantRefresh) return;
    if (this.getTop().top < this.navHeight && !this.originHeight) return;
    const touch = e.touches[0];
    const [pointX, pointY] = [touch.clientX, touch.clientY];
    if (!this.proPointY) {
       [this.proPointX, this.proPointY] = [pointX, pointY];
    }
    if (Math.abs(this.proPointX - pointX) > Math.abs(this.proPointY - pointY)) {
      this.proPointY = undefined;
      return;
    }
    if (this.originHeight === undefined) this.originHeight = this.getHeight().height;
    const distance = pointY - this.proPointY;
    if (this.originHeight >= this.maxHeight && distance >= 0) return;
    if (this.originHeight <= 0 && distance <= 0) return;
    if (this.containerElem.style.overflow !== 'hidden') {
      this.renderer.setStyle(this.containerElem, 'overflow', 'hidden');
    }

    let height = this.originHeight + distance;
    if (height > this.maxHeight) height = this.maxHeight;
    if (height < 0) height = 0;
    [this.proPointX, this.proPointY] = [pointX, pointY];
    this.renderer.setStyle(this.refreshElem, 'will-change', 'height');
    this.refreshChild.refreshTip = height >= this.minHeight ? '释放刷新' : '下拉刷新';
    this.renderer.setStyle(this.refreshElem, 'height', height + 'px');
    this.originHeight = height;
  }


  @HostListener('touchend', ['$event']) onTouchend(e) {
    if (this.cantRefresh) {
      this.transitionElem();
      this.proPointY = undefined;
      this.originHeight = undefined;
      this.renderer.setStyle(this.containerElem, 'overflow', 'auto');
      return;
    }
    if (this.refreshChild.refreshTip === '释放刷新') {
      this.refreshChild.refreshTip = '正在刷新';
      this.onRefresh.emit();
    } else {
      this.transitionElem();
    }
    this.proPointY = undefined;
    this.originHeight = undefined;
    this.renderer.setStyle(this.containerElem, 'overflow', 'auto');
  }

  transitionElem() {
    this.renderer.setStyle(this.refreshElem, this.transition, 'height 150ms');
    this.renderer.setStyle(this.refreshElem, 'height', 0);
    this.renderer.setStyle(this.refreshElem, 'will-change', this.transition);
    setTimeout(() => {
      this.renderer.setStyle(this.nativeElem, 'will-change', 'auto');
      this.renderer.setStyle(this.nativeElem, this.transition, '');
      this.refreshChild.refreshTip = '';
    }, 150)
  }
}
