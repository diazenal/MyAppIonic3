import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class LoginProvider {

  constructor(public http: Http, @Inject('API_URL')public url: string) {
    console.log('Hello LoginProvider Provider');
  }

  //รับ username, password มาจาก Component
  doLogin(username: string, password: string) {
    return new Promise((resolve, reject) => {

      let header = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: header });
      let body = { username: username, password: password };

      this.http.post(`${this.url}/users/login`, body, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data); //ถ้า success ก็คืน data ออกไป
        }, error => {
          reject(error);// ถ้ามี error ก็ reject
        });//subscribe() คือการสั่งให้ไปดึงข้อมูลมาแล้วค่อยเอา res ไปทำ map() json ที่คือกลับมากคือ data
    })
  }

}
