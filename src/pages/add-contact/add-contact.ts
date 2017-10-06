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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contactProvider: ContactProvider,
    private platform: Platform,
    private db: SQLite
  ) {

    this.platform.ready().then(() => {

      //this.db = new SQLite();
      this.db.create({
        name: 'data.db',
        location: 'default'
      }).then((dbObj: SQLiteObject) => {

        this.dbObj = dbObj;

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
      email: this.email
    };

    this.contactProvider.save(this.dbObj, contact)
      .then(() => {
        alert('success');
        this.navCtrl.pop();// เพื่อให้กลับไป page ก่อนหน้า
      }, (error) => {
        console.log(error);
        alert('error');
      });

  }
}
