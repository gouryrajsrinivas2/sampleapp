import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import 'firebase/firestore';
/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  data=[] as any;
  data2=[] as any;
  type;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    let db=firebase.firestore();
   /* db.collection("admin").doc("user").collection("user").onSnapshot(querySnapshot=>{
      this.data=[];
      querySnapshot.docs.forEach(element => {
        //this.data.push(element.data())
        console.log("data"+element.data)
      });
    })*/
    db.collection("admin").doc("user").collection("user").get().then(querySnapshot=>{
      querySnapshot.forEach(doc=>{
        this.data.push(doc.data());
        console.log(this.data);
      })
    })

    db.collection("admin").doc("ngo").collection("ngo").get().then(querySnapshot=>{
      querySnapshot.forEach(doc=>{
        this.data2.push(doc.data());
        console.log(doc.data());
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

}
