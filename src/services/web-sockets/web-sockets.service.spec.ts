import { TestBed } from '@angular/core/testing';
import { SocketService } from './web-sockets.service';

describe('SocketService', () => {
  let service: SocketService;
  const dummyPhone = '03001234567'; 
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call joinRoom without error', () => {
    spyOn(service as any, 'socket').and.returnValue({ emit: () => {} });
    expect(() => service.joinRoom(dummyPhone)).not.toThrow();
  });

  it('should call leaveRoom without error', () => {
    spyOn(service as any, 'socket').and.returnValue({ emit: () => {} });
    expect(() => service.leaveRoom(dummyPhone)).not.toThrow();
  });
});
