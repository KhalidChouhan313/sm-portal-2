import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { GreenQrCodeComponent } from './components/green-qr-code/green-qr-code.component';
import { ReviewComponent } from './components/review/review.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { ButtonStatsComponent } from './screens/button-stats/button-stats.component';
import { CampaignsComponent } from './screens/campaigns/campaigns.component';

const routes: Routes = [
  { path: 'qr-code', component: GreenQrCodeComponent },
  { path: 'r/:id', component: ReviewComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'buttonsStats', component: ButtonStatsComponent },
  { path: 'broadcast/campaigns', component: CampaignsComponent },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'chat-history',
    loadChildren: () =>
      import('./screens/chat-history/chat-history.module').then(
        (m) => m.ChatHistoryModule
      ),
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./screens/messages/messages.module').then(
        (m) => m.MessagesModule
      ),
  },
  {
    path: 'block-list',
    loadChildren: () =>
      import('./screens/block-list/block-list.module').then(
        (m) => m.BlockListModule
      ),
  },
  {
    path: 'devices',
    loadChildren: () =>
      import('./screens/devices/devices.module').then((m) => m.DevicesModule),
  },
  {
    path: 'chatbot/analytics',
    loadChildren: () =>
      import('./screens/chatbot-analytics/chatbot-analytics.module').then(
        (m) => m.ChatbotAnalyticsModule
      ),
  },
  {
    path: 'chatbot/bookings',
    loadChildren: () =>
      import('./screens/bookings/bookings.module').then(
        (m) => m.BookingsModule
      ),
  },

  {
    path: 'chatbot/QR-code',
    loadChildren: () =>
      import('./screens/qr-page/qr-page.module').then((m) => m.QrPageModule),
  },
  {
    path: 'chatbot/QR-page/qr-stacks',
    loadChildren: () =>
      import('./screens/qr-stacks/qr-stacks.module').then(
        (m) => m.QrStacksModule
      ),
  },
  {
    path: 'chatbot/QR-code/QR-stats',
    loadChildren: () =>
      import('./screens/qr-stats/qr-stats.module').then((m) => m.QrStatsModule),
  },

  {
    path: 'chatbot/customers',
    loadChildren: () =>
      import('./screens/customers/customers.module').then(
        (m) => m.CustomersModule
      ),
  },
  {
    path: 'chatbot/chat-flow',
    loadChildren: () =>
      import('./screens/chat-flow/chat-flow.module').then(
        (m) => m.ChatflowModule
      ),
  },
  // {
  //   path: 'chatbot/interactions-flow',
  //   loadChildren: () =>
  //     import('./screens/interaction-flow/interaction-flow.module').then(
  //       (m) => m.InteractionFlowModule
  //     ),
  // },
  {
    path: 'chatbot/interactions',
    loadChildren: () =>
      import('./screens/interaction-list/interaction-list.module').then(
        (m) => m.InteractionListModule
      ),
  },
  {
    path: 'chatbot/bot-settings',
    loadChildren: () =>
      import('./screens/bot-settings/bot-settings.module').then(
        (m) => m.BotSettingsModule
      ),
  },
  {
    path: 'broadcast-sms',
    loadChildren: () =>
      import('./screens/broadcast-sms/broadcast-sms.module').then(
        (m) => m.broadcastSmsModule
      ),
  },
  {
    path: 'broadcast-whatsapp',
    loadChildren: () =>
      import('./screens/broadcast-whatsapp/broadcast-whatsapp.module').then(
        (m) => m.broadcastWhatsappModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./screens/app-settings/app-settings.module').then(
        (m) => m.AppSettingsModule
      ),
  },
  {
    path: 'review/review-page',
    loadChildren: () =>
      import('./screens/review-page/review-page.module').then(
        (m) => m.ReviewPageModule
      ),
  },
  {
    path: 'official-ai-prompt/ai-prompt',
    loadChildren: () =>
      import('./screens/ai-prompt-official/ai-prompt-official.module').then(
        (m) => m.AiPromptOfficialModule
      ),
  },
  {
    path: 'review/my-reviews',
    loadChildren: () =>
      import('./screens/my-reviews/my-reviews.module').then(
        (m) => m.MyReviewsModule
      ),
  },
  {
    path: 'chats',
    loadChildren: () =>
      import('./screens/chats/chats.module').then((m) => m.ChatsModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./screens/login/login.module').then((m) => m.LoginModules),
  },
  {
    path: 'sessions/signin',
    loadChildren: () =>
      import('./screens/login/login.module').then((m) => m.LoginModules),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
