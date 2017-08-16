import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
  //你也许注意到我们引用了ItemDetailPage。我们用以下的代码将其import到app/pages/list/list.ts里：
//import {ItemDetailsPage} from '../item-details/item-details'
//Ionic 2的导航像一个简单的栈，我们使用push方法来导航到新页面，将其放在栈的顶部，
//并显示一个返回按钮。对于返回，我们使用pop方法将其从栈中移除。
//因为我们在构造函数中设置了this.navCtrl属性，我们可以调用this.navCtrl.push()方法，
//来导航到一个新的页面。我们还可以将一个object传递给将要导航过去的页面。
//使用push方法导航到新页面非常简单
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
