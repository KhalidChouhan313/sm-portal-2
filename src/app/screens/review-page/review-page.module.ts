import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewPageComponent } from './review-page.component';
// import { QRCodeComponent } from 'angularx-qrcode';

const customersRoutes: Routes = [
  {
    path: '',
    component: ReviewPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(customersRoutes)],
  exports: [RouterModule],
})
export class ReviewPageModule {}
