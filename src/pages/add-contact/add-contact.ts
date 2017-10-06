import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sexes.push({ id: 1, name: 'ชาย' });
    this.sexes.push({ id: 2, name: 'หญิง' });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactPage');
  }

  save() {

  }
}
