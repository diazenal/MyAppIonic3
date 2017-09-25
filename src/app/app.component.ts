import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MainPage } from './../pages/main/main';

import { TabsPage } from './../pages/tabs/tabs';

import { LoginPage } from './../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //check token ถ้ามีก็แสดง tabmenu ถ้าไม่มีแสดง login
      let token = localStorage.getItem('token');
      if (token) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }


    });
  }
}

