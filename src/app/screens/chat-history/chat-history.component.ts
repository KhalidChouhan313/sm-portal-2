import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { SocketService } from 'src/services';
import { ChatService } from 'src/services/chat-service/chat-service';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css'],
  // providers: [SocketService]
})
export class ChatHistoryComponent implements OnInit, OnDestroy {
  @ViewChildren('messageRef') messageRefs!: QueryList<ElementRef>;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @HostListener('document:click')

  scrollTimeout: any;
  phonesData: any[] = [];
  selectedPhone: string = '';
  messages: any[] = [];
  newMessage = '';
  sending = false;
  companyId = '';
  sidebarSkip = 0;
  skip = 0;
  isLoading = false;
  allLoaded = false;
  chatLoading = false;
  allMessages: { [phone: string]: any[] } = {};
  contactMessages: { [phone: string]: any[] } = {};
  showEmojiPicker = false;
  emojiClickedInside = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    // private socketService: SocketService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('user_details'));
    this.companyId = currentUser._id
    this.chatService.getCompanyChats(this.companyId, this.sidebarSkip).subscribe((res: any) => {
      this.phonesData = res;
      // console.log(`Total contacts ===> ${this.phonesData}`);
      if (this.phonesData[0]) {
        this.selectPhone(this.phonesData[0]._id)
      }

      // console.log('Response of contacts', res);
      // this.sidebarSkip = 0;
      // this.loadSidebarPhones();
      // // console.log('[Company Chats]', res);

      // const urlPhone = decodeURIComponent(this.route.snapshot.paramMap.get('phone') || '');
      // // console.log('[URL Phone Param]', urlPhone);

      // if (urlPhone) {
      //   // this.selectedPhone = urlPhone;
      //   // // console.log('[Selected Phone from URL]', this.selectedPhone);
      //   // this.loadMessages(urlPhone);
      //   // // this.socketService.joinRoom(urlPhone);
      // }
    });
  }

  handleClickOutside() {
    if (!this.emojiClickedInside) {
      this.showEmojiPicker = false;
    }
    this.emojiClickedInside = false;
  }

  getSelectedButton(msg, btn): any {
    if (msg.from_me) {
      return ''
    }
    let pressed = false;
    let found = this.messages.find(ml => ml.context_id == msg.wamid)
    // console.log(found);

    if (found) {
      if (found.type == 'interactive') {
        if (found.interactive.type == "button_reply") {
          if (found.interactive.button_reply.id == btn.reply.id) {
            pressed = true;
          }
        }
      }
      if (found.type == 'button') {
        if (found.button.text == btn.text) {
          pressed = true;
        }
      }
    }

    return {
      'background-color': pressed ? '#28c8d1' : '#1a9096',
      'box-shadow': pressed ? '2px 2px 5px 0px #1a7e84' : ''
      // 'font-weight': this.isImportant ? 'bold' : 'normal',
      // 'font-size': this.isLarge ? '20px' : '14px'
    };
  }

  getSelectedListItem(msg, item): any {
    if (msg.from_me) {
      return ''
    }
    let pressed = false;
    let found = this.messages.find(ml => ml.context_id == msg.wamid)
    // console.log(found);

    if (found) {
      if (found.type == 'interactive') {
        if (found.interactive.type == "list_reply") {
          if (found.interactive.list_reply.id == item.id) {
            pressed = true;
          }
        }
      }
    }

    return {
      'background-color': pressed ? '#1a9096' : '#f9fff9',
      'box-shadow': pressed ? '#b6b6b6 0px 0px 8px 3px' : '',
      'color': pressed ? '#fff' : ''
      // 'font-weight': this.isImportant ? 'bold' : 'normal',
      // 'font-size': this.isLarge ? '20px' : '14px'
    };
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    const native = event.emoji?.native;
    // console.log('Emoji Native:', native);

    if (native) {
      this.newMessage += native;
    } else {
      // console.warn('Emoji native value is missing');
    }
  }

  onSidebarScroll(event: any) {
    const element = event.target;
    const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 10;

    if (atBottom && !this.isLoading && !this.allLoaded) {
      // console.log('[Sidebar Scroll] Bottom reached. Loading more contacts...');
      this.loadSidebarPhones();
    }
  }

  ngOnDestroy() {
    // this.socketService.leaveRoom(this.selectedPhone);
    // this.socketService.removeListener('newChat');
  }

  // @HostListener('window:scroll', [])
  // onScroll() {
  //   const element = this.scrollContainer?.nativeElement;
  //   if (!element || this.isLoading || this.allLoaded) return;

  //   const atTop = element.scrollTop === 0;
  //   if (atTop) {
  //     this.loadMoreMessages();
  //   }
  // }

  loadSidebarPhones() {
    this.isLoading = true;

    this.chatService.getCompanyChats(this.companyId, this.sidebarSkip).subscribe({
      next: (res: any) => {
        if (res?.length) {
          // Filter out duplicates based on _id
          const newContacts = res.filter((item: any) =>
            !this.phonesData.some(existing => existing._id === item._id)
          );

          this.phonesData = [...this.phonesData, ...newContacts];
          this.sidebarSkip += 20;

        } else {
          // console.log('[Sidebar Scroll] No more contacts to load. All loaded.');
          this.allLoaded = true;
        }

        this.isLoading = false;
      },
      error: (err) => {
        // console.warn('[Sidebar Scroll] Error while loading contacts:', err);
        this.allLoaded = true;
        this.isLoading = false;
      }
    });
  }

  loadMoreMessages() {
    if (this.isLoading || this.allLoaded) return;

    this.isLoading = true;
    this.chatService.getContactChats(this.companyId, this.selectedPhone, this.skip).subscribe((res: any) => {
      const newMessages = res || [];

      if (newMessages.length === 0) {
        this.allLoaded = true;
      } else {
        this.messages = [...newMessages.reverse(), ...this.messages];
        this.allMessages[this.selectedPhone] = this.messages;
        this.skip += newMessages.length;
      }
      this.isLoading = false;
    });
  }

  onChatScroll(event: any): void {
    // Clear existing timer
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    // Set a new timer (e.g., 200ms after last scroll)
    this.scrollTimeout = setTimeout(() => {
      let element = event.target
      const atBottom = (element.scrollTop * -1) + element.clientHeight >= element.scrollHeight - 10;
      if (atBottom && !this.chatLoading) {
        this.onScrollEnd();
      }
    }, 200);
  }

  onScrollEnd(): void {
    this.chatLoading = true;
    this.chatService.getContactChats(this.companyId, this.selectedPhone, this.skip).subscribe(
      (res: any) => {
        const newMessages = res || [];
        this.messages = [...this.messages, ...newMessages];
        // console.log(this.messages.length);
        this.skip += newMessages.length;
        this.chatLoading = false;
        // setTimeout(() => this.scrollToLatest(), 300);
      },
      error => {
        // console.error('Error loading messages:', error);
        // this.messages = [];
        // this.isLoading = false;
      }
    );
  }

  selectPhone(phone: string) {
    // if (this.selectedPhone) this.socketService.leaveRoom(this.selectedPhone);
    if (this.selectedPhone != phone) {
      this.selectedPhone = phone;
      this.messages = [];
      this.skip = 0;
      this.allLoaded = false;
      // this.router.navigate(['/chat-history', phone]);
      this.loadMessages(phone);
      // this.socketService.joinRoom(phone);
    }
  }

  loadMessages(phone: string) {
    this.isLoading = true;
    this.chatService.getContactChats(this.companyId, phone, this.skip).subscribe(
      (res: any) => {
        const newMessages = res || [];
        this.messages = [...newMessages, ...this.messages];
        console.log(this.messages);

        this.allMessages[phone] = this.messages;
        this.skip += newMessages.length;
        this.isLoading = false;
        // setTimeout(() => this.scrollToLatest(), 300);
      },
      error => {
        // console.error('Error loading messages:', error);
        this.messages = [];
        this.isLoading = false;
      }
    );
  }

  sendMessage() {
    const trimmed = this.newMessage.trim();
    if (!trimmed || this.sending || !this.selectedPhone) return;

    this.sending = true;
    this.chatService.sendMessage(this.selectedPhone, trimmed).subscribe({
      next: () => {
        this.newMessage = '';
        this.sending = false;
      },
      error: (err: any) => {
        // console.error('Send error:', err);
        this.sending = false;
      }
    });
  }

  getReplyBody(contextId: string): string {
    const original = this.messages.find(m => m.wamid === contextId);
    if (original?.type == 'template') {
      let msg = '';
      original.template_data?.components.map(cl => {
        if (cl.type != "BUTTONS") {
          msg = msg + cl.text + '\n';
        }
      })
      return msg
    } else {
      return original?.interactive?.body?.text || original?.text || 'Replied';
    }
  }

  getRepliedBy(wamid: string): string | null {
    if (!wamid) return null;
    const reply = this.messages.find(
      m => m.from_me &&
        m.interactive &&
        ['button_reply', 'list_reply'].includes(m.interactive.type) &&
        m.context_id === wamid
    );
    return (
      reply?.interactive?.button_reply?.title ||
      reply?.interactive?.list_reply?.title ||
      null
    );
  }

  scrollToContext(wamid: string) {
    const targetEl = this.messageRefs.find(
      ref => ref.nativeElement.getAttribute('data-wamid') === wamid
    );
    if (targetEl) {
      targetEl.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetEl.nativeElement.classList.add('highlight');
      setTimeout(() => targetEl.nativeElement.classList.remove('highlight'), 2000);
    }
  }

  scrollToLatest() {
    const last = this.messageRefs?.last;
    if (last) last.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  public formatTime(timestamp) {

    let t = parseInt(timestamp)
    let date = new Date(t);
    const isoString = date.toISOString();
    // console.log(t, isoString);

    return isoString;
  }

  // getLastMessageMeta(phone: string): { message: string; time: string } | null {
  //   const item = this.phonesData.find(p => p._id === phone);
  //   if (!item) return null;

  //   const time = this.formatTime(item.latestCreatedAt);
  //   const message = this.getLastMessagePreview(item);

  //   return { message, time };
  // }

  getLastMessagePreview(item: any): string {
    if (!item || !item.type) return '⚠️ No message';

    if (item.type === 'text') return item.text;
    if (item.type === 'image') return '📷 Image';
    if (item.type === 'location') return '📍 Location';

    if (item.type === 'interactive') {
      const type = item.interactive?.type;
      if (type === 'button') return item.interactive?.body?.text || 'Button';
      if (type === 'list') return item.interactive?.body?.text || 'List';
      if (type === 'cta_url') return item.interactive?.body?.text || 'Link';
      if (type === 'button_reply') return item.interactive?.button_reply?.title || 'Replied';
      if (type === 'list_reply') return item.interactive?.list_reply?.title || 'Selected';
      if (type === 'location_request_message') return item.interactive?.body?.text || 'Location Request';
      return '⚠️ Unknown interactive';
    }

    return '⚠️ Unknown message';
  }

  truncateText(text: string, maxChars = 30): string {
    return text.length > maxChars ? text.slice(0, maxChars) + '...' : text;
  }
}
