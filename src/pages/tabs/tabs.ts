import { SetttingPage } from './../settting/settting';
import { MessagePage } from './../message/message';
import { ContactPage } from './../contact/contact';
import { MainPage } from './../main/main';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tabMain: any;
  tabContact: any;
  tabMessage: any;
  tabSetting: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabMain = MainPage;
    this.tabContact = ContactPage;
    this.tabMessage = MessagePage;
    this.tabSetting = SetttingPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
