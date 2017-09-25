import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from './../pages/main/main';
import { MapPage } from './../pages/map/map';

import { SetttingPage } from './../pages/settting/settting';
import { MessagePage } from './../pages/message/message';
import { ContactPage } from './../pages/contact/contact';
import { TabsPage } from './../pages/tabs/tabs';
import { UserProvider } from '../providers/user/user';
//เมื่อสร้าง provider ต้อง import HttpModule ด้วย
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    MapPage,
    TabsPage,
    ContactPage,
    MessagePage,
    SetttingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule  // import ในนี้เพื่อจะใช้งาน http ได้ทั้ง app
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
    SetttingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider
  ]
})
export class AppModule {}
