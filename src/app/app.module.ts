import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule} from 'angularfire2/database';

import {GoogleMaps} from "@ionic-native/google-maps";
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { CityProvider } from '../providers/city/city';
import { MapsProvider } from '../providers/maps/maps';
import { SigninPage } from '../pages/signin/signin';
import { ConfigProvider } from '../providers/auth-service/config';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { MapsPage } from '../pages/maps/maps';
import { CityPage } from '../pages/city/city';

import { SignupPage } from '../pages/signup/signup';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { IntroPageModule } from '../pages/intro/intro.module';
import { ProfilePageModule } from '../pages/profile/profile.module';

import { UserProvider } from '../providers/user/userProvider';

import {Geolocation} from '@ionic-native/geolocation';
import { PersonPage } from '../pages/person/person';
import { RoomPage } from '../pages/room/room';
import { AddRoomPage } from '../pages/add-room/add-room';
import { ChatPage } from '../pages/chat/chat';
import { SettingsPage } from '../pages/settings/settings';
import { CotacaoProvider } from '../providers/cotacao/cotacao';
import { CountryPage } from '../pages/country/country';


const firebaseConfig = {
  apiKey: "AIzaSyC5zJOHc9idB2OQ7kGUvYTPqGC_yX9bV4k",
    authDomain: "intercambio-1c967.firebaseapp.com",
    databaseURL: "https://intercambio-1c967.firebaseio.com",
    projectId: "intercambio-1c967",
    storageBucket: "intercambio-1c967.appspot.com",
    messagingSenderId: "213996863891"
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SigninPage,
    SignupPage,
    ResetpasswordPage,
    MapsPage,
    CityPage,
    CountryPage,
    PersonPage,
    RoomPage,
    AddRoomPage,
    ChatPage,
    SettingsPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    IntroPageModule,
    ProfilePageModule,
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SigninPage,
    ResetpasswordPage,
    MapsPage,
    CityPage,
    CountryPage,
    PersonPage,
    RoomPage,
    AddRoomPage,
    ChatPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    AngularFireAuth,
    GooglePlus,
    CityProvider,
    Geolocation,
    MapsProvider,
    UserProvider,
    Facebook,
    ConfigProvider,
    CotacaoProvider,
    CotacaoProvider,
    CotacaoProvider
    
    
  ]
})
export class AppModule {}
