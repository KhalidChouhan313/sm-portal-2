import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services';
import { QrcodeService } from 'src/services/qrcode/qrcode.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css'],
})
export class ReviewPageComponent implements OnInit {
  title: string = 'How was your experience?';
  description: string = 'We’d be glad for a review, please select stars below';
  currentUser: any = null;
  previewTitle: string = 'How was your experience?';
  previewDescription: string =
    'We’d be glad for a review, please select stars below';
  profileImg: any;
  coverImg: any;
  profilePreview: string = '';
  coverPreview: string = '';

  reviewEnable = false;

  response: any;
  isLoading = false;

  constructor(private qrSer: QrcodeService, private admin: AdminService) { }

  ngOnInit(): void {
    this.isLoading = true;
    const storedUser = localStorage.getItem('user_details');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      // console.log(this.currentUser); // full object
      // console.log(this.currentUser.name); // access specific properties
      this.admin.getUser(this.currentUser._id).subscribe((res) => {
        // console.log(res);
        this.reviewEnable = res.follow_up_review;
      });

      this.qrSer.getReviewPage(this.currentUser._id).subscribe(
        (res) => {
          // console.log(res);
          this.response = res;
          this.isLoading = false;
          this.previewTitle = res.data.title;
          this.title = res.data.title;
          this.previewDescription = res.data.description;
          this.description = res.data.description;
          this.profilePreview = res.data.profile_image;
          this.coverPreview = res.data.cover_image;
        },
        (err) => {
          this.isLoading = false;
        }
      );
    }
  }

  updateReviewStatus() {
    this.reviewEnable = !this.reviewEnable;
    const obj = {
      _id: this.currentUser._id,
      follow_up_review: this.reviewEnable,
    };

    this.admin.updateUser(obj).subscribe((res) => {
      // this.reviewEnable = !this.reviewEnable;
      // console.log(res.follow_up_review);
    });
  }

  updateDetails() {
    // console.log('working', this.profileImg, this.coverImg);
    const formData = new FormData();

    if (this.profileImg && typeof this.profileImg !== 'string') {
      formData.append('profile_image', this.profileImg);
    }

    if (this.coverImg && typeof this.coverImg !== 'string') {
      formData.append('cover_image', this.coverImg);
    }

    this.previewDescription = this.description;
    this.previewTitle = this.title;
    this.qrSer
      .updateReviewPage(
        this.currentUser._id,
        formData,
        this.title,
        this.description
      )
      .subscribe(
        (res) => {
          // console.log('form', formData);
          // console.log(res);
        },
        (err) => {
          alert("Can't save.");
        }
      );
    this.isEditable = false;
  }

  onProfileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.profileImg = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.profilePreview = reader.result as string; // correct assignment
      };
      reader.readAsDataURL(file);
    }
  }

  onCoverSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.coverImg = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.coverPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  isEditable = false;
  isModalOpen = false;

  cancelEdit() {
    this.isEditable = false;
    this.previewTitle = this.response.data.title;
    this.title = this.response.data.title;
    this.previewDescription = this.response.data.description;
    this.description = this.response.data.description;
    this.profilePreview = this.response.data.profile_image;
    this.coverPreview = this.response.data.cover_image;
  }

  liveDescription() {
    this.previewDescription = this.description;
  }

  liveTitle() {
    this.previewTitle = this.title;
  }
}
