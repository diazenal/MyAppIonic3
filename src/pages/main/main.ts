import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  Events,
  ActionSheetController,
  Platform,
  AlertController
} from 'ionic-angular';

import { CallNumber } from '@ionic-native/call-number';

import { MapPage } from './../map/map';

import { CustomerProvider } from './../../providers/customer/customer';

import { LoginPage } from './../login/login';

import { AddCustomerPage } from './../add-customer/add-customer';

interface ICustomer {
  id: number;
  first_name?: string;
  last_name?: string;
  sex?: string;
  email?: string;
  image?: string;
}


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers:[CallNumber]//ถ้าต้องการใช้แบบ Individal provider ก็ให้กำหนด
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
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public callNumber: CallNumber
  ) {

    //his.users.push({ name: 'John Doe', email: 'john@gmail.com' });
    //this.users.push({ name: 'Steve Job', email: 'steve@gmail.com' });
    this.token = localStorage.getItem('token');

  }

  goDetail() {
    this.navCtrl.push(MapPage, {  });
  }

  getCustomers() {

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
            sex: v.sex,
            email: v.email,
            telephone: v.telephone,
            image: v.image ? 'data:image/jpeg;base64,' + v.image : null
          };

          this.customers.push(obj);
        });

        loading.dismiss();
      }, (error) => {
        loading.dismiss();

      });
  }

  ionViewWillEnter() {
    this.getCustomers();
  }

  logout() {
    //remove token
    localStorage.removeItem('token');
    //this.navCtrl.setRoot(LoginPage);
    this.navCtrl.parent.parent.setRoot(LoginPage);

    //this.events.publish('logout');

  }

  add() {
    this.navCtrl.push(AddCustomerPage);
  }

  showMenu(customer: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Action menu',
      buttons: [
        {
          text: 'ลบข้อมูล',
          role: 'destructive',//จะแสดงเป็นอักษรสีแดง สำหรับ ios
          icon: !this.platform.is('ios') ? 'trash': null,
          handler: () => {
            this.removeConfirm(customer);
          }
        },
        {
          text: 'แก้ไข',
          icon: !this.platform.is('ios') ? 'create': null,
          handler: () => {
            this.navCtrl.push(AddCustomerPage, { id: customer.id });
          }
        },
        {
          text: 'ดู/กำหนด แผนที่',
          icon: !this.platform.is('ios') ? 'map': null,
          handler: () => {
            this.navCtrl.push(MapPage, { customer: customer });
          }
        },
        {
          text: 'โทร ['+customer.telephone+']',
          icon: !this.platform.is('ios') ? 'call': null,
          handler: () => {
            console.log(customer.telephone);
            this.callNumber.callNumber(customer.telephone, true)
              .then(() => console.log('Launched dialer!'))
              .catch(() => console.log('Error launching dialer'));
          }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close': null,
          handler: () => { }
        }
      ]
    });
    actionSheet.present();
  }

  removeConfirm(customer: any) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'ต้องการลบรายการนี้ ใช่หรือไม่? ['+ customer.first_name +']',
      buttons: [
        {
          text: 'ยกเลิก', handler: () => { console.log('ยกเลิก')}
        },
        {
          text: 'ลบข้อมูล',
          handler: () => {
            console.log('ลบข้อมูลได้')
            this.customerProvider.remove(this.token, customer.id)
              .then((data: any) => {
                if (data.ok) {
                  this.getCustomers();
                }
              }, (error) => {
                console.log(error);
              });
          }
        }
      ]
    });
    confirm.present();
  }

  search(event) {
    //console.log('in search()')
    // ดูว่า event ที่ส่งมาจาก html มีค่า property อะไรให้ใช้บ้าง
    //console.log(event.target.value);
    let query = event.target.value;
    //ตรวจสอบก่อน ถ้ามี query ก็ค้นหา แต่ถ้าไม่มีเลย ก็ดึงกข้อมูลใหม่หมด
    if (query) {
      //console.log('in if');
      this.customers = [];
      this.customerProvider.search(this.token, query)
        .then((data: any) => {

          data.rows.forEach(v => {
            let obj = {
              id: v.id,
              first_name : v.first_name,
              last_name : v.last_name,
              sex: v.sex,
              email: v.email,
              telephone: v.telephone,
              image: v.image?'data:image/jpeg;base64,' + v.image : null
            }

            this.customers.push(obj);
          });

        });

    } else {
      //console.log('in else');
      this.getCustomers();
    }

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.customers = [];//เตรียมค่าว่าง เป็นการเคลียร์ value ไปด้วย
    this.customerProvider.getCustomers(this.token)
      .then((data: any) => {

        data.rows.forEach(v => {
          let obj = {
            id: v.id,
            first_name : v.first_name,
            last_name : v.last_name,
            sex: v.sex,
            email: v.email,
            telephone: v.telephone,
            image: v.image? 'data:image/jpeg;base64,' + v.image : null
          };

          this.customers.push(obj);
        });

        refresher.complete();

      }, (error) => {

        refresher.complete();
      });

  }

}
