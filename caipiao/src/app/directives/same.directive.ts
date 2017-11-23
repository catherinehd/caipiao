import { Directive, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Validator, Validators, ValidatorFn, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appSame]',
  providers: [{provide: NG_VALIDATORS, useExisting: SameValidatorDirective, multi: true}]
})
export class SameValidatorDirective implements Validator, OnChanges {
  @Input() same: string;
  private valFn = Validators.nullValidator;
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['same'];
    if (change) {
      this.valFn = sameValidator(change.currentValue);
    }else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}

export function sameValidator(oldVal): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const newVal = control.value;
    return newVal === oldVal ? {'same' : {newVal}} : null;
  };
}



