import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IData, Person } from '../../model';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  age: number;
  sex: string = 'ชาย';
  groups3: Array<{ id: number, name?: string }>=[];
  groups2: Array<any> = [1, 2, 5, '5'];
  groups: Array<IData> = [];

  constructor(public navCtrl: NavController) {
    this.age = 20;

    this.groups.push({ id: 1, name: 'John Doe' });
    this.groups.push({ id: 2, name: 'Steve Job' });
    this.groups.push({ id: 3 });

    let person = new Person();
    person.setFullname('aa', 'bb99090');
    person.getFullname();
  }

}

