import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { NavigateService } from '../../service/navigate.service';
import { UserService } from '../../service/user.service';
import { ServiceInfo } from '../../config/config';
import { UserStoreService } from '../../service/user-store.service';
import { DeviceService } from '../../service/device.service';

@Component({
  selector: 'app-tel-valid',
  templateUrl: './tel-valid.component.html',
  styleUrls: ['../login/login.component.styl', './tel-valid.component.styl']
})
export class TelValidComponent implements OnInit {
  title: string;
  isLoading: boolean;
  msg: string;
  tip: string;
  isImgValidShow: boolean;
  imgCode: string;
  telValidForm: FormGroup;
  telValid: TelValid = new TelValid('', '', '');
  telControl: AbstractControl;
  isCounting: boolean;
  count: number;
  isAgreementShow: boolean;
  tel: string;
  telNum: string;
  validatorMsg = {
    tel: {
      required: '请填写手机号码',
      pattern: '请填写有效的手机号码'
    },
    pwd: {
      required: '请填写密码',
      pattern: '密码由6-15位字母及数字组成'
    },
    code: {
      required: '请填写手机验证码',
      pattern: '请填写正确的验证码'
    }
  };
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private navigateService: NavigateService,
              private userStoreService: UserStoreService,
              private deviceService: DeviceService,
              private userService: UserService) {
    this.tel = ServiceInfo.tel;
  }

  ngOnInit() {
    this.title = this.router.url.includes('register') ? '注册' : '找回密码';
    this.buildForm();
  }

  buildForm() {
    this.telValidForm = this.formBuilder.group({
      'tel': [this.telValid.tel, [
        Validators.required,
        Validators.pattern(/^1(3|4|5|7|8)\d\s\d{4}\s\d{4}$/)
      ]],
      'pwd': [this.telValid.tel, [
        Validators.pattern(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/)
      ]],
      'code': [this.telValid.code, [
        Validators.required,
        Validators.pattern(/^\d{4}$/)
      ]]
    });
    this.telControl = this.telValidForm.get('tel');
  }

  clear(type) {
    this.telValidForm.patchValue({[type]: ''});
  }

  testTel() {
    if (this.telControl.dirty && !this.telControl.valid) {
      for (const key in this.telControl.errors) {
        this.showTip(this.validatorMsg.tel[key]);
        return;
      }
    }
    const telArr = this.telControl.value.split(' ');
    this.telValid.tel = `${telArr[0]}${telArr[1]}${telArr[2]}`;
  }

  getCode() {
    this.testTel();
    if (!this.telControl.valid) return;
    this.userService.getCode(this.telValid.tel).subscribe(res => {
      const response = res.json();
      if (response) {
        this.counting();
      } else {
        this.showTip('请填写有效的手机号码');
      }
      // if (this.title !== '注册') {
      //   response ? this.isImgValidShow = true : this.showTip('该手机号码未注册');
      // } else {
      //   response ? this.showTip('该手机号码已注册') : this.isImgValidShow = true;
      // }
    });
  }

  closeImgValid(code) {
    this.isImgValidShow = false;
    if (!code) return;
    this.imgCode = code;
    this.showTip('短信验证码发送成功');
    this.counting();
  }

  counting() {
    this.isCounting = true;
    this.count = 60;
    const timer = setInterval(() => {
      this.count --;
      if (this.count <= 0) {
        clearInterval(timer);
        this.isCounting = false;
      }
    }, 1000);
  }

  testValid() {
    for (const field in this.telValid) {
      const control = this.telValidForm.get(field);
      if (control && control.dirty && !control.valid) {
        for (const key in control.errors) {
          this.showTip(this.validatorMsg[field][key]);
          return;
        }
      }
    }
  }

  onSubmit() {
    if (!this.telValidForm.value.tel || !this.telValidForm.value.code || !this.telValidForm.value.pwd) return;
    this.testValid();
    if (!this.telValidForm.valid) return;
    this.telNum = this.telValidForm.value.tel.substring(0 , 3) + this.telValidForm.value.tel.substring(4 , 8) + this.telValidForm.value.tel.substring(9 , 13);
    this.userService.register(this.telNum, this.telValidForm.value.pwd, this.telValidForm.value.code).subscribe(res => {
      res.json() ? this.goNextStep() : this.showTip('手机号或验证码错误');
    });
  }

  goNextStep() {
    // this.navigateService.push();
    // // const url = this.title === '注册' ? '/register/setting-pwd' : '/reset/setting-pwd';
    // const url = this.title === '注册' ? '/login' : '/reset/setting-pwd';
    // // this.navigateService.pushToRoute(url, {tel: this.telValid.tel, msgCode: this.telValidForm.value.code});
    // this.navigateService.pushToRoute(url);
    this.showTip1('注册成功', () => {
      // this.userStoreService.storeUser(response);
      this.navigateService.clearRouteList();
      this.navigateService.pushToRoute('/login');
    });
  }

  onSubmit2() {
    if (!this.telValidForm.value.tel || !this.telValidForm.value.code ) return;
    this.testValid();
    if (!this.telValidForm.valid) return;
    this.telNum = this.telValidForm.value.tel.substring(0 , 3) + this.telValidForm.value.tel.substring(4 , 8) + this.telValidForm.value.tel.substring(9 , 13);
    this.navigateService.pushToRoute('./forget-pwd/' + this.telNum + '/' + this.telValidForm.value.code);
  }

  showTip(msg) {
    this.msg = msg;
    // setTimeout(() => this.msg = '', 3000);
  }

  showTip1(msg, callback ?: any) {
    this.tip = msg;
    setTimeout(() => {
      this.tip = '';
      if (callback) callback();
    }, 3000);
  }

}

class TelValid {
  constructor(public tel: string,
              public pwd: string,
              public code: string) {}
}
