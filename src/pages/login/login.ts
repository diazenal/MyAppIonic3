import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from './../tabs/tabs';

import { LoginProvider } from './../../providers/login/login';

interface IHttpResult {
  ok: boolean;
  token?: string;
  data?: string;
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

    let data = { username: this.username, password: this.password };
    let _data = JSON.stringify(data);//แปลงค่าเป็น string
    let encryptedText = this.loginProvider.encrypt(_data);

    this.loginProvider.doLoginEncrypt(encryptedText)
    .then((data: IHttpResult) => {
      if (data.ok) {
        let encryptedText = data.data;
        let decryptedText = this.loginProvider.decrypt(encryptedText);
        console.log(encryptedText);
        console.log(decryptedText);

        let token = decryptedText;
        localStorage.setItem('token', token);
        // redirect to tab page
        this.navCtrl.setRoot(TabsPage);
      } else {
        alert('Login fail!');
      }
    }, (error) => {

    });
    // แบบเดิม
    // this.loginProvider.doLogin(this.username, this.password)
    //   .then((data: IHttpResult) => {
    //     if (data.ok) {
    //       let token = data.token;
    //       localStorage.setItem('token', token);
    //       // redirect to tab page
    //       this.navCtrl.setRoot(TabsPage);
    //     } else {
    //       alert('Login fail!');
    //     }
    //   }, (error) => {

    //   });
  }

}
