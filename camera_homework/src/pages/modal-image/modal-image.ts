import { UtilityService } from './../../providers/utility-service';
import { DataService } from './../../providers/data-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ModalController, ViewController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
declare var window: any;
import { Observable } from 'rxjs/Observable';
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
  images: Object = {}
  files = [];
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private _navParams: NavParams, private _transfer: FileTransfer,
    private _dataService: DataService, private _file: File,private _utility : UtilityService) {
    this.image = _navParams.get('image');
    this.fileTransfer = this._transfer.create();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalImage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  getTime() {
    return new Date().getTime();
  }
  post(title, description) {
    let params = {
      title: title,
      description: description,      
    }
    window.resolveLocalFileSystemURL(this.image, (fileEntry) => {
      fileEntry.file((resFile) => {
        this.readFile(resFile).subscribe((blob) => {
          this.files.push(blob);
          console.log(this.files);
          this._dataService.postFile(this.files, params).subscribe((res) => {
            console.log(res)
            if(!res.status){
              this._utility.alert(res.message,'')
            }else{
              this._utility.alert('Upload success','')
            }
          })
        });
      })
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
