import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  requestOptions: any = {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor')

    this.requestOptions = {
      headers: new HttpHeaders ({
        //'': ''
      }),
      withCredentials: true
    }
    
    const reqClone = req.clone(this.requestOptions)
    return next.handle(reqClone)

  }
}
