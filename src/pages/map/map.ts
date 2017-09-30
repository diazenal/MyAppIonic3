import { CustomerProvider } from './../../providers/customer/customer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers:[Geolocation, LaunchNavigator]
})
export class MapPage {

  user: Object;
  users: Array<any>;

  lat: number = 51.678418;
  lng: number = 7.809007;

  currentLat: any;
  currentLng: any;

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
    public loadingCtrl: LoadingController,
    private launchNavigator: LaunchNavigator
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

    let loader = this.loadingCtrl.create({
      content: 'Loading...',
      spinner: 'dots'
    });
    loader.present();

    this.geolocation.getCurrentPosition().then((resp) => {
      loader.dismiss();

      this.currentLat = resp.coords.latitude;
      this.currentLng = resp.coords.longitude;

      console.log(this.currentLat);
      console.log(this.currentLng);
      //get customer latLong from db;
      this.customerProvider.getMap(this.token, this.customer.id)
      .then((data: any) => {
        if (data.ok) {
          if (data.latLng.lat && data.latLng.lng) {
            this.customerLat = data.latLng.lat;
            this.customerLng = data.latLng.lng;

            //กำหนดค่า lat, lng เพื่อให้ marker อยู่ตรงกลางหน้าจอ
            this.lat = data.latLng.lat;
            this.lng = data.latLng.lng;
          } else {
            //this.getCurrentLocation();
            this.lat = this.currentLat;
            this.lng = this.currentLng;
          }
        }
      }, (error) => {

      });

     }).catch((error) => {
       console.log('Error getting location', error);
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
      console.log('current location ', this.lat, this.lng);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  // ต้อง run on mobile เท่านั้นจึงจะใช้งานได้
  launchNavigatorApp() {

    let options: LaunchNavigatorOptions = {
      start: [this.currentLat, this.currentLng]

    };

    this.launchNavigator.navigate([this.customerLat, this.customerLng], options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }
}
