// import { Injectable } from '@angular/core';
// import { io, Socket } from 'socket.io-client';
// import { environment } from 'src/environments/environment';

// @Injectable({
//     providedIn: 'root'
// })
// export class SocketService {
//     private socket: Socket;

//     constructor() {
//         this.socket = io(environment.apiUrl);
//     }

//     joinRoom(phone: string) {
//         this.socket.emit('joinRoom', phone);
//     }

//     leaveRoom(phone: string) {
//         this.socket.emit('leaveRoom', phone);
//     }

//     sendMessage(message: any) {
//         this.socket.emit('sendMessage', message);
//     }

//     onMessage(callback: (msg: any) => void) {
//         this.socket.on('newMessage', callback);
//     }

//     removeListener(event: string) {
//         this.socket.off(event);
//     }

//     onNewChat(callback: (msg: any) => void) {
//         this.socket.on('newChat', callback);
//     }


// }
