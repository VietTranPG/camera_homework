import { UtilityService } from './../../providers/utility-service';
import { SystemConstants } from './../../common/system.constants';
import { CameraPage } from './../camera-page/camera-page';
import { DataService } from './../../providers/data-service';
import { RegisterPage } from './../register-page/register-page';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
  providers: [Facebook, GooglePlus]
})
export class LoginPage {
  email: string = "tranhoangviet2412@gmail.com";
  password: string = "123123";
  constructor(public navCtrl: NavController, public navParams: NavParams, private _dataService: DataService,
    private _utility: UtilityService, private fb: Facebook, private googlePlus: GooglePlus) {
    console.log(this.fb);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  gotoSignup() {
    this.navCtrl.push(RegisterPage)
  }
  login(email, password) {
    let data = { email: email, password: password, app_version: "1.0.0" }
    this._dataService.login(data).subscribe(res => {
      if (res.status == SystemConstants.STATUS_ERROR) {
        this._utility.alert('Login fail', res.message);
      } else {
        localStorage.setItem('user', JSON.stringify(res.data));
        this.navCtrl.push(CameraPage).then(() => {
          const index = this.navCtrl.getActive().index;
          this.navCtrl.remove(0, index);
        });
      }
    })
  }
  loginFacebook() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.navCtrl.push(CameraPage).then(() => {
          const index = this.navCtrl.getActive().index;
          this.navCtrl.remove(0, index);
        });
      }
      )
      .catch(e => console.log('Error logging into Facebook', e));
  }
  loginGoogle() {
    this.googlePlus.login({})
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }
}
