import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ModalController, ViewController } from 'ionic-angular';
/**
 * Generated class for the ModalImage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-modal-image',
  templateUrl: 'modal-image.html',
})
export class ModalImage {
  image: any;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private _navParams: NavParams) {
    this.image = _navParams.get('image');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalImage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  post() {

  }
}
