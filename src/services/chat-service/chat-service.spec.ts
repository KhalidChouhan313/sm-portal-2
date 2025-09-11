import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChatService } from './chat-service';
import { environment } from 'src/environments/environment';

describe('ChatService', () => {
  let service: ChatService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.chatSupportUrl;

  const dummyCompanyId = '5fa33297c9ec66867188999f';
  const dummyPhone = '923112233445';
  const skip = 0;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChatService]
    });

    service = TestBed.inject(ChatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch company chats', () => {
    const dummyData = [{ _id: dummyPhone, latestCreatedAt: new Date() }];
    
    service.getCompanyChats(dummyCompanyId, skip).subscribe(res => {
      expect(res).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/waba/get-company-chats/${dummyCompanyId}/${skip}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should fetch contact chat messages', () => {
    const dummyMessages = [{ phone: dummyPhone, type: 'text', text: 'Hello' }];
    
    service.getContactChats(dummyCompanyId, dummyPhone, skip).subscribe(res => {
      expect(res).toEqual(dummyMessages);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/waba/get-contact-chats/${dummyCompanyId}/${dummyPhone}/${skip}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMessages);
  });

  it('should send a message', () => {
    const message = 'Hello';
    const response = { success: true };

    service.sendMessage(dummyPhone, message).subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/chat/chatResponse`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ phone: dummyPhone, message });
    req.flush(response);
  });
});
