import { ModalImage } from './../modal-image/modal-image';
import { LoginPage } from './../login-page/login-page';
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the CameraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-camera-page',
  templateUrl: 'camera-page.html',
  providers: [Camera]
})

export class CameraPage {
  options: CameraOptions;
  listImage: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, private _camera: Camera,
    public modalCtrl: ModalController) {
    this.listImage = [];
    console.log(_camera)
    this.options = {
      quality: 50,
      destinationType: this._camera.DestinationType.NATIVE_URI,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
    }
  }
  presentModal(image) {
    let Modal = this.modalCtrl.create(ModalImage, { image: image });
    Modal.present();
  }

  selectImageSource() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select image source',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.showCamera();
          }
        }, {
          text: 'Library',
          handler: () => {
            this.showLibrary();
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
  showCamera() {
    let options = this.options;
    options.sourceType = this._camera.PictureSourceType.CAMERA
    this._camera.getPicture(options).then((imageData) => {
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(imageData);
      this.presentModal(imageData);
      this.listImage.push(imageData);
    }, (err) => {
      // Handle error
    });
  }
  showLibrary() {
    let options = this.options;
    options.sourceType = this._camera.PictureSourceType.PHOTOLIBRARY;
    this._camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      let blob: any = new Blob([imageData], { type: "image/jpeg" });
      blob.name = 'image.jpg';
      console.log(blob)
      this.presentModal(imageData);
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.listImage.push(imageData);
    }, (err) => {
      // Handle error
    });
  }
}
