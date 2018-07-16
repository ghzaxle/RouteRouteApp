import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps, GoogleMap, GoogleMapsEvent,
  GoogleMapOptions, Marker, Polyline, ILatLng
} from '@ionic-native/google-maps';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';

declare var google;

/**
 * Generated class for the CreateroutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createroute',
  templateUrl: 'createroute.html',
})
export class CreateroutePage {
  private map: GoogleMap;
  public distance;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateroutePage');
    this.map = new google.maps.Map(document.getElementById("map_canvas"));

    var directionsService = new google.maps.DirectionsService;
    var directionsRenderer = new google.maps.DirectionsRenderer;
    directionsRenderer.setMap(this.map);
    directionsRenderer.setOptions({ draggable: true });

    //mapをクリックしたときのイベントを設定
    google.maps.event.addListener(this.map, 'click', mylistener);

    //クリックしたときの処理
    function mylistener(event) {
      //marker作成
      var marker = new google.maps.Marker();
      //markerの位置を設定
      //event.latLng.lat()でクリックしたところの緯度を取得
      marker.setPosition(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
      //marker設置
      marker.setMap(this.map);
    }

    // ルート検索を実行
    directionsService.route({
      origin: "東京駅",
      destination: "新宿駅",
      travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
      console.log(response);
      if (status === google.maps.DirectionsStatus.OK) {
        // ルート検索の結果を地図上に描画
        directionsRenderer.setDirections(response);
        var legs = response.routes[0].legs;
        // 総距離と総時間の合計する
        var sec = 0;
        var dis = 0
        legs.forEach(element => {
          sec += element.duration.value;
          dis += element.distance.value;
        });
        console.log("distance=" + dis + ", secound=" + sec);
        CreateroutePage.prototype.distance = dis;
      }
    });
  }
}
