import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  age: number;
  sex: string = 'ชาย';
  groups: Array<{ id: number, name: string }>=[];
  groups2: Array<any> = [1, 2, 5, '5'];

  constructor(public navCtrl: NavController) {
    this.age = 20;

    this.groups.push({ id: 1, name: 'John Doe' });
    this.groups.push({ id: 2, name: 'Steve Job' });
  }

}
