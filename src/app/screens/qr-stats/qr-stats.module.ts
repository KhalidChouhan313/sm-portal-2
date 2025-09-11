import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrStatsComponent } from './qr-stats.component';
// import { QRCodeComponent } from 'angularx-qrcode';

const customersRoutes: Routes = [
  {
    path: '',
    component: QrStatsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(customersRoutes)],
  exports: [RouterModule],
})
export class QrStatsModule {}
