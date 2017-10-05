import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { HomePage } from '../pages/home/home';
import { MainPage } from './../pages/main/main';

import { TabsPage } from './../pages/tabs/tabs';

import { LoginPage } from './../pages/login/login';

@Component({
  templateUrl: 'app.html',
  providers:[SQLite]
})
export class MyApp {
  rootPage:any ;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    //public events: Events
    private sqlite: SQLite
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      statusBar.backgroundColorByHexString('#7f8c8d');
      splashScreen.hide();

      //start : สร้าง database
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          console.log('Created Database')

          //case:[1] สร้าง 1 table
          //start จากนั้นสร้าง table
          let sqlCreateTable = `CREATE TABLE IF NOT EXISTS contact(
                                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                                          first_name TEXT,
                                          last_name TEXT,
                                          sex TEXT,
                                          telephone TEXT,
                                          email TEXT)`;
          db.executeSql(sqlCreateTable, [])
            .then(() => {
              console.log('Create table success');
            }, error => {
              console.log(error);
            });
          //end case[1] จากนั้นสร้าง table

          //case:[2] สร้างมากกว่า 1 table จะต้องใช้ sqlBatch
          // let sqlCreateTable2 = `CREATE TABLE IF NOT EXISTS contact2(
          //                                 id INTEGER PRIMARY KEY AUTOINCREMENT,
          //                                 first_name TEXT,
          //                                 last_name TEXT,
          //                                 sex TEXT,
          //                                 telephone TEXT,
          //                                 email TEXT)`;
          //
          // db.sqlBatch([sqlCreateTable,sqlCreateTable2])
          //   .then(() => {
          //     console.log('Create table success');
          //   }, error => {
          //     console.log(error);
          //   });
          //end case[2]

        })
        .catch(e => console.log(e));
      //end : สร้าง database

      //check token ถ้ามีก็แสดง tabmenu ถ้าไม่มีแสดง login
      let token = localStorage.getItem('token');
      if (token) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }

    });

    // events.subscribe('logout', () => {
    //   console.log('logout...');
    //   this.rootPage = LoginPage;
    // });

  }
}

