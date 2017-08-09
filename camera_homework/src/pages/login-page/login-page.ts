import { UtilityService } from './../../providers/utility-service';
import { SystemConstants } from './../../common/system.constants';
import { CameraPage } from './../camera-page/camera-page';
import { DataService } from './../../providers/data-service';
import { RegisterPage } from './../register-page/register-page';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {
email:string = "tranhoangviet2412@gmail.com";
password : string = "123123";
  constructor(public navCtrl: NavController, public navParams: NavParams,private _dataService : DataService,private _utility : UtilityService) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  gotoSignup() {
    this.navCtrl.push(RegisterPage)
  }
  login(email, password) {
    let data = { email: email, password: password,app_version: "1.0.0" }
    this._dataService.login(data).subscribe(res => {     
      if (res.status == SystemConstants.STATUS_ERROR) {
        this._utility.alert('Login fail', res.message);
      } else {
        localStorage.setItem('login_token',res.data.login_token);
        this.navCtrl.push(CameraPage).then(() => {
          const index = this.navCtrl.getActive().index;
          this.navCtrl.remove(0, index);
        });
      }
    })
  }
}