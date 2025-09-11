import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AdminService, BotService, BookingsService } from 'src/services';
import { QrcodeService } from 'src/services/qrcode/qrcode.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private AS: AdminService,
    private BKS: BookingsService,
    private QR: QrcodeService
  ) { }

  currentUser: any;
  wabaDeviceDetails: any;
  deviceList = [];
  haveWabaDevice = false;
  selectedDevice: any;
  showDeviceList = false;
  chatList: any = [];

  isIncoming = false;
  isOutgoing = false;
  contactList: any = [];
  contactLastMsgList: any = [];
  textMessage: string = '';

  contactPollingInterval: any;

  lastSeenTimestamps: { [chatId: string]: number } = {};
  newMsgCounts: { [chatId: string]: number } = {};

  showMainLoader = true;
  ngOnInit(): void {
    this.showMainLoader = true;
    // this.AS.getCurrentUserFromBack().subscribe(() => {
    this.currentUser = JSON.parse(localStorage.getItem('user_details'));
    // console.log(this.currentUser);

    if (!this.currentUser) {
      this.router.navigateByUrl('login');
    }
    this.AS.getUser(this.currentUser._id).subscribe((usr) => {
      this.BKS.getCompanyBots(this.currentUser._id).subscribe((admin) => {
        // console.log('admin', admin.data[0]);
        this.wabaDeviceDetails = admin.data[0];
        if (admin.data[0].wa_phone_id.length) {
          this.haveWabaDevice = true;
          // this.deviceList.push({
          //   device_id: admin.data[0].wa_phone_id,
          //   device_name: 'Official WhatsApp Account',
          // });
        }
      });
      this.currentUser = usr;
      this.deviceList = usr.wa_api.filter(
        (d) =>
          d.status &&
          (d.wa_api_platform == 'chatapi' ||
            d.wa_api_platform == 'maytapi' ||
            d.wa_api_platform == 'greenapi')
      );
      // console.log(this.deviceList);
      this.selectedDevice = this.deviceList[0] || null;
      this.contactId = this.deviceList[0]?.device_id;
      this.contactToken = this.deviceList[0]?.token;
      setTimeout(() => {
        this.fetchContact();
      }, 1000);
    });
    this.contactPollingInterval = setInterval(() => {
      if (this.selectedDevice.device_name !== 'Official WhatsApp Account') {
        // console.log(this.selectedDevice);
        this.fetchContact(360, 3);
      }
    }, 6000); // 3000 ms = 3 seconds
  }

  selectDevice(i) {
    // Clear existing polling interval
    if (this.contactPollingInterval) {
      clearInterval(this.contactPollingInterval);
    }

    this.selectedDevice = this.deviceList[i];
    this.showDeviceList = false;
    this.contactId = this.deviceList[i]?.device_id;
    this.contactToken = this.deviceList[i]?.token;

    // Reset contact list and selected contact
    this.contactList = [];
    this.selectedContactIndex = 0;
    this.chatList = [];

    // console.log('current device', this.selectedDevice);
    // Start fresh contact fetch
    this.fetchContact();

    // Restart polling with new device
    this.contactPollingInterval = setInterval(() => {
      if (this.selectedDevice.device_name !== 'Official WhatsApp Account') {
        this.fetchContact(360, 3);
      }
    }, 6000);

    if (this.selectedDevice.device_name == 'Official WhatsApp Account') {
      // console.log('Fetching official contacts...');
      this.QR.getOfficialContacts().subscribe((res) => {
        // console.log('Official contacts response:', res);
        this.contactList = res.phones;
        let officialNumber = this.contactList[0];
        // console.log('Selected official number:', officialNumber);

        this.QR.getOfficialChat(officialNumber).subscribe((chat) => {
          // console.log('Raw official chat response:', chat);
          this.officialChatList = chat.chat_panel;
          // console.log(
          // 'Official chat list after assignment:',
          //   this.officialChatList
          // );
          // console.log('First chat in list:', this.officialChatList?.[0]);
          this.chatLoader = true; // Set to true to show the chat
        });
      });
    }
  }

  officialChatList;

  selectedContactIndex: any = 0;
  selectedContactInfo: any;
  selectContact(i) {
    this.chatLoader = true;
    const obj1 = {
      chatId: this.contactList[i]?.chatId || '',
      count: 100000,
    };
    this.selectedContactIndex = i;
    this.QR.getChats(this.contactId, this.contactToken, obj1).subscribe(
      (res) => {
        this.chatList = res;
        this.chatLoader = false;
        // console.log(res);
      }
    );
    const obj2 = {
      chatId: this.contactList[i]?.chatId || '',
    };
    // this.QR.getContactDetails(
    //   obj2,
    //   this.contactId,
    //   this.contactToken
    // ).subscribe((res) => {
    //   this.selectedContactInfo = res;
    // console.log('chatinfo', res);
    // });
  }

  chatLoader = false;
  fetchChat() {
    const obj = {
      chatId: this.contactList[this.selectedContactIndex]?.chatId || '',
      count: 100000,
    };
    this.QR.getChats(this.contactId, this.contactToken, obj).subscribe(
      (res) => {
        this.chatList = res;
        // console.log('chat', res);
        this.showMainLoader = false;
        this.chatLoader = true;
      }
    );
    const obj2 = {
      chatId: this.contactList[this.selectedContactIndex]?.chatId || '',
    };
    this.QR.getContactDetails(
      obj2,
      this.contactId,
      this.contactToken
    ).subscribe((res) => {
      this.selectedContactInfo = res;
      // console.log('chatinfo', res);
    });
  }

  contactId: any;
  contactToken: any;

  fetchContact(limit: number = 180, runCount: number = 1) {
    this.isIncoming = false;
    this.isOutgoing = false;

    forkJoin({
      incoming: this.QR.getUpcoming(limit, this.contactId, this.contactToken),
      outgoing: this.QR.getOutGoing(limit, this.contactId, this.contactToken),
    }).subscribe(({ incoming, outgoing }) => {
      this.isIncoming = true;
      this.isOutgoing = true;

      const merged = [...incoming, ...outgoing];

      const updatedContactMap = new Map<string, any>();
      this.contactList.forEach((contact) => {
        updatedContactMap.set(contact.chatId, contact);
      });

      for (const item of merged) {
        if (item.chatId.split('@')[0].length > 13) continue; // Skip chatIds longer than 13

        const existing = updatedContactMap.get(item.chatId);
        if (!existing || item.timestamp > existing.timestamp) {
          updatedContactMap.set(item.chatId, item);
        }
      }

      const prevSelectedChatId =
        this.contactList[this.selectedContactIndex]?.chatId;
      this.contactList = Array.from(updatedContactMap.values());
      // Sort the contactList by timestamp in descending order (latest first)
      this.contactList.sort((a, b) => b.timestamp - a.timestamp);
      const newIndex = this.contactList.findIndex(
        (c) => c.chatId === prevSelectedChatId
      );
      this.selectedContactIndex = newIndex !== -1 ? newIndex : 0;

      // console.log(
      // `Run #${runCount} | Limit: ${limit} | Contacts:`,
      //   this.contactList.length
      // );

      if (this.contactList.length >= 15 || runCount >= 6) {
        // console.log('Stopping recursion', this.contactList);
        setTimeout(() => {
          this.fetchChat();
        }, 1000);
        return;
      }

      // Recursive call moved inside the subscribe block to ensure it waits for the response
      this.fetchContact(limit + 180, runCount + 1);

      this.contactList.forEach((contact) => {
        const chatId = contact.chatId;
        const lastSeen = this.lastSeenTimestamps[chatId] || 0;
        // Assume contact.timestamp is the latest message timestamp for this contact
        if (contact.timestamp > lastSeen) {
          // Count how many messages are newer than lastSeen
          // If you only have the latest message, just set 1 if newer, else 0
          this.newMsgCounts[chatId] = 1;
        } else {
          this.newMsgCounts[chatId] = 0;
        }
      });
    });
  }

  // fetchContactDetails() {
  //   const maxRetries = 3;

  //   const delay = (ms: number) =>
  //     new Promise((resolve) => setTimeout(resolve, ms));

  //   const getDetailsWithRetry = async (
  //     item: any,
  //     index: number,
  //     retries = 0
  //   ) => {
  //     const obj = { chatId: item.chatId };

  //     this.QR.getContactDetails(
  //       obj,
  //       this.contactId,
  //       this.contactToken
  //     ).subscribe(
  //       (res) => {
  //         this.contactDetailList[index] = res;
  // console.log(`Success [${index}]`, res);
  //       },
  //       async (err) => {
  //         console.error(`Failed [${index}] attempt ${retries + 1}`, err);
  //         if (retries < maxRetries) {
  //           await delay(1000); // Retry after 1 second
  //           getDetailsWithRetry(item, index, retries + 1);
  //         } else {
  //           console.warn(
  //             `Giving up on [${index}] after ${maxRetries} attempts.`
  //           );
  //         }
  //       }
  //     );
  //   };

  //   this.contactList.forEach((item, index) => {
  //     setTimeout(() => {
  //       getDetailsWithRetry(item, index);
  //     }, index * 300); // Send one request every second
  //   });
  // }

  // fetchContactLastMsg() {
  //   const maxRetries = 3;

  //   const delay = (ms: number) =>
  //     new Promise((resolve) => setTimeout(resolve, ms));

  //   const getDetailsWithRetry = async (
  //     item: any,
  //     index: number,
  //     retries = 0
  //   ) => {
  //     const obj = {
  //       chatId: item.chatId || '',
  //       count: 1,
  //     };

  //     this.QR.getChats(this.contactId, this.contactToken, obj).subscribe(
  //       (res) => {
  //         this.contactLastMsgList[index] = res;
  // console.log(`Success [${index}]`, res);
  //       },
  //       async (err) => {
  //         console.error(`Failed [${index}] attempt ${retries + 1}`, err);
  //         if (retries < maxRetries) {
  //           await delay(1000); // Retry after 1 second
  //           getDetailsWithRetry(item, index, retries + 1);
  //         } else {
  //           console.warn(
  //             `Giving up on [${index}] after ${maxRetries} attempts.`
  //           );
  //         }
  //       }
  //     );
  //   };

  //   this.contactList.forEach((item, index) => {
  //     setTimeout(() => {
  //       getDetailsWithRetry(item, index);
  //     }, index * 300); // Send one request every second
  //   });
  // }

  loadCount: number = 0;
  isLoading: boolean = false;

  showContactLoader = false;

  handleScrollAndLoad(event: Event) {
    const target = event.target as HTMLElement;
    const threshold = 100;
    const position = target.scrollTop + target.clientHeight;
    const height = target.scrollHeight;

    if (height - position > threshold || this.isLoading) return;

    this.isLoading = true;
    this.showContactLoader = true;

    const baseMinutes = 1080; // 24 hours
    const extraMinutes = this.loadCount * 360; // +6 hours per call
    const totalMinutes = baseMinutes + extraMinutes;

    forkJoin({
      incoming: this.QR.getUpcoming(
        totalMinutes,
        this.contactId,
        this.contactToken
      ),
      outgoing: this.QR.getOutGoing(
        totalMinutes,
        this.contactId,
        this.contactToken
      ),
    }).subscribe(
      ({ incoming, outgoing }) => {
        const merged = [...incoming, ...outgoing];
        const updatedContactMap = new Map<string, any>();

        // Populate map with existing contacts
        this.contactList.forEach((contact) => {
          updatedContactMap.set(contact.chatId, contact);
        });

        for (const item of merged) {
          const chatId = item.chatId;
          const numberPart = chatId.split('@')[0];
          if (numberPart.length > 13) continue; // Skip chatIds longer than 13

          const existing = updatedContactMap.get(chatId);
          if (!existing || item.timestamp > existing.timestamp) {
            updatedContactMap.set(chatId, item);
          }
        }

        this.contactList = Array.from(updatedContactMap.values());
        // Sort the contactList by timestamp in descending order (latest first)
        this.contactList.sort((a, b) => b.timestamp - a.timestamp);

        this.isLoading = false;
        this.showContactLoader = false;
        this.loadCount++;
      },
      () => {
        this.isLoading = false;
        this.showContactLoader = false;
      }
    );
  }

  getTimeFromTimestamp(ts: number): string {
    const date = new Date(ts * 1000); // Convert to ms

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }); // e.g., "Jun"
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  }

  isFocused = false;
  sendTextMessage() {
    this.isFocused = true;
    const chatId = this.contactList[this.selectedContactIndex]?.chatId || '';
    const tempMsg = {
      chatId,
      message: this.textMessage,
      timestamp: Math.floor(Date.now() / 1000), // current time in seconds
      fromMe: true, // or whatever your sent message flag is
      pending: true, // custom flag to show it's not confirmed yet
    };

    // Optimistically add to chatList
    this.chatList.push(tempMsg);

    const obj = {
      chatId,
      message: this.textMessage,
    };

    this.QR.sendMessage(obj, this.contactId, this.contactToken).subscribe(
      (res) => {
        // console.log('Message sent:', res);
        this.pollForNewMessages();
        // Optionally, update/remove the pending message here if you want
      }
    );
    this.textMessage = '';
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault(); // Prevents the button from stealing focus
  }

  formatBoldStars(text: string): string {
    if (!text) return '';

    // First, convert newlines to <br />
    let formatted = text.replace(/\n/g, '<br />');

    // Then convert *bold* to <strong>bold</strong>
    formatted = formatted.replace(/\*(.+?)\*/g, '<strong>$1</strong>');

    return formatted;
  }

  pollForNewMessages(retries: number = 5, delayMs: number = 1000) {
    let attempts = 0;
    const poll = () => {
      this.fetchChat();
      attempts++;
      if (attempts < retries) {
        setTimeout(poll, delayMs);
      }
    };
    poll();
  }

  ngOnDestroy(): void {
    if (this.contactPollingInterval) {
      clearInterval(this.contactPollingInterval);
    }
  }

  trackByChatId(index: number, contact: any): string {
    return contact.chatId;
  }
}
