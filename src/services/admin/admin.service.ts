import { Injectable } from '@angular/core';
import { HttpService } from './../http/http.service';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private httpClient: HttpClient,
    private router: Router, private http: HttpService) { }

  public createDevice(obj) {
    return this.http.post(`${environment.apiUrl}/api/wa/device`, obj);
  }

  public getDevices() {
    return this.http.get(`${environment.apiUrl}/api/wa/devices`);
  }

  public getDeviceStatus(obj) {
    return this.http.post(`${environment.apiUrl}/api/wa/deviceStatus`, obj);
  }

  public getQrStatus(id) {
    return this.http.get(`${environment.apiUrl}/api/wa/qr-status/${id}`);
  }

  public getInitialize(id) {
    return this.http.get(`${environment.apiUrl}/api/wa/initialize/${id}`);
  }

  public getAllDeviceStatus() {
    return this.http.get(`${environment.apiUrl}/api/wa/all-devices-status`);
  }

  public logoutDevice(obj) {
    return this.http.post(`${environment.apiUrl}/api/wa/logoutDevice`, obj);
  }

  public rebootDevice(obj) {
    return this.http.post(`${environment.apiUrl}/api/wa/rebootDevice`, obj);
  }

  public deleteDevice(id) {
    return this.http.delete(`${environment.apiUrl}/api/wa/device/${id}`);
  }

  public updateDevice(obj) {
    return this.http.put(`${environment.apiUrl}/api/wa/device`, obj);
  }


  // GREENAPI

  public getGreenApiStatus(obj) {
    return this.http.post(`${environment.apiUrl}/api/wa/greenapiStatus`, obj);
  }

  public getGreenApiQrCode(url) {
    return this.http.get(url);
  }

  public logoutGreenApi(obj) {
    return this.http.post(`${environment.apiUrl}/api/wa/logoutGreenapi`, obj);
  }

  public rebootGreenApi(obj) {
    return this.http.post(`${environment.apiUrl}/api/wa/rebootGreenapi`, obj);
  }


  // MAYTAPI 

  public getMaytApiStatus(obj) {
    return this.http.post(`${environment.apiUrl}/api/wa/maytapiStatus`, obj);
  }

  public getQrCode(imageUrl: string): Observable<Blob> {
    return this.httpClient.get(imageUrl, {
      headers: {
        'Content-Type': 'image/json',
        'x-maytapi-key': '8113246b-4665-4418-b237-84c0562ba620'
      }, responseType: 'blob'
    });
  }

  public logoutMaytApi(obj) {
    return this.http.post(`${environment.apiUrl}/api/wa/logoutMaytapi`, obj);
  }

  public rebootMaytapi(obj) {
    return this.http.post(`${environment.apiUrl}/api/wa/rebootMaytapi`, obj);
  }


  //OTHER API

  public getMessageList(obj) {
    return this.http.post(`${environment.apiUrl}/api/user/messageList`, obj);
  }

  public getMessageGraphValue(obj) {
    return this.http.post(`${environment.apiUrl}/api/user/messageGraphValue`, obj);
  }

  public sendCode(obj) {
    return this.http.post(`${environment.apiUrl}/api/bot/sendCode`, obj);
  }

  public getUser(id) {
    return this.http.get(`${environment.apiUrl}/api/user/details/${id}`);
  }

  public getBotAdmin(id) {
    return this.http.get(`${environment.apiUrl}/api/app/getBotAdmin/${id}`);
  }

  public updateBotAdmin(obj) {
    return this.http.put(`${environment.apiUrl}/api/app/updateBotAdmin`, obj);
  }

  public updateUser(obj) {
    return this.http.put(`${environment.apiUrl}/api/user/updateUser`, obj);
  }

  public botActivation(obj) {
    return this.http.put(`${environment.apiUrl}/api/user/botActivation`, obj);
  }

  public signin(obj) {
    return this.http.post(`${environment.apiUrl}/api/user/login`, obj);
  }

  public getCurrentUserFromBack() {
    // localStorage.getItem('SPOID')
    return this.http.get(`${environment.apiUrl}/api/user/${localStorage.getItem('SMSID')}`).pipe(map((response: any) => {
      // this.currentUser = response;
      localStorage.setItem(`SMS`, JSON.stringify(response));
      return response;
    }),
      catchError(err => {
        localStorage.removeItem('SMS');
        localStorage.removeItem('SMSID');
        this.router.navigateByUrl('login');
        return err;
      })
    );
  }

  public getAdmin(id) {
    return this.http.get(`${environment.apiUrl}/api/admin/details/${id}`);
  }

  public updateAdmin(obj) {
    return this.http.put(`${environment.apiUrl}/api/admin/updateAdmin`, obj);
  }

  public adminSignin(obj) {
    return this.http.post(`${environment.apiUrl}/api/admin/login`, obj);
  }

  public getCurrentAdminFromBack() {
    // localStorage.getItem('SPOID')
    return this.http.get(`${environment.apiUrl}/api/admin/${localStorage.getItem('SMSADMID')}`).pipe(map((response: any) => {
      // this.currentUser = response;
      localStorage.setItem(`SMSADM`, JSON.stringify(response));
      return response;
    }),
      catchError(err => {
        localStorage.removeItem('SMSADM');
        localStorage.removeItem('SMSADMID');
        this.router.navigateByUrl('/sessions/admin/signin');
        return err;
      })
    );
  }

}
