import { CustomerProvider } from './../../providers/customer/customer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers:[Geolocation]
})
export class MapPage {

  user: Object;
  users: Array<any>;

  lat: number = 51.678418;
  lng: number = 7.809007;
  zoomLevel: number = 15;

  customerLat: any;
  customerLng: any;
  customerName: string;

  customer: any;

  token: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: CustomerProvider,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController
  ) {

    this.user = this.navParams.get('user');
    this.users = this.navParams.get('users');

    this.customer = this.navParams.get('customer');
    this.customerName = `${this.customer.first_name} ${this.customer.last_name} [k]`;

    this.token = localStorage.getItem('token');

  }

  mapClick(event) {
    //console.log(event);
    this.customerLat = event.coords.lat;
    this.customerLng = event.coords.lng;
  }

  save() {
    this.customerProvider.saveMap(this.token, this.customer.id, this.customerLat, this.customerLng)
      .then((data:any) => {
        if (data.ok) {
          alert('success');
        }
      }, (error) => {
        alert('error');
      });
  }

  // เพื่อแสดง lat, lng ของ customerId ที่เลือก
  ionViewWillEnter() {
    this.customerProvider.getMap(this.token, this.customer.id)
      .then((data: any) => {
        if (data.ok) {
          this.customerLat = data.latLng.lat;
          this.customerLng = data.latLng.lng;

          //กำหนดค่า lat, lng เพื่อให้ marker อยู่ตรงกลางหน้าจอ
          this.lat = data.latLng.lat;
          this.lng = data.latLng.lng;
        }
      }, (error) => {

      });
  }

  getCurrentLocation() {
    let loader = this.loadingCtrl.create({
      content: 'Loading...',
      spinner: 'dots'
    });
    loader.present();

    this.geolocation.getCurrentPosition().then((resp) => {
      loader.dismiss();

      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
