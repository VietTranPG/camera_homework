import { UtilityService } from './utility-service';
import { SystemConstants } from './../common/system.constants';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataService {

  constructor(public http: Http, private _utility: UtilityService) {
    console.log('Hello DataService Provider');
  }
  login(data) {
    this._utility.showLoading();
    var url = SystemConstants.BASE_API + 'user/getLogin';
    return this.http.post(url, data, { withCredentials: true }).map(res => {
      this._utility.hideLoading();
      return res.json()
    })
  };
  postFile(files, params) {
    this._utility.showLoading();
    params.app_version = '1.0.0';
    params.user_id = this.getUser().id;
    params.login_token = this.getUser().login_token;
    let url = `${SystemConstants.BASE_API}api/uploadImage`;
    let formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file[]', files[i], files[i].name);
    }
    if (params !== "" && params !== undefined && params !== null) {
      for (var property in params) {
        if (params.hasOwnProperty(property)) {
          formData.append(property, params[property]);
        }
      }
    }
    return this.http.post(url, formData).map(res => {
      this._utility.hideLoading();
      return res.json();
    }, error => {
      this._utility.hideLoading();
      this._utility.alert('Upload file error', '');
    });
  }
  getListImg() {
    this._utility.showLoading();
    let user = this.getUser();
    let user_id = user.id;
    let login_token = user.login_token;
    let app_version = "1.0.0";
    let url = `${SystemConstants.BASE_API}api/getImageList?user_id=${user_id}&login_token=${login_token}&app_version=${app_version}`;
    return this.http.get(url).map(res => {
      this._utility.hideLoading();
      return res.json();
    }, err => {
      this._utility.hideLoading();
      this._utility.alert('Get image error', '');
    })
  }
  getUser() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

}
