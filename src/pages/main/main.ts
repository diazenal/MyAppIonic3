import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { MapPage } from './../map/map';

import { UserProvider } from './../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers:[]//ถ้าต้องการใช้แบบ Individal provider ก็ให้กำหนด
})
export class MainPage {

  users: Array<{ name: string, email: string }> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public loadingCtrl: LoadingController
  ) {

    //his.users.push({ name: 'John Doe', email: 'john@gmail.com' });
    //this.users.push({ name: 'Steve Job', email: 'steve@gmail.com' });
  }

  goDetail(_user) {
    this.navCtrl.push(MapPage, { user: _user, users: this.users });
  }

  ionViewWillEnter() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait ...',
      spinner: 'dots'
    })
    loading.present();

    this.userProvider.getUsers()
      .then((data: any) => {
        this.users = data;

        loading.dismiss();
      }, (error) => {
        loading.dismiss();

      });
  }

}
