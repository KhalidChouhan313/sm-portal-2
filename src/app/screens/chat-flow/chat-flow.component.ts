import { Component, OnInit } from '@angular/core';
import { BookingsService, AdminService } from 'src/services';
import { Router } from '@angular/router';
// import { VehicleTypeSettingsComponent } from '../vehicle-type-settings/vehicle-type-settings.component'
// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chat-flow',
  templateUrl: './chat-flow.component.html',
  styleUrls: ['./chat-flow.component.css'],
})
export class ChatFlowComponent implements OnInit {
  selectedCard: any = null;
  fixedMenuToggled: boolean = false;
  selectedButton: any = null;
  selectCard = (item: any) => {
    this.selectedCard = item;
  };

  selectButton = (item: any) => {
    this.selectedButton = item;
  };

  cards = [
    // {
    //   type: "main",
    //   title: "On Click",
    //   desc: "A Trigger is an event that starts your Automation. Click to add a Trigger.",
    //   id: "m1",
    //   linkedTo: ["c1"],
    //   bottomText: "Then",
    //   triggers: [],
    //   buttons: [
    //   ]
    // },
    // {
    //   type: "conditional",
    //   title: "Conditions",
    //   desc: "",
    //   id: "c1",
    //   bottomText: "If Contact doesn’t match any of conditions",
    //   linkedTo: [],
    //   triggers: [
    //     {
    //       name: "Example Action 1",
    //       linkedTo: ["s1"]
    //     },
    //     {
    //       name: "Example Action 2",
    //       linkedTo: ["s2"]
    //     },
    //   ],
    //   buttons: []
    // },
    // {
    //   type: "simple",
    //   title: "Welcome Message",
    //   desc: "🤖 Hi, thanks for getting in touch, to get a quote or make a booking I need to get some details from you. Firstly, please send your pick-up address or send your current location through the WhatsApp Send Your Current Location feature To restart this chat just send the word home at any time",
    //   id: "s1",
    //   bottomText: "Next Steps",
    //   linkedTo: [],
    //   triggers: [],
    //   buttons: [
    //     {
    //       name: "Example 1 Again",
    //       action: () => console.log(`Example 1 triggered again.`),
    //       linkedTo: []
    //     }
    //   ]
    // },
    // {
    //   type: "simple",
    //   title: "Welcome Message",
    //   desc: "🤖 Hi, thanks for getting in touch, to get a quote or make a booking I need to get some details from you. Firstly, please send your pick-up address or send your current location through the WhatsApp Send Your Current Location feature To restart this chat just send the word home at any time",
    //   id: "s2",
    //   bottomText: "Next Steps",
    //   linkedTo: [],
    //   triggers: [],
    //   buttons: [
    //     {
    //       name: "Example 2 Again",
    //       action: () => console.log(`Example 2 triggered again.`),
    //       linkedTo: ["c2"]
    //     }
    //   ]
    // },
    // {
    //   type: "conditional",
    //   title: "Condition 2",
    //   desc: "",
    //   id: "c2",
    //   bottomText: "If Contact doesn’t match any of conditions",
    //   linkedTo: [],
    //   triggers: [
    //     {
    //       name: "Condition 2 Example 1",
    //       linkedTo: []
    //     },
    //     {
    //       name: "Condition 2 Example 2",
    //       linkedTo: []
    //     },
    //   ],
    //   buttons: []
    // },
  ];

  // private serviceModal: NgbModalRef;

  adminDetails: any;
  edit_id = false;
  phone_id: string;
  limitMsg: boolean;
  k_word: boolean = false;
  isEdit: boolean = false;
  isLoad: boolean = true;
  normal_msg = '';
  msg_name = '';
  keywordList = [];
  msgName = '';
  keyword = [];
  messageList = [];
  currMessage: any;
  currIndex: number = -1;
  isSaving = false;

  constructor(
    private BS: BookingsService,
    private AS: AdminService,
    // private _serviceModal: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('user_details'));
    // if (!currentUser) {
    //   this.router.navigateByUrl('login');
    // }
    this.AS.getUser(currentUser._id).subscribe((admin) => {
      this.adminDetails = admin;
      // if (!this.adminDetails.wtsp_bot) {
      //   this.router.navigateByUrl('login');
      // }
      this.BS.getBotMessages(currentUser._id).subscribe((result: any) => {
        // console.log(result);

        let res: any = (this.messageList = result.data.sort((a, b) => {
          return a.msg_index - b.msg_index;
        })); //.filter(f => f.msg_index == 2)
        res = this.moveMessage(res, 3, 6);
        res = this.moveMessage(res, 15, 4);
        res = this.moveMessage(res, 20, 5);
        res = this.moveMessage(res, 21, 6);
        res = this.moveMessage(res, 22, 7);
        res = this.moveMessage(res, 23, 8);
        res = this.moveMessage(res, 24, 13);
        res = this.moveMessage(res, 25, 14);
        res = this.moveMessage(res, 26, 15);
        res = this.moveMessage(res, 27, 16);
        res = this.moveMessage(res, 34, 23);
        res = this.moveMessage(res, 35, 24);
        res = this.moveMessage(res, 36, 25);
        res = this.moveMessage(res, 32, 1);
        res = this.moveMessage(res, 27, 2);
        this.messageList = res;
        // console.log(this.messageList);

        if (this.messageList.length > 0) {
          this.currMessage = this.messageList[0];
          this.msgName = this.currMessage.msg_name;
          this.normal_msg = this.messageList[0].msg_body;
          if (this.normal_msg == '') {
            this.isEdit = false;
          }
          this.isLoad = false;
        }
        this.cards = [];
        this.messageList.map((ml, i) => {
          let obj = {
            type: 'conditional',
            title: ml.msg_name,
            desc: ml.msg_body,
            id: ml.msg_index,
            bottomText: 'Next',
            linkedTo:
              i < this.messageList.length - 1
                ? [this.messageList[i + 1].msg_index.toString()]
                : [],
            triggers: [
              {
                name: 'Example Action 1',
                linkedTo: ['s1'],
              },
              {
                name: 'Example Action 2',
                linkedTo: ['s2'],
              },
            ],
            buttons: [],
          };
          this.cards.push(obj);
        });
      });
    });
  }

  private moveMessage(arr: any, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
  }

  openMessage(index) {
    // this.k_word = true;
    // this.limitMsg = false;
    // if (index == 0 || index == 1) { this.k_word = false; }
    // if (index == 2) { this.k_word = false; this.limitMsg = true }
    this.isEdit = true;
    this.currMessage = this.messageList[index];
    this.msgName = this.currMessage.msg_name;
    this.currIndex = index;
    // this.keywordList = []
    this.normal_msg = this.currMessage.msg_body;
    // if (this.normal_msg == '') { this.isEdit = false }

    // this.currMessage.keywords.map(word => {
    //   let obj = {
    //     display: word.value,
    //     value: word.value
    //   }
    //   this.keywordList.push(obj);
    // })
  }

  setMessage() {
    // let keywords = [];
    // this.keywordList.map(a => {
    //   let kObj = {
    //     value: a.value
    //   }
    //   keywords.push(kObj)
    // });
    this.isSaving = true;
    let obj = {
      _id: this.currMessage._id,
      msg_name: this.msgName,
      msg_body: this.normal_msg,
      // keywords: keywords
    };

    this.BS.updateMessage(obj).subscribe((result) => {
      this.messageList[this.currIndex] = result;
      this.isEdit = false;
      this.currIndex = -1;
      this.isSaving = false;
      this.ngOnInit();
      // this.keywordList = [];
      // this.messageList[this.currIndex].keywords.map(word => {
      //   let obj = {
      //     display: word.value,
      //     value: word.value
      //   }
      //   this.keywordList.push(obj);
      // })
    });
  }

  cancelEdit() {
    this.isEdit = false;
    this.currIndex = -1;
  }
}
