// chat.service.ts
import { Injectable } from '@angular/core';
import { HttpService } from './../http/http.service';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private baseUrl = environment.apiUrl;
    constructor(private http: HttpService) { }

    // getMessages(phone: string): Observable<any> {
    //     const url = `${this.baseUrl}/api/chat/chatHistory/${phone}`;
    //     return this.http.get<any>(url).pipe(
    //         tap(response => {
    //             if (phone) { 
    //                 console.log('[ChatService] Messages for', phone, '=>', response);
    //             }
    //         })
    //     );
    // }

    // getChats(): Observable<any> {
    //     return this.http.get<any>(`${this.baseUrl}/api/chat/chatHistory`);
    // }

    public getContactChats(companyId: string, phone: string, skip: number) {
        return this.http.get(`${environment.apiUrl}/api/waba/get-contact-chats/${companyId}/${phone}/${skip}`);
    }

    public getCompanyChats(companyId: string, skip: number) {
        return this.http.get(`${environment.apiUrl}/api/waba/get-company-chats/${companyId}/${skip}`);
    }

    public sendMessage(phone: string, message: string) {
        return this.http.post(`${environment.apiUrl}/api/chat/chatResponse`, {
            phone,
            message
        });
    }
    // getCompanyChats(companyId: string, skip: number): Observable<any[]> {
    //     const url = `${this.baseUrl}/api/waba/get-company-chats/${companyId}/${skip}`;
    //     return this.http.get<any[]>(url).pipe(
    //         // tap(res => console.log('[CompanyChats]', res))
    //     );
    // }

    // getContactChats(companyId: string, phone: string, skip: number): Observable<any[]> {
    //     const url = `${this.baseUrl}/api/waba/get-contact-chats/${companyId}/${phone}/${skip}`;
    //     return this.http.get<any[]>(url).pipe(
    //         // tap(res => console.log('[ContactChats]', res))
    //     );
    // }

    // sendMessage(phone: string, message: string): Observable<any> {
    //     return this.http.post(`${this.baseUrl}/api/chat/chatResponse`, {
    //         phone,
    //         message
    //     });
    // }
}