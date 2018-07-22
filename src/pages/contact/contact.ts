import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventmapPage } from '../eventmap/eventmap';
import { CreateroutePage } from '../createroute/createroute';
import { EventDetailPage } from '../event-detail/event-detail';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  eventItems : object;

  constructor(public navCtrl: NavController) {
    // mock用に固定値を格納
    this.eventItems = [{id:"cc20180722000001",name:"cycle event in Tokyo", about:"東京都にて開催の自転車イベント",profilePic:"assets/imgs/eventa.png"},
    {id:"cc20180722000002",name:"gogogochari", about:"自転車好きイベント",profilePic:"assets/imgs/eventb.png"},
    {id:"cc20180722000003",name:"弱虫ペダル", about:"自転車好きイベント",profilePic:"assets/imgs/eventc.png"}];
  }

  startEvent(event: object) {
    console.log(event);
    this.navCtrl.push(EventDetailPage, {data : event});
  }
  createEvent() {
    this.navCtrl.push(CreateroutePage);
  }
}
