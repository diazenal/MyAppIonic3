import { ContactPage } from './../contact/contact';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { ContactProvider } from './../../providers/contact/contact';


@IonicPage()
@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html',
})
export class AddContactPage {

  firstName: string;
  lastName: string;
  sex: string;
  email: string;
  telephone: string;

  sexes: Array<{ id: number, name: string }> = [];

  //db: SQLite;
  dbObj: SQLiteObject;

  //สำหรับรับ id เพื่อแสดงการแก้ไข
  contactId: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contactProvider: ContactProvider,
    private platform: Platform,
    private db: SQLite
  ) {

    this.platform.ready().then(() => {

      //รับพารามิเตอร์ สำหรับเพื่อดึงไปแก้ไข
      this.contactId = this.navParams.get('contactId');

      //this.db = new SQLite();
      this.db.create({
        name: 'data.db',
        location: 'default'
      }).then((dbObj: SQLiteObject) => {

        this.dbObj = dbObj;

        this.getDetail(this.dbObj, this.contactId);

      }).catch((error) => {
        console.log(error);
      });

    });

    this.sexes.push({ id: 1, name: 'ชาย' });
    this.sexes.push({ id: 2, name: 'หญิง' });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactPage');
  }

  save() {
    let contact = {
      first_name: this.firstName,
      last_name: this.lastName,
      sex: this.sex,
      telephone: this.telephone,
      email: this.email,
      id: this.contactId
    };

    let promise: any;
    if (this.contactId) {
      promise = this.contactProvider.update(this.dbObj, contact);
    } else {
      promise = this.contactProvider.save(this.dbObj, contact);
    }

    promise
      .then(() => {
        alert('success');
        this.navCtrl.pop();// เพื่อให้กลับไป page ก่อนหน้า
      }, (error) => {
        console.log(error);
        alert('error');
      });

  }

  getDetail(dbObj: SQLiteObject, contactId: number) {

    //ถ้ามี contactId ค่อยดึงข้อมูล
    if (this.contactId) {
      this.contactProvider.getDetail(dbObj, contactId)
        .then((rows: any) => {
          this.firstName = rows.item(0).first_name;
          this.lastName = rows.item(0).last_name;
          this.sex = rows.item(0).sex;
          this.telephone = rows.item(0).telephone;
          this.email = rows.item(0).email;
        }, (error) => {
          console.log(error)
        });
    }
  }
}
