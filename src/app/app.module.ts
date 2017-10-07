import { ChartPage } from './../pages/chart/chart';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from './../pages/main/main';
import { MapPage } from './../pages/map/map';
import { LoginPage } from './../pages/login/login';

import { SetttingPage } from './../pages/settting/settting';
import { MessagePage } from './../pages/message/message';
import { ContactPage } from './../pages/contact/contact';
import { TabsPage } from './../pages/tabs/tabs';
import { AddCustomerPage } from './../pages/add-customer/add-customer';
import { AddContactPage } from './../pages/add-contact/add-contact';

import { UserProvider } from '../providers/user/user';
import { ContactProvider } from '../providers/contact/contact';

//เมื่อ create provider ต้อง import HttpModule ไว้ด้วย
import { HttpModule } from '@angular/http';
import { LoginProvider } from '../providers/login/login';
import { CustomerProvider } from '../providers/customer/customer';
// for Google map
import { AgmCoreModule } from '@agm/core';
// for chart
import { ChartModule } from 'angular2-highcharts';
//import * as highcharts from 'highcharts';
declare var require: any;

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    MapPage,
    TabsPage,
    ContactPage,
    MessagePage,
    SetttingPage,
    LoginPage,
    AddCustomerPage,
    AddContactPage,
    ChartPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //ChartModule.forRoot(highcharts),
    ChartModule.forRoot(
      require('highcharts'),
      require('highcharts/modules/exporting'),
      require('highcharts/highcharts-3d')),
    HttpModule,  // import ในนี้เพื่อจะใช้งาน http ได้ทั้ง app
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCY4eMYy2frASxET_QW03T2C5oSDHTCsoI'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    MapPage,
    TabsPage,
    ContactPage,
    MessagePage,
    SetttingPage,
    LoginPage,
    AddCustomerPage,
    AddContactPage,
    ChartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    LoginProvider,
    { provide: 'API_URL', useValue: 'http://192.168.1.34:3000' },
    CustomerProvider,
    ContactProvider
  ]
})
export class AppModule {}
