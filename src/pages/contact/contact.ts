import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { AddContactPage } from './../add-contact/add-contact';

import { ContactProvider } from './../../providers/contact/contact';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[]
})
export class ContactPage {

  private sqliteObject: SQLiteObject;

  contacts: Array<{
    id: any,
    first_name: string,
    last_name: string,
    sex: string,
    telephone: string,
    email: string
  }> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,

    private contactProvider: ContactProvider,
    private platform: Platform,
    private loadingCtrl: LoadingController
  ) {

    this.platform.ready()
      .then(() => {

        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        }).then((dbObj: SQLiteObject) => {

          this.sqliteObject = dbObj;

          this.getContacts();

        }).catch((error) => {
          console.log(error);
        });
      });
  }

  ionViewWillEnter() {

  }

  add() {
    this.navCtrl.push(AddContactPage);
  }

  getContacts() {
    let loader = this.loadingCtrl.create({
      content: 'Loading...',
      spinner: 'dots'
    });
    loader.present();

    this.contactProvider.getContacts(this.sqliteObject)
      .then((rows: any) => {

        loader.dismiss();

        if (rows.length > 0) {

          this.contacts = [];

          for (let i = 0; i < rows.length; i++) {

            let contact = {
              id: rows.item(i).id,
              first_name: rows.item(i).first_name,
              last_name: rows.item(i).last_name,
              sex: rows.item(i).sex,
              telephone: rows.item(i).telephone,
              email: rows.item(i).email
            };

            this.contacts.push(contact);
          }
        }
      });
  }
}
