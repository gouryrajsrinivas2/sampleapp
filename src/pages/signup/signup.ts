import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import 'firebase/firestore';
import firebase from 'firebase';
import { HomePage } from '../home/home';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  type;
  data={name:'',username:'', phonenum:'',email:'',password:'',cpassword:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signup()
  {
    let db=firebase.firestore();
    db.collection(this.type).doc(this.data.username).set({
      name:this.data.name,username:this.data.username, email:this.data.email,password:this.data.password,phonenum:this.data.phonenum 
    }).then(dat=>{
      this.alert('You are Sucessfully signed up');
      this.navCtrl.push(HomePage);
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
