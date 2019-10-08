import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { MapsPage } from '../maps/maps';
import { SettingsPage } from '../settings/settings';
import { RoomPage } from '../room/room';
import { PagesCheckCidadesPage } from '../pages-check-cidades/pages-check-cidades';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapsPage;
  tab3Root = RoomPage;
  //tab4Root = SettingsPage;
  tab4Root = PagesCheckCidadesPage;

  constructor() {

  }
}
