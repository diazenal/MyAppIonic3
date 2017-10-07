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

  update(db: SQLiteObject, contact: any) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE CONTACT
                        SET first_name=?, last_name=?, sex=?, telephone=?, email=?
                 WHERE id=?`;

      db.executeSql(sql, [
        contact.first_name,
        contact.last_name,
        contact.sex,
        contact.telephone,
        contact.email,
        contact.id
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

  search(db: SQLiteObject, query: string) {
    let _query = `%${query}%`;
    let sql = `SELECT * FROM contact where first_name like ? or last_name like ?`;

    return new Promise((resolve, reject) => {
      db.executeSql(sql, [_query, _query])
        .then((data: any) => {
          resolve(data.rows);
        })
        .catch((error) => {
          reject(error);
        });

    });
  }

  remove(db: SQLiteObject, contractId: number ) {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM contact WHERE id=?`;

      db.executeSql(sql, [contractId])
        .then((data: any) => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });

    });
  }

  getDetail(db: SQLiteObject, contractId: number ) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM contact WHERE id=?`;

      db.executeSql(sql, [contractId])
        .then((data: any) => {
          resolve(data.rows);
        })
        .catch((error) => {
          reject(error);
        });

    });
  }
}
