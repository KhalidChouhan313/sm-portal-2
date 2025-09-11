import { BotService } from './bot/bot.service';
import { AdminService } from './admin/admin.service';
import { BookingsService } from './bookings/bookings.service';
// import { SocketService } from './web-sockets/web-sockets.service';

export const Services: any[] = [
    BotService,
    AdminService,
    BookingsService,
    // SocketService
];

export {
    BotService,
    AdminService,
    BookingsService,
    // SocketService
}