import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { UserPage } from '../user/user';
import { NgoPage } from '../ngo/ngo';
import firebase from 'firebase';
import 'firebase/firestore';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data={cat:'',username:'',password:''};
  values=[] as any;
  constructor(public navCtrl: NavController,public alertCtrl:AlertController) {

  }

  register()
  {
    this.navCtrl.push(SignupPage)
  }
  signin()
  {
    let db=firebase.firestore();
    this.values=db.collection(this.data.cat).doc(this.data.username);
    this.values.get().then(doc=>{
      if(doc.exists)
      {
        if((this.data.username==doc.data().username)&&(this.data.password==doc.data().password))
        {
          if(this.data.cat=="user")
          {
            this.navCtrl.push(UserPage);
          }
          else
          {
            this.navCtrl.push(NgoPage);
          }
        }
        else
        {
          this.alert("Wrong username or password")
        }
      }
      else
      {
        this.alert("No such document")
      }
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
