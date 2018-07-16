import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps, GoogleMap, GoogleMapsEvent,
  GoogleMapOptions, Marker, ILatLng
} from '@ionic-native/google-maps';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';

declare var google;

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [Geolocation, HTTP],
})
export class MapPage {
  private showtime: String = "00:00:00";
  private distance: number = 0;
  private map: GoogleMap;
  // options
  enableHighAccuracy: boolean = false;

  //buttonboolean
  bflg: boolean;

  //interval
  interval: number;
  starttime: Date;
  nowtime: Date;
  count: number;

  //root
  points: ILatLng[] = [];

  //start
  startlat: number;
  startlng: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private http: HTTP) {
    this.bflg = true;
  }

  ionViewDidLoad() {
    console.log("map component constructor");
    this.map = GoogleMaps.create('map_canvas');

    // MAP_READYイベントが来るまで待ちます
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      // オプションの設定
      let options: GeolocationOptions = {
        enableHighAccuracy: this.enableHighAccuracy
      };

      // 緯度経度の取得
      this.geolocation.getCurrentPosition(options)
        .then((resp) => {
          let mapOptions = {
            target: {
              lat: resp.coords.latitude,
              lng: resp.coords.longitude
            },
            zoom: 18,
            tilt: 30
          };
          this.startlat = resp.coords.latitude;
          this.startlng = resp.coords.longitude;
          console.log("lat" + this.startlat);
          console.log("lng" + this.startlng);

          //          this.points.push([this.startlat, this.startlng]);
          this.points.push({ lat: this.startlat, lng: this.startlng });

          console.log("start:" + this.points);

          this.map.moveCamera(mapOptions);
          this.map.addMarker({
            title: 'Now',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: resp.coords.latitude,
              lng: resp.coords.longitude
            }
          }).then((marker: Marker) => {
            marker.showInfoWindow();
          });
        });
    });
  }

  onStart() {
    this.bflg = false;
    this.starttime = new Date();
    this.count = 0;
    this.interval = setInterval(() => {
      this.nowtime = new Date();
      this.showtime = this.toHms(this.nowtime.getTime() - this.starttime.getTime());

      // オプションの設定
      let options: GeolocationOptions = {
        enableHighAccuracy: this.enableHighAccuracy
      };

      // 緯度経度の取得
      this.geolocation.getCurrentPosition(options)
        .then((resp) => {
          let mapOptions = {
            target: {
              lat: resp.coords.latitude,
              lng: resp.coords.longitude
            },
            zoom: 18,
            tilt: 30
          };
          //          this.points.push([resp.coords.latitude, resp.coords.longitude]);
          this.points.push({ lat: resp.coords.latitude, lng: resp.coords.longitude });

          // 距離
          var PointA = new google.maps.LatLng(this.points[this.count]['lat'], this.points[this.count]['lng']);
          var PointB = new google.maps.LatLng(this.points[this.count + 1]['lat'], this.points[this.count + 1]['lng']);
          this.distance = this.distance + google.maps.geometry.spherical.computeDistanceBetween(PointA, PointB);
          console.log("distance:" + this.distance);
          this.count = this.count + 1;
        },
        err => {
          console.log(' Error : ' + err.message);
        });

    }, 1000);
  }

  onStop() {
    this.bflg = true;
    clearInterval(this.interval);
    console.log(this.points)
  }

  toHms(t) {
    var hms = "";
    var h = t / 1000 / 60 / 60 | 0;
    var m = t / 1000 / 60 % 60 | 0;
    var s = t / 1000 % 60 | 0;

    hms = padZero(h) + ":" + padZero(m) + ":" + padZero(s);

    return hms;

    function padZero(v) {
      if (v < 10) {
        return "0" + v;
      } else {
        return v;
      }
    }
  }
}
