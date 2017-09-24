import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { MapPage } from './../map/map';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  users: Array<{ name: string, email: string }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.users.push({ name: 'John Doe', email: 'john@gmail.com' });
    this.users.push({ name: 'Steve Job', email: 'steve@gmail.com' });
  }

  goDetail(_user) {
    this.navCtrl.push(MapPage, { user: _user, users: this.users });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

}
