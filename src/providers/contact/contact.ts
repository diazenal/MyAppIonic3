import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactProvider {

  constructor(public http: Http) {
    console.log('Hello ContactProvider Provider');
  }

  save(db: SQLiteObject, contact: any) {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO CONTACT(first_name, last_name, sex, telephone, email)
                  VALUES(?, ?, ?, ?, ?)`;

      db.executeSql(sql, [
        contact.first_name,
        contact.last_name,
        contact.sex,
        contact.telephone,
        contact.email
      ])
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });

    });
  }

  getContacts(db: SQLiteObject) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM contact`;

      db.executeSql(sql, [])
        .then((data: any) => {
          resolve(data.rows);
        })
        .catch((error) => {
          reject(error);
        });

    });
  }
}
