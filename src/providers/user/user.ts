import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserProvider {

  url: string = 'http://jsonplaceholder.typicode.com';

  constructor(public http: Http) {
    console.log('Hello UserProvider Provider');
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/users`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data); //ถ้า success ก็คืน data ออกไป
        }, error => {
          reject(error);// ถ้ามี error ก็ reject
        });//subscribe() คือการสั่งให้ไปดึงข้อมูลมาแล้วค่อยเอา res ไปทำ map() json ที่คือกลับมากคือ data
    })
  }

}
