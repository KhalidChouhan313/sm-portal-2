import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QrcodeService {
  constructor(private http: HttpClient) { }

  public generateCode(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/qr-code/create`, data);
  }

  public SaveQrImg(id, img): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/api/qr-code/upload/${id}`,
      img
    );
  }

  public getAllQrCodes(data, page = 1): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/api/qr-code/company-qr-codes/${data}?page=${page}&limit=10`
    );
  }

  public getQrCodeDetails(id): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/api/qr-code/qr-code-details/${id}`
    );
  }

  public deleteQrCode(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/qr-code/delete/${id}`);
  }

  public updateQrCode(id, data): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/api/qr-code/update/${id}`,
      data
    );
  }

  public updateQrCodeStatus(id, data): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/api/qr-code/status/${id}`,
      data
    );
  }

  public getQrCodeStats(id): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/api/qr-code/get-scanned-data/${id}`
    );
  }

  public updateQrImg(id, img): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/api/qr-code/update/${id}`,
      img
    );
  }

  public getPickupLocations(obj): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/api/qr-code/pickup-address`,
      obj
    );
  }

  public getQrCodeByTitle(id, title): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/api/qr-code/getDetails/bycompany/${id}/${title}`
    );
  }

  public updateReviewPage(id, body, title, des): Observable<any> {
    // console.log(body);
    return this.http.post(
      `${environment.apiUrl}/api/qr-code/company-profile/${id}/?link=myLink&title=${title}&description=${des}`,
      body
    );
  }

  public getReviewPage(id): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/api/qr-code/getcompanyprofile/${id}`
    );
  }

  public getReviews(id, page): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/api/qr-code/get-reviews/${id}?&page=${page}`
    );
  }

  public getReviewsFitered(id, page, rating): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/api/qr-code/get-reviews/${id}?rating=${rating}&page=${page}`
    );
  }

  public getChats(id, token, obj): Observable<any> {
    return this.http.post(
      `https://api.green-api.com/waInstance${id}/getChatHistory/${token}`,
      obj
    );
  }

  public getUpcoming(min, id, token): Observable<any> {
    return this.http.get(
      `https://api.green-api.com/waInstance${id}/lastIncomingMessages/${token}?minutes=${min}`
    );
  }

  public getOutGoing(min, id, token): Observable<any> {
    return this.http.get(
      `https://api.green-api.com/waInstance${id}/lastOutgoingMessages/${token}?minutes=${min}`
    );
  }

  public getContactDetails(obj, id, token): Observable<any> {
    return this.http.post(
      `https://api.green-api.com/waInstance${id}/getContactInfo/${token}`,
      obj
    );
  }

  public sendMessage(obj, id, token): Observable<any> {
    return this.http.post(
      `https://api.green-api.com/waInstance${id}/sendMessage/${token}`,
      obj
    );
  }

  public getOfficialContacts(): Observable<any> {
    return this.http.get(
      'https://lookup-dev-d8c5e8b91c4d.herokuapp.com/api/chat/chatHistory'
    );
  }

  public getOfficialChat(id): Observable<any> {
    return this.http.get(
      `https://lookup-dev-d8c5e8b91c4d.herokuapp.com/api/chat/chatHistory/${id}`
    );
  }
}
