import { Component } from '@angular/core';
import { NavController,AlertController,Platform } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { UserPage } from '../user/user';
import { NgoPage } from '../ngo/ngo';
import { AdminPage } from '../admin/admin';
import firebase from 'firebase';
import 'firebase/firestore';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data={cat:'',username:'',password:''};
  values=[] as any;
  constructor(public platform:Platform, public androidFingerprintAuth:AndroidFingerprintAuth,  public navCtrl: NavController,public alertCtrl:AlertController) {

    this.androidFingerprintAuth.isAvailable()
  .then((result)=> {
    if(result.isAvailable){
      // it is available

      this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
        .then(result => {
           if (result.withFingerprint) {
               console.log('Successfully encrypted credentials.');
               console.log('Encrypted credentials: ' + result.token);
           } else if (result.withBackup) {
             console.log('Successfully authenticated with backup password!');
           } else 
           {
             console.log('Didn\'t authenticate!');
             //this.platform.exitApp();
             navigator['app'].exitApp();
           }
        })
        .catch(error => {
           if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
             console.log('Fingerprint authentication cancelled');
           } else 
           {
             //this.platform.exitApp();
             navigator['app'].exitApp();
             console.error(error)
           }
        });

    } else {
      // fingerprint auth isn't available
    }
  })
  .catch(error => console.error(error));
  }

  register()
  {
    this.navCtrl.push(SignupPage)
  }
  signin()
  {
    if(this.data.cat=="admin")
    {
      if(this.data.username=="admin" && this.data.password=="admin")
      {
        this.navCtrl.push(AdminPage);
      }
      else
      {
        this.alert("Wrong username or password")
      }
    }
    else{
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
}
  alert(message:string) {
    this.alertCtrl.create({
     title: 'info',
     subTitle: message,
     buttons: ['OK']
   }).present();
 }
}
