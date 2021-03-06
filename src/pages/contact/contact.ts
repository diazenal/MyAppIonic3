import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { CallNumber } from '@ionic-native/call-number';

import { AddContactPage } from './../add-contact/add-contact';

import { ContactProvider } from './../../providers/contact/contact';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[CallNumber]
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
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private callNumber: CallNumber
  ) {


  }

  ionViewWillEnter() {
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

  remove(contact: any) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: `คุณต้องการลบ [${contact.first_name} ${contact.last_name}] ใช่หรือไม่`,
      buttons: [
        {
          text: 'ไม่ใช่, ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ใช่, ต้องการลบ',
          handler: () => {
            console.log('Agree clicked');
            console.log(contact);
            this.contactProvider.remove(this.sqliteObject, contact.id)
              .then(() => {
                this.getContacts();
              }, (error) => {
                console.log(error);
                let alert = this.alertCtrl.create({
                  title: 'Error!',
                  subTitle: 'เกิดข้อผิดพลาดในการรันคำสั่ง DELETE',
                  buttons: ['OK']
                });
                alert.present();
            })
          }
        }
      ]
    });
    confirm.present();
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
        this.contacts = [];

        if (rows.length > 0) {

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
      }, (error) => {
        console.log(error);
      });
  }

  edit(contact: any) {
    this.navCtrl.push(AddContactPage, { contactId: contact.id });
  }

  search(event) {
    let query = event.target.value;

    if (query) {
      // search
      this.contactProvider.search(this.sqliteObject, query)
        .then((rows: any) => {

          this.contacts = [];

          if (rows.length > 0) {

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
        }, (error) => {

        });
    } else {
      this.getContacts();
    }
  }

  callPhone(telephone: string) {

    this.callNumber.callNumber(telephone, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

}
