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
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { EventDetailPage } from '../pages/event-detail/event-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignaturePadModule } from 'angular2-signaturepad';

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
    WelcomePage,
    LoginPage,
    SignupPage,
    EventDetailPage,
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
    HomePage,
    MapPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    EventDetailPage,
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
