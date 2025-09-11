import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  constructor(private http: HttpClient) { }

  getCompanyUsers(company_id: string): Observable<any> {
    const token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    });

    return this.http.get(environment.apiUrl + `/api/waba/company-users/${company_id}`, { headers });
  }
}
