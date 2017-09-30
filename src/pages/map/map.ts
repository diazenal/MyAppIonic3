import { CustomerProvider } from './../../providers/customer/customer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  user: Object;
  users: Array<any>;

  lat: number = 51.678418;
  lng: number = 7.809007;
  zoomLevel: number = 18;

  customerLat: any;
  customerLng: any;
  customerName: string;

  customer: Object;

  token: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: CustomerProvider
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

}
