import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiPromptService {
  url = 'https://bnwc-dca762a35f40.herokuapp.com';
  constructor(private http: HttpClient) {}

  public getMainPrompt(data): Observable<any> {
    return this.http.get(`${this.url}/api/get-system-prompt/${data}`);
  }

  public getFlightInfoPrompt(data): Observable<any> {
    return this.http.get(`${this.url}/api/get-flight-prompt/${data}`);
  }

  public createNewPrompt(data): Observable<any> {
    return this.http.post(`${this.url}/api/new-prompt`, data);
  }

  public updateMainPrompt(data): Observable<any> {
    return this.http.put(`${this.url}/api/update-systemprompt`, data);
  }

  public updateFlightInfoPrompt(data): Observable<any> {
    return this.http.put(`${this.url}/api/edit-flight-prompt`, data);
  }
}
