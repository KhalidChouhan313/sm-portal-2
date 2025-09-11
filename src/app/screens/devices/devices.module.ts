import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './devices.component';

const devicesRoutes: Routes = [
  {
    path: '',
    component: DevicesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(devicesRoutes)],
  exports: [RouterModule],
})
export class DevicesModule {}