import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FadeInOutByState } from '../animations/fade-in-out.animation';
import { MoveUpDownAnimation } from '../animations/move-up-down.animation';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.styl'],
  animations: [  FadeInOutByState, MoveUpDownAnimation ]
})
export class PickerComponent implements OnInit {
  @Input() list: any[][] | any[];
  @Input() isPickerShow: boolean;
  @Output() onSelected = new EventEmitter<any>();
  confirmData: any[] | any;
  isMulty: boolean;

  constructor() { }

  ngOnInit() {
    if (Array.isArray(this.list[0])) {
      this.isMulty = true;
      this.confirmData = [];
    }
  }

  selected(index, i?: number) {
    if (i !== undefined) {
      this.confirmData[i] = index - 1;
    } else {
      this.confirmData = index - 1;
    }
  }

  confirm() {
    this.onSelected.emit(this.confirmData);
  }

  cancel() {
    this.onSelected.emit(null);
  }
}
