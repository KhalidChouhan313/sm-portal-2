import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: any = null;

  constructor(private http: HttpClient) {}

  login(username: any, password: any): Observable<any> {
    const body = { user_name: username, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(environment.apiUrl + '/api/user/login', body, {
      headers,
    });
  }

  authenticateUser(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(environment.apiUrl + '/api/user/' + token, {
      headers,
    });
  }

  public updateUser(obj) {
    return this.http.put(`${environment.apiUrl}/api/user/updateUser`, obj);
  }
}
