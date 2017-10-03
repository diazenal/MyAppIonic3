import { CustomerProvider } from './../../providers/customer/customer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Push, PushObject, PushOptions } from '@ionic-native/push';


@IonicPage()
@Component({
  selector: 'page-settting',
  templateUrl: 'settting.html',
  providers:[Push]
})
export class SetttingPage {

  accept: boolean;

  token: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private push: Push,
    private customerProvider: CustomerProvider) {
    this.token = localStorage.getItem('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetttingPage');
  }

  changeToggle() {
    console.log(this.accept);
    if (this.accept) {
      // register device

      // to initialize push notifications

      const options: PushOptions = {
        android: {},
        ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
        },
        windows: {},
        // browser: {
        //   pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        // }
      };

      const pushObject: PushObject = this.push.init(options);

      pushObject.on('registration')
        .subscribe((registration: any) => {
          console.log('Device registered', registration)
          let deviceToken = registration.registrationId;

          this.customerProvider.registerToken(this.token, deviceToken)
            .then((data: any) => {
              console.log('success');
            }, (error) => {
              console.log(error);
            });
        });

      pushObject.on('notification')
        .subscribe((notification: any) => {
          console.log('Received a notification', notification)

        });

      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

    } else {

    }
  }

}
