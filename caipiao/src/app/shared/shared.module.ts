import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModalComponent } from './modal/modal.component';
import { NavComponent } from './nav/nav.component';
import { TabComponent } from './tab/tab.component';
import { FlyMsgComponent } from './fly-msg/fly-msg.component';
import { LoadingComponent } from './loading/loading.component';

import { PageSlideDirective } from '../directives/page-slide.directive';
import { TouchLoadingDirective } from '../directives/touch-loading.directive';
import { DevicePaddingDirective } from '../directives/device-padding.directives';
import { TelFormatDirective } from '../directives/tel-format.directive';
import { SameValidatorDirective } from '../directives/same.directive'
import { ElemHeightDirective } from '../directives/elem-height.directive';
import { ElemMarginDirective } from '../directives/elem-margin.directive';
import { WindowTouchLoadingDirective } from '../directives/window-touch-loading.directive';
import { PickerDirective } from '../directives/picker.directive';
import { RefreshDirective } from '../directives/refresh.directive';

import { NumFixedPipe } from '../pipes/num-fixed.pipe';
import { ListLoadingComponent } from './list-loading/list-loading.component';
import { PickerComponent } from './picker/picker.component';
import { RefreshComponent } from './refresh/refresh.component';
import { FastClickDirective } from '../directives/fast-click.directive';
import { TabfalseComponent } from './tabfalse/tabfalse.component';
import { GjjpickerComponent } from './gjjpicker/gjjpicker.component';

@NgModule({
  imports: [ CommonModule, RouterModule ],
  declarations: [
    ModalComponent, NavComponent, TabComponent, FlyMsgComponent, LoadingComponent, ListLoadingComponent,
    PageSlideDirective, TouchLoadingDirective, DevicePaddingDirective, TelFormatDirective, SameValidatorDirective,
    ElemHeightDirective, ElemMarginDirective, WindowTouchLoadingDirective, PickerDirective, RefreshDirective,
    NumFixedPipe, PickerComponent, RefreshComponent, FastClickDirective, TabfalseComponent, GjjpickerComponent
  ],
  exports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    ModalComponent, NavComponent, TabComponent, FlyMsgComponent, LoadingComponent, ListLoadingComponent,
    PageSlideDirective, TouchLoadingDirective, DevicePaddingDirective, TelFormatDirective, SameValidatorDirective,
    ElemHeightDirective, ElemMarginDirective, WindowTouchLoadingDirective, PickerDirective, RefreshDirective,
    NumFixedPipe, PickerComponent, RefreshComponent, FastClickDirective, TabfalseComponent, GjjpickerComponent
  ]
})

export class SharedModule { }
