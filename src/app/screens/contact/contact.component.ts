import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  isGroup = false;

  openGroup() {
    this.isGroup = true;
  }

  closeGroup() {
    this.isGroup = false;
  }

  contactList = [
    {
      name: 'Techon Ventures',
      number: '+44 7761 909428',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Techon Ventures',
      number: '+44 7761 909428',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Techon Ventures',
      number: '+44 7761 909428',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Techon Ventures',
      number: '+44 7761 909428',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Techon Ventures',
      number: '+44 7761 909428',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Techon Ventures',
      number: '+44 7761 909428',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  ];
}
