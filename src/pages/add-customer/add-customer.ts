import { CustomerProvider } from './../../providers/customer/customer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import moment มาใช้
import * as moment from 'moment';

// import เพื่อใช้ camera
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-add-customer',
  templateUrl: 'add-customer.html',
  providers: [Camera]
})
export class AddCustomerPage {

  sexes: Array<{ id: number, name: string }> = [];
  groups: Array<{ id: number, name: string }> = [];
  birthDate: any;
  token: string;

  sex: string;
  email: string;
  telephone: string;
  firstName: string;
  lastName: string;
  customerTypeId: number;

  base64Image: string;
  imageData: string;

  // ไว้สำหรับรับ param จากการเลือก action sheet
  customerId: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: CustomerProvider,
    public camera: Camera
  ) {
    this.sexes.push({ id: 1, name: 'ชาย' });
    this.sexes.push({ id: 2, name: 'หญิง' });

    this.token = localStorage.getItem('token');

    // ใช้ moment จัดการวันที่ format (ให้ติดตั้งด้วยคำสั่ง npm i moment --save)
    this.birthDate = moment().format('YYYY-MM-DD');

    this.customerId = this.navParams.get('id');
  }

  ionViewWillEnter() {
    // เมื่อเปิด page มาก็ไปค้นหาข้อมูล customer ได้เลย
    if (this.customerId) {
      this.customerProvider.detail(this.token, this.customerId)
      .then((data: any) => {
        if (data.ok) {
          this.firstName = data.customer.first_name;
          this.lastName = data.customer.last_name;
          this.sex = data.customer.sex;
          this.customerTypeId = data.customer.customer_type_id;
          this.imageData = data.customer.image;
          //ถ้ามีรูป ก็แสดงรูป แต่ถ้าไม่มีก็แสดงค่า null โดยที่หน้า html จะแสดงรูป placeholder แทนเพราะมีการ check if
          this.base64Image = data.customer.image ?
            'data:image/jpeg;base64,' + data.customer.image : null;
          this.email = data.customer.email;
          this.telephone = data.customer.telephone;

        }
      }, (error) => {

      });
    }
  }

  ionViewDidLoad() {
    this.customerProvider.getGroups(this.token)
      .then((data: any) => {
        this.groups = data.rows;
      }, (error) => {

      });
  }
  //ปรับปรุง save() ให้รองรับทั้งการเพิ่ม และแก้ไข ข้อมูล
  save() {

    let customer = {
      firstName: this.firstName,
      lastName: this.lastName,
      sex: this.sex,
      email: this.email,
      telephone: this.telephone,
      customerTypeId: this.customerTypeId,
      image: this.imageData,
      customerId: this.customerId
    };

    let promise;

    if (this.customerId) {
      promise = this.customerProvider.updateCustomer(this.token, customer);
    } else {
      promise = this.customerProvider.saveCustomer(this.token, customer);
    }

    promise.then((data: any) => {
      if (data.ok) {
        alert('success');
        this.navCtrl.pop();//เมื่อทำสำเร็จ ให้กลับไปหน้าก่อนหน้า ด้วยการ pop();
      }
    }, (error) => {
      alert('error')
    });

  }

  takePicture() {

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageData = imageData; // เผื่อส่งไปเก็บที่ REST Server
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  browsePicture() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {

      this.imageData = imageData; // เผื่อส่งไปเก็บที่ REST Server
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

}
