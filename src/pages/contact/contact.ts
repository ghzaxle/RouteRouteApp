import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventmapPage } from '../eventmap/eventmap';
import { CreateroutePage } from '../createroute/createroute';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }

  startEvent(name: String) {
    this.navCtrl.push(EventmapPage, { eventname: name });
  }
  createEvent() {
    this.navCtrl.push(CreateroutePage);
  }
}
