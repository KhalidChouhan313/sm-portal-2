import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-interaction-flow',
  templateUrl: './interaction-flow.component.html',
  styleUrls: ['./interaction-flow.component.css'],
})
export class InteractionFlowComponent implements OnInit {
  @Input() interactionDetails: any;
  messages = [];
  constructor() {}

  ngOnInit(): void {
    console.log(this.interactionDetails);
    this.messages = [
      // { sender: 'bot', text: 'Ask pickup' },
      // { sender: 'user', text: this.interactionDetails.search_pickup },
      // { sender: 'user', text: `Pickup \n${this.interactionDetails.selected_destination.address}` },
      // { sender: 'bot', text: 'Ask destination' },
      // { sender: 'user', text: this.interactionDetails.search_destination },
      // { sender: 'user', text: `Pickup \n${this.interactionDetails.selected_destination.address}` },
      // { sender: 'user', text: 'Ask pickup' },
      // { sender: 'bot', text: 'Ask pickup' },
      // { sender: 'user', text: 'Ask pickup' },
    ];
    this.messages.push({ timestamp: Date.now(), sender: 'user', text: 'Hi' });
    this.messages.push({
      timestamp: Date.now(),
      sender: 'bot',
      text: 'Enter pickup address.',
    });

    if (this.interactionDetails.search_pickup) {
      // this.messages.push({ timestamp: Date.now(), sender: 'bot', text: 'Ask pickup' });
      this.messages.push({
        timestamp: Date.now(),
        sender: 'user',
        text: this.interactionDetails.search_pickup,
      });
    }
    if (this.interactionDetails.selected_pickup.address) {
      this.messages.push({
        timestamp: Date.now(),
        sender: 'user',
        text: `Pickup \n${this.interactionDetails.selected_pickup.address}`,
      });
    }
    if (this.interactionDetails.search_destination) {
      this.messages.push({
        timestamp: Date.now(),
        sender: 'bot',
        text: 'Enter destination address.',
      });
      this.messages.push({
        timestamp: Date.now(),
        sender: 'user',
        text: this.interactionDetails.search_destination,
      });
    }
    if (this.interactionDetails.selected_destination.address) {
      this.messages.push({
        timestamp: Date.now(),
        sender: 'user',
        text: `Destination: \n${this.interactionDetails.selected_destination.address}`,
      });
    }
    if (this.interactionDetails.vehicle_type) {
      this.messages.push({
        timestamp: Date.now(),
        sender: 'bot',
        text: 'Select vehicle',
      });
      this.messages.push({
        timestamp: Date.now(),
        sender: 'user',
        text: this.interactionDetails.vehicle_name,
      });
    }
    if (this.interactionDetails.date) {
      this.messages.push({
        timestamp: Date.now(),
        sender: 'bot',
        text: 'Enter Date',
      });
      this.messages.push({
        timestamp: Date.now(),
        sender: 'user',
        text: this.interactionDetails.date,
      });
    }
    if (this.interactionDetails.time) {
      this.messages.push({
        timestamp: Date.now(),
        sender: 'bot',
        text: 'Enter Time',
      });
      this.messages.push({
        timestamp: Date.now(),
        sender: 'user',
        text:
          this.interactionDetails.time.toLowerCase() == 'asap'
            ? this.interactionDetails.time
            : this.interactionDetails.time.split('T')[1],
      });
    }
    if (this.interactionDetails.price) {
      this.messages.push({
        timestamp: Date.now(),
        sender: 'bot',
        text: `Quotation £${this.interactionDetails.price.toFixed(2)}`,
      });
      // this.messages.push({ timestamp: Date.now(), sender: 'user', text: this.interactionDetails.time.toLowerCase() == 'asap' ? this.interactionDetails.time : this.interactionDetails.time.split('T')[1] });
    }
    if (this.interactionDetails.note) {
      this.messages.push({
        timestamp: Date.now(),
        sender: 'user',
        text: 'Confirm',
      });
      this.messages.push({
        timestamp: Date.now(),
        sender: 'bot',
        text: 'Note',
      });
      this.messages.push({
        timestamp: Date.now(),
        sender: 'user',
        text: this.interactionDetails.note,
      });
    }
    if (
      !this.interactionDetails.note &&
      this.interactionDetails.status === 'completed'
    ) {
      this.messages.push({
        timestamp: Date.now(),
        sender: 'user',
        text: 'Confirm',
      });
    }
    if (this.interactionDetails.status === 'completed') {
      this.messages.push({
        timestamp: Date.now(),
        sender: 'bot',
        text: 'Booking Confirmed',
      });
    }
  }
}
