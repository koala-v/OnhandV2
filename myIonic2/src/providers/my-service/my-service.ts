import { Injectable } from '@angular/core';
import { Http, Request, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { ENV } from './../../config';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/*
  Generated class for the MyServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MyServiceProvider {

constructor(private http:Http) {}


//登陆
//Observable--> 异步处理,延时加载
login(UserId, Password): Observable<any> {
    return this.Post('api/wms/login/check', { UserId: UserId, Password: Password });
  }

  Post(path, data?): Observable<any> {
    return this.Request(RequestMethod.Post, path, data);
  }

  Get(path): Observable<any> {
      return this.Request(RequestMethod.Get, path, {});
    }

  private Request(method, path, data?): Observable<any> {
    let url = ENV.config.API_PATH + path + '?format=json' ;
    var headers = new Headers();
    //headers.append('Accept', 'application/json');
    //headers.append('Content-Type', 'application/json');
    var body = '';
    if (data) {
      body = JSON.stringify(data);
    }
    var UpdateAllString='';
    var arrPost=[];
    arrPost.push(data);
    UpdateAllString= JSON.stringify(arrPost);

    // let   --> 声明一个变量与var是一样
    // body  --> 原本Http.Post的时候会把body里面的数据Post到API可是一直Post不过去所以改成用Params
    // Params--> 将 一个数据 “Params:{UserId: 1 }” 传到API 或者是一组数据 “params :{UpdateAllString:UpdateAllString}”
    //           API 应该要有相对应的参数去接收(UserId,UpdateAllString)
    let requestOptions = new RequestOptions({
    method: method,
    url:url,
    headers: headers,
    body: body,
    params :{UpdateAllString:UpdateAllString}
    })
  // Post --> 其实是包含在Request里面
  /**
    return this.http.post(url,jsonData)
      .map(this.extractData)
      .catch(err => {
        this.handleError(this, err);
        return Observable.throw(err);
      });
    */
    return this.http.request(new Request(requestOptions))
      .map(this.extractData)
      .catch(err => {
        this.handleError(this, err);
        return Observable.throw(err);
      });

  }
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }


  private handleError (env, error: Response | any) {
  let errMsg: string;
  if (error instanceof Response) {

    if (error.status === 401) {
      env._authSource.next(false);
      env._token = '';
    }

    let err = error.text();

    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }

  console.error(errMsg);
}



}
