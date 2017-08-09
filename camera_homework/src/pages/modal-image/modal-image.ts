import { DataService } from './../../providers/data-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ModalController, ViewController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
/**
 * Generated class for the ModalImage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-modal-image',
  templateUrl: 'modal-image.html',
  providers:[File]
})
export class ModalImage {
  image: any;
  fileTransfer: FileTransferObject;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private _navParams: NavParams, private _transfer: FileTransfer, 
    private _dataService: DataService,private _file : File) {
      
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
      app_version: '1.0.0',
      user_id: 3,
      login_token: '6H6U088Br0sb49zX1cq80fDnt4rPoBM4NEZyljaIRWwwIJb6Jwsy1dqcKDx9'
    }
    let test = [{ name: '' }, { name: '' }]
    var reader = new FileReader();
    console.log(reader);
    this._dataService.postFile(test, params).subscribe((res) => {
      console.log(res)
    })
  };
  
}
