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

  sex: string;
  email: string;
  telephone: string;
  firstName: string;
  lastName: string;
  customerTypeId: number;


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

  save() {

    let customer = {
      firstName: this.firstName,
      lastName: this.lastName,
      sex: this.sex,
      email: this.email,
      telephone: this.telephone,
      customerTypeId: this.customerTypeId,
      image: null
    };

    this.customerProvider.saveCustomer(this.token, customer)
      .then((data: any) => {
        if (data.ok) {
          alert('success');
        }
      }, (error) => {

      });

  }

}
