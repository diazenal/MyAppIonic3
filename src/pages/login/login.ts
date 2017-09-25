import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from './../tabs/tabs';

import { LoginProvider } from './../../providers/login/login';

interface IHttpResult {
  ok: boolean;
  token?: string;
}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginProvider: LoginProvider
  ) {

  }

  doLogin() {
    this.loginProvider.doLogin(this.username, this.password)
      .then((data: IHttpResult) => {
        if (data.ok) {
          let token = data.token;
          localStorage.setItem('token', token);
          // redirect to tab page
          this.navCtrl.setRoot(TabsPage);
        } else {
          alert('Login fail!');
        }
      }, (error) => {

      });
  }

}
