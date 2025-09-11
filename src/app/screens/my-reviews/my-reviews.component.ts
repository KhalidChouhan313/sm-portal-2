import { Component, OnInit } from '@angular/core';
import { QrcodeService } from 'src/services/qrcode/qrcode.service';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css'],
})
export class MyReviewsComponent implements OnInit {
  stars = Array(5).fill(0);
  rating = 0;
  hovered = 0;
  currentUser: any;

  fName: string = '';
  fDriverId: string = '';
  fReviewId: string = '';

  reviews: any[] = [];

  // Pagination state
  currentPage = 1;
  totalPages = 1;

  constructor(private qrSer: QrcodeService) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user_details');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
    this.loadReviews();
  }

  loadReviews() {
    this.qrSer.getReviews(this.currentUser._id, this.currentPage).subscribe(
      (res) => {

        this.reviews = res.data;
        // console.log(this.reviews);
        this.totalPages = res.pagination?.totalPages || 1;
      },
      (err) => {
        this.reviews = [];
      }
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadReviews();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadReviews();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadReviews();
    }
  }

  clear() {
    this.rating = 0;
    this.fName = '';
    this.fDriverId = '';
    this.fReviewId = '';
    this.currentPage = 1;
    this.loadReviews();
  }

  setRating(value: number) {
    this.rating = value;
    this.currentPage = 1;
    this.qrSer
      .getReviewsFitered(this.currentUser._id, this.currentPage, this.rating)
      .subscribe(
        (res) => {
          this.reviews = res.data;
          this.totalPages = res.pagination?.totalPages || 1;
        },
        () => {
          this.reviews = [];
        }
      );
  }

  hoverRating(value: number) {
    this.hovered = value;
  }

  getStarClass(rating: number, index: number): string {
    if (rating === 5) return 'dark-green';
    if (rating >= 3 && index < rating) return 'light-gray';
    if (rating === 2 && index < 2) return 'red';
    if (rating === 1 && index === 0) return 'red';
    return '';
  }
}
