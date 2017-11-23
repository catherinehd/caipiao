import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { NavigateService } from '../../service/navigate.service';
import { UserStoreService } from '../../service/user-store.service';
import { ServiceInfo } from '../../config/config';
import { DeviceService } from '../../service/device.service';
import { SlideToRightAnimation } from '../../shared/animations/slide-to-right.animation';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['../login/login.component.styl', './reset-pwd.component.styl'],
  animations: [ SlideToRightAnimation ]
})
export class ResetPwdComponent implements OnInit {
  isLoading: boolean;
  tel: string;
  pwdSettingForm: FormGroup;
  pwdSetting: PwdSetting = new PwdSetting('', '', '');
  msg: string;
  isAgreementShow: boolean;
  isEyesOpen = {
    pwd: true,
    pwdAgain: true
  };
  validatorMsg = {
    oldpwd: {
      required: '请填写旧密码',
      pattern: '密码由6-15位字母及数字组成'
    },
    pwd: {
      required: '请填写密码',
      pattern: '密码由6-15位字母及数字组成'
    },
    pwdAgain: {
      required: '请再次填写密码',
      same: '两次密码输入不一致'
    }
  };
  @HostBinding('@slideToRightAnimation') slideToRightAnimation = true;
  @HostBinding('class.page') page = true;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private navigateService: NavigateService,
              private deviceService: DeviceService,
              private userStoreService: UserStoreService) {
    this.tel = ServiceInfo.tel;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.pwdSettingForm = this.formBuilder.group({
      'oldpwd': [this.pwdSetting.oldpwd, [
        Validators.required,
        Validators.pattern(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/)
      ]],
      'pwd' : [this.pwdSetting.pwd, [
        Validators.required,
        Validators.pattern(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/)
      ]],
      'pwdAgain' : [this.pwdSetting.pwdAgain, [
        Validators.required
      ]]
    });
  }

  clear(type) {
    this.pwdSettingForm.patchValue({[type]: ''});
  }

  testValid() {
    if (!this.pwdSettingForm.value.pwd || !this.pwdSettingForm.value.pwdAgain) return;
    for (const field in this.pwdSetting) {
      const control = this.pwdSettingForm.get(field);
      if (control && control.dirty && !control.valid) {
        for (const key in control.errors) {
          this.showTip(this.validatorMsg[field][key]);
          return;
        }
      }
    }
    if (this.pwdSettingForm.value.pwd !== this.pwdSettingForm.value.pwdAgain) {
      this.showTip(this.validatorMsg.pwdAgain.same);
      return;
    }
    return true;
  }


  onSubmit() {
    if (!this.testValid()) return;
    this.isLoading = true;
     // const params = this.activatedRoute.snapshot.params;
    // this.type === 1 ? this.register(params.tel, params.msgCode) : this.resPwd(params.tel, params.msgCode);
    console.log(this.pwdSettingForm.value.pwd); // 修改密码的接口

  }

  showTip(msg, callback ?: any) {
    this.isLoading = false;
    this.msg = msg;
    // setTimeout(() => {
    //   this.msg = '';
    //   if (callback) callback();
    // }, 3000);
  }

}

class PwdSetting {
  constructor(public oldpwd: string,
              public pwd: string,
              public pwdAgain: string ) {}
}
