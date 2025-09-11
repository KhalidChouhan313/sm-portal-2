import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  disabled = false;
  error = '';
  passwordType: string = 'password';
  togglePasswordType = () => {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  };

  handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.disabled = true;
    const form = event.target as HTMLFormElement;
    const formdata = new FormData(form);
    const username = formdata.get('username');
    const password = formdata.get('password');

    if (!username || !password) {
      this.error = 'Username and Password are required!';
      this.disabled = false;
      setTimeout(() => {
        this.error = '';
      }, 3000);
    } else {
      this.authService.login(username, password).subscribe(
        (response) => {
          const token = response?.token;
          this.authService.authenticateUser(token).subscribe(
            (res) => {
              this.authService.user$ = res;
              // console.log(res, token);
              localStorage.setItem('token', token);
              localStorage.setItem(
                'user_details',
                JSON.stringify({ _id: res._id })
              );
              const returnUrl =
                this.route.snapshot.queryParamMap.get('returnUrl') || '/';
              this.router.navigateByUrl(returnUrl);
            },
            (err) => {
              this.error =
                err?.error?.message ??
                'Something went wrong while getting user details!';
              this.disabled = false;
              setTimeout(() => {
                this.error = '';
              }, 3000);
            }
          );
        },
        (error) => {
          this.error = error.error?.message ?? 'Something went wrong!';
          this.disabled = false;
          setTimeout(() => {
            this.error = '';
          }, 3000);
        }
      );
    }
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigateByUrl('/');
    }
  }
}
