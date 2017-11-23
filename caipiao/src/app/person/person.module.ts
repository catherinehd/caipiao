import { NgModule } from '@angular/core';


import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SettingPwdComponent } from './setting-pwd/setting-pwd.component';
import { IndexComponent } from './index/index.component';
import { PersonRoutingModule } from './person-routering.modue';
import { AgreementComponent } from './agreement/agreement.component';
import { TelValidComponent } from './tel-valid/tel-valid.component';
import { ImgValidComponent } from './tel-valid/img-valid/img-valid.component';
import { SettingComponent } from './setting/setting.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HelpComponent } from './help/help.component';
import { ServiceComponent } from './service/service.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { SettingPersonalInfoComponent } from './setting-personal-info/setting-personal-info.component';
import { UserService } from '../service/user.service';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';

@NgModule({
  imports: [ PersonRoutingModule, SharedModule ],
  declarations: [
    LoginComponent, RegisterComponent, SettingPwdComponent, TelValidComponent, ImgValidComponent,
    IndexComponent, AgreementComponent, SettingComponent, AboutUsComponent, HelpComponent, ServiceComponent, PersonalInfoComponent, SettingPersonalInfoComponent, ResetPwdComponent
  ],
  providers: [ UserService ]
})
export class PersonModule { }
