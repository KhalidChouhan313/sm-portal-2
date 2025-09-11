import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
    // console.log("Http Service");

  }
  /**
       * set header values
       */

  public getHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'

    });
    const options = {
      headers: headers,
      withCrendentials: true
    };
    return options;
  }

  /**
     * get request
     */

  public get(url: string) {
    // debugger
    return this.http.get(url).pipe(map((response: any) => {
      return response;
    })
    );
    // return this.http.get(url, this.getHeaders())
  }

  /**
     * post request
     */

  public post(url: string, obj: Object) {
    return this.http.post(url, obj, this.getHeaders()).pipe(map((response: any) => {
      return response;
    })
    );
  }

  public uploadMultiPath(url: string, obj: Object) {
    return this.http.post(url, obj, { reportProgress: true }).pipe(map((response: any) => {
      return response;
    }));
  }

  /**
     * put request
     */

  public put(url: string, obj: Object) {
    return this.http.put(url, JSON.stringify(obj), this.getHeaders()).pipe(map((response: any) => {
      return response;
    }));
  }

  public delete(url: string) {
    return this.http.delete(url).pipe(map((response: any) => {
      return response;
    }));
  }

}
