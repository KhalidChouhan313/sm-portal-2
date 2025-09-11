import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-broadcast-whatsapp',
  templateUrl: './broadcast-whatsapp.component.html',
  styleUrls: ['./broadcast-whatsapp.component.css']
})
export class BroadcastWhatsappComponent {
  drafts = [
    {
      date: new Date().toLocaleString(),
      name: "LesGo",
      contacts: "B T PF T",
      delay: "1 Minute",
      messages: "Book the taxi for your trip, because it will take you so long.",
      status: "Completed"
    },
    {
      date: new Date().toLocaleString(),
      name: "LesGo",
      contacts: "B T PF T",
      delay: "1 Minute",
      messages: "Book the taxi for your trip, because it will take you so long.",
      status: "Completed"
    },
    {
      date: new Date().toLocaleString(),
      name: "LesGo",
      contacts: "B T PF T",
      delay: "1 Minute",
      messages: "Book the taxi for your trip, because it will take you so long.",
      status: "Completed"
    },
    {
      date: new Date().toLocaleString(),
      name: "LesGo",
      contacts: "B T PF T",
      delay: "1 Minute",
      messages: "Book the taxi for your trip, because it will take you so long.",
      status: "Completed"
    },
    {
      date: new Date().toLocaleString(),
      name: "LesGo",
      contacts: "B T PF T",
      delay: "1 Minute",
      messages: "Book the taxi for your trip, because it will take you so long.",
      status: "Completed"
    }
  ]

  templates = [
    {
      date: new Date().toLocaleString(),
      name: "LesGo",
      lastEdit: new Date().toLocaleString(),
      status: "Completed"
    },
    {
      date: new Date().toLocaleString(),
      name: "LesGo",
      lastEdit: new Date().toLocaleString(),
      status: "Completed"
    },
    {
      date: new Date().toLocaleString(),
      name: "LesGo",
      lastEdit: new Date().toLocaleString(),
      status: "Completed"
    },
    {
      date: new Date().toLocaleString(),
      name: "LesGo",
      lastEdit: new Date().toLocaleString(),
      status: "Completed"
    },
    {
      date: new Date().toLocaleString(),
      name: "LesGo",
      lastEdit: new Date().toLocaleString(),
      status: "Completed"
    }
  ]

  showTemplates = false;
  addMode = true;
  showDateAndTimeModal = false;
  @Input() newBroadcastDesc = ""
}
