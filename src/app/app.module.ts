import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { CommonModule } from '@angular/common';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './screens/home/home.component';
import { MessagesComponent } from './screens/messages/messages.component';
import { BlockListComponent } from './screens/block-list/block-list.component';
import { DevicesComponent } from './screens/devices/devices.component';
import { MessagesSidebarComponent } from './components/messages-sidebar/messages-sidebar.component';
import { ReportsComponent } from './components/reports/reports.component';
import { StatsComponent } from './components/stats/stats.component';
import { ActivityDetailsComponent } from './components/activity-details/activity-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './screens/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BookingsComponent } from './screens/bookings/bookings.component';
import { CustomersComponent } from './screens/customers/customers.component';
import { ChatFlowComponent } from './screens/chat-flow/chat-flow.component';

import { AppSettingsComponent } from './screens/app-settings/app-settings.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BotSettingsComponent } from './screens/bot-settings/bot-settings.component';
import { BroadcastSmsComponent } from './screens/broadcast-sms/broadcast-sms.component';
import { BroadcastWhatsappComponent } from './screens/broadcast-whatsapp/broadcast-whatsapp.component';
import { ModalComponent } from './components/modal/modal.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ChatbotAnalyticsComponent } from './screens/chatbot-analytics/chatbot-analytics.component';
import { OverviewCardsComponent } from './components/overview-cards/overview-cards.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { TotalTtvComponent } from './components/total-ttv/total-ttv.component';
import { VehicleInsightsComponent } from './components/vehicle-insights/vehicle-insights.component';
import { TotalBookingsComponent } from './components/total-bookings/total-bookings.component';
// import { ReportsDeviceComponent } from './components/reports-device/reports-device.component';

import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { QrPageComponent } from './screens/qr-page/qr-page.component';
// import { QRCodeComponent } from 'angularx-qrcode';
import { NgxQrcodeStylingComponent } from 'ngx-qrcode-styling';
import { QrStacksComponent } from './screens/qr-stacks/qr-stacks.component';
import { QrStatsComponent } from './screens/qr-stats/qr-stats.component';
import { TodayReportsComponent } from './components/today-reports/today-reports.component';
import { ReviewPageComponent } from './screens/review-page/review-page.component';
import { MyReviewsComponent } from './screens/my-reviews/my-reviews.component';
import { ChatsComponent } from './screens/chats/chats.component';
import { AiPromptOfficialComponent } from './screens/ai-prompt-official/ai-prompt-official.component';
import { GreenQrCodeComponent } from './components/green-qr-code/green-qr-code.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { ReviewComponent } from './components/review/review.component';
import { ChatHistoryComponent } from './screens/chat-history/chat-history.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { ButtonStatsComponent } from './screens/button-stats/button-stats.component';
// import { SmartLocationQrComponent } from './components/smart-location-qr/smart-location-qr.component';
// import { InteractionFlowComponent } from './screens/interaction-flow/interaction-flow.component';
// import { InteractionListComponent } from './screens/interaction-list/interaction-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MessagesComponent,
    BlockListComponent,
    DevicesComponent,
    MessagesSidebarComponent,
    ReportsComponent,
    StatsComponent,
    ActivityDetailsComponent,
    LoginComponent,
    SidebarComponent,
    BookingsComponent,
    CustomersComponent,
    ChatFlowComponent,

    AppSettingsComponent,
    LoaderComponent,
    BotSettingsComponent,
    BroadcastSmsComponent,
    BroadcastWhatsappComponent,
    ModalComponent,
    PieChartComponent,
    ChatbotAnalyticsComponent,
    OverviewCardsComponent,
    BookingDetailsComponent,
    CustomerDetailsComponent,
    TotalTtvComponent,
    VehicleInsightsComponent,
    TotalBookingsComponent,
    QrPageComponent,
    QrStacksComponent,
    QrStatsComponent,
    TodayReportsComponent,
    ReviewPageComponent,
    MyReviewsComponent,
    ChatsComponent,
    AiPromptOfficialComponent,
    GreenQrCodeComponent,
    ConfirmationModalComponent,
    ReviewComponent,
    ChatHistoryComponent,
    ProfileComponent,
    ButtonStatsComponent,
    // SmartLocationQrComponent,
    // InteractionFlowComponent,
    // InteractionListComponent,
    // ReportsDeviceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    FormsModule,
    // NgbModule,
    NgxDaterangepickerMd.forRoot(),
    NgxGraphModule,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PickerModule,
    CommonModule,
    // QRCodeComponent,
    NgxQrcodeStylingComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
