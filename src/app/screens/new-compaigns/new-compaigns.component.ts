import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-compaigns',
  templateUrl: './new-compaigns.component.html',
  styleUrls: ['./new-compaigns.component.css'],
})
export class NewCompaignsComponent {
  @Input() newBroadcastDesc = '';

  campaignName: string = '';
  selectedTemplate: string = '';
  sendTo: string = '';
  scheduledTime: string = '';
  skipSchedule: boolean = false;
}
