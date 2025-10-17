import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-create-temlates',
  templateUrl: './create-temlates.component.html',
  styleUrls: ['./create-temlates.component.css'],
})
export class CreateTemlatesComponent {
  @Input() newBroadcastDesc = '';

  campaignName: string = '';
  selectedTemplate: string = '';
  sendTo: string = '';
  scheduledTime: string = '';
  skipSchedule: boolean = false;
}
