import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatbotAnalyticsComponent } from './chatbot-analytics.component';


const chatbotAnalyticsRoutes: Routes = [
  {
    path: '',
    component: ChatbotAnalyticsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(chatbotAnalyticsRoutes)],
  exports: [RouterModule],
})
export class ChatbotAnalyticsModule { }
