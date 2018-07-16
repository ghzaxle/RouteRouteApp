import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps, GoogleMap, GoogleMapsEvent,
  GoogleMapOptions, Marker
} from '@ionic-native/google-maps';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';

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
  private showtime;
  private map: GoogleMap;
  // options
  enableHighAccuracy: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private http: HTTP) {
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
          console.log("lat" + resp.coords.latitude);
          console.log("lng" + resp.coords.longitude);

          this.points.push({ lat: resp.coords.latitude, lng: resp.coords.longitude });

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

  //interval
  interval: number;
  starttime: Date;
  nowtime: Date;

  //root
  points: Object[] = [];

  onStart() {
    this.starttime = new Date();
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
          this.points.push({ lat: resp.coords.latitude, lng: resp.coords.longitude });


        });

    }, 1000);
  }

  onStop() {
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