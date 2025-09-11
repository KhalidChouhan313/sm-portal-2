import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { CustomersService } from 'src/services/customers/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private customersService: CustomersService
  ) { }

  customers: any[] = [];
  currentPage: number = 1;
  usersPerPage: number = 10;
  totalCustomers: number = 0;
  selectedCustomer: string = '';
  loading = true;
  searchByJoin = false;
  searchByWP = false;
  searchByWN = false;

  ngOnInit(): void {
    this.loading = true;
    const token = localStorage.getItem('token');
    this.authService.authenticateUser(token as string).subscribe(
      (res) => {
        if (res?._id) {
          this.customersService.getCompanyUsers(res?._id).subscribe(
            (res) => {
              this.customers = res?.data ?? [];
              this.totalCustomers = this.customers.length;
              this.loading = false;
            },
            (err) => {
              // console.log(err);
              this.loading = false;
            }
          );
        }
      },
      (err) => {
        // console.log(err);
      }
    );
  }

  selectCustomer(item: any) {
    if (item.user_name === this.selectedCustomer) {
      this.selectedCustomer = '';
    } else {
      this.selectedCustomer = item?.user_name;
    }
  }

  // Pagination logic
  paginate(customers: any[]) {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    return customers.slice(startIndex, endIndex);
  }

  // To navigate to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // To navigate to the next page
  nextPage() {
    const totalPages = Math.ceil(this.totalCustomers / this.usersPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  // To set the current page
  setPage(page: number) {
    this.currentPage = page;
  }

  get totalPages() {
    return Math.ceil(this.totalCustomers / this.usersPerPage);
  }

  get paginationRange(): number[] {
    const range: number[] = [];

    const total = this.totalPages;
    const start = Math.max(this.currentPage - 3, 1);
    const end = Math.min(this.currentPage + 3, total);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  }
}
