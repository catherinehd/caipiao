import { Directive, Renderer2, ElementRef, Input, AfterViewInit } from '@angular/core';
import { DeviceService } from '../service/device.service';

@Directive({
  selector: '[appElemMargin]'
})
export class ElemMarginDirective implements AfterViewInit {
  @Input('appElemMargin') margin: number | HTMLElement;
  constructor(private el: ElementRef, private renderer: Renderer2, private deviceService: DeviceService) {}

  ngAfterViewInit() {
    const deviceMargin = this.deviceService.isIos ? 20 : 0;
    let marginTop = 0;
    if (typeof this.margin === 'number') {
      marginTop = this.margin ? this.margin + deviceMargin : deviceMargin;
    } else {
      marginTop = this.margin.offsetHeight;
    }
    this.renderer.setStyle(this.el.nativeElement, 'margin-top', `${marginTop}px`)
  }
}
