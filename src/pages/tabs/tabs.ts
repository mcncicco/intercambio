import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { MapsPage } from '../maps/maps';
import { SettingsPage } from '../settings/settings';
import { RoomPage } from '../room/room';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapsPage;
  tab3Root = RoomPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
