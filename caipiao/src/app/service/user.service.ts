import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ApiList } from '../config/apiList';

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) {}
  // 登录
  login(mobile, loginPwd) {
    return this.httpService.getMethod({
      url: 'Critique/login',
      data: {
        mobile: mobile,
        password: loginPwd
      }
    });
  }

  // 注册
  register(mobile, loginPwd, code) {
    return this.httpService.getMethod({
      url: 'Critique/register',
      data: {
        mobile: mobile,
        password: loginPwd,
        code: code
      }
    });
  }

  // 修改昵称
  updateNickName(mobile , nickName) {
    return this.httpService.getMethod({
      url: 'Critique/setNickName',
      data: {
        mobile: mobile,
        nickname: nickName
      }
    });
  }

  // 设置用户信息
  setNickName(name, mobile, address) {
    return this.httpService.getMethod( {
      contact_name: name,
      contact_mobile: mobile,
      contact_address: address
    });
  }

  // 忘记密码
  updatePwd(mobile, password, code) {
    return this.httpService.getMethod({
      url: 'Critique/ResetPassword',
      data: {
        mobile: mobile,
        password: password,
        code: code
      }
    });
  }

  // 修改密码
  setPwd(mobile, password, newpassword) {
    return this.httpService.getMethod({
      url: 'Critique/setPassword',
      data: {
        mobile: mobile,
        password: password,
        newpassword: newpassword
      }
    });
  }

  // 验证手机号是否已经注册
  testHasRegister(mobile) {
    return this.httpService.getMethod({
      url: 'User/IsReg',
      data: {
        mobile: mobile
      }
    });
  }

  // 验证短信验证码
  testMsgCode(mobile, msgCode) {
    return this.httpService.getMethod({
      url: 'ValidationCode/ValidMobile',
      data: {
        uuid: mobile,
        code: msgCode
      }
    });
  }

  // 获取图片验证码
  getImgCode(mobile) {
    const rd = new Date().getTime();
    return `${new ApiList().getUrl()}ValidationCode/SendImg?uuid=${mobile}&rd=${rd}`;
  }

  // 验证图片验证码, 发送短信验证码
  getMsgCode(mobile, imgCode, type: string) {     // type---Register || ForgetPwd
    return this.httpService.getMethod({
      url: 'ValidationCode/ValidCodeMobile',
      data: {
        mobile: mobile,
        code: imgCode,
        type: type
      }
    });
  }
  // 获取短信验证码，不需要图片验证
  getCode(mobile) {
    return this.httpService.getMethod( {
      url: 'Critique/sendCode',
      data: {
        mobile: mobile
      }
    });
  }

  // 加积分
  addintegral(mobile, score) {
    return this.httpService.getMethod( {
      url: 'Critique/AddScore',
      data: {
        mobile: mobile,
        score: score
      }
    });
  }

  // 消费积分
  userintegral(mobile, score) {
    return this.httpService.getMethod( {
      url: 'Critique/SubScore ',
      data: {
        mobile: mobile,
        score: score
      }
    });
  }
}
