import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { QrPageComponent } from './screens/qr-page/qr-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showNavbar: boolean = true;
  isQr = true;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((s) => {
        // console.log(this.activatedRoute.snapshot['_routerState'].url);
        // console.log(localStorage.getItem('token'))

        if (this.activatedRoute.snapshot['_routerState'].url.startsWith('/qr-code?') || this.activatedRoute.snapshot['_routerState'].url.startsWith('/r/')) {
          this.isQr = true;
        } else {
          this.isQr = false;
          this.updateNavbarVisibility();
          if (!localStorage.getItem('token')) {
            this.router.navigate(['/login']);
          } else {
            // this.router.navigate(['/']);
          }
        }
      });
  }

  // ngOnInit(): void {
  //   console.log(this.activatedRoute.snapshot);
  // }

  shouldShowNavbar(): boolean {
    return (
      this.activatedRoute.firstChild?.snapshot.routeConfig?.path !== 'login' &&
      this.activatedRoute.firstChild?.snapshot.routeConfig?.path !== 'signup'
    );
  }

  private updateNavbarVisibility(): void {
    this.showNavbar = this.shouldShowNavbar();
  }

  ngOnInit(): void {
    //   console.log(this.router['routerState']);
    //   if (this.activatedRoute.snapshot['_routerState'].url.startsWith('/qr-code') || this.activatedRoute.snapshot['_routerState'].url.startsWith('/r')) {
    //     // this.isQr = true;
    //   } else {
    //     // if (!localStorage.getItem('token')) {
    //     //   this.router.navigate(['/login']);
    //     // } else {
    //     //   // this.router.navigate(['/']);
    //     // }
    //   }
  }
}
