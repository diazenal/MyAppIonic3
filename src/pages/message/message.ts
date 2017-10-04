import { CustomerProvider } from './../../providers/customer/customer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  users: Array<any>;
  userId: number;
  message: string;

  token: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private customerProvider: CustomerProvider
  ) {
    this.token = localStorage.getItem('token');
  }

  ionViewDidLoad() {
    this.customerProvider.getUserList(this.token)
      .then((data: any) => {
        this.users = data.rows;
      }, (error) => {

      });
  }

  sendMessage() {
    this.customerProvider.sendMessage(this.token, this.userId, this.message)
      .then((data:any) => {
        alert('send success!');
      }, (error) => {
        alert('send error');
      });
  }

}
