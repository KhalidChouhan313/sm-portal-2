import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

const messagesRoutes: Routes = [
  {
    path: '',
    component: MessagesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(messagesRoutes), PickerModule],
  exports: [RouterModule],
})
export class MessagesModule {}
