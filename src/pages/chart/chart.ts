import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {

  options: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.options = {
      chart: {
        type: 'column',
        margin: 75,
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          depth: 50
        }
      },

      title: {
        text:'ชื่อ chart'
      },

      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },

      yAxis: {
        title: {
          text: 'number of walter'
        }
      },

      plotOptions: {
        column: {
          depth: 25
        }
      },
      series: [{
        name:'ข้อมูลที่ 1',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      }]
    };

    //เพิ่ม name of series ได้อีกวิธีคือ
    this.options.series.push({
      name: 'ข้อมูลที่ 2',
      data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartPage');
  }

}
