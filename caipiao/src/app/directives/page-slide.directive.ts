import {
  Directive, HostListener, Output, EventEmitter, Input, Inject, ElementRef, OnChanges, Renderer2,
  AfterViewInit
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[appPageSlide]'
})

export class PageSlideDirective implements OnChanges, AfterViewInit {
  @Input() pageTo: number;
  @Input('appPageSlide') pageCount: number;
  @Input() scrollTip: HTMLElement;
  @Output() pageActive = new EventEmitter<number>();
  @Output() onPageSliding = new EventEmitter<boolean>();
  nativeElem: HTMLElement;
  transition: string;
  transform: string;
  pointX: number;
  pointY: number;
  proPointX: number;
  proPointY: number;
  clientWidth: number;
  startTimeStamp: number;
  endTimeStamp: number;
  list: HTMLElement[];
  refreshList: HTMLElement[];

  constructor(@Inject(DOCUMENT) private document, private el: ElementRef, private renderer: Renderer2) {
    this.clientWidth = this.document.documentElement.clientWidth;
    this.nativeElem = this.el.nativeElement;
    [this.transform, this.transition] = [this.supportStyleProp('transform'), this.supportStyleProp('transition')];
  }

  ngOnChanges(changes) {
    if (changes && changes.pageTo) {
      this.setPageStatus(this.pageTo);
    }
  }

  ngAfterViewInit() {
    this.list = this.el.nativeElement.querySelectorAll('.loan-panel');
    this.refreshList = this.el.nativeElement.querySelectorAll('.refresh-sec');
  }

  setListStyle(style, index) {
    if (this.list[index].style.overflow === style) return;
    style === 'auto' ? this.onPageSliding.emit(false) : this.onPageSliding.emit(true);
    this.renderer.setStyle(this.list[index], 'overflow', style);
  }

  getLeft(elem) {
    return elem.getBoundingClientRect().left;
  }

  supportStyleProp(property) {
    return (property in this.nativeElem.style) ? property : `webkit${property.substring(0, 1).toUpperCase()}${property.substring(1)}`;
  }

  @HostListener('touchstart', ['$event']) onTouchStart(e) {
    const touch = e.touches[0];
    [this.pointX, this.pointY] = [touch.clientX, touch.clientY];
    [this.proPointX, this.proPointY] = [this.pointX, this.pointY];
    this.startTimeStamp = e.timeStamp;
  }

  @HostListener('touchmove', ['$event']) onTouchmove(e) {
    if (this.refreshList[this.pageTo].offsetHeight > 0) return;
    const touch = e.touches[0];
    const [ pointX, pointY ] = [ touch.clientX, touch.clientY ];
    const distance = pointX - this.proPointX;
    if (Math.abs(pointY - this.proPointY) > Math.abs(distance)) return;
    const nativeLeft = this.getLeft(this.nativeElem);
    const scrollTipLeft = this.getLeft(this.scrollTip);
    if (nativeLeft >= 0 && distance >= 0) return;
    if (nativeLeft < (this.pageCount - 1) * -this.clientWidth && distance < 0) return;
    [this.proPointX, this.proPointY] = [pointX, pointY];
    this.setListStyle('hidden', this.pageTo);
    this.renderer.setStyle(this.nativeElem, this.transform, `translateX(${nativeLeft + distance}px)`);
    this.renderer.setStyle(this.scrollTip, this.transform,  `translateX(${scrollTipLeft - distance / this.pageCount}px)`);

  }

  @HostListener('touchend', ['$event']) onTouchend(e) {
    const touch = e.changedTouches[0];
    const [pointX, pointY] = [touch.clientX, touch.clientY];
    const distance = pointX - this.pointX;
    if (Math.abs(pointY - this.pointY) > Math.abs(distance)) return;
    const left = this.getLeft(this.nativeElem);
    this.endTimeStamp = e.timeStamp;
    this.setListStyle('auto', this.pageTo);
    this.autoScroll(distance, left);
  }

  autoScroll(distance, left) {
    const timeBetween = this.endTimeStamp - this.startTimeStamp;
    if (timeBetween < 200) {
      if (distance > 50 && this.pageTo > 0) {
        this.pageTo --;
      } else if (distance < -50 && this.pageTo < this.pageCount - 1) {
        this.pageTo ++;
      }
    } else {
      this.pageTo = Math.round(Math.abs(left / this.clientWidth));
    }
    this.setPageStatus(this.pageTo);
    this.transitionElem();
  }

  setPageStatus(pageIndex) {
    this.renderer.setStyle(this.nativeElem, this.transform, `translateX(${-this.clientWidth * pageIndex}px)`);
    this.renderer.setStyle(this.scrollTip, this.transform, `translateX(${this.clientWidth * pageIndex / this.pageCount}px)`);
  }

  transitionElem() {
    this.renderer.setStyle(this.nativeElem, 'will-change', this.transform);
    this.renderer.setStyle(this.nativeElem, this.transition, '150ms ease');
    this.renderer.setStyle(this.scrollTip, this.transition, '150ms ease-in-out');
    setTimeout(() => {
      this.pageActive.emit(this.pageTo);
      this.renderer.setStyle(this.nativeElem, this.transition, '');
      this.renderer.setStyle(this.scrollTip, this.transition, '');
      this.renderer.setStyle(this.nativeElem, 'will-change', 'auto');
    }, 150);
  }
}

