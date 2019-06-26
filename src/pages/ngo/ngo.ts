import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import firebase from 'firebase';
import 'firebase/firestore';
/**
 * Generated class for the NgoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ngo',
  templateUrl: 'ngo.html',
})
export class NgoPage {

  data={a:'',b:'',o:'',city:'',username:''}
  constructor(public alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NgoPage');
  }
  submit()
  {
    let db=firebase.firestore();
    db.collection("admin").doc("ngo").collection("ngo").doc(this.data.username).set({
          
          a:this.data.a,b:this.data.b,o:this.data.o,city:this.data.city,username:this.data.username
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
