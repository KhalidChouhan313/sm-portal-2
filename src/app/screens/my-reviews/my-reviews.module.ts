import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyReviewsComponent } from './my-reviews.component';
// import { QRCodeComponent } from 'angularx-qrcode';

const customersRoutes: Routes = [
  {
    path: '',
    component: MyReviewsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(customersRoutes)],
  exports: [RouterModule],
})
export class MyReviewsModule {}
