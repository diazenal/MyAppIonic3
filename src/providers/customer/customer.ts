import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CustomerProvider {

  constructor(public http: Http, @Inject('API_URL') private url: string) {
    console.log('Hello CustomerProvider Provider');
  }

  getCustomers(token: string) {
    return new Promise((resolve, reject) => {

      let header = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: header });

      this.http.get(`${this.url}/customers`, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data); //ถ้า success ก็คืน data ออกไป
        }, error => {
          reject(error);// ถ้ามี error ก็ reject
        });//subscribe() คือการสั่งให้ไปดึงข้อมูลมาแล้วค่อยเอา res ไปทำ map() json ที่คือกลับมากคือ data
    })
  }

  getGroups(token: string) {
    return new Promise((resolve, reject) => {

      let header = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: header });

      this.http.get(`${this.url}/customers/groups`, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data); //ถ้า success ก็คืน data ออกไป
        }, error => {
          reject(error);// ถ้ามี error ก็ reject
        });//subscribe() คือการสั่งให้ไปดึงข้อมูลมาแล้วค่อยเอา res ไปทำ map() json ที่คือกลับมากคือ data
    })
  }

  saveCustomer(token: string, customer: any) {
    return new Promise((resolve, reject) => {

      let header = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: header });

      let body = {
        firstName: customer.firstName,
        lastName: customer.lastName,
        sex: customer.sex,
        customerTypeId: customer.customerTypeId,
        telephone: customer.telephone,
        email: customer.email,
        image: customer.image
      };

      this.http.post(`${this.url}/customers`, body, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data); //ถ้า success ก็คืน data ออกไป
        }, error => {
          reject(error);// ถ้ามี error ก็ reject
        });//subscribe() คือการสั่งให้ไปดึงข้อมูลมาแล้วค่อยเอา res ไปทำ map() json ที่คือกลับมากคือ data
    })
  }

  remove(token: string, customerId: number) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });

      this.http.delete(`${this.url}/customers/${customerId}`, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }

}
