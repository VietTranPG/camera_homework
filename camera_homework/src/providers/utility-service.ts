import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController, AlertController } from 'ionic-angular';
/*
  Generated class for the UtilityService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UtilityService {
  loading: any;
  constructor(public loadingCtrl: LoadingController, private alertCtrl: AlertController) { }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Đợi tý nhé ....'
    });
    this.loading.present();
  };
  hideLoading() {
    this.loading.dismiss();
  };
  alert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
