import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatHistoryComponent } from './chat-history.component';


const chatHistoryRoutes: Routes = [
  {
    path: '',
    component: ChatHistoryComponent
  }
  // {
  //   path: ':phone',
  //   component: ChatHistoryComponent
  // }
];



@NgModule({
  imports: [RouterModule.forChild(chatHistoryRoutes)],
  exports: [RouterModule]
})
export class ChatHistoryModule { }
