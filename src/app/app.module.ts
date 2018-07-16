import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
import { EventmapPage } from '../pages/eventmap/eventmap';
import { CreateroutePage } from '../pages/createroute/createroute';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AgmCoreModule } from '@agm/core';

import { GoogleMaps } from '@ionic-native/google-maps'

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    EventmapPage,
    CreateroutePage,
    HomePage,
    MapPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAEerrtZJnH1l3lj4k8kvZUWzvViOPlBuY'
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EventmapPage,
    CreateroutePage,
    ContactPage,
    HomePage,
    MapPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
