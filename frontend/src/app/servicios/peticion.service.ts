import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http:HttpClient) { }
  requestOptions:any = {}

  urlHost: string = "http://localhost:3000";

  post(endpoint: string, payload: any): Promise<any> {
    // const url = `${this.urlHost}/${endpoint}`;
    return new Promise((resolve, reject) => {

      this.requestOptions = {
        header: new HttpHeaders ({
          //'': ''
        }),
        withCredentials: true
      }

      this.http.post(endpoint, payload, this.requestOptions).toPromise()
        .then((res: any) => {
          console.log(res)
          resolve(res);
        })
        .catch((error) => {
          console.log(error)
          reject(error);
        });
    });

    
  }

  get(endpoint: string, payload: any): Promise<any> {
    const url = `${this.urlHost}/${endpoint}`;
    return new Promise((resolve, reject) => {
      this.http.get(url, payload).toPromise()
        .then((res: any) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });

    
  }

  put(endpoint: string, payload: any): Promise<any> {
    const url = `${this.urlHost}/${endpoint}`;
    return new Promise((resolve, reject) => {
      this.http.put(url, payload).toPromise()
        .then((res: any) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });

    
  }

  delete(endpoint: string, payload: any): Promise<any> {
    const url = `${this.urlHost}/${endpoint}`;
    return new Promise((resolve, reject) => {
      this.http.delete(url, payload).toPromise()
        .then((res: any) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });

    
  }

  Upload(file:File, destino:string):Observable<any>{
    const formdata:FormData = new FormData()
    formdata.append('myFile',file)
    return this.http.post(this.urlHost + destino, formdata)
  }

}
