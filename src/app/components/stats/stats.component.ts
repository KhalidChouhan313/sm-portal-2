import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  // cards data
  cardsData = [
    {
      label: "Total sent by SMS",
      count: "12000",
      icon: "../../assets/icons/pie.svg"
    },
    {
      label: "Total sent by Whatsapp",
      count: "12000",
      icon: "../../assets/icons/whatsapp.svg"
    },
    {
      label: "Total sent by SMS",
      count: "12000",
      icon: "../../assets/icons/messages.svg"
    },
  ]

  @Input() statsCardStyles: string = "";
}
