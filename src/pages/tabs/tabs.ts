import { ChartPage } from './../chart/chart';
import { SetttingPage } from './../settting/settting';
import { MessagePage } from './../message/message';
import { ContactPage } from './../contact/contact';
import { MainPage } from './../main/main';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


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
  tabChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabMain = MainPage;
    this.tabContact = ContactPage;
    this.tabMessage = MessagePage;
    this.tabSetting = SetttingPage;
    this.tabChart = ChartPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
