import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import firebase from 'firebase';
import 'firebase/firestore';

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

  constructor(public alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }
  submit()
  {
    let db=firebase.firestore();
    db.collection("admin").doc("user").collection("user").doc(this.data.username).set({
          
          type:this.data.type,liters:this.data.liters,city:this.data.city
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
