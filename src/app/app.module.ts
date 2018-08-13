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
import { HttpClientModule } from '@angular/common/http';

import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { IntroPageModule } from '../pages/intro/intro.module';
import { ProfilePageModule } from '../pages/profile/profile.module';

import { UserProvider } from '../providers/user/userProvider';
import { SigninWithEmailPage } from '../pages/signinwithemail/signinwithemail';

const firebaseConfig = {
  apiKey: "AIzaSyBZIDWA8LMA4iTuuncR02t3a4JbuL0eYqE",
    authDomain: "intercambio-1f050.firebaseapp.com",
    databaseURL: "https://intercambio-1f050.firebaseio.com",
    projectId: "intercambio-1f050",
    storageBucket: "intercambio-1f050.appspot.com",
    messagingSenderId: "888576883410"
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
    SigninWithEmailPage,
    MapsPage,
    CityPage,
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
    SigninWithEmailPage,
    MapsPage,
    CityPage,
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
    MapsProvider,
    UserProvider,
    Facebook,
    ConfigProvider,
    
    
  ]
})
export class AppModule {}
