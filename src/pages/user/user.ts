import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Platform } from 'ionic-angular';
import firebase from 'firebase';
import 'firebase/firestore';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  data={type:'',liters:'',city:'',username:''};
  reverseGeocodingresults:string="";

  constructor(public platform:Platform, public nativeGeocoder:NativeGeocoder, public geolocation:Geolocation, public alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams) {
    
    //this.platform.ready().then(()=>{
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        var lati=resp.coords.latitude;
        var longi=resp.coords.longitude;
        this.reverseGeocoding(lati,longi);
      //})
    })
  }
  reverseGeocoding(lati,longi)
  {
    var options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
  }

  this.nativeGeocoder.reverseGeocode(lati,longi, options)
    .then((result) => {
      this.reverseGeocodingresults=JSON.stringify(result[0]);
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }
  submit()
  {
    let db=firebase.firestore();
   
     //console.log(this.loc);
    db.collection("admin").doc("user").collection("user").doc(this.data.username).set({
          
          type:this.data.type,liters:this.data.liters,city:this.data.city,username:this.data.username
    })
    .then(dat=>{
      this.alert("you have sucessfully requested");
    })
    .catch(error=>{
      this.alert(error.message);
    });
  }

  alert(message:string) {
    this.alertCtrl.create({
     title: 'info',
     subTitle: message,
     buttons: ['OK']
   }).present();

  }
  

}
