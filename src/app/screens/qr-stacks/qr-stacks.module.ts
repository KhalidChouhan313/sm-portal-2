import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrStacksComponent } from './qr-stacks.component';
// import { QRCodeComponent } from 'angularx-qrcode';

const customersRoutes: Routes = [
  {
    path: '',
    component: QrStacksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(customersRoutes)],
  exports: [RouterModule],
})
export class QrStacksModule {}
