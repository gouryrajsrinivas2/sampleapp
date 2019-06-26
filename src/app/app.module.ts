import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import firebase from 'firebase';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { UserPage } from '../pages/user/user';
import { NgoPage } from '../pages/ngo/ngo';
import { AdminPage } from '../pages/admin/admin';

import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


const firebaseConfig = {
  apiKey: "AIzaSyA0mgmOhPyYESy9XgXWJcyY5MYBpTN-ebk",
  authDomain: "sampleapp-d8ef5.firebaseapp.com",
  databaseURL: "https://sampleapp-d8ef5.firebaseio.com",
  projectId: "sampleapp-d8ef5",
  storageBucket: "sampleapp-d8ef5.appspot.com",
  messagingSenderId: "1049469413236",
  appId: "1:1049469413236:android:ec0b87dfb927a0a0"
};

firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    UserPage,
    NgoPage,
    AdminPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    UserPage,
    NgoPage,
    AdminPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidFingerprintAuth,
    Geolocation,
    NativeGeocoder,
   // NativeGeocoderResult,
   // NativeGeocoderOptions, 
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
