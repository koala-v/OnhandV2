import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyServiceProvider } from './../../providers/my-service/my-service'


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
saus1={UserID: '',password: ''};
constructor(private getService: MyServiceProvider,public navCtrl: NavController, public navParams: NavParams) {}

  public login() {
  this.getService.login(this.saus1.UserID,this.saus1.password).subscribe(
  data => {
     console.log('success');
     alert('success');
    //this.loading.dismiss();
  },
  error => {
    console.log('faile');
    alert('faile');
  //  this.showError(error);
  });

  }
  //方法是一个ionic生命周期钩。一旦一个离子视图加载它他就进行加载此函数内的代码
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
