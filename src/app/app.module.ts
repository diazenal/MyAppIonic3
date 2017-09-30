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

import { UserProvider } from '../providers/user/user';

//เมื่อ create provider ต้อง import HttpModule ไว้ด้วย
import { HttpModule } from '@angular/http';
import { LoginProvider } from '../providers/login/login';
import { CustomerProvider } from '../providers/customer/customer';

import { AgmCoreModule } from '@agm/core';

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
    AddCustomerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    AddCustomerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    LoginProvider,
    { provide: 'API_URL', useValue: 'http://192.168.1.42:3000' },
    CustomerProvider
  ]
})
export class AppModule {}
