import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FadeInOutByState } from '../animations/fade-in-out.animation';
import { MoveUpDownAnimation } from '../animations/move-up-down.animation';

@Component({
  selector: 'app-gjjpicker',
  templateUrl: './gjjpicker.component.html',
  styleUrls: ['./gjjpicker.component.styl'],
  animations: [  FadeInOutByState, MoveUpDownAnimation ]
})
export class GjjpickerComponent implements OnInit {
  @Input() list: any[];
  @Input() isgjjPickerShow: boolean;
  @Output() onSelected = new EventEmitter<any>();
  confirmData: any[] | any;
  isMulty: boolean;

  constructor() { }

   ngOnInit() {
  }

  selected(data) {
    console.log(data);
    this.confirmData = '3.75';
    // if (i !== undefined) {
    //   this.confirmData[i] = index - 1;
    // } else {
    //   this.confirmData = index - 1;
    // }
  }

  confirm() {
    this.onSelected.emit(this.confirmData);
  }

  cancel() {
    this.onSelected.emit(null);
  }
}
