import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AiPromptService } from 'src/services/ai-prompt/ai-prompt.service';

@Component({
  selector: 'app-ai-prompt-official',
  templateUrl: './ai-prompt-official.component.html',
  styleUrls: ['./ai-prompt-official.component.css'],
})
export class AiPromptOfficialComponent implements OnInit {
  currentUser: any;
  isMainPromptActive = true;
  isFlightInfoPromptActive = false;
  isMainPromptTextareaEditable = false;
  mainPromptText = '';
  mainPromptTextInit: any = null;

  isFlightInfoPromptTextareaEditable = false;
  flightInfoPromptText = '';
  flightInfoPromptTextInit: any = null;

  constructor(private AIS: AiPromptService, private router: Router) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user_details'));
    this.currentUser = user;
    console.log(user);
    if (user) {
      this.router.navigateByUrl('login');
    }
    this.AIS.getMainPrompt(this.currentUser._id).subscribe((res) => {
      this.mainPromptText = res.system_prompt;
    });

    this.AIS.getFlightInfoPrompt(this.currentUser._id).subscribe((res) => {
      console.log('flight,', res);
      this.flightInfoPromptText = res.flight_prompt;
    });
  }

  openMainPrompt() {
    this.isMainPromptActive = true;
    this.isFlightInfoPromptActive = false;
    if (this.flightInfoPromptTextInit !== null) {
      this.flightInfoPromptTextInit = this.flightInfoPromptTextInit;
    }
    this.isMainPromptTextareaEditable = false;
    this.isFlightInfoPromptTextareaEditable = false;
  }

  openFlightInfoPrompt() {
    this.isMainPromptActive = false;
    this.isFlightInfoPromptActive = true;
    if (this.mainPromptTextInit !== null) {
      this.mainPromptText = this.mainPromptTextInit;
    }
    this.isMainPromptTextareaEditable = false;
    this.isFlightInfoPromptTextareaEditable = false;
  }

  enableMainPromptEdit() {
    this.isMainPromptTextareaEditable = true;
    this.mainPromptTextInit = this.mainPromptText;
  }

  cancelMainPromptText() {
    this.isMainPromptTextareaEditable = false;
    this.mainPromptText = this.mainPromptTextInit;
    this.mainPromptTextInit = null;
  }

  saveMainPromptText() {
    if (this.mainPromptText == '') {
      const obj = {
        company_id: this.currentUser._id,
        system_prompt: this.mainPromptText,
        type: 'meta',
      };
      console.log(obj);
      this.AIS.createNewPrompt(obj).subscribe(
        (res) => {
          console.log(res);
          this.mainPromptTextInit = null;
          this.isMainPromptTextareaEditable = false;
        },
        (err) => {
          this.mainPromptTextInit = null;
          this.isMainPromptTextareaEditable = false;
        }
      );
    } else {
      const obj = {
        company_id: this.currentUser._id,
        system_prompt: this.mainPromptText,
        type: 'meta',
      };
      this.AIS.updateMainPrompt(obj).subscribe(
        (res) => {
          console.log(res);
          this.mainPromptTextInit = null;
          this.isMainPromptTextareaEditable = false;
        },
        (err) => {
          this.mainPromptTextInit = null;
          this.isMainPromptTextareaEditable = false;
        }
      );
    }
  }

  enableFlightInfoPromptEdit() {
    this.isFlightInfoPromptTextareaEditable = true;
    this.flightInfoPromptTextInit = this.flightInfoPromptText;
  }

  cancelFlightInfoPromptText() {
    this.isFlightInfoPromptTextareaEditable = false;
    this.flightInfoPromptText = this.flightInfoPromptTextInit;
    this.flightInfoPromptTextInit = null;
  }

  saveFligthInfoPromptText() {
    const obj = {
      company_id: this.currentUser._id,
      content: this.flightInfoPromptText,
      type: 'meta',
    };
    console.log(obj);
    this.AIS.updateFlightInfoPrompt(obj).subscribe(
      (res) => {
        console.log(res);
        this.flightInfoPromptTextInit = null;
        this.isFlightInfoPromptTextareaEditable = false;
      },
      (err) => {
        this.flightInfoPromptTextInit = null;
        this.isFlightInfoPromptTextareaEditable = false;
      }
    );
  }
}
