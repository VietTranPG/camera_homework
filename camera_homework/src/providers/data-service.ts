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

  constructor(public http: Http,private _utility : UtilityService) {
    console.log('Hello DataService Provider');
  }
  login(data) {
    this._utility.showLoading();
    var url = SystemConstants.BASE_API + 'user/getLogin';
    return this.http.post(url, data, { withCredentials: true }).map(res => {
      this._utility.hideLoading();
      return res.json()
    })
  }
}
