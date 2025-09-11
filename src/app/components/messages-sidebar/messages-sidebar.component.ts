import { Component } from '@angular/core';

@Component({
  selector: 'app-messages-sidebar',
  templateUrl: './messages-sidebar.component.html',
  styleUrls: ['./messages-sidebar.component.css']
})
export class MessagesSidebarComponent {
  sidebarOpen = false;
  toggleSidebar = () => this.sidebarOpen = !this.sidebarOpen;

  sidebarMenu = [
    {
      id: 1,
      label: "Booking",
      icon: "../../../assets/icons/booking.svg",
      icon_active: "../../../assets/icons/booking_a.svg",
      active: true
    },
    {
      id: 2,
      label: "Tracking",
      icon: "../../../assets/icons/tracking.svg",
      icon_active: "../../../assets/icons/tracking_a.svg",
      active: false
    },
    {
      id: 3,
      label: "Arrived",
      icon: "../../../assets/icons/arrived.svg",
      icon_active: "../../../assets/icons/arrived_a.svg",
      active: false
    },
    {
      id: 4,
      label: "Paylink",
      icon: "../../../assets/icons/paylink.svg",
      icon_active: "../../../assets/icons/paylink_a.svg",
      active: false
    },
    {
      id: 5,
      label: "PrePay",
      icon: "../../../assets/icons/prepay.svg",
      icon_active: "../../../assets/icons/prepay_a.svg",
      active: false
    },
    {
      id: 6,
      label: "Review",
      icon: "../../../assets/icons/review.svg",
      icon_active: "../../../assets/icons/review_a.svg",
      active: false
    },
    {
      id: 7,
      label: "Driver",
      icon: "../../../assets/icons/driver.svg",
      icon_active: "../../../assets/icons/driver_a.svg",
      active: false
    },
    {
      id: 8,
      label: "Pre Auth",
      icon: "../../../assets/icons/pre_auth.svg",
      icon_active: "../../../assets/icons/pre_auth_a.svg",
      active: false
    },
    {
      id: 9,
      label: "Custom 1",
      icon: "../../../assets/icons/custom_1.svg",
      icon_active: "../../../assets/icons/custom_1_a.svg",
      active: false
    },
    {
      id: 10,
      label: "Custom 2",
      icon: "../../../assets/icons/custom_1.svg",
      icon_active: "../../../assets/icons/custom_1_a.svg",
      active: false
    },
    {
      id: 11,
      label: "ChatBot",
      icon: "../../../assets/icons/chatbot.svg",
      icon_active: "../../../assets/icons/chatbot_a.svg",
      active: false
    },
    {
      id: 12,
      label: "Missed Calls",
      icon: "../../../assets/icons/missed_call.svg",
      icon_active: "../../../assets/icons/missed_call_a.svg",
      active: false
    },
    {
      id: 13,
      label: "No Show",
      icon: "../../../assets/icons/noshow.svg",
      icon_active: "../../../assets/icons/noshow_a.svg",
      active: false
    },
  ]

  toggleActive = (id: number) => {
    this.sidebarMenu.forEach(item => item.id === id ? item.active = true : item.active = false)
  }
}
