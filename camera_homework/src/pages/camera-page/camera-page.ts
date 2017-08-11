import { UtilityService } from './../../providers/utility-service';
import { SystemConstants } from './../../common/system.constants';
import { DataService } from './../../providers/data-service';
import { ModalImage } from './../modal-image/modal-image';
import { LoginPage } from './../login-page/login-page';
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
/**
 * Generated class for the CameraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-camera-page',
  templateUrl: 'camera-page.html',
  providers: [Camera, ImagePicker]
})

export class CameraPage {
  options: CameraOptions;
  listImage: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, private _camera: Camera,
    public modalCtrl: ModalController, private _imagePicker: ImagePicker,private _dataService: DataService,private _utility : UtilityService) {
    this.listImage = [];
    console.log(_camera)
    this.options = {
      quality: 50,
      destinationType: this._camera.DestinationType.NATIVE_URI,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
    }
    this.getListImage();
  }
  presentModal(image) {
    let Modal = this.modalCtrl.create(ModalImage, { image: image });
    console.log(Modal);
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
  getListImage(){
    this._dataService.getListImg().subscribe(res=>{
      console.log(res)
      if(res.status == SystemConstants.STATUS_SUCCESS){
          this.listImage = res.data;
      }else{
        this._utility.alert('Error',res.message);
        this.logout();
      }
    })
  }
  showLibrary() {
    let options = this.options;
    options.sourceType = this._camera.PictureSourceType.PHOTOLIBRARY;
    this._camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      this.presentModal(imageData);
    }, (err) => {
    });
    this.showImagePicker();
  }
  showImagePicker() {
    var options = {
      maximumImagesCount: 10,
      width: 800,
      height: 800,
      quality: 50
    };
    this._imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }
  logout() {
    this.navCtrl.push(LoginPage).then(() => {
      localStorage.clear();
      const index = this.navCtrl.getActive().index;
      this.navCtrl.remove(0, index);
    });
  }
}
