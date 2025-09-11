import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsComponent } from './chats.component';

const chatsRoutes: Routes = [
  {
    path: '',
    component: ChatsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(chatsRoutes)],
  exports: [RouterModule],
})
export class ChatsModule {}
