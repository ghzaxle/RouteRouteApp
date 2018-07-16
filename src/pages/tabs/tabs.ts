import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';
import { MapPage } from '../map/map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ContactPage;
  tab3Root = MapPage;

  constructor() {

  }
}
