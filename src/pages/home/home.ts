import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  startlat: number;
  startlng: number;
  // options
  enableHighAccuracy: boolean = false;

  //interval
  interval: number;
  starttime: Date;
  nowtime: Date;
  count: number;

  //root
  points: Object[] = [];

  constructor() {
  }

}


