import { Directive, ElementRef, Renderer2, HostListener, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appPicker]'
})
export class PickerDirective implements AfterViewInit {
  @Output() onSelected = new EventEmitter<number>();
  nativeElem: HTMLElement;
  itemHeight: number;
  listHeight: number;
  childrenList: HTMLCollection;
  pointY: number;
  originTop: number;
  transform: string;
  transition: string;
  totalDistance = 0;
  startTimeStamp: number;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.nativeElem = this.elementRef.nativeElement;
    [this.transform, this.transition] = [this.supportStyleProp('transform'), this.supportStyleProp('transition')];
  }

  ngAfterViewInit() {
    this.listHeight = this.nativeElem.scrollHeight;
    this.itemHeight = this.listHeight / this.nativeElem.childElementCount;
    this.childrenList = this.nativeElem.children;
    this.originTop = this.getElemTop();
    this.renderer.addClass(this.childrenList[2], 'active');
    this.renderer.addClass(this.childrenList[3], 'next-sub-active');
    this.renderer.addClass(this.childrenList[4], 'next-un-active');
  }

  supportStyleProp(property) {
    return (property in this.nativeElem.style) ? property : `webkit${property.substring(0, 1).toUpperCase()}${property.substring(1)}`;
  }

  getElemTop() {
    return this.nativeElem.getBoundingClientRect().top;
  }

  @HostListener('touchstart', ['$event']) onTouchstart(e: TouchEvent) {
    this.pointY = e.touches[0].clientY;
    // this.startTimeStamp = e.timeStamp;
    e.preventDefault();
  }

  @HostListener('touchmove', ['$event']) onTouchmove(e) {
    const distance = e.touches[0].clientY - this.pointY;
    this.scroll(distance);
  }

  @HostListener('touchend', ['$event']) onTouchend(e) {
    const pointY = e.changedTouches[0].clientY;
    const distance = pointY - this.pointY;
    this.totalDistance += distance;
    this.pointY = pointY;
    const maxIndex = this.childrenList.length - 4;
    let index = Math.floor((this.originTop - this.getElemTop()) / this.itemHeight + 1.5);
    if (index < 1) index = 1;
    if (index > maxIndex) index = maxIndex;
    // if (e.timeStamp - this.startTimeStamp < 200) {
    //   if (distance > 50) {
    //     index = index - 3 ? 1 : index - 3;
    //   }else if (distance < -50) {
    //     index = index + 3 > maxIndex ? maxIndex : index;
    //   }
    // }
    this.resetScrollTop(index);
    // this.transitionElem();
    this.onSelected.emit(index);
  }

  scroll(distance) {
    const currTop = this.getElemTop();
    // console.log(-currTop + this.originTop, this.listHeight - 5 * this.itemHeight);
    if (distance > 0 && currTop >= this.originTop) return;
    if (distance < 0 && this.listHeight - 5 * this.itemHeight <= this.originTop - currTop ) return;
    this.renderer.setStyle(this.nativeElem, this.transform, `translateY(${this.totalDistance + distance}px)`);
    this.toggleClass();
  }

  toggleClass() {
    const currTop = this.getElemTop();
    const index = Math.floor((this.originTop - currTop) / this.itemHeight + 1.5);
    this.toggleClasses(index);
  }

  resetScrollTop(index) {
    this.renderer.setStyle(this.nativeElem, this.transform, `translateY(${-this.itemHeight * (index - 1)}px)`);
    this.toggleClasses(index);
  }

  toggleClasses(index) {
    if (this.childrenList[index - 1]) {
      this.renderer.setAttribute(this.childrenList[index - 1], 'class', 'pre-un-active')
    }
    if (this.childrenList[index]) {
      this.renderer.setAttribute(this.childrenList[index], 'class', 'pre-sub-active')
    }
    if (this.childrenList[index + 1]) {
      this.renderer.setAttribute(this.childrenList[index + 1], 'class', 'active')
    }
    if (this.childrenList[index + 2]) {
      this.renderer.setAttribute(this.childrenList[index + 2], 'class', 'next-sub-active')
    }
    if (this.childrenList[index + 3]) {
      this.renderer.setAttribute(this.childrenList[index + 3], 'class', 'next-un-active')
    }
  }

  transitionElem() {
    this.renderer.setStyle(this.nativeElem, 'will-change', this.transform);
    this.renderer.setStyle(this.nativeElem, this.transition, '200ms ease');
    setTimeout(() => {
      this.renderer.setStyle(this.nativeElem, 'will-change', 'auto');
      this.renderer.setStyle(this.nativeElem, this.transition, '');
    }, 200)
  }

}
