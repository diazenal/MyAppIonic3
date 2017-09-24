import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  user: Object;
  users: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.user = this.navParams.get('user');
    this.users = this.navParams.get('users');
   // let user = this.navParams.get('user');
   // this.name = user.name;
   // this.email = user.email;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

}
