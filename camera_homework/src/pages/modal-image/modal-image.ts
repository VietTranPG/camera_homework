import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { CameraPage } from './../camera-page/camera-page';
import { UtilityService } from './../../providers/utility-service';
import { DataService } from './../../providers/data-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ModalController, ViewController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
declare var window: any;
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
/**
 * Generated class for the ModalImage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-modal-image',
  templateUrl: 'modal-image.html',
  providers: [File]
})
export class ModalImage {
  image: any;
  fileTransfer: FileTransferObject;
  images: any;
  files = [];
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private _navParams: NavParams, private _transfer: FileTransfer,
    private _dataService: DataService, private _file: File, private _utility: UtilityService) {
    this.images = _navParams.get('images');
    this.image = _navParams.data;
    console.log(this.images);
    let test = []
    for (let i = 0; i < this.images.length; i++) {
      window.resolveLocalFileSystemURL(this.images[i], (fileEntry) => {
        fileEntry.file(res => {
          test.push(res);
        })
      })
    }
    setTimeout(() => {
      this.handleArrayFile(test).subscribe((res) => {
        
      })
    }, 1000);

  }
  handleArrayFile(files: any) {
    let observableBatch = [];
    files.forEach(file => {
      observableBatch.push(this.readFile(file).map((res) => {
        this.files.push(res);
      }))
    });
    return Observable.forkJoin(observableBatch);
  }
  dismiss() {
    this.viewCtrl.dismiss().then(()=>{
      // this._cameraPage.getListImage();
    });
  }
  getTime() {
    return new Date().getTime();
  }
  post(title, description) {
    let params = {
      title: title,
      description: description,
    }
    console.log(this.files);
    this._dataService.postFile(this.files, params).subscribe((res) => {
      console.log(res)
      if (!res.status) {
        this._utility.alert(res.message, '')
      } else {
        this.files = [];
        this.dismiss();
        this._utility.alert('Upload success', '')
      }
    }, (err) => {
      this._utility.hideLoading();
      this._utility.alert('Upload file error', '');
    })
  };
  readFile(resFile) {
    var reader = new FileReader();
    return new Observable(observer => {
      reader.onloadend = function (e) {
        let blob: any = new Blob([reader.result], { type: "image/jpeg" });
        let name = new Date().getTime();
        blob.name = `viettran_${name}.jpg`;
        observer.next(blob);
      };
      reader.readAsArrayBuffer(resFile)
    })
  }
}
