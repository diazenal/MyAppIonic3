import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';

import { MapPage } from './../map/map';

import { CustomerProvider } from './../../providers/customer/customer';

import { LoginPage } from './../login/login';

interface ICustomer {
  id: number;
  first_name?: string;
  last_name?: string;
  sex?: string;
  image?: string;
}


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers:[]//ถ้าต้องการใช้แบบ Individal provider ก็ให้กำหนด
})
export class MainPage {

  customers: Array<ICustomer> = [];
  token: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: CustomerProvider,
    public loadingCtrl: LoadingController,
    //public events: Events
  ) {

    //his.users.push({ name: 'John Doe', email: 'john@gmail.com' });
    //this.users.push({ name: 'Steve Job', email: 'steve@gmail.com' });
    this.token = localStorage.getItem('token');

  }

  goDetail() {
    this.navCtrl.push(MapPage, {  });
  }

  ionViewWillEnter() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait ...',
      spinner: 'dots'
    })
    loading.present();

    this.customers = [];//เตรียมค่าว่าง เป็นการเคลียร์ value ไปด้วย
    this.customerProvider.getCustomers(this.token)
      .then((data: any) => {
        //this.customers = data.rows;

        //วนลูป แบบ ES6 เพื่อแปลง value of image ให้สามารถแสดงรูปภาพได้ (ต้องเพิ่ม data:image/jpeg;base64, ด้วย)
        data.rows.forEach(v => {
          let obj = {
            id: v.id,
            first_name : v.first_name,
            last_name : v.last_name,
            sex : v.sex,
            image: v.image?'data:image/jpeg;base64,' + v.image : null
          }

          this.customers.push(obj);
        });

        loading.dismiss();
      }, (error) => {
        loading.dismiss();

      });
  }

  logout() {
    //remove token
    localStorage.removeItem('token');
    //this.navCtrl.setRoot(LoginPage);
    this.navCtrl.parent.parent.setRoot(LoginPage);

    //this.events.publish('logout');

  }

}
