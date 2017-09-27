import { CustomerProvider } from './../../providers/customer/customer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import moment มาใช้
import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-add-customer',
  templateUrl: 'add-customer.html',
  providers: []
})
export class AddCustomerPage {

  sexes: Array<{ id: number, name: string }> = [];
  groups: Array<{ id: number, name: string }> = [];
  birthDate: any;
  token: string;



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: CustomerProvider
  ) {
    this.sexes.push({ id: 1, name: 'ชาย' });
    this.sexes.push({ id: 2, name: 'หญิง' });

    this.token = localStorage.getItem('token');

    // ใช้ moment จัดการวันที่ format (ให้ติดตั้งด้วยคำสั่ง npm i moment --save)
    this.birthDate = moment().format('YYYY-MM-DD');
  }

  ionViewDidLoad() {
    this.customerProvider.getGroups(this.token)
      .then((data: any) => {
        this.groups = data.rows;
      }, (error) => {

      });
  }

}
