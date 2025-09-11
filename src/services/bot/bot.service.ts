import { Injectable } from '@angular/core';
import { HttpService } from './../http/http.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  constructor(private http: HttpService) { }

  public setBlacklistUser(obj) {
    return this.http.post(`${environment.apiUrl}/api/user/blacklist`, obj);
  }

  public updateBlacklistUser(obj) {
    return this.http.put(`${environment.apiUrl}/api/user/blacklist`, obj);
  }

  public getBlacklistUser(id) {
    return this.http.get(`${environment.apiUrl}/api/user/blacklist/${id}`);
  }

  public deleteBlacklistUser(id) {
    return this.http.delete(`${environment.apiUrl}/api/user/blacklist/${id}`);
  }

  public setMessage(obj) {
    return this.http.post(`${environment.apiUrl}/api/app/setMessage`, obj);
  }

  public getPassenger(id) {
    return this.http.get(`${environment.apiUrl}/api/app/getPassenger/${id}`);
  }

  public getDriver(id) {
    return this.http.get(`${environment.apiUrl}/api/app/getDriver/${id}`);
  }

  public updateMessage(obj) {
    return this.http.put(`${environment.apiUrl}/api/app/updateBotMessage`, obj);
  }

  public deleteMessage(id) {
    return this.http.delete(`${environment.apiUrl}/api/app/deleteMessage/${id}`);
  }

  public getBotMessages(id) {
    return this.http.get(`${environment.apiUrl}/api/app/getBotMessages/${id}`);
  }

  // public setData(obj) {
  //   return this.http.post(`${environment.apiUrl}/api/app/setData`, obj);
  // }

  // public getData() {
  //   return this.http.get(`${environment.apiUrl}/api/app/getData`);
  // }

  // public updateData(obj) {
  //   return this.http.put(`${environment.apiUrl}/api/app/updateData`, obj);
  // }

  // public deleteData(id) {
  //   return this.http.delete(`${environment.apiUrl}/api/app/deleteData/${id}`);
  // }

  // public setSpecialNumber(obj) {
  //   return this.http.post(`${environment.apiUrl}/api/app/setSpecialNumber`, obj);
  // }

  // public getSpecialNumber() {
  //   return this.http.get(`${environment.apiUrl}/api/app/getSpecialNumber`);
  // }

  // public deleteSpecialNumber(id) {
  //   return this.http.delete(`${environment.apiUrl}/api/app/deleteSpecialNumber/${id}`);
  // }

  public getUser() {
    return this.http.get(`${environment.apiUrl}/api/app/getUser`);
  }

  public getBroadcast(id) {
    return this.http.get(`${environment.apiUrl}/api/user/getBroadcast/${id}`);
  }

  public setBroadcast(obj) {
    return this.http.post(`${environment.apiUrl}/api/user/setBroadcast`, obj);
  }

  public pauseBroadcast(id) {
    return this.http.get(`${environment.apiUrl}/api/user/pauseBroadcast/${id}`);
  }

  public deleteBroadcast(id) {
    return this.http.delete(`${environment.apiUrl}/api/user/deleteBroadcast/${id}`);
  }

  // public setRegUser(obj) {
  //   return this.http.post(`${environment.apiUrl}/api/app/setRegUser`, obj);
  // }

  // public getRegUser() {
  //   return this.http.get(`${environment.apiUrl}/api/app/getRegUser`);
  // }

  // public deleteRegUser(id) {
  //   return this.http.delete(`${environment.apiUrl}/api/app/deleteRegUser/${id}`);
  // }

}
